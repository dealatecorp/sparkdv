import fs from 'fs';
import path from 'path';

const sourceDir = 'product photos';

const mapping = [
  {
    src: 'Nanion Elite Pro Mint Toothpaste.png',
    destBase: 'nanion-elite-pro',
    slug: 'nanion-elite-pro',
  },
  {
    src: 'Nanion Elite Toothpaste Packaging Mockup.png',
    destBase: 'nanion-elite',
    slug: 'nanion-elite',
  },
  {
    src: 'Nanion Lite Toothpaste Packaging.png',
    destBase: 'nanion-lite',
    slug: 'nanion-lite',
  },
  {
    src: 'NANION Pro PLUS Strawberry Gummies.png',
    destBase: 'nanion-pro-plus-gummies',
    slug: 'nanion-pro-plus-gummies',
  },
  {
    src: 'Nanion Swish Mouthwash Bottle (1).png',
    destBase: 'nanion-swish',
    slug: 'nanion-swish',
  },
];

const targetDirs = [
  'public/images',
  'public/images/products',
  'public/assets/products',
];

targetDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

for (const item of mapping) {
  const filePath = path.join(sourceDir, item.src);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing file: ${filePath}`);
    continue;
  }

  const buf = fs.readFileSync(filePath);
  let width = 1000;
  let height = 1000;

  if (buf.toString('ascii', 1, 4) === 'PNG') {
    width = buf.readUInt32BE(16);
    height = buf.readUInt32BE(20);
  }

  const base64 = buf.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <image width="${width}" height="${height}" href="data:image/png;base64,${base64}" />
</svg>`;

  for (const dir of targetDirs) {
    // Write .svg
    fs.writeFileSync(path.join(dir, `${item.destBase}.svg`), svgContent);
    // Write .svj as requested by user
    fs.writeFileSync(path.join(dir, `${item.destBase}.svj`), svgContent);
    // Write .png copy for fallback
    fs.writeFileSync(path.join(dir, `${item.destBase}.png`), buf);
  }

  console.log(`Converted ${item.src} -> ${item.destBase}.svg (${width}x${height})`);
}

console.log('Conversion complete!');

