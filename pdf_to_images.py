import os
from pdf2image import convert_from_path

# Path to the PDF file
pdf_path = "THE-CAT-IN-THE-HAT.pdf"

# Create output directory if it doesn't exist
output_dir = "pdf_images"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Convert PDF to images
print(f"Converting {pdf_path} to images...")
images = convert_from_path(pdf_path)

# Save images
for i, image in enumerate(images):
    image_path = os.path.join(output_dir, f"page_{i+1}.jpg")
    image.save(image_path, "JPEG")
    print(f"Saved {image_path}")

print(f"Conversion complete! {len(images)} pages extracted to {output_dir}/ directory.") 