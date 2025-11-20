import fs from 'fs';
import path from 'path';
import { icons } from '../lib/icons.js';

const DIST_DIR = path.resolve(process.cwd(), 'dist-font');

// Renkli olması gereken ikonların listesi (Otomatik algılamaya ek olarak)
// Bu kelimeleri içeren ikonlar "Background Image" olarak işlenir (Rengi bozulmaz)
const COLORED_TYPES = ['flag-', 'brand-', 'emoji-', 'crypto-', 'logo-'];

async function generateCssIcons() {
  console.log('🎨 CSS İkon Sistemi Oluşturuluyor...');

  // Klasör temizliği
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(DIST_DIR, { recursive: true });

  let cssContent = `
/* Flux Icons - Modern CSS SVG System */
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

  iconNames.forEach(name => {
    const rawSvg = icons[name];
    
    // SVG'yi CSS içinde kullanılabilecek hale getir (Encode)
    // 1. SVG tagi yoksa ekle
    let fullSvg = rawSvg.startsWith('<svg') 
        ? rawSvg 
        : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${rawSvg}</svg>`;

    // 2. Data URI'ye çevir
    const encodedSvg = fullSvg
        .replace(/"/g, "'")
        .replace(/%/g, '%25')
        .replace(/#/g, '%23')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E');

    const dataUri = `data:image/svg+xml,${encodedSvg}`;

    // KONTROL: Bu ikon renkli mi olmalı, yoksa CSS ile boyanabilir mi olmalı?
    // Eğer 'flag-', 'brand-' vb. ile başlıyorsa RENKLİ kalmalı.
    // Veya içinde 'fill=' var ve 'fill="none"' değilse.
    const isColored = COLORED_TYPES.some(type => name.includes(type)) || 
                      (rawSvg.includes('fill=') && !rawSvg.includes("fill='none'") && !rawSvg.includes('fill="none"'));

    if (isColored) {
        // --- RENKLİ MOD (Background Image) ---
        // Orijinal renkleri korur, 'color: red' işe yaramaz.
        cssContent += `
.flux-icon-${name} {
  background-image: url("${dataUri}");
}`;
    } else {
        // --- BOYANAİLİR MOD (Mask Image) ---
        // 'color: blue' dersen ikon mavi olur. Çizgisel ikonlar için.
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
}`;
    }
    count++;
  });

  // CSS Dosyasını Yaz
  fs.writeFileSync(path.join(DIST_DIR, 'FluxIcons.css'), cssContent, 'utf-8');
  console.log(`✅ ${count} ikon başarıyla CSS sistemine dönüştürüldü!`);
  console.log(`📁 Çıktı: dist-font/FluxIcons.css`);
}

generateCssIcons();