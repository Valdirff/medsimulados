import re
import json

def parse_answers(file_path):
    answers = {}
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Parse the table (lines 21-34 in the view_file output)
    # It's a bit unstructured in text, but we can look for the block of numbers and letters.
    # Or just use the justifications since they contain the correct answer too!
    # "QUESTÃO: 1 - MANTIDA alternativa 'D'." -> Correct: D
    # "QUESTÃO: 3 - ALTERA GABARITO DE ALTERNATIVA 'D' PARA ALTERNATIVA 'A'." -> Correct: A
    
    # However, the table covers all questions, justifications might only cover some (appeals).
    # Wait, the file says "GABARITOS DEFINITIVOS E JUSTIFICATIVAS".
    # And the table is there.
    # Let's try to parse the table first.
    
    # Heuristic for table: Look for lines with sequence of numbers and next line with letters.
    # But the text extraction might have messed up columns.
    # Let's look at the justification section first, it seems to cover many questions.
    # Actually, usually justifications are only for contested questions.
    # But the file title says "GABARITOS DEFINITIVOS E JUSTIFICATIVAS".
    # Let's rely on the table for the "correctOption" and the justifications for "comment".
    
    # Parsing table from text dump:
    # 1 2 3 4 5 ...
    # D B A C * ...
    # This is hard to regex reliably without seeing the whole file structure perfectly.
    # But I can try to find the lines.
    
    lines = content.split('\n')
    table_map = {}
    
    # Attempt to parse table
    # We look for lines that look like "1 2 3 4 5" and the next line "D B A C *"
    for i, line in enumerate(lines):
        if "1 2 3 4 5 6 7 8 9 10" in line:
            # Found a header line
            # Next line should be answers
            ans_line = lines[i+1].strip()
            # Split by spaces
            parts = ans_line.split()
            # Map to question numbers
            # The header might be "1 2 3..." or "21 22 23..."
            # Let's parse the header numbers too
            headers = line.strip().split()
            
            if len(headers) == len(parts):
                for h, a in zip(headers, parts):
                    if h.isdigit():
                        table_map[int(h)] = a.lower()
    
    # Parse justifications for comments and potentially updating answers
    # Pattern: QUESTÃO: (\d+) - (.*)
    justification_pattern = re.compile(r"QUESTÃO:\s*(\d+)\s*-\s*(.*)")
    
    current_q = None
    current_comment = []
    
    for line in lines:
        match = justification_pattern.search(line)
        if match:
            if current_q:
                answers[current_q]['comment'] = " ".join(current_comment).strip()
            
            q_num = int(match.group(1))
            status_text = match.group(2)
            current_comment = [status_text]
            current_q = q_num
            
            if q_num not in answers:
                answers[q_num] = {}
            
            # Extract correct option from status text if possible
            # "MANTIDA alternativa 'D'" -> D
            # "ALTERA GABARITO ... PARA ALTERNATIVA 'A'" -> A
            # "ANULADA" -> *
            
            if "ANULADA" in status_text:
                answers[q_num]['correctOption'] = "*"
            elif "PARA ALTERNATIVA" in status_text:
                # Find the last quoted letter
                opts = re.findall(r"'([A-D])'", status_text)
                if opts:
                    answers[q_num]['correctOption'] = opts[-1].lower()
            elif "alternativa" in status_text:
                opts = re.findall(r"'([A-D])'", status_text)
                if opts:
                    answers[q_num]['correctOption'] = opts[0].lower()
                    
        elif current_q:
            # Append to current comment, skipping headers/footers
            if "Executora:" in line or "Informações:" in line or "e 0800" in line:
                continue
            current_comment.append(line.strip())
            
    if current_q:
        answers[current_q]['comment'] = " ".join(current_comment).strip()

    # Merge table data into answers
    for q, opt in table_map.items():
        if q not in answers:
            answers[q] = {}
        if 'correctOption' not in answers[q]:
            answers[q]['correctOption'] = opt
            
    return answers

def parse_questions(file_path, answers_data):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    questions = []
    
    # Split by "QUESTÃO \d+"
    # But we need to keep the delimiter
    # Using a custom parser loop is safer
    
    lines = content.split('\n')
    current_q = None
    current_text = []
    current_options = {}
    current_opt_id = None
    
    q_start_pattern = re.compile(r"QUESTÃO\s+(\d+)\s*–\s*(.*)")
    opt_pattern = re.compile(r"^([A-D])\)\s*(.*)")
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Skip headers/footers
        if "Execução: Fundatec" in line or "924_AD_NS" in line or "RESIDÊNCIA COM ACESSO" in line or "24/10/2024" in line:
            continue
            
        match_q = q_start_pattern.match(line)
        if match_q:
            # Save previous question
            if current_q:
                # Process options for previous question
                opts_list = []
                for oid in ['a', 'b', 'c', 'd']:
                    opts_list.append({'id': oid, 'text': current_options.get(oid, "Opção não encontrada")})
                
                q_data = {
                    'id': current_q,
                    'area': get_area(current_q),
                    'text': " ".join(current_text).strip(),
                    'options': opts_list,
                    'correctOption': answers_data.get(current_q, {}).get('correctOption', 'a'),
                    'comment': answers_data.get(current_q, {}).get('comment', '')
                }
                questions.append(q_data)
            
            current_q = int(match_q.group(1))
            current_text = [match_q.group(2)]
            current_options = {}
            current_opt_id = None
            continue
            
        match_opt = opt_pattern.match(line)
        if match_opt:
            current_opt_id = match_opt.group(1).lower()
            current_options[current_opt_id] = match_opt.group(2)
        else:
            if current_opt_id:
                # Continuation of option
                current_options[current_opt_id] += " " + line
            elif current_q:
                # Continuation of question text
                current_text.append(line)
                
    # Save last question
    if current_q:
        opts_list = []
        for oid in ['a', 'b', 'c', 'd']:
            opts_list.append({'id': oid, 'text': current_options.get(oid, "Opção não encontrada")})
        
        q_data = {
            'id': current_q,
            'area': get_area(current_q),
            'text': " ".join(current_text).strip(),
            'options': opts_list,
            'correctOption': answers_data.get(current_q, {}).get('correctOption', 'a'),
            'comment': answers_data.get(current_q, {}).get('comment', '')
        }
        questions.append(q_data)
        
    return questions

def get_area(q_num):
    if 1 <= q_num <= 20: return "Clínica Médica"
    if 21 <= q_num <= 40: return "Cirurgia Geral"
    if 41 <= q_num <= 60: return "Ginecologia e Obstetrícia"
    if 61 <= q_num <= 80: return "Pediatria"
    if 81 <= q_num <= 100: return "Medicina Preventiva"
    return "Geral"

answers_data = parse_answers("amrigs_answers.txt")
questions_data = parse_questions("amrigs_questions.txt", answers_data)

# Generate JS file
js_content = "export const amrigs2024Questions = " + json.dumps(questions_data, indent=4, ensure_ascii=False) + ";"

with open(r"c:\Users\Valdir\OneDrive\Documentos\medicina\src\data\amrigs2024Data.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated {len(questions_data)} questions.")
