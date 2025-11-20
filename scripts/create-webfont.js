// scripts/create-webfont.js
import fs from 'fs';
import path from 'path';
import svgtofont from 'svgtofont';
import outlineStroke from 'svg-outline-stroke'; // Bu paketin yüklü olduğundan emin ol
import { icons } from '../lib/icons.js';

const SVG_SOURCE_DIR = path.resolve(process.cwd(), 'svg_source');
const FONT_OUTPUT_DIR = path.resolve(process.cwd(), 'dist-font');

// 1. İndirme ve Dönüştürme (Outline) İşlemi
async function extractSvgs() {
  console.log('1. İkonlar işleniyor ve Stroke -> Path dönüşümü yapılıyor...');
  
  // Klasör temizliği
  if (fs.existsSync(SVG_SOURCE_DIR)) {
    fs.rmSync(SVG_SOURCE_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(SVG_SOURCE_DIR, { recursive: true });

  const iconNames = Object.keys(icons);
  let count = 0;

  // Asenkron döngü
  for (const name of iconNames) {
    const rawPath = icons[name];
    let finalSvgContent = '';

    // KONTROL: İkon zaten dolu mu? (Brand ikonları veya solid olanlar)
    // Eğer path içinde 'stroke="none"' veya 'fill=' (none hariç) varsa dokunma.
    const isSolid = rawPath.includes('stroke="none"') || (rawPath.includes('fill=') && !rawPath.includes('fill="none"'));

    if (isSolid) {
       // Dolu ikonları olduğu gibi al, sadece sarmala
       finalSvgContent = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${rawPath}</svg>`;
    } 
    else {
      // Çizgisel ikonları "Outline" işlemine sok (Çizgiyi şekle çevir)
      // Önce geçici bir SVG oluşturuyoruz (Siyah stroke ile)
      const tempSvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${rawPath}</svg>`;
      
      try {
        // SİHİRLİ DOKUNUŞ: Çizgileri şekle çevirir
        finalSvgContent = await outlineStroke(tempSvg, { 
            optCurve: false, // Eğrileri bozma
            step: 4, // Hassasiyet
            centerHorizontally: true,
            fixedWidth: true,
            color: 'black' // Fontlar rengi CSS'ten alır, burada siyah bazdır
        });
      } catch (err) {
        console.error(`Hata: ${name} dönüştürülemedi, orjinali kullanılıyor.`, err);
        finalSvgContent = tempSvg;
      }
    }

    const fileName = `${name}.svg`;
    fs.writeFileSync(path.join(SVG_SOURCE_DIR, fileName), finalSvgContent, 'utf-8');
    count++;
    
    // Konsolu kilitlememek için ara sıra bilgi ver
    if (count % 200 === 0) console.log(`   ...${count} ikon işlendi.`);
  }

  console.log(`✅ ${count} adet ikon başarıyla işlendi.`);
}

// 2. Font Oluşturma
async function generateFont() {
  console.log('2. Font dosyaları oluşturuluyor...');

  await svgtofont({
    src: SVG_SOURCE_DIR,
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
      centerHorizontally: true
    }
  });

  console.log('✅ Font işlemi tamamlandı! dist-font klasörünü kontrol et.');

  // Temizlik
  try {
      fs.rmSync(SVG_SOURCE_DIR, { recursive: true, force: true });
      console.log('✨ Geçici SVG klasörü temizlendi.');
  } catch (e) {}
}

// Başlat
(async () => {
  try {
    await extractSvgs();
    await generateFont();
  } catch (error) {
    console.error('❌ Kritik Hata:', error);
  }
})();