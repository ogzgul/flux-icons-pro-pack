import fs from "fs";
import path from "path";
import { optimize } from "svgo";

import { icons } from "../lib/icons.js";

const DIST_DIR = path.resolve(process.cwd(), "dist-font");

// Renkli olması gereken ikonlar (Bunlar maske değil, direkt resim olacak)
const COLORED_TYPES = ["flag-", "brand-", "emoji-", "crypto-", "logo-", "liquid-", "avatar-","aero-"];

// CSS minify (ek bağımlılık yok)
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")      // yorumları sil
    .replace(/\s+/g, " ")                  // whitespace tek boşluk
    .replace(/\s*([{}:;,])\s*/g, "$1")     // : ; { } , etrafını sık
    .replace(/;}/g, "}")                   // son ; kaldır
    .trim();
}

const SVGO_CONFIG = {
  multipass: true,
  plugins: [
    "removeDoctype",
    "removeXMLProcInst",
    "removeComments",
    "removeMetadata",
    "removeEditorsNSData",
    "removeEmptyAttrs",
    "removeHiddenElems",
    "removeEmptyText",
    "removeEmptyContainers",
    "cleanupAttrs",
    "mergeStyles",
    "inlineStyles",
    "convertStyleToAttrs",
    "convertColors",
    "removeUselessDefs",
    "removeDesc",
    "removeTitle",
    "removeDimensions",
    // cleanupIDs KAPALI
    // convertPathData KAPALI
  ],
};

function sanitizeSvg(svg) {
  // invalid bare attributes
  svg = svg.replace(/\slinear(\s|\/?>)/g, ' calcMode="linear"$1');
  svg = svg.replace(/\sinfinite(\s|\/?>)/g, ' repeatCount="indefinite"$1');

  // Gradient close-tag mismatch: sadece kendi bloğu içinde düzelt
  // <radialGradient ...> ... </linearGradient>  => </radialGradient>
  svg = svg.replace(
    /(<radialGradient\b(?:(?!<linearGradient\b|<radialGradient\b)[\s\S])*?)<\/linearGradient>/g,
    "$1</radialGradient>"
  );

  // <linearGradient ...> ... </radialGradient> => </linearGradient>
  svg = svg.replace(
    /(<linearGradient\b(?:(?!<linearGradient\b|<radialGradient\b)[\s\S])*?)<\/radialGradient>/g,
    "$1</linearGradient>"
  );

  return svg;
}


function safeOptimizeWithName(svg, name) {
  try {
    const result = optimize(svg, SVGO_CONFIG);
    return result.data || svg;
  } catch (e) {
    console.warn(`⚠️ SVGO skip (invalid SVG): ${name} | ${e?.reason || e?.message}`);
    return svg; // bozmadan devam
  }
}


async function generateCssIcons() {
  console.log("🎨 CSS İkon Sistemi Oluşturuluyor (v3 - Final, optimized)...");

  // Temizlik ve Klasör Oluşturma
  if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true, force: true });
  fs.mkdirSync(DIST_DIR, { recursive: true });

  // Temel CSS ve Animasyonlar
  // Not: mask tekrarlarını base'e taşıyoruz (ikon blokları küçülsün diye)
  let cssContent = `
/* Flux Icons - Universal CSS */
.flux-icon{
  display:inline-block;
  width:1em;
  height:1em;
  vertical-align:-0.125em;
  background-repeat:no-repeat;
  background-position:center;
  background-size:contain;

  /* Mask defaults (çizgisel ikonlarda her seferinde tekrar etmesin) */
  -webkit-mask-repeat:no-repeat;
  mask-repeat:no-repeat;
  -webkit-mask-position:center;
  mask-position:center;
  -webkit-mask-size:contain;
  mask-size:contain;
}

/* --- FLUX ANIMATIONS --- */
@keyframes flux-shake{0%,100%{transform:rotate(0deg)}20%{transform:rotate(-15deg)}40%{transform:rotate(15deg)}60%{transform:rotate(-10deg)}80%{transform:rotate(10deg)}}
.flux-anim-shake{animation:flux-shake .5s ease-in-out infinite}

@keyframes flux-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.25)}30%{transform:scale(1)}45%{transform:scale(1.15)}60%{transform:scale(1)}}
.flux-anim-beat{animation:flux-beat 1.2s ease-in-out infinite}

@keyframes flux-bounce-y{0%,100%{transform:translateY(0)}40%{transform:translateY(-30%);animation-timing-function:cubic-bezier(0.8,0,1,1)}60%{transform:translateY(0);animation-timing-function:cubic-bezier(0,0,0.2,1)}70%{transform:translateY(-15%)}}
.flux-anim-bounce-y{animation:flux-bounce-y 1s infinite}

@keyframes flux-pop{0%{transform:scale(1)}50%{transform:scale(1.25)}100%{transform:scale(1)}}
.flux-anim-pop{animation:flux-pop .8s cubic-bezier(.175,.885,.32,1.275) infinite}

@keyframes flux-wiggle{0%,100%{transform:rotate(0deg)}25%{transform:rotate(12deg)}75%{transform:rotate(-12deg)}}
.flux-anim-wiggle{animation:flux-wiggle .3s ease-in-out infinite}

@keyframes flux-drive{0%{transform:translateX(0)}50%{transform:translateX(12px)}100%{transform:translateX(0)}}
.flux-anim-drive{animation:flux-drive 1s ease-in-out infinite}

@keyframes flux-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.flux-anim-float{animation:flux-float 2s ease-in-out infinite}

@keyframes flux-spin-pulse{0%{transform:rotate(0deg) scale(1)}50%{transform:rotate(180deg) scale(1.2)}100%{transform:rotate(360deg) scale(1)}}
.flux-anim-spin-pulse{animation:flux-spin-pulse 1.5s linear infinite}

@keyframes flux-glow{0%,100%{filter:drop-shadow(0 0 2px currentColor);opacity:1;transform:scale(1)}50%{filter:drop-shadow(0 0 8px currentColor);opacity:.8;transform:scale(1.05)}}
.flux-anim-glow{animation:flux-glow 2s ease-in-out infinite}

@keyframes flux-flip-x{0%{transform:perspective(400px) rotateY(0)}100%{transform:perspective(400px) rotateY(360deg)}}
.flux-anim-flip-x{animation:flux-flip-x 2.5s linear infinite}

@keyframes flux-flip-y{0%{transform:perspective(400px) rotateX(0)}100%{transform:perspective(400px) rotateX(360deg)}}
.flux-anim-flip-y{animation:flux-flip-y 2.5s linear infinite}

@keyframes flux-tada{0%{transform:scale(1)}10%,20%{transform:scale(.9) rotate(-3deg)}30%,50%,70%,90%{transform:scale(1.1) rotate(3deg)}40%,60%,80%{transform:scale(1.1) rotate(-3deg)}100%{transform:scale(1) rotate(0)}}
.flux-anim-tada{animation:flux-tada 1.2s ease-in-out infinite}

@keyframes flux-rubber{0%{transform:scale3d(1,1,1)}30%{transform:scale3d(1.25,.75,1)}40%{transform:scale3d(.75,1.25,1)}50%{transform:scale3d(1.15,.85,1)}65%{transform:scale3d(.95,1.05,1)}75%{transform:scale3d(1.05,.95,1)}100%{transform:scale3d(1,1,1)}}
.flux-anim-rubber{animation:flux-rubber 1s ease-in-out infinite}

@keyframes flux-swing{20%{transform:rotate(15deg)}40%{transform:rotate(-10deg)}60%{transform:rotate(5deg)}80%{transform:rotate(-5deg)}100%{transform:rotate(0deg)}}
.flux-anim-swing{transform-origin:top center;animation:flux-swing 2s ease-in-out infinite}

.flux-spin{animation:flux-spin-basic 1s linear infinite}
@keyframes flux-spin-basic{100%{transform:rotate(360deg)}}
`;

  const iconNames = Object.keys(icons);
  let count = 0;

  for (const name of iconNames) {
    let rawSvg = icons[name];
    if (!rawSvg) continue;

    // Bu ikon renkli mi?
    const isColored =
      COLORED_TYPES.some((t) => name.includes(t)) ||
      (rawSvg.includes("fill=") && !rawSvg.includes('fill="none"'));

    // // SVG'yi standart hale getir
    // if (!rawSvg.trim().startsWith("<svg")) {
    //   const strokeAttr = isColored
    //     ? ""
    //     : 'fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"';
    //   rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ${strokeAttr}>${rawSvg}</svg>`;
    // }

    // SVG'yi standart hale getir (Wrapper Ekleme)
    if (!rawSvg.trim().startsWith("<svg")) {
      
      let strokeAttr = '';

      // 1. DURUM: Renkli İkonlar (Aero, Liquid, Flag vs.)
      // Bunların içindeki renkleri ve fill ayarlarını korumalıyız.
      // Sadece varsayılan siyah dolguyu engellemek için fill="none" diyoruz.
      if (isColored) {
          strokeAttr = 'fill="none"'; 
      } 
      // 2. DURUM: Solid/Fill İkonlar (Tek Renk Dolgulu)
      // Bunlara ASLA stroke (çizgi) vermemeliyiz, yoksa ikon şişer.
      // Sadece fill="currentColor" veriyoruz ki CSS color ile boyanabilsin.
      else if (name.includes('-solid') || name.includes('-fill') || name.includes('-filled')) {
          strokeAttr = 'fill="currentColor"'; 
      } 
      // 3. DURUM: Outline İkonlar (Çizgisel)
      // Bunların içi boş olmalı (fill="none") ve çizgileri olmalı (stroke).
      else {
          strokeAttr = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
      }

      // Wrapper'ı oluştur
      rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ${strokeAttr}>${rawSvg}</svg>`;
    }

    rawSvg = sanitizeSvg(rawSvg);
    rawSvg = safeOptimizeWithName(rawSvg, name);

    // URL Encode (CSS data uri için)
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
      // Renkli ikon: background-image (renk/animasyon korunur)
      cssContent += `\n.flux-icon-${name}{background-image:url("${dataUri}")}\n`;
    } else {
      // Çizgisel ikon: mask-image + currentColor
      // tekrar eden mask-* ayarları base class'ta
      cssContent += `\n.flux-icon-${name}{background-color:currentColor;-webkit-mask-image:url("${dataUri}");mask-image:url("${dataUri}")}\n`;
    }

    count++;
  }

  // Minify
  cssContent = minifyCss(cssContent);

  // Yaz
  fs.writeFileSync(path.join(DIST_DIR, "flux-icons.css"), cssContent, "utf-8");

  console.log(`✅ ${count} ikon başarıyla CSS'e dönüştürüldü!`);
}

generateCssIcons();
