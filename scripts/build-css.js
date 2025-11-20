import fs from 'fs';
import path from 'path';
import { icons } from '../lib/icons.js';

const DIST_DIR = path.resolve(process.cwd(), 'dist-font');

// Renkli olması gereken (Maske uygulanmayacak) ikon türleri
const COLORED_TYPES = ['flag-', 'brand-', 'emoji-', 'crypto-', 'logo-'];

async function generateCssIcons() {
  console.log('🎨 Modern CSS İkon Sistemi Oluşturuluyor (SVG Data URI)...');

  // 1. Klasörü temizle ve oluştur
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(DIST_DIR, { recursive: true });

  // 2. Temel CSS Yapısı
  let cssContent = `
/* Flux Icons - Modern SVG CSS System */
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

    // Bu ikon renkli mi kalmalı? (Bayraklar, Markalar vs.)
    const isColored =
      COLORED_TYPES.some((type) => name.includes(type)) ||
      (rawSvg.includes('fill=') && !rawSvg.includes("fill='none'") && !rawSvg.includes('fill="none"'));

    let fullSvg;

    if (isColored) {
      // === RENKLİ İKONLAR ===
      // Olduğu gibi al, renkleri koru.
      fullSvg = rawSvg.startsWith('<svg')
        ? rawSvg
        : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${rawSvg}</svg>`;
    } else {
      // === ÇİZGİSEL / MONO İKONLAR ===
      // CSS Mask yöntemi için SVG'nin rengi SİYAH (#000) olmalıdır.
      // Maskeleme, siyah alanları "görünür", şeffaf alanları "gizli" yapar.
      // Sonra biz CSS ile background-color verince ikon o renge bürünür.
      
      let inner = rawSvg;
      // Eğer ham veri <svg> ile başlıyorsa içini çıkaralım
      if (rawSvg.trim().startsWith('<svg')) {
        inner = rawSvg.replace(/^<svg[^>]*>/i, '').replace(/<\/svg>$/i, '');
      }

      // Standart bir çerçeveye oturt ve rengi siyah yap
      fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
    }

    // SVG'yi Data URI formatına çevir (URL Encode)
    const encodedSvg = fullSvg
      .replace(/"/g, "'")
      .replace(/%/g, '%25')
      .replace(/#/g, '%23')
      .replace(/{/g, '%7B')
      .replace(/}/g, '%7D')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E')
      .replace(/\s+/g, ' '); // Fazla boşlukları sil

    const dataUri = `data:image/svg+xml,${encodedSvg}`;

    if (isColored) {
      // --- RENKLİ MOD (Background Image) ---
      // Renk değişmez, orijinali görünür.
      cssContent += `
.flux-icon-${name} {
  background-image: url("${dataUri}");
}
`;
    } else {
      // --- MASKE MODU (Mask Image) ---
      // Rengi CSS 'color' özelliğinden alır.
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

  // Dosyayı yaz (Küçük harfle flux-icons.css)
  fs.writeFileSync(path.join(DIST_DIR, 'flux-icons.css'), cssContent, 'utf-8');
  // Uyumluluk için büyük harflisini de oluşturabilirsin istersen
  fs.writeFileSync(path.join(DIST_DIR, 'FluxIcons.css'), cssContent, 'utf-8');

  console.log(`✅ ${count} ikon başarıyla CSS sistemine dönüştürüldü!`);
  console.log(`📁 Çıktı: dist-font/FluxIcons.css`);
}

generateCssIcons().catch((err) => {
  console.error('❌ Hata:', err);
});