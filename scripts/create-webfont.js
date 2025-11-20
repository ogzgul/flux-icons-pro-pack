import fs from 'fs';
import path from 'path';
import svgtofont from 'svgtofont';
import SVGFixer from 'oslllo-svg-fixer';
import { icons } from '../lib/icons.js';

// Klasörler
const TEMP_RAW_DIR = path.resolve(process.cwd(), 'temp_raw');   // Ham çizgisel halleri
const TEMP_FIXED_DIR = path.resolve(process.cwd(), 'temp_fixed'); // Oyulmuş (Fixed) halleri
const FONT_OUTPUT_DIR = path.resolve(process.cwd(), 'dist-font'); // Final font çıktısı

// 1. ADIM: Ham SVG'leri dosyaya dök
async function prepareRawSvgs() {
  console.log('1. İkonlar hazırlanıyor...');
  
  // Temizlik
  if (fs.existsSync(TEMP_RAW_DIR)) fs.rmSync(TEMP_RAW_DIR, { recursive: true, force: true });
  if (fs.existsSync(TEMP_FIXED_DIR)) fs.rmSync(TEMP_FIXED_DIR, { recursive: true, force: true });
  
  fs.mkdirSync(TEMP_RAW_DIR, { recursive: true });
  fs.mkdirSync(TEMP_FIXED_DIR, { recursive: true });

  const iconNames = Object.keys(icons);
  
  iconNames.forEach(name => {
    let svgContent = icons[name];
    
    // İkon zaten dolu mu? (Markalar, Bayraklar vs.)
    const isSolid = svgContent.includes('stroke="none"') || 
                    (svgContent.includes('fill=') && !svgContent.includes('fill="none"'));
    
    if (isSolid) {
       // --- DOLU İKONLAR ---
       // Renkleri #000 (Siyah) yapıyoruz ki font motoru şekli tam algılasın.
       let cleanPath = svgContent.replace(/fill="[^"]*"/g, 'fill="#000000"');
       if (!cleanPath.includes('fill=')) {
           cleanPath = `<g fill="#000000">${cleanPath}</g>`;
       }
       // Dolu ikonları direkt fixed klasörüne at (İşlemeye gerek yok)
       fs.writeFileSync(path.join(TEMP_FIXED_DIR, `${name}.svg`), `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${cleanPath}</svg>`, 'utf-8');
    } else {
       // --- ÇİZGİSEL İKONLAR ---
       // Rengi SİYAH yapıyoruz. Fixer siyah çizgiyi algılayıp şekle çevirecek.
       const rawSvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgContent}</svg>`;
       fs.writeFileSync(path.join(TEMP_RAW_DIR, `${name}.svg`), rawSvg, 'utf-8');
    }
  });
  console.log(`✅ Ham dosyalar oluşturuldu.`);
}

// 2. ADIM: Çizgileri "Simit" gibi oymak (Stroke to Path)
async function fixOutlines() {
  console.log('2. Çizgiler şekle dönüştürülüyor (İçleri oyuluyor)...');
  console.log('   Bu işlem biraz sürebilir, lütfen bekle...');

  // .fix() metodu burada kullanılıyor
  const fixer = SVGFixer(TEMP_RAW_DIR, TEMP_FIXED_DIR, {
    showProgressBar: true,
    traceResolution: 600, 
  });

  try {
    await fixer.fix(); // <--- DÜZELTİLEN KISIM BURASI (.process yerine .fix)
    console.log('✅ Dönüştürme tamamlandı! Çizgiler artık oyuk birer şekil.');
  } catch (err) {
    console.error('❌ Dönüştürme hatası:', err);
    // Hata olsa bile font oluşturmaya devam etmesi için throw yapmıyoruz, 
    // ama fixed klasörü boş kalırsa font boş çıkar.
  }
}

// 3. ADIM: Fontu Oluştur
async function generateFont() {
  console.log('3. Font dosyaları paketleniyor...');

  await svgtofont({
    src: TEMP_FIXED_DIR, // İşlenmiş dosyaları kaynak alıyoruz
    dist: FONT_OUTPUT_DIR,
    fontName: "FluxIcons",
    css: true,
    outSVGReact: false,
    outSVGPath: false,
    emptyDist: true,
    classNamePrefix: 'flux-icon',
    svgicons2svgfont: {
      fontHeight: 1000,
      normalize: true,
      centerHorizontally: true,
      fixedWidth: true 
    }
  });

  console.log('✅ Font işlemi BİTTİ! dist-font klasörü hazır.');

  // Temizlik
  try {
      fs.rmSync(TEMP_RAW_DIR, { recursive: true, force: true });
      fs.rmSync(TEMP_FIXED_DIR, { recursive: true, force: true });
      console.log('✨ Geçici dosyalar temizlendi.');
  } catch (e) {}
}

(async () => {
  try {
    await prepareRawSvgs();
    await fixOutlines();
    await generateFont();
  } catch (error) {
    console.error('❌ Genel Hata:', error);
  }
})();