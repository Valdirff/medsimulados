import re
import json

def parse_answers(file_path):
    answers = {}
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract PROVA A section
    # It starts after "PROVA A" and ends before "PROVA B"
    start_marker = "PROVA A – Áreas Básicas e de Acesso Direto"
    end_marker = "PROVA B – Especialidades Clínicas"
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    
    if start_idx == -1:
        print("Could not find PROVA A section")
        return {}
        
    section = content[start_idx:end_idx]
    
    # Parse lines like "1 C", "2 D", etc.
    # Regex: ^\s*(\d+)\s+([A-D])\s*$
    pattern = re.compile(r"^\s*(\d+)\s+([A-D])\s*$", re.MULTILINE)
    
    for match in pattern.finditer(section):
        q_num = int(match.group(1))
        opt = match.group(2).lower()
        answers[q_num] = opt
        
    return answers

def get_area(q_num):
    if 1 <= q_num <= 20: return "Cirurgia Geral"
    if 21 <= q_num <= 40: return "Ginecologia e Obstetrícia"
    if 41 <= q_num <= 60: return "Clínica Médica"
    if 61 <= q_num <= 80: return "Pediatria"
    if 81 <= q_num <= 100: return "Medicina Preventiva"
    return "Casos Clínicos"

def parse_questions(file_path, answers_data):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    questions = []
    current_q = None
    current_text = []
    current_options = {}
    current_opt_id = None
    
    # Regex for question start: line with just a number
    q_start_pattern = re.compile(r"^\s*(\d+)\s*$")
    # Regex for option start: (A) ...
    opt_pattern = re.compile(r"^\s*\(([A-D])\)\s*(.*)")
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Skip headers/footers
        if "Processo Seletivo" in line or "RESIDÊNCIA MÉDICA" in line or "UNIVERSIDADE DE SÃO PAULO" in line:
            continue
        if "COREME/FM" in line:
            continue
            
        # Check for question start
        match_q = q_start_pattern.match(line)
        if match_q:
            q_num = int(match_q.group(1))
            # Validate if it's a reasonable question number (1-120)
            if 1 <= q_num <= 120:
                # Save previous question
                if current_q:
                    opts_list = []
                    for oid in ['a', 'b', 'c', 'd']:
                        opts_list.append({'id': oid, 'text': current_options.get(oid, "Opção não encontrada")})
                    
                    q_data = {
                        'id': current_q,
                        'area': get_area(current_q),
                        'text': " ".join(current_text).strip(),
                        'options': opts_list,
                        'correctOption': answers_data.get(current_q, 'a'),
                        'comment': "Comentário será adicionado em breve."
                    }
                    questions.append(q_data)
                
                current_q = q_num
                current_text = []
                current_options = {}
                current_opt_id = None
                continue
        
        # Check for option start
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
            'correctOption': answers_data.get(current_q, 'a'),
            'comment': "Comentário será adicionado em breve."
        }
        questions.append(q_data)
        
    return questions

answers_data = parse_answers("usp_answers.txt")
questions_data = parse_questions("usp_questions.txt", answers_data)

# Generate JS file
js_content = "export const usp2023Questions = " + json.dumps(questions_data, indent=4, ensure_ascii=False) + ";"

with open(r"c:\Users\Valdir\OneDrive\Documentos\medicina\src\data\usp2023Data.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated {len(questions_data)} questions.")
