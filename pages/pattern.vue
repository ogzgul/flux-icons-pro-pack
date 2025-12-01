<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useFluxIcons } from '@/composables/useFluxIcons';

useHead({ 
    title: 'Free SVG Pattern Generator | Flux Background Maker',
    meta: [
        { name: 'description', content: 'Create seamless, customizable SVG background patterns for your website instantly. Choose from 3000+ icons, adjust colors, size, and opacity. Export as CSS or HTML.' },
        { name: 'keywords', content: 'svg pattern generator, background maker, seamless pattern, website background, css pattern, icon pattern, flux icons' },
        // Open Graph (Sosyal Medya)
        { property: 'og:title', content: 'Flux Pattern - Free SVG Background Generator' },
        { property: 'og:description', content: 'Design beautiful, seamless background patterns with 3000+ icons in seconds.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://flux-icon.com/pattern' }
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Flux Pattern Generator",
                "url": "https://flux-icon.com/pattern",
                "description": "A free online tool to generate seamless SVG background patterns for web design.",
                "applicationCategory": "DesignApplication",
                "operatingSystem": "Web",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "featureList": "Customizable icons, CSS export, HTML export, Live preview"
            })
        }
    ]
});
const { icons } = useFluxIcons();

// --- STATE ---
const searchQuery = ref('');
const selectedIcon = ref('heart-solid'); // Varsayılan ikon
const patternType = ref('grid'); // grid, stagger
const activeTab = ref('css'); // css, html
const copied = ref(false);

// Infinite scroll
const iconsPerPage = 60;
const visibleCount = ref(iconsPerPage);

// Demo kart ayarı
const demoTheme = ref('dark'); // light, dark

const settings = ref({
  size: 40, // İkon boyutu (px)
  gap: 60, // Boşluk (px)
  opacity: 0.2, // Görünürlük
  rotation: 20, // Açı
  color: '#6366f1', // İkon rengi
  bgColor: '#0f172a', // Arka plan
});

// --- DATA ---
const allIcons = computed(() => Object.keys(icons || {}));

const filteredIcons = computed(() => {
  const q = searchQuery.value.toLowerCase();
  const keys = allIcons.value;
  if (!q) return keys; // burada slice yok, hepsini döndür
  return keys.filter((i) => i.toLowerCase().includes(q));
});

// Arama değişince sayfayı sıfırla
watch(searchQuery, () => {
  visibleCount.value = iconsPerPage;
});

// Sadece görünmesi gereken kadarını ver
const paginatedIcons = computed(() => {
  return filteredIcons.value.slice(0, visibleCount.value);
});

// Scroll sonuna gelince daha fazla yükle
const loadMoreIcons = (e) => {
  const el = e.target;
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
    // Max uzunluğu geçmesin
    visibleCount.value = Math.min(
      visibleCount.value + iconsPerPage,
      filteredIcons.value.length
    );
  }
};

// Başlangıç Kontrolü
onMounted(() => {
  if (!allIcons.value.length) return;
  if (!icons[selectedIcon.value]) selectedIcon.value = allIcons.value[0];
});

// --- CORE ENGINE: SVG PATTERN GENERATOR ---
const patternUrl = computed(() => {
  if (!allIcons.value.length) return '';

  const iconName = selectedIcon.value || allIcons.value[0];
  let rawIcon = icons[iconName] || '';

  // SVG dış taglerini temizle
  rawIcon = rawIcon.replace(/<svg[^>]*>|<\/svg>/g, '');
  // currentColor -> seçilen renk
  rawIcon = rawIcon.replaceAll('currentColor', settings.value.color);

  const s = Number(settings.value.size);
  const g = Number(settings.value.gap);
  const tileSize = s + g;
  const r = settings.value.rotation;
  const o = settings.value.opacity;

  let patternSvg = '';

  if (patternType.value === 'grid') {
    // GRID: stroke EKLENDİ (outline ikonlar için kritik)
    patternSvg = `
      <svg width="${tileSize}" height="${tileSize}" viewBox="0 0 ${tileSize} ${tileSize}" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(${tileSize / 2}, ${tileSize / 2}) rotate(${r}) translate(-${s / 2}, -${s / 2})">
          <svg 
            width="${s}" 
            height="${s}" 
            viewBox="0 0 24 24" 
            fill="none"
            stroke="${settings.value.color}"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="opacity: ${o}; overflow: visible;"
          >
            ${rawIcon}
          </svg>
        </g>
      </svg>`;
  } else {
    const half = tileSize / 2;
    patternSvg = `
      <svg width="${tileSize}" height="${tileSize}" viewBox="0 0 ${tileSize} ${tileSize}" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0, 0) rotate(${r}) translate(-${s / 2}, -${s / 2})">
          <svg 
            width="${s}" 
            height="${s}" 
            viewBox="0 0 24 24" 
            fill="none"
            stroke="${settings.value.color}"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="opacity: ${o}; overflow: visible;"
          >
            ${rawIcon}
          </svg>
        </g>
        <g transform="translate(${half}, ${half}) rotate(${r * -1}) translate(-${s / 2}, -${s / 2})">
          <svg 
            width="${s}" 
            height="${s}" 
            viewBox="0 0 24 24" 
            fill="none"
            stroke="${settings.value.color}"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="opacity: ${o}; overflow: visible;"
          >
            ${rawIcon}
          </svg>
        </g>
      </svg>`;
  }

  // UTF-8 safe data URI
  const cleaned = patternSvg.trim().replace(/\s+/g, ' ');
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(cleaned)}`;
});

// --- OUTPUT CODES ---
const cssCode = computed(() => {
  return `/* Flux Pattern - ${selectedIcon.value} */
body {
  background-color: ${settings.value.bgColor};
  background-image: url("${patternUrl.value}");
  background-repeat: repeat;
}`;
});

const htmlCode = computed(() => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<style>
  body {
    margin: 0;
    min-height: 100vh;
    background-color: ${settings.value.bgColor};
    background-image: url("${patternUrl.value}");
  }
</style>
</head>
<body>
</body>
</html>`;
});

const copyResult = () => {
  const text = activeTab.value === 'css' ? cssCode.value : htmlCode.value;
  navigator.clipboard.writeText(text);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};

// Demo Kart Fonksiyonları
const toggleDemoTheme = () => {
  demoTheme.value = demoTheme.value === 'dark' ? 'light' : 'dark';
};
</script>

<template>
 <main class="max-w-7xl mx-auto p-6 min-h-screen">
  <div class="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-slate-950 text-white">
    <aside
      class="w-full lg:w-80 bg-slate-900 border-r border-slate-800 flex flex-col z-20 h-screen shrink-0"
    >
      <div class="p-6 border-b border-slate-800">
        <h1 class="text-xl font-black flex items-center gap-2">
          <FluxIcon name="pattern-grid" class="text-indigo-500" /> Flux Pattern
        </h1>
        <p class="text-xs text-slate-500 mt-1">Seamless background generator.</p>
      </div>

      <div class="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        <div>
          <label class="text-[10px] font-bold text-slate-500 uppercase mb-2 block">
            Select Icon
          </label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search icons..."
            class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500 mb-3"
          />
          <div
            class="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto custom-scrollbar pr-1"
            @scroll="loadMoreIcons"
          >
            <button
              v-for="name in paginatedIcons"
              :key="name"
              @click="selectedIcon = name"
              class="aspect-square rounded-lg flex items-center justify-center border transition-all hover:scale-110"
              :class="
                selectedIcon === name
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'border-slate-700 text-slate-500 hover:bg-slate-800'
              "
              :title="name"
            >
              <FluxIcon :name="name" size="16" />
            </button>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="text-[10px] font-bold text-slate-500 uppercase mb-2 block">
              Icon Color
            </label>
            <div
              class="flex gap-2 items-center bg-slate-800 p-2 rounded-lg border border-slate-700"
            >
              <input
                type="color"
                v-model="settings.color"
                class="w-6 h-6 rounded cursor-pointer bg-transparent border-none p-0"
              />
              <span class="text-xs font-mono text-slate-400">{{ settings.color }}</span>
            </div>
          </div>
          <div>
            <label class="text-[10px] font-bold text-slate-500 uppercase mb-2 block">
              Background Color
            </label>
            <div
              class="flex gap-2 items-center bg-slate-800 p-2 rounded-lg border border-slate-700"
            >
              <input
                type="color"
                v-model="settings.bgColor"
                class="w-6 h-6 rounded cursor-pointer bg-transparent border-none p-0"
              />
              <span class="text-xs font-mono text-slate-400">{{ settings.bgColor }}</span>
            </div>
          </div>
        </div>

        <div class="space-y-5 pt-4 border-t border-slate-800">
          <div>
            <label
              class="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-2"
            >
              Size <span>{{ settings.size }}px</span>
            </label>
            <input
              type="range"
              v-model="settings.size"
              min="16"
              max="128"
              class="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label
              class="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-2"
            >
              Gap <span>{{ settings.gap }}px</span>
            </label>
            <input
              type="range"
              v-model="settings.gap"
              min="10"
              max="200"
              class="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label
              class="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-2"
            >
              Opacity <span>{{ Math.round(settings.opacity * 100) }}%</span>
            </label>
            <input
              type="range"
              v-model="settings.opacity"
              min="0.05"
              max="1"
              step="0.05"
              class="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label
              class="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-2"
            >
              Rotation <span>{{ settings.rotation }}°</span>
            </label>
            <input
              type="range"
              v-model="settings.rotation"
              min="-180"
              max="180"
              class="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label class="text-[10px] font-bold text-slate-500 uppercase mb-2 block">
            Layout
          </label>
          <div class="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              @click="patternType = 'grid'"
              class="flex-1 py-1.5 text-xs font-bold rounded transition-all"
              :class="patternType === 'grid' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-white'"
            >
              Grid
            </button>
            <button
              @click="patternType = 'stagger'"
              class="flex-1 py-1.5 text-xs font-bold rounded transition-all"
              :class="
                patternType === 'stagger'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-500 hover:text-white'
              "
            >
              Stagger
            </button>
          </div>
        </div>
      </div>

      <div class="p-6 border-t border-slate-800 bg-slate-900 space-y-3">
        <div class="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            @click="activeTab = 'css'"
            class="flex-1 py-1.5 text-[10px] font-bold uppercase rounded transition-all"
            :class="activeTab === 'css' ? 'bg-indigo-600 text-white' : 'text-slate-500'"
          >
            CSS
          </button>
          <button
            @click="activeTab = 'html'"
            class="flex-1 py-1.5 text-[10px] font-bold uppercase rounded transition-all"
            :class="activeTab === 'html' ? 'bg-orange-600 text-white' : 'text-slate-500'"
          >
            HTML
          </button>
        </div>
        <button
          @click="copyResult"
          class="w-full py-3 bg-white text-slate-900 hover:bg-indigo-50 rounded-xl font-bold shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          <FluxIcon v-if="copied" name="check" size="18" class="text-emerald-600" />
          <FluxIcon v-else name="copy" size="18" />
          {{ copied ? 'Copied!' : 'Copy Code' }}
        </button>
      </div>
    </aside>

    <section
      class="flex-1 relative overflow-hidden transition-colors duration-300"
      :style="{ backgroundColor: settings.bgColor }"
    >
      <div
        class="absolute inset-0 pointer-events-none transition-all duration-300"
        :style="{ backgroundImage: patternUrl ? `url('${patternUrl}')` : 'none' }"
      ></div>

      <div class="absolute inset-0 flex items-center justify-center p-8">
        <div
          class="p-10 rounded-3xl shadow-2xl max-w-lg text-center border relative overflow-hidden transition-all duration-300"
          :class="
            demoTheme === 'dark'
              ? 'bg-slate-900/90 border-slate-700 text-white'
              : 'bg-white/90 border-slate-200 text-slate-900'
          "
        >
          <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

          <div
            class="mb-6 inline-flex p-4 rounded-2xl shadow-inner transition-colors"
            :class="demoTheme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'"
          >
            <FluxIcon :name="selectedIcon" size="48" :color="settings.color" />
          </div>

          <h2 class="text-3xl font-black mb-3">Hero Section</h2>
          <p
            class="mb-8 text-sm leading-relaxed"
            :class="demoTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'"
          >
            This preview shows how your pattern looks behind content. Use the buttons below to
            test interaction.
          </p>

          <div class="flex gap-4 justify-center">
            <button
              @click="copyResult"
              class="px-6 py-2.5 rounded-full font-bold hover:scale-105 transition-transform text-sm shadow-lg"
              :class="demoTheme === 'dark' ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'"
            >
              Get Code
            </button>
            <button
              @click="toggleDemoTheme"
              class="px-6 py-2.5 border rounded-full font-bold hover:bg-opacity-10 transition-colors text-sm flex items-center gap-2"
              :class="
                demoTheme === 'dark'
                  ? 'border-slate-600 hover:bg-white'
                  : 'border-slate-300 hover:bg-black'
              "
            >
              <FluxIcon name="refresh-cw" size="14" /> Toggle Theme
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
  <section class="w-full bg-slate-900 border-t border-slate-800 py-16 px-8">
        <div class="max-w-4xl mx-auto text-slate-400 space-y-12">
            
            <div class="text-center">
                <h2 class="text-3xl font-black text-white mb-4">Why use SVG Patterns?</h2>
                <p class="text-lg leading-relaxed">
                    SVG patterns are lightweight, scalable, and resolution-independent. Unlike heavy image files (JPG/PNG), SVG backgrounds load instantly and look crisp on any screen size, from mobile devices to 4K monitors.
                </p>
            </div>

            <div class="grid md:grid-cols-2 gap-12">
                <div class="space-y-4">
                    <h3 class="text-xl font-bold text-white flex items-center gap-2">
                        <FluxIcon name="sketch-lightning-bolt" class="text-yellow-500"/> Fast & Lightweight
                    </h3>
                    <p class="text-sm">
                        Flux Pattern generates optimized <strong>Base64 Data URIs</strong>. This means no extra HTTP requests are needed to load your background images, significantly improving your website's <strong>Core Web Vitals</strong> and SEO score.
                    </p>
                </div>
                
                <div class="space-y-4">
                    <h3 class="text-xl font-bold text-white flex items-center gap-2">
                        <FluxIcon name="palette" class="text-pink-500"/> Fully Customizable
                    </h3>
                    <p class="text-sm">
                        Choose from over <strong>3000+ icons</strong> in our library. Adjust colors, opacity, rotation, and spacing to match your brand identity perfectly. Whether you need a subtle texture or a bold design, Flux Pattern handles it all.
                    </p>
                </div>

                <div class="space-y-4">
                    <h3 class="text-xl font-bold text-white flex items-center gap-2">
                        <FluxIcon name="liquid-code-brackets" class="text-emerald-500"/> CSS Ready
                    </h3>
                    <p class="text-sm">
                        Get production-ready code instantly. Simply copy the generated <strong>CSS</strong> and paste it into your stylesheet. Works with Tailwind CSS, Bootstrap, or vanilla CSS projects seamlessly.
                    </p>
                </div>

                <div class="space-y-4">
                    <h3 class="text-xl font-bold text-white flex items-center gap-2">
                        <FluxIcon name="unlock" class="text-indigo-500"/> Free & Open Source
                    </h3>
                    <p class="text-sm">
                        Flux Pattern is completely free to use for personal and commercial projects. No attribution required, though we appreciate a shoutout! Built by developers, for developers.
                    </p>
                </div>
            </div>

        </div>
    </section>
   </main>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 4px;
}
</style>
