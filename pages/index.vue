<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useFluxIcons } from '@/composables/useFluxIcons';

const { icons } = useFluxIcons();

// --- AYARLAR ---
const searchQuery = ref("");
const visibleCount = ref(50);
const selectedIcon = ref(null);
const isModalOpen = ref(false);
const copied = ref(false);
const activeCategory = ref('all');

// Varsayılan Ayarlar (Cookie)
const customize = useCookie('flux_settings', {
    default: () => ({ 
        size: 64, 
        color: "#000000", 
        stroke: 1, 
        type: "class", 
        spin: false 
    }),
    watch: true
});

// Class modunda stroke sabit
watch(() => customize.value.type, (newType) => {
    if (newType === 'class') {
        customize.value.stroke = 1;
    }
});

// --- RENK DEĞİŞTİRİLEBİLİR Mİ? ---
const isColorable = computed(() => {
    if (!selectedIcon.value) return true;
    const name = selectedIcon.value;
    // Bu tiplerin rengi sabittir (Siyah veya Orijinal)
    const staticTypes = ['liquid-', 'flag-', 'sticker-', 'original', 'brand-', 'fill', 'solid'];
    if (staticTypes.some(type => name.includes(type))) {
        return false;
    }
    return true; 
});

const effectiveColor = computed(() => {
    return isColorable.value ? customize.value.color : '#000000'; 
});

// --- KATEGORİLER ---
const categories = [
  { id: 'all', name: 'All' },
  { id: 'liquid-', name: 'Liquid Glass' },
  { id: 'flux-', name: 'Flux' },
  { id: 'emoji-', name: 'Emojis' },
  { id: 'file-', name: 'Files' },
  { id: 'user-', name: 'Users' },
  { id: 'arrow-', name: 'Arrows' },
  { id: 'chart-', name: 'Charts' }
];

// --- FİLTRELEME ---
const allIconNames = computed(() => Object.keys(icons).sort());
const filteredIcons = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const category = activeCategory.value;
  return allIconNames.value.filter(name => {
    const matchesSearch = name.includes(query);
    let matchesCategory = true;
    if (category !== 'all') matchesCategory = name.startsWith(category);
    return matchesSearch && matchesCategory;
  });
});
const displayedIcons = computed(() => filteredIcons.value.slice(0, visibleCount.value));

const handleScroll = () => {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
    if (visibleCount.value < filteredIcons.value.length) visibleCount.value += 50;
  }
};
const selectCategory = (id) => {
    activeCategory.value = id;
    visibleCount.value = 50;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

const openModal = (name) => { selectedIcon.value = name; isModalOpen.value = true; copied.value = false; };
const closeModal = () => { isModalOpen.value = false; };

// --- KOD ÇIKTISI ---
const generatedCode = computed(() => {
  if (!selectedIcon.value) return "";
  const sizeValue = customize.value.size;
  // Renk seçilebiliyorsa seçilen rengi, değilse siyahı kullan.
  const colorValue = isColorable.value ? customize.value.color : '#000000'; 
  const strokeValue = customize.value.stroke;
  const strokeAttr = strokeValue !== 1 ? ` stroke-width="${strokeValue}"` : '';
  const spinAttr = customize.value.spin ? ' spin' : '';
  const spinClass = customize.value.spin ? ' flux-spin' : '';
  
  // Renk stili sadece renk değişebiliyorsa eklenir
  const colorStyle = isColorable.value ? ` color: ${colorValue};` : '';
  const customStyle = `style="font-size: ${sizeValue}px;${colorStyle}"`;

  if (customize.value.type === "class") {
    return `<i class="flux-icon flux-icon-${selectedIcon.value}${spinClass}" ${customStyle}></i>`;
  }
  if (customize.value.type === "component") {
    const colorProp = isColorable.value ? ` color="${colorValue}"` : '';
    return `<FluxIcon name="${selectedIcon.value}" size="${sizeValue}"${colorProp}${strokeAttr}${spinAttr} />`;
  } 
  if (customize.value.type === "html") {
      const svgSpinClass = customize.value.spin ? ' class="flux-spin"' : '';
      const svgColor = isColorable.value ? colorValue : 'currentColor';
      return `<svg width="${sizeValue}" height="${sizeValue}" viewBox="0 0 24 24" fill="none" stroke="${svgColor}" stroke-width="${strokeValue}" stroke-linecap="round" stroke-linejoin="round"${svgSpinClass}>${icons[selectedIcon.value]}</svg>`;
  }
  return "";
});

const copyToClipboard = () => {
  navigator.clipboard.writeText(generatedCode.value);
  copied.value = true;
  setTimeout(() => copied.value = false, 2000);
};
</script>

<template>
  <main class="max-w-7xl mx-auto p-6 min-h-screen">
    
    <div class="sticky top-0 z-30 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md py-6 mb-8 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all">
        <div class="flex flex-col items-center gap-6 max-w-4xl mx-auto px-4">
            <div class="relative w-full group">
                <div class="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <span class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none z-20">
                    <FluxIcon name="search" size="22" />
                </span>
                <input v-model="searchQuery" type="text" placeholder="Search 1000+ icons..." class="relative z-10 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full py-4 pl-14 pr-32 text-lg shadow-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400" />
                <div class="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 z-20 pointer-events-none">
                    <span class="text-indigo-600 dark:text-indigo-400">{{ displayedIcons.length }}</span> / {{ filteredIcons.length }}
                </div>
            </div>
            <div class="flex flex-wrap justify-center gap-2 w-full">
                <button v-for="cat in categories" :key="cat.id" @click="selectCategory(cat.id)" class="px-4 py-2 rounded-full text-sm font-semibold transition-all border" :class="activeCategory === cat.id ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/30 transform scale-105' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-800'">{{ cat.name }}</button>
            </div>
        </div>
    </div>


<div class="max-w-4xl mx-auto px-4 mb-8">
    <NuxtLink to="/mixer" class="block bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all group">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-xl font-bold flex items-center gap-2">
                    <FluxIcon name="layers-floating" class="text-yellow-300" /> 
                    Yeni: Icon Mixer
                </h3>
                <p class="text-indigo-100 text-sm mt-1">Kendi ikon kombinasyonlarını yarat. Dosya + Kilit? Kullanıcı + Yıldız? Sen seç!</p>
            </div>
            <div class="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                <FluxIcon name="arrow-right-heavy" />
            </div>
        </div>
    </NuxtLink>
</div>


    <div v-if="filteredIcons.length === 0" class="text-center py-20">
        <div class="inline-block p-6 bg-slate-100 dark:bg-slate-900 rounded-full mb-4">
            <FluxIcon name="search-x" size="48" class="text-slate-400" />
        </div>
        <h3 class="text-lg font-bold text-slate-700 dark:text-slate-200">No icons found</h3>
        <p class="text-slate-500 mb-6">Try adjusting your search or filters.</p>
        <button @click="searchQuery = ''; activeCategory = 'all'" class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">Clear Filters</button>
    </div>
    
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 pb-20">
      <div v-for="name in displayedIcons" :key="name" @click="openModal(name)" class="group relative bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none"></div>
        <FluxIcon :name="name" size="32" class="text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 group-hover:scale-110 transition-all duration-300 relative z-10" :stroke-width="customize.stroke" />
        <span class="text-[10px] font-bold text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white truncate w-full text-center capitalize relative z-10 transition-colors">{{ name.replace(/-/g, ' ') }}</span>
      </div>
    </div>

    <div v-if="displayedIcons.length < filteredIcons.length" class="py-12 text-center">
      <span class="inline-flex items-center gap-3 text-sm font-medium text-slate-500 animate-pulse bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-full">
        <FluxIcon name="loader-5" spin size="16" class="text-indigo-500" /> Loading more icons...
      </span>
    </div>
  </main>

  <Transition name="fade">
    <div v-if="isModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div @click="closeModal" class="absolute inset-0 bg-slate-900/60 dark:bg-black/90 backdrop-blur-sm transition-opacity"></div>
      
      <div class="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden transform transition-all scale-100 ring-1 ring-white/10">
        
        <div class="w-full md:w-5/12 bg-slate-50 flex items-center justify-center p-10 relative border-b md:border-b-0 md:border-r border-slate-200 group">
          <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#000000 1px, transparent 1px); background-size: 20px 20px;"></div>
          
          <FluxIcon 
            :name="selectedIcon" 
            :size="customize.size" 
            :color="effectiveColor" 
            :stroke-width="customize.stroke" 
            :spin="customize.spin" 
            class="relative z-10 drop-shadow-2xl transition-all duration-300 group-hover:scale-105" 
          />
        </div>

        <div class="w-full md:w-7/12 p-6 flex flex-col gap-6">
          <div class="flex justify-between items-start">
              <div>
                  <h3 class="text-2xl font-black text-slate-900 dark:text-white select-all tracking-tight">{{ selectedIcon }}</h3>
                  <p class="text-xs font-medium text-indigo-500 mt-1 uppercase tracking-wider">Flux Icon Library</p>
              </div>
              <button @click="closeModal" class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 transition-colors">
                  <FluxIcon name="x" size="20" />
              </button>
          </div>
          
          <div class="space-y-6">
              <div v-if="isColorable">
                <label class="text-[10px] font-bold text-slate-400 uppercase block mb-3 tracking-wider">Color</label>
                <div class="flex gap-3 items-center">
                    <button v-for="c in ['#000000','#ffffff','#6366f1','#10b981','#f43f5e','#f59e0b']" :key="c" @click="customize.color=c" class="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hover:scale-110 focus:ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-indigo-500 transition-all" :style="{background:c}"></button>
                    <div class="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden relative cursor-pointer hover:border-indigo-500 transition-colors bg-slate-50 dark:bg-slate-800">
                        <input type="color" v-model="customize.color" class="absolute -top-2 -left-2 w-16 h-16 cursor-pointer p-0 border-0 opacity-0"/>
                        <FluxIcon name="plus" size="14" class="text-slate-400 pointer-events-none"/>
                    </div>
                </div>
              </div>
              <div v-else class="text-[11px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                  <FluxIcon name="lock-solid" size="14" class="shrink-0 opacity-50" />
                  <span>This icon has fixed colors.</span>
              </div>

              <div class="grid gap-4" :class="customize.type !== 'class' ? 'grid-cols-2' : 'grid-cols-1'">
                <div>
                    <label class="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Size <span class="text-slate-900 dark:text-white">{{customize.size}}px</span></label>
                    <input v-model="customize.size" type="range" min="16" max="256" class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                </div>
                <div v-if="customize.type !== 'class'">
                    <label class="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Stroke <span class="text-slate-900 dark:text-white">{{customize.stroke}}</span></label>
                    <input v-model="customize.stroke" type="range" min="0.5" max="4" step="0.1" class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                </div>
              </div>

              <div v-if="customize.type === 'class'" class="text-[11px] font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800/50 flex items-start gap-2">
                  <FluxIcon name="info-circle-solid" size="16" class="shrink-0 mt-0.5" />
                  <span>Webfont mode uses fixed stroke width. Use 'SVG' or 'Vue' mode for adjustable thickness.</span>
              </div>

              <label class="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-500 transition-colors group">
                 <span class="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2 group-hover:text-indigo-500 transition-colors">
                    <FluxIcon name="refresh-cw" size="16" :spin="true" class="text-indigo-500" /> Animated (Spin)
                 </span>
                 <input type="checkbox" v-model="customize.spin" class="w-5 h-5 accent-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer">
              </label>
          </div>

          <div class="mt-auto">
            <div class="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mb-3 gap-1">
              <button @click="customize.type='class'" :class="customize.type==='class' ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'" class="flex-1 py-2 text-xs font-bold rounded-lg transition-all">Class (HTML)</button>
              <button @click="customize.type='component'" :class="customize.type==='component' ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'" class="flex-1 py-2 text-xs font-bold rounded-lg transition-all">Vue / Nuxt</button>
              <button @click="customize.type='html'" :class="customize.type==='html' ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'" class="flex-1 py-2 text-xs font-bold rounded-lg transition-all">SVG</button>
            </div>
            
            <div class="relative group">
              <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-transparent to-slate-50 dark:to-slate-950 pointer-events-none rounded-xl"></div>
              <pre class="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 p-4 rounded-xl text-[11px] font-mono overflow-x-auto custom-scrollbar h-24 flex items-center select-all whitespace-pre-wrap">{{ generatedCode }}</pre>
              <button @click="copyToClipboard" class="absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg transition-all flex items-center gap-2" :class="copied ? 'bg-emerald-500 text-white scale-105' : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-indigo-50 dark:hover:bg-slate-700'">
                  <FluxIcon v-if="copied" name="check" size="14" />
                  <FluxIcon v-else name="copy" size="14" />
                  {{ copied ? 'Copied' : 'Copy' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>