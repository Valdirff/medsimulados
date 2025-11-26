import json
import re
import os

def map_images(data_file, log_file):
    with open(log_file, 'r') as f:
        log_data = json.load(f)
    
    # Create a map of question_id -> images
    q_to_images = {}
    for page in log_data:
        images = page.get('images', [])
        if not images:
            continue
        
        # Base URL for images
        image_urls = [f"/medsimulados/images/usp2023/{img}" for img in images]
        
        for q_id in page.get('questions', []):
            q_to_images[q_id] = image_urls

    with open(data_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Iterate through questions and inject images
    # Pattern: "id": 1, ... "options": [
    # We want to insert "images": [...], before "options"
    
    new_content = content
    
    # We iterate from 1 to 120
    for q_id in range(1, 121):
        if q_id in q_to_images:
            images_json = json.dumps(q_to_images[q_id])
            # Find the location to insert
            # We look for "id": {q_id}, ... "options": [
            # This is tricky with regex because of newlines.
            # Let's find the specific block for this question.
            
            # Regex to find the start of the question block
            # Assuming standard formatting from previous steps
            pattern = re.compile(r'("id":\s*' + str(q_id) + r',[\s\S]*?)("options": \[)')
            
            match = pattern.search(new_content)
            if match:
                # Check if images already exist (to avoid double insertion if run twice)
                if '"images":' not in match.group(1):
                    replacement = f'{match.group(1)}"images": {images_json},\n        {match.group(2)}'
                    # We need to be careful not to replace all occurrences if there are duplicates (unlikely for ids)
                    # But string replace might be dangerous if context is not unique.
                    # However, "id": 1, is unique.
                    
                    # Let's use string replacement on the specific matched span
                    # But since we are modifying the string, indexes shift.
                    # Better to rebuild the string or use a robust replacement.
                    
                    # Simpler approach: Split by "id": X, and reconstruct.
                    pass

    # Let's try a line-by-line approach which is safer
    lines = content.split('\n')
    output_lines = []
    current_q_id = None
    
    for line in lines:
        # Check for id
        id_match = re.search(r'"id":\s*(\d+),', line)
        if id_match:
            current_q_id = int(id_match.group(1))
        
        # Check for options start
        if '"options": [' in line and current_q_id in q_to_images:
            images = q_to_images[current_q_id]
            images_str = json.dumps(images)
            output_lines.append(f'        "images": {images_str},')
            # Remove from map to ensure we don't add again if logic fails
            # del q_to_images[current_q_id] 
            # Actually don't delete, just proceed.
            
        output_lines.append(line)
        
    with open(data_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(output_lines))
    
    print("Updated usp2023Data.js with images.")

data_file = r"c:\Users\Valdir\OneDrive\Documentos\medicina\src\data\usp2023Data.js"
log_file = r"c:\Users\Valdir\OneDrive\Documentos\medicina\usp_images_log.json"

map_images(data_file, log_file)
