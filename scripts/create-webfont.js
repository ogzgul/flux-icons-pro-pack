// create-webfont-css.js (veya istediğin isim)
import fs from 'fs';
import path from 'path';
import { icons } from '../lib/icons.js';

const DIST_DIR = path.resolve(process.cwd(), 'dist-font');

// Renkli olması gereken ikon türleri
const COLORED_TYPES = ['flag-', 'brand-', 'emoji-', 'crypto-', 'logo-'];

async function generateCssIcons() {
  console.log('🎨 CSS İkon Sistemi Oluşturuluyor...');

  // Klasörü temizle
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(DIST_DIR, { recursive: true });

  let cssContent = `
/* Flux Icons - CSS SVG System */
.flux-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
`;

  const iconNames = Object.keys(icons);
  let count = 0;

  iconNames.forEach((name) => {
    const rawSvg = icons[name];

    // Bu ikon renkli mi?
    const isColored =
      COLORED_TYPES.some((type) => name.includes(type)) ||
      (rawSvg.includes('fill=') &&
        !rawSvg.includes("fill='none'") &&
        !rawSvg.includes('fill="none"'));

    let fullSvg;

    if (isColored) {
      // === RENKLİ İKONLAR ===
      // Orijinal fill/stroke aynen kalsın
      fullSvg = rawSvg.startsWith('<svg')
        ? rawSvg
        : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${rawSvg}</svg>`;
    } else {
      // === ÇİZGİSEL / MONO İKONLAR ===
      // Outline görünümünü korumak için stroke'lu bir svg sarmalıyoruz
      let inner = rawSvg;

      if (rawSvg.trim().startsWith('<svg')) {
        inner = rawSvg
          .replace(/^<svg[^>]*>/i, '')
          .replace(/<\/svg>$/i, '');
      }

      fullSvg = `<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="black"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>${inner}</svg>`;
      // Mask kullanacağımız için burada rengin siyah/white olması önemli değil,
      // maske sadece alpha'yı kullanacak, rengi CSS'teki currentColor belirleyecek.
    }

    // SVG'yi data URI için encode et
    const encodedSvg = fullSvg
      .replace(/"/g, "'")
      .replace(/%/g, '%25')
      .replace(/#/g, '%23')
      .replace(/{/g, '%7B')
      .replace(/}/g, '%7D')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E');

    const dataUri = `data:image/svg+xml,${encodedSvg}`;

    if (isColored) {
      // --- RENKLİ MOD (arka plan beyaz, renkler olduğu gibi) ---
      cssContent += `
.flux-icon-${name} {
  background-color: #ffffff;
  background-image: url("${dataUri}");
}
`;
    } else {
      // --- OUTLINE / MONO MOD (mask + currentColor) ---
      cssContent += `
.flux-icon-${name} {
  background-color: currentColor;
  -webkit-mask-image: url("${dataUri}");
  mask-image: url("${dataUri}");
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
}
`;
    }

    count++;
  });

  fs.writeFileSync(path.join(DIST_DIR, 'FluxIcons.css'), cssContent, 'utf-8');
  console.log(`✅ ${count} ikon başarıyla CSS sistemine dönüştürüldü!`);
  console.log(`📁 Çıktı: dist-font/FluxIcons.css`);
}

generateCssIcons().catch((err) => {
  console.error('❌ CSS ikon üretim hatası:', err);
});
