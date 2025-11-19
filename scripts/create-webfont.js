// scripts/create-webfont.js
import fs from 'fs';
import path from 'path';
import svgtofont from 'svgtofont';
import { icons } from '../lib/icons.js'; // İkon verilerini buradan alıyoruz

// Çıkarma klasörlerini tanımla
const SVG_SOURCE_DIR = path.resolve(process.cwd(), 'svg_source');
const FONT_OUTPUT_DIR = path.resolve(process.cwd(), 'dist-font');

// 1. İndirme (Extraction) İşlemi
function extractSvgs() {
  console.log('1. JS Objesinden SVG Dosyalarına Çıkarılıyor...');
  
  // Eski klasörü temizle veya oluştur
  if (fs.existsSync(SVG_SOURCE_DIR)) {
    fs.rmSync(SVG_SOURCE_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(SVG_SOURCE_DIR, { recursive: true });

  const iconNames = Object.keys(icons);
  let count = 0;
  
  iconNames.forEach(name => {
    // svgtofont sadece path istiyor. Bizimkiler zaten sadece path'ten oluşuyor.
    // Ancak her path'i bir <svg> etiketi içine sarmalamalıyız.
    const svgPath = icons[name];
    
    // SVG Path'lerini 24x24 viewBox içine sarmala
    const wrappedSvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${svgPath}</svg>`;

    const fileName = `${name}.svg`;
    fs.writeFileSync(path.join(SVG_SOURCE_DIR, fileName), wrappedSvg, 'utf-8');
    count++;
  });

  console.log(`✅ ${count} adet ikon dosyaya başarıyla çıkarıldı.`);
}

// 2. Fonta Dönüştürme (Generation) İşlemi
async function generateFont() {
  console.log('2. SVG Dosyaları Fonta Dönüştürülüyor...');

  await svgtofont({
    src: SVG_SOURCE_DIR, // SVGLERİN KAYNAĞI
    dist: FONT_OUTPUT_DIR, // FONT ÇIKTISI
    fontName: "FluxIcons",
    css: true, // CSS dosyası oluştur
    outSVGReact: false,
    emptyDist: true,
    styleTemplates: path.join(process.cwd(), 'scripts/templates'), // Özel şablonlar
    // İkon sınıf adı öneki (iç CSS'te flux-icon-home gibi oluşacak)
    classNamePrefix: 'flux-icon', 
    svgtofont: {
      fontWeight: '400',
    }
  });

  console.log('✅ Font oluşturma başarılı. Çıktılar dist-font klasöründe.');
  
  // 3. Geçici SVG klasörünü temizle
  fs.rmSync(SVG_SOURCE_DIR, { recursive: true, force: true });
  console.log('✨ Geçici SVG klasörü temizlendi.');
}

// Akışı Başlat
(async () => {
  try {
    extractSvgs();
    await generateFont();
  } catch (error) {
    console.error('Hata oluştu:', error);
  }
})();