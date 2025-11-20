import fs from 'fs';
import path from 'path';
import svgtofont from 'svgtofont';
import { icons } from '../lib/icons.js'; // İkon verilerini buradan alıyoruz

// Klasör yolları
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
    const svgPath = icons[name];
    
    // DÜZELTME: currentColor yerine sabit '#000' ve <g> etiketi kullanımı.
    // Font motorları 'currentColor' değişkenini tanımaz, siyah stroke vermeliyiz.
    // Ayrıca fill="none" özelliği grup içine alındı.
    const wrappedSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <g fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    ${svgPath}
  </g>
</svg>`;

    const fileName = `${name}.svg`;
    fs.writeFileSync(path.join(SVG_SOURCE_DIR, fileName), wrappedSvg.trim(), 'utf-8');
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
    fontName: "FluxIcons", // Font adı
    css: true, // CSS dosyasını oluştur
    outSVGReact: false,
    outSVGPath: false,
    emptyDist: true, // Çıktı klasörünü temizle
    classNamePrefix: 'flux-icon', // CSS sınıfı: .flux-icon-home
    svgicons2svgfont: {
      fontHeight: 1000,
      normalize: true,
      centerHorizontally: true // İkonları ortalar
    },
    // Varsayılan şablonları kullanması için styleTemplates ayarını kaldırdık.
  });

  console.log('✅ Font oluşturma başarılı! Çıktılar dist-font klasöründe.');
  
  // 3. Geçici SVG klasörünü temizle
  try {
      fs.rmSync(SVG_SOURCE_DIR, { recursive: true, force: true });
      console.log('✨ Geçici SVG klasörü temizlendi.');
  } catch (e) {
      console.log('⚠️ Geçici klasör silinemedi (Önemli değil).');
  }
}

// Akışı Başlat
(async () => {
  try {
    extractSvgs();
    await generateFont();
  } catch (error) {
    console.error('❌ Hata oluştu:', error);
  }
})();