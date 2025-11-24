import fs from 'fs';
import path from 'path';
import { icons } from '../lib/icons.js';

const DIST_DIR = path.resolve(process.cwd(), 'dist-font');

// Renkli olması gereken ikonlar (Bunlar maske değil, direkt resim olacak)
const COLORED_TYPES = ['flag-', 'brand-', 'emoji-', 'crypto-', 'logo-','liquid-'];

async function generateCssIcons() {
  console.log('🎨 CSS İkon Sistemi Oluşturuluyor (v3 - Final)...');

  // Temizlik ve Klasör Oluşturma
  if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true, force: true });
  fs.mkdirSync(DIST_DIR, { recursive: true });

  // Temel CSS
  let cssContent = `
/* Flux Icons - Universal CSS */
.flux-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  content: ''; /* İçi boş olsa bile görünsün */
}

/* Boyutlandırma Yardımcıları */
.flux-lg { font-size: 1.33em; }
.flux-xl { font-size: 1.5em; }
.flux-2x { font-size: 2em; }
.flux-3x { font-size: 3em; }
.flux-spin { animation: flux-spin 2s infinite linear; }

@keyframes flux-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

  const iconNames = Object.keys(icons);
  let count = 0;

  iconNames.forEach(name => {
    let rawSvg = icons[name];

    // Bu ikon renkli mi?
    const isColored = COLORED_TYPES.some(t => name.includes(t)) || 
                      (rawSvg.includes('fill=') && !rawSvg.includes('fill="none"'));

    // SVG'yi standart hale getir
    if (!rawSvg.trim().startsWith('<svg')) {
        // Çizgisel ikonlar için varsayılan özellikler
        const strokeAttr = isColored ? '' : 'fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"';
        rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ${strokeAttr}>${rawSvg}</svg>`;
    }

    // URL Encode işlemi (CSS içinde çalışması için şart)
    // # karakterini %23'e çevirmek çok önemlidir!
    const encodedSvg = rawSvg
        .replace(/"/g, "'")
        .replace(/>\s+</g, "><")
        .replace(/\s+/g, " ")
        .replace(/%/g, "%25")
        .replace(/#/g, "%23")
        .replace(/{/g, "%7B")
        .replace(/}/g, "%7D")
        .replace(/</g, "%3C")
        .replace(/>/g, "%3E");

    const dataUri = `data:image/svg+xml,${encodedSvg}`;

    if (isColored) {
      // --- RENKLİ İKON (Arkaplan Resmi) ---
      // Rengi değişmez, olduğu gibi görünür.
      cssContent += `
.flux-icon-${name} {
  background-image: url("${dataUri}");
}`;
    } else {
      // --- ÇİZGİSEL İKON (Maske) ---
      // currentColor ile boyanabilir.
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

  // Dosyayı Yaz (Küçük harf standardı)
  fs.writeFileSync(path.join(DIST_DIR, 'flux-icons.css'), cssContent, 'utf-8');
  
  // Uyumluluk için büyük harflisini de oluştur (Eski linkler kırılmasın)
  fs.writeFileSync(path.join(DIST_DIR, 'FluxIcons.css'), cssContent, 'utf-8');

  console.log(`✅ ${count} ikon başarıyla CSS'e dönüştürüldü!`);
}

generateCssIcons();