import fs from 'fs';
import path from 'path';
import svgtofont from 'svgtofont';
import SVGFixer from 'oslllo-svg-fixer'; // Stroke -> Fill dönüştürücü
import { icons } from '../lib/icons.js';

// Klasör yolları
const TEMP_DIR = path.resolve(process.cwd(), 'temp_icons'); // Ham dosyalar
const SVG_SOURCE_DIR = path.resolve(process.cwd(), 'svg_source'); // Düzeltilmişler
const FONT_OUTPUT_DIR = path.resolve(process.cwd(), 'dist-font'); // Font çıktısı

// 1. Adım: Ham SVG'leri Geçici Klasöre Yaz
async function writeRawSvgs() {
  console.log('1. Ham ikonlar hazırlanıyor...');
  
  // Temizlik
  if (fs.existsSync(TEMP_DIR)) fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  if (fs.existsSync(SVG_SOURCE_DIR)) fs.rmSync(SVG_SOURCE_DIR, { recursive: true, force: true });
  
  fs.mkdirSync(TEMP_DIR, { recursive: true });
  fs.mkdirSync(SVG_SOURCE_DIR, { recursive: true });

  const iconNames = Object.keys(icons);
  
  iconNames.forEach(name => {
    const rawPath = icons[name];
    let svgContent = '';

    // Marka/Dolu ikon kontrolü
    const isSolid = rawPath.includes('stroke="none"') || 
                    (rawPath.includes('fill=') && !rawPath.includes('fill="none"'));

    if (isSolid) {
       // Dolu ikonlar (Siyah renk zorlamasıyla)
       let cleanPath = rawPath.replace(/fill="[^"]*"/g, 'fill="#000000"');
       if (!cleanPath.includes('fill=')) cleanPath = `<g fill="#000000">${cleanPath}</g>`;
       svgContent = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${cleanPath}</svg>`;
    } else {
       // Çizgisel ikonlar (Siyah stroke ile)
       // DİKKAT: Fixer'ın algılaması için stroke-width ve renk net olmalı
       svgContent = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${rawPath}</svg>`;
    }

    fs.writeFileSync(path.join(TEMP_DIR, `${name}.svg`), svgContent, 'utf-8');
  });

  console.log(`✅ ${iconNames.length} adet ham ikon yazıldı.`);
}

// 2. Adım: SVG Fixer ile Stroke -> Fill Dönüşümü
async function fixSvgs() {
  console.log('2. Stroke -> Outline dönüşümü yapılıyor (Bu işlem 1-2 dk sürebilir)...');
  
  // DÜZELTME: 'new' kaldırıldı ve .fix() metodu kullanıldı
  const fixer = SVGFixer(TEMP_DIR, SVG_SOURCE_DIR, {
    showProgressBar: true, // İlerleme çubuğu göster
    traceResolution: 600, // Kalite ayarı (Yüksek tutarsak işlem uzar, 600 ideal)
  });

  try {
    await fixer.fix(); // <--- .process() YERİNE .fix() OLDU
    console.log('✅ Dönüşüm tamamlandı! Çizgiler artık şekil oldu.');
  } catch (err) {
    console.error('Dönüştürme hatası:', err);
  }
}

// 3. Adım: Font Oluşturma
async function generateFont() {
  console.log('3. Font dosyaları oluşturuluyor...');

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
      fixedWidth: true 
    }
  });

  console.log('✅ Font işlemi tamamlandı!');

  // Temizlik
  try {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
      fs.rmSync(SVG_SOURCE_DIR, { recursive: true, force: true });
      console.log('✨ Geçici dosyalar temizlendi.');
  } catch (e) {}
}

(async () => {
  try {
    await writeRawSvgs();
    await fixSvgs();
    await generateFont();
  } catch (error) {
    console.error('❌ Hata:', error);
  }
})();