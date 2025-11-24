import fs from 'fs';
import path from 'path';
import { icons } from '../lib/icons.js';

const DIST_DIR = path.resolve(process.cwd(), 'dist-font');

// BU LİSTE ÇOK ÖNEMLİ!
// Sadece buradaki kelimeleri içeren ikonlar "Resim" gibi davranır (Rengi değişmez).
// Geriye kalan HER ŞEY (backspace-fill dahil) "Maske" gibi davranır (Rengi değişir).
const TRULY_COLORED_TYPES = [
    'liquid-', 
    'flag-', 
    'sticker-', 
    'emoji-',       // Eğer sarı yüzlü emojilerse buraya, değilse çıkar
    'illustration-'
];

async function generateCssIcons() {
  console.log('🎨 CSS İkon Sistemi Oluşturuluyor (Color Fix v2)...');

  if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true, force: true });
  fs.mkdirSync(DIST_DIR, { recursive: true });

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
  content: '';
}

/* Yardımcılar */
.flux-spin { animation: flux-spin 2s infinite linear; }
@keyframes flux-spin { 100% { transform: rotate(360deg); } }
`;

  const iconNames = Object.keys(icons);
  let count = 0;

  iconNames.forEach(name => {
    let rawSvg = icons[name];

    // 1. KARAR MEKANİZMASI: Bu ikon özel renkli mi?
    const isTrulyColored = TRULY_COLORED_TYPES.some(type => name.includes(type));

    let fullSvg;

    if (isTrulyColored) {
        // === RENKLİ İKONLAR (Resim Modu) ===
        // Orijinal renklerini koru. Dokunma.
        fullSvg = rawSvg.trim().startsWith('<svg') 
            ? rawSvg 
            : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${rawSvg}</svg>`;
    } else {
        // === BOYANABİLİR İKONLAR (Maske Modu) ===
        // Solid, Fill, Outline, Brand... Hepsi buraya girer.
        // Maske çalışması için ikonun SİMAH olması şarttır.
        
        let inner = rawSvg;
        if (rawSvg.trim().startsWith('<svg')) {
            inner = rawSvg.replace(/^<svg[^>]*>/i, '').replace(/<\/svg>$/i, '');
        }

        // Rengi siyaha zorla (Maske için)
        // currentColor'ı siyaha çevir
        inner = inner.replace(/currentColor/g, 'black');
        
        // Eğer içinde hiç renk yoksa, varsayılan olarak siyah ekle
        let svgAttrs = 'viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"';
        if (!inner.includes('fill=') && !inner.includes('stroke=')) {
             svgAttrs += ' fill="black"'; 
        } else if (inner.includes('stroke=') && !inner.includes('fill=')) {
             svgAttrs += ' fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
        }

        fullSvg = `<svg ${svgAttrs}>${inner}</svg>`;
    }

    // URL Encode
    const encodedSvg = fullSvg
      .replace(/"/g, "'")
      .replace(/%/g, '%25')
      .replace(/#/g, '%23')
      .replace(/{/g, '%7B')
      .replace(/}/g, '%7D')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E')
      .replace(/\s+/g, ' ');

    const dataUri = `data:image/svg+xml,${encodedSvg}`;

    if (isTrulyColored) {
      // RENKLİ (Değişmez)
      cssContent += `.flux-icon-${name} { background-image: url("${dataUri}"); }\n`;
    } else {
      // MASKE (Rengi Değişir - background-color: currentColor sayesinde)
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
}\n`;
    }
    count++;
  });

  fs.writeFileSync(path.join(DIST_DIR, 'FluxIcons.css'), cssContent, 'utf-8');
  fs.writeFileSync(path.join(DIST_DIR, 'flux-icons.css'), cssContent, 'utf-8');

  console.log(`✅ ${count} ikon işlendi.`);
}

generateCssIcons();