import fs from 'fs';
import path from 'path';
import svgtofont from 'svgtofont';
import outlineStroke from 'svg-outline-stroke'; // Bunu yüklemiştik
import { icons } from '../lib/icons.js';

const SVG_SOURCE_DIR = path.resolve(process.cwd(), 'svg_source');
const FONT_OUTPUT_DIR = path.resolve(process.cwd(), 'dist-font');

async function extractSvgs() {
  console.log('1. İkonlar işleniyor ve şekle dönüştürülüyor (Bu biraz sürebilir)...');
  
  if (fs.existsSync(SVG_SOURCE_DIR)) {
    fs.rmSync(SVG_SOURCE_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(SVG_SOURCE_DIR, { recursive: true });

  const iconNames = Object.keys(icons);
  let count = 0;

  for (const name of iconNames) {
    const rawPath = icons[name];
    let finalSvgContent = '';

    // Eğer ikon "Dolu/Marka" ikonuysa dokunma
    if (rawPath.includes('stroke="none"') || rawPath.includes("stroke='none'") || rawPath.includes('fill="currentColor"')) {
       finalSvgContent = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${rawPath}</svg>`;
    } 
    // Eğer ikon "Çizgisel" ise, çizgiyi şekle (outline) çevir
    else {
      // Çizgi kalınlığını ve rengini net belirtiyoruz
      const tempSvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${rawPath}</svg>`;
      
      try {
        // DÜZELTME: outlineStroke parametreleri
        // optCurve: false (Daha keskin çizgiler için)
        // step: 100 (Daha hassas dönüşüm)
        finalSvgContent = await outlineStroke(tempSvg, { optCurve: false, step: 100, centerHorizontally: true });
      } catch (err) {
        console.error(`Hata: ${name} dönüştürülemedi.`, err);
        finalSvgContent = tempSvg;
      }
    }

    const fileName = `${name}.svg`;
    fs.writeFileSync(path.join(SVG_SOURCE_DIR, fileName), finalSvgContent, 'utf-8');
    count++;
    
    if (count % 100 === 0) console.log(`   ...${count} ikon işlendi.`);
  }

  console.log(`✅ ${count} adet ikon başarıyla şekle dönüştürüldü.`);
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
      centerHorizontally: true,
      // Bu ayar font oluşturucunun şekilleri birleştirmesini sağlar
      fixedWidth: true 
    }
  });

  console.log('✅ Font işlemi tamamlandı! dist-font klasörünü kontrol et.');

  try {
      fs.rmSync(SVG_SOURCE_DIR, { recursive: true, force: true });
      console.log('✨ Temizlik yapıldı.');
  } catch (e) {}
}

(async () => {
  try {
    await extractSvgs();
    await generateFont();
  } catch (error) {
    console.error('❌ Kritik Hata:', error);
  }
})();