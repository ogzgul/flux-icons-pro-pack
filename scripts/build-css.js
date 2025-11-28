import fs from 'fs';
import path from 'path';
import { icons } from '../lib/icons.js';

const DIST_DIR = path.resolve(process.cwd(), 'dist-font');

// Renkli olması gereken ikonlar (Bunlar maske değil, direkt resim olacak)
const COLORED_TYPES = ['flag-', 'brand-', 'emoji-', 'crypto-', 'logo-','liquid-','avatar-'];

async function generateCssIcons() {
  console.log('🎨 CSS İkon Sistemi Oluşturuluyor (v3 - Final)...');

  // Temizlik ve Klasör Oluşturma
  if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true, force: true });
  fs.mkdirSync(DIST_DIR, { recursive: true });

 // Temel CSS ve Animasyonlar
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

/* --- FLUX ANIMATIONS (GÜÇLENDİRİLMİŞ & GENİŞLETİLMİŞ) --- */

/* 1. SHAKE (Güçlü Sallanma) */
@keyframes flux-shake {
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(-15deg); }
  40% { transform: rotate(15deg); }
  60% { transform: rotate(-10deg); }
  80% { transform: rotate(10deg); }
}
.flux-anim-shake { animation: flux-shake 0.5s ease-in-out infinite; }

/* 2. BEAT (Güçlü Kalp Atışı) */
@keyframes flux-beat {
  0%, 100% { transform: scale(1); }
  15% { transform: scale(1.25); }
  30% { transform: scale(1); }
  45% { transform: scale(1.15); }
  60% { transform: scale(1); }
}
.flux-anim-beat { animation: flux-beat 1.2s ease-in-out infinite; }

/* 3. BOUNCE (Yüksek Zıplama) */
@keyframes flux-bounce-y {
  0%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
  60% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); }
  70% { transform: translateY(-15%); }
}
.flux-anim-bounce-y { animation: flux-bounce-y 1s infinite; }

/* 4. POP (Patlama Efekti) */
@keyframes flux-pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.25); }
  100% { transform: scale(1); }
}
.flux-anim-pop { animation: flux-pop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite; }

/* 5. WIGGLE (Hızlı Titreme) */
@keyframes flux-wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(12deg); }
  75% { transform: rotate(-12deg); }
}
.flux-anim-wiggle { animation: flux-wiggle 0.3s ease-in-out infinite; }

/* 6. DRIVE (Sürüş) */
@keyframes flux-drive {
  0% { transform: translateX(0); }
  50% { transform: translateX(12px); }
  100% { transform: translateX(0); }
}
.flux-anim-drive { animation: flux-drive 1s ease-in-out infinite; }

/* 7. FLOAT (Süzülme) */
@keyframes flux-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.flux-anim-float { animation: flux-float 2s ease-in-out infinite; }

/* 8. SPIN PULSE */
@keyframes flux-spin-pulse {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
}
.flux-anim-spin-pulse { animation: flux-spin-pulse 1.5s linear infinite; }

/* 9. GLOW (Parlama) */
@keyframes flux-glow {
  0%, 100% { filter: drop-shadow(0 0 2px currentColor); opacity: 1; transform: scale(1); }
  50% { filter: drop-shadow(0 0 8px currentColor); opacity: 0.8; transform: scale(1.05); }
}
.flux-anim-glow { animation: flux-glow 2s ease-in-out infinite; }

/* 10. FLIP X */
@keyframes flux-flip-x {
  0% { transform: perspective(400px) rotateY(0); }
  100% { transform: perspective(400px) rotateY(360deg); }
}
.flux-anim-flip-x { animation: flux-flip-x 2.5s linear infinite; }

/* 11. FLIP Y */
@keyframes flux-flip-y {
  0% { transform: perspective(400px) rotateX(0); }
  100% { transform: perspective(400px) rotateX(360deg); }
}
.flux-anim-flip-y { animation: flux-flip-y 2.5s linear infinite; }

/* 12. TADA */
@keyframes flux-tada {
  0% { transform: scale(1); }
  10%, 20% { transform: scale(0.9) rotate(-3deg); }
  30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
  40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
  100% { transform: scale(1) rotate(0); }
}
.flux-anim-tada { animation: flux-tada 1.2s ease-in-out infinite; }

/* 13. RUBBER */
@keyframes flux-rubber {
  0% { transform: scale3d(1, 1, 1); }
  30% { transform: scale3d(1.25, 0.75, 1); }
  40% { transform: scale3d(0.75, 1.25, 1); }
  50% { transform: scale3d(1.15, 0.85, 1); }
  65% { transform: scale3d(0.95, 1.05, 1); }
  75% { transform: scale3d(1.05, 0.95, 1); }
  100% { transform: scale3d(1, 1, 1); }
}
.flux-anim-rubber { animation: flux-rubber 1s ease-in-out infinite; }

/* 14. SWING */
@keyframes flux-swing {
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(5deg); }
  80% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}
.flux-anim-swing { transform-origin: top center; animation: flux-swing 2s ease-in-out infinite; }

/* Global Spin (Basic) */
.flux-spin { animation: flux-spin-basic 1s linear infinite; }
@keyframes flux-spin-basic { 100% { transform: rotate(360deg); } }
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