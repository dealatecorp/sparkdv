import os
import base64
from PIL import Image
from rembg import remove, new_session

# Use u2netp (portable 4.7MB model, blazing fast download & inference)
session = new_session("u2netp")

out_dir = "public/images/products-cutout"
os.makedirs(out_dir, exist_ok=True)
os.makedirs("public/assets/products", exist_ok=True)

files = [
    ("Nanion Elite Pro Mint Toothpaste.png", "nanion-elite-pro"),
    ("Nanion Elite Toothpaste Packaging Mockup.png", "nanion-elite"),
    ("Nanion Lite Toothpaste Packaging.png", "nanion-lite"),
    ("NANION Pro PLUS Strawberry Gummies.png", "nanion-pro-plus-gummies"),
    ("Nanion Swish Mouthwash Bottle (1).png", "nanion-swish"),
]

for src_name, slug in files:
    src_path = os.path.join("product photos", src_name)
    print(f"Processing {src_name} -> {slug}...", flush=True)
    inp = Image.open(src_path)
    
    # Check if top-left has Ps badge on Nanion Elite Pro (it's around x<150, y<150)
    if "Elite Pro Mint" in src_name:
        w, h = inp.size
        bg_sample = inp.getpixel((180, 50))
        for x in range(160):
            for y in range(160):
                inp.putpixel((x, y), bg_sample)
    
    # Fast, clean neural cutout
    out = remove(inp, session=session, alpha_matting=False)
    
    # Find bounding box of the actual product
    bbox = out.getbbox()
    print(f"  Cropping to bounding box: {bbox} (orig: {out.size})", flush=True)
    if bbox:
        # Add a subtle 20px breathing padding around the cropped product
        pad = 20
        left = max(0, bbox[0] - pad)
        top = max(0, bbox[1] - pad)
        right = min(out.width, bbox[2] + pad)
        bottom = min(out.height, bbox[3] + pad)
        cropped = out.crop((left, top, right, bottom))
    else:
        cropped = out
    
    # Save transparent PNG
    png_path = os.path.join(out_dir, f"{slug}.png")
    cropped.save(png_path, "PNG", optimize=True)
    print(f"  Saved {png_path} ({cropped.size[0]}x{cropped.size[1]})", flush=True)
    
    # Also save to public/images/{slug}.png and public/assets/products/{slug}.png
    cropped.save(os.path.join("public/images", f"{slug}.png"), "PNG", optimize=True)
    cropped.save(os.path.join("public/assets/products", f"{slug}.png"), "PNG", optimize=True)
    cropped.save(os.path.join("public/assets/products", f"{slug}", "product.png"), "PNG", optimize=True)
    
    # Now generate the responsive SVG wrapping the transparent cutout
    with open(png_path, "rb") as f:
        b64_data = base64.b64encode(f.read()).decode("utf-8")
    
    cw, ch = cropped.size
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {cw} {ch}" width="{cw}" height="{ch}">
  <image width="{cw}" height="{ch}" href="data:image/png;base64,{b64_data}"/>
</svg>'''
    
    # Write to public/images/{slug}.svg and .svj
    for target in [
        f"public/images/{slug}.svg",
        f"public/images/{slug}.svj",
        f"public/assets/products/{slug}.svg",
        f"public/assets/products/{slug}.svj",
        f"public/assets/products/{slug}/product.svg",
    ]:
        os.makedirs(os.path.dirname(target), exist_ok=True)
        with open(target, "w", encoding="utf-8") as f:
            f.write(svg_content)
        print(f"  Written {target}", flush=True)

print("ALL 5 PRODUCTS PROCESSED WITH TRANSPARENT BACKGROUNDS!", flush=True)
