import os
from PIL import Image

def resize_images(directory, max_width=800):
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            filepath = os.path.join(directory, filename)
            try:
                with Image.open(filepath) as img:
                    if img.width > max_width:
                        # Calculate new height
                        ratio = max_width / img.width
                        new_height = int(img.height * ratio)
                        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                        img.save(filepath, optimize=True)
                        print(f"Resized {filename}")
            except Exception as e:
                print(f"Error resizing {filename}: {e}")

directory = r"c:\Users\Valdir\OneDrive\Documentos\medicina\public\images\usp2023"
resize_images(directory)
