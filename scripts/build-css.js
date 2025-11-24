import fs from 'fs';
import path from 'path';
import { icons } from '../lib/icons.js';

const DIST_DIR = path.resolve(process.cwd(), 'dist-font');

// SADECE bu kelimeleri içerenler "Orijinal Renkli" kalacak (CSS color ile değişmez)
// Geri kalan her şey (fill, solid dahil) CSS color ile değişebilir olacak.
const TRULY_COLORED_TYPES = [
    'liquid-', 
    'flag-', 
    'brand-original', // Eğer orijinal marka renkleri varsa
    'sticker-', 
    'emoji-',
    'illustration-'
];

async function generateCssIcons() {
  console.log('🎨 CSS İkon Sistemi Oluşturuluyor (Color Fix)...');

  // Klasör temizliği
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
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
  content: '';
}

/* Yardımcılar */
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

    // 1. KONTROL: Bu ikon gerçekten renkli bir resim mi?
    // Sadece listemizde tanımlı olanlar "Renkli Resim" muamelesi görecek.
    const isTrulyColored = TRULY_COLORED_TYPES.some(type => name.includes(type));

    let fullSvg;

    if (isTrulyColored) {
        // === RENKLİ İKONLAR (Liquid, Bayrak vb.) ===
        // Olduğu gibi bırak, hiçbir şeye dokunma.
        fullSvg = rawSvg.trim().startsWith('<svg') 
            ? rawSvg 
            : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${rawSvg}</svg>`;
    } else {
        // === BOYANABİLİR İKONLAR (Outline, Solid, Fill, Striped) ===
        // Bunların maske olarak çalışabilmesi için renginin SİYAH olması lazım.
        // CSS 'color' özelliği daha sonra bu maskeyi boyayacak.
        
        let inner = rawSvg;
        // SVG etiketlerini temizle, sadece path kalsın
        if (rawSvg.trim().startsWith('<svg')) {
            inner = rawSvg.replace(/^<svg[^>]*>/i, '').replace(/<\/svg>$/i, '');
        }

        // Rengi zorla SİYAH (#000) yap. 
        // Maskeleme mantığında Siyah = Görünür Alan, Şeffaf = Gizli Alan demektir.
        // Mevcut fill/stroke renklerini siyaha çeviriyoruz.
        inner = inner.replace(/currentColor/g, 'black');
        
        // Eğer içinde hiç renk tanımı yoksa varsayılanları ekle
        // Solid/Fill ikonlar için fill="black", Outline için stroke="black"
        let svgAttrs = 'viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"';
        
        // Eğer ikonun içinde "fill" geçmiyorsa ve "stroke" geçmiyorsa (Çok nadir)
        if (!inner.includes('fill=') && !inner.includes('stroke=')) {
             svgAttrs += ' fill="black"'; 
        } else if (inner.includes('stroke=') && !inner.includes('fill=')) {
             // Çizgisel ikon
             svgAttrs += ' fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
        }
        // Not: Zaten fill varsa (Solid ikonlar), yukarıdaki replace('currentColor', 'black') işi çözdü.

        fullSvg = `<svg ${svgAttrs}>${inner}</svg>`;
    }

    // URL Encode (Veri sıkıştırma ve uyumluluk için)
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
      // RENKLİ MOD (Resim gibi davranır, CSS color etkilemez)
      cssContent += `
.flux-icon-${name} {
  background-image: url("${dataUri}");
}`;
    } else {
      // MASKE MODU (Yazı gibi davranır, CSS color ile boyanır)
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

  // Dosyaları Yaz
  fs.writeFileSync(path.join(DIST_DIR, 'FluxIcons.css'), cssContent, 'utf-8'); // Standart
  fs.writeFileSync(path.join(DIST_DIR, 'flux-icons.css'), cssContent, 'utf-8'); // Küçük harf (Best practice)

  console.log(`✅ ${count} ikon işlendi.`);
  console.log(`✨ 'fill' ve 'solid' ikonlar artık renklendirilebilir!`);
}

generateCssIcons().catch((err) => {
  console.error('❌ Hata:', err);
});