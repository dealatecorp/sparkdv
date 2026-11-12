import sharp from 'sharp';
import fs from 'fs';

async function makeLogo() {
  const { data, info } = await sharp('public/images/logo.png').raw().toBuffer({ resolveWithObject: true });
  const cx = 396.5;
  const cy = 380.5;
  const r = 353.5;
  
  // Create a 708x708 transparent image
  const size = 708;
  const outBuf = Buffer.alloc(size * size * 4);
  
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const srcX = Math.round(x + cx - size / 2);
      const srcY = Math.round(y + cy - size / 2);
      const outIdx = (y * size + x) * 4;
      
      const dx = x - size / 2;
      const dy = y - size / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist <= r && srcX >= 0 && srcX < info.width && srcY >= 0 && srcY < info.height) {
        const srcIdx = (srcY * info.width + srcX) * 4;
        outBuf[outIdx] = data[srcIdx];
        outBuf[outIdx + 1] = data[srcIdx + 1];
        outBuf[outIdx + 2] = data[srcIdx + 2];
        
        // Anti-alias outer circular edge
        if (dist > r - 2) {
          const alphaFactor = Math.max(0, Math.min(1, (r - dist) / 2));
          outBuf[outIdx + 3] = Math.round(data[srcIdx + 3] * alphaFactor);
        } else {
          outBuf[outIdx + 3] = data[srcIdx + 3];
        }
      } else {
        outBuf[outIdx] = 0;
        outBuf[outIdx + 1] = 0;
        outBuf[outIdx + 2] = 0;
        outBuf[outIdx + 3] = 0;
      }
    }
  }
  
  const pngBuffer = await sharp(outBuf, { raw: { width: size, height: size, channels: 4 } }).png().toBuffer();
  fs.writeFileSync('public/images/logo-circle.png', pngBuffer);
  fs.writeFileSync('public/images/logo.png', pngBuffer);
  
  const b64 = pngBuffer.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <clipPath id="sparkLogoCircle">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 1}" />
    </clipPath>
  </defs>
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 1}" fill="#ffffff" />
  <image href="data:image/png;base64,${b64}" width="${size}" height="${size}" clip-path="url(#sparkLogoCircle)" />
</svg>`;

  fs.writeFileSync('public/images/logo.svg', svgContent);
  console.log('Successfully generated public/images/logo.svg and public/images/logo.png with clean circular mask!');
}

makeLogo().catch(console.error);
