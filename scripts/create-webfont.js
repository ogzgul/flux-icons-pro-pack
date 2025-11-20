import fs from 'fs';
import path from 'path';
import svgtofont from 'svgtofont';
import outlineStroke from 'svg-outline-stroke';
import { icons } from '../lib/icons.js';

const SVG_SOURCE_DIR = path.resolve(process.cwd(), 'svg_source');
const FONT_OUTPUT_DIR = path.resolve(process.cwd(), 'dist-font');

async function extractSvgs() {
  console.log('1. İkonlar işleniyor ve Stroke -> Path dönüşümü yapılıyor...');
  
  if (fs.existsSync(SVG_SOURCE_DIR)) {
    fs.rmSync(SVG_SOURCE_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(SVG_SOURCE_DIR, { recursive: true });

  const iconNames = Object.keys(icons);
  let count = 0;

  for (const name of iconNames) {
    const rawPath = icons[name];
    let finalSvgContent = '';

    // KONTROL: İkon zaten dolu mu? (Markalar vs.)
    const isSolid = rawPath.includes('stroke="none"') || 
                    (rawPath.includes('fill=') && !rawPath.includes('fill="none"'));

    if (isSolid) {
       // Dolu ikonları olduğu gibi al ama rengi siyah yap (Font için siyah şart)
       // currentColor veya hex renklerini siyaha çeviriyoruz ki font motoru algılasın.
       let cleanPath = rawPath.replace(/fill="[^"]*"/g, 'fill="#000000"');
       if (!cleanPath.includes('fill=')) {
           cleanPath = `<g fill="#000000">${cleanPath}</g>`;
       }
       finalSvgContent = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${cleanPath}</svg>`;
    } 
    else {
      // ÇİZGİSEL İKONLAR İÇİN DÖNÜŞÜM
      // 1. Önce siyah stroke ile ham bir SVG oluşturuyoruz.
      const tempSvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${rawPath}</svg>`;
      
      try {
        // 2. outlineStroke ile çizgiyi şekle (path'e) çeviriyoruz.
        // color: 'black' font motorunun şekli görmesi için kritiktir.
        finalSvgContent = await outlineStroke(tempSvg, { 
            optCurve: true, 
            step: 4, 
            centerHorizontally: false, // Kaymayı önlemek için kapattım
            fixedWidth: false, // Oran bozulmasın diye kapattım
            color: '#000000' 
        });
      } catch (err) {
        console.error(`Hata: ${name} dönüştürülemedi, orjinali kullanılıyor.`, err);
        finalSvgContent = tempSvg;
      }
    }

    const fileName = `${name}.svg`;
    fs.writeFileSync(path.join(SVG_SOURCE_DIR, fileName), finalSvgContent, 'utf-8');
    count++;
  }
  console.log(`✅ ${count} ikon svg_source klasörüne çıkarıldı.`);
}

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
  console.log('✅ Font işlemi tamamlandı!');
  
  // Temizlik yapmıyoruz ki klasörü kontrol edebil.
  // fs.rmSync(SVG_SOURCE_DIR, { recursive: true, force: true });
}

(async () => {
  try {
    await extractSvgs();
    await generateFont();
  } catch (error) {
    console.error('❌ Kritik Hata:', error);
  }
})();