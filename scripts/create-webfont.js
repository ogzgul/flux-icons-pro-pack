// scripts/create-webfont.js
import fs from 'fs';
import path from 'path';
import svgtofont from 'svgtofont';
import outlineStroke from 'svg-outline-stroke';
import { icons } from '../lib/icons.js';

const SVG_SOURCE_DIR = path.resolve(process.cwd(), 'svg_source');
const DIST_FONT_DIR = path.resolve(process.cwd(), 'dist-font');

// Renkli olması gereken ikon türleri
const COLORED_TYPES = ['flag-', 'brand-', 'emoji-', 'crypto-', 'logo-'];

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

    const isSolid =
      rawPath.includes('stroke="none"') ||
      (rawPath.includes('fill=') && !rawPath.includes('fill="none"'));

    if (isSolid) {
      let cleanPath = rawPath.replace(/fill="[^"]*"/g, 'fill="#000000"');
      if (!cleanPath.includes('fill=')) {
        cleanPath = `<g fill="#000000">${cleanPath}</g>`;
      }
      finalSvgContent = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${cleanPath}</svg>`;
    } else {
      const tempSvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${rawPath}</svg>`;

      try {
        finalSvgContent = await outlineStroke(tempSvg, {
          optCurve: true,
          step: 4,
          centerHorizontally: false,
          fixedWidth: false,
          color: '#000000',
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

  if (!fs.existsSync(DIST_FONT_DIR)) {
    fs.mkdirSync(DIST_FONT_DIR, { recursive: true });
  }

  await svgtofont({
    src: SVG_SOURCE_DIR,
    dist: DIST_FONT_DIR,
    fontName: 'FluxIcons',
    css: false,              // ÖNEMLİ: svgtofont artık CSS üretmiyor
    outSVGReact: false,
    outSVGPath: false,
    emptyDist: false,
    classNamePrefix: 'flux-icon',
    svgicons2svgfont: {
      fontHeight: 1000,
      normalize: true,
      centerHorizontally: true,
    },
  });

  console.log('✅ Font dosyaları tamamlandı!');
}

// YENİ: SVG tabanlı CSS oluştur
async function generateCssIcons() {
  console.log('3. CSS ikon sistemi oluşturuluyor...');

  if (!fs.existsSync(DIST_FONT_DIR)) {
    fs.mkdirSync(DIST_FONT_DIR, { recursive: true });
  }

  let cssContent = `
/* Flux Icons - CSS SVG System */

/* Eski font ikon sistemini devre dışı bırak */
.flux-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  font-family: initial !important;
  font-style: normal;
  font-weight: normal;
}

/* Eski ::before gliflerini temizle */
.flux-icon::before {
  content: '' !important;
}
`;

  const iconNames = Object.keys(icons);
  let count = 0;

  iconNames.forEach((name) => {
    const rawSvg = icons[name];

    const isColored =
      COLORED_TYPES.some((type) => name.includes(type)) ||
      (rawSvg.includes('fill=') &&
        !rawSvg.includes("fill='none'") &&
        !rawSvg.includes('fill="none"'));

    let fullSvg;

    if (isColored) {
      // Renkli ikonlar
      fullSvg = rawSvg.startsWith('<svg')
        ? rawSvg
        : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${rawSvg}</svg>`;
    } else {
      // Çizgisel ikonlar (outline)
      let inner = rawSvg;

      if (rawSvg.trim().startsWith('<svg')) {
        inner = rawSvg.replace(/^<svg[^>]*>/i, '').replace(/<\/svg>$/i, '');
      }

      fullSvg = `<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="black"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>${inner}</svg>`;
    }

    const encodedSvg = fullSvg
      .replace(/"/g, "'")
      .replace(/%/g, '%25')
      .replace(/#/g, '%23')
      .replace(/{/g, '%7B')
      .replace(/}/g, '%7D')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E');

    const dataUri = `data:image/svg+xml,${encodedSvg}`;

    if (isColored) {
      cssContent += `
.flux-icon-${name} {
  background-color: #ffffff;
  background-image: url("${dataUri}");
}
`;
    } else {
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
}
`;
    }

    count++;
  });

  fs.writeFileSync(path.join(DIST_FONT_DIR, 'FluxIcons.css'), cssContent, 'utf-8');
  console.log(`✅ ${count} ikon için CSS üretildi.`);
  console.log('📁 Çıktı: dist-font/FluxIcons.css');
}

(async () => {
  try {
    await extractSvgs();
    await generateFont();
    await generateCssIcons();
  } catch (err) {
    console.error('❌ Kritik hata:', err);
  }
})();
