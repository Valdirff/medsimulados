import os
from pypdf import PdfReader

def extract_text(pdf_path, output_txt):
    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        
        with open(output_txt, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Successfully extracted text to {output_txt}")
    except Exception as e:
        print(f"Error extracting {pdf_path}: {e}")

base_path = r"c:\Users\Valdir\OneDrive\Documentos\medicina\provas\AMRIGS_2024"
questions_pdf = os.path.join(base_path, "0924.002_Acesso_Direto_POS-PRELO.pdf")
answers_pdf = os.path.join(base_path, "Edital_Gabarito_Definitivo_AcessoDireto_924_OK_6748e6d79f492.pdf")

extract_text(questions_pdf, "amrigs_questions.txt")
extract_text(answers_pdf, "amrigs_answers.txt")
