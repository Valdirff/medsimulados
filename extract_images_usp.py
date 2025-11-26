import os
import re
import json
from pypdf import PdfReader

def extract_images_and_map(pdf_path, output_dir, log_file):
    reader = PdfReader(pdf_path)
    page_map = []
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    q_start_pattern = re.compile(r"^\s*(\d+)\s*$")
    
    total_images = 0

    for i, page in enumerate(reader.pages):
        page_num = i + 1
        text = page.extract_text()
        
        # Find questions on this page
        questions = []
        lines = text.split('\n')
        for line in lines:
            match = q_start_pattern.match(line.strip())
            if match:
                q_num = int(match.group(1))
                if 1 <= q_num <= 120:
                    questions.append(q_num)
        
        # Extract images
        images = []
        if hasattr(page, "images"):
            for j, image in enumerate(page.images):
                if len(image.data) < 5120: # 5KB
                    continue

                image_name = f"page_{page_num}_img_{j+1}.png"
                image_path = os.path.join(output_dir, image_name)
                
                with open(image_path, "wb") as fp:
                    fp.write(image.data)
                
                images.append(image_name)
                total_images += 1
        
        page_map.append({
            "page": page_num,
            "questions": questions,
            "images": images
        })
        print(f"Page {page_num}: Questions {questions}, Images {len(images)}")

    with open(log_file, "w", encoding="utf-8") as f:
        json.dump(page_map, f, indent=4)
    
    print(f"Total images extracted: {total_images}")
    print(f"Log saved to {log_file}")

pdf_path = r"c:\Users\Valdir\OneDrive\Documentos\medicina\provas\USP_2023\prova-residencia-medica-usp-2023.pdf"
output_dir = r"c:\Users\Valdir\OneDrive\Documentos\medicina\public\images\usp2023"
log_file = r"c:\Users\Valdir\OneDrive\Documentos\medicina\usp_images_log.json"

extract_images_and_map(pdf_path, output_dir, log_file)
