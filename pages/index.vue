<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useFluxIcons } from '@/composables/useFluxIcons';

const { icons } = useFluxIcons();

// --- SETTINGS ---
const searchQuery = ref("");
const visibleCount = ref(50);
const selectedIcon = ref(null);
const isModalOpen = ref(false);
const copied = ref(false);
const activeCategory = ref('all');

// Default Output Settings
const customize = ref({ 
  size: 64, 
  color: "#818cf8", 
  stroke: 2, 
  type: "class", 
  spin: false 
});

// --- CATEGORIES (TRANSLATED) ---
const categories = [
  { id: 'all', name: 'All' },
  { id: 'liquid-', name: 'Liquid Glass' },
  { id: 'brand-', name: 'Brands' },
  { id: 'emoji-', name: 'Emojis' },
  { id: 'file-', name: 'Files' },
  { id: 'user-', name: 'Users' },
  { id: 'arrow-', name: 'Arrows' },
  { id: 'chart-', name: 'Charts' }
];

// --- FILTERING LOGIC ---
const allIconNames = computed(() => Object.keys(icons).sort());

const filteredIcons = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const category = activeCategory.value;

  return allIconNames.value.filter(name => {
    const matchesSearch = name.includes(query);
    let matchesCategory = true;
    if (category !== 'all') {
      matchesCategory = name.startsWith(category);
    }
    return matchesSearch && matchesCategory;
  });
});

const displayedIcons = computed(() => {
  return filteredIcons.value.slice(0, visibleCount.value);
});

const handleScroll = () => {
  const totalHeight = document.documentElement.scrollHeight;
  const currentScroll = window.scrollY + window.innerHeight;
  if (currentScroll >= totalHeight - 100) {
    if (visibleCount.value < filteredIcons.value.length) {
      visibleCount.value += 50;
    }
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

// --- CODE GENERATOR ---
const generatedCode = computed(() => {
  if (!selectedIcon.value) return "";
  const sizeValue = customize.value.size;
  const colorValue = customize.value.color;
  const strokeValue = customize.value.stroke;
  const strokeAttr = strokeValue !== 2 ? ` stroke-width="${strokeValue}"` : '';
  const spinAttr = customize.value.spin ? ' spin' : '';
  const spinClass = customize.value.spin ? ' animate-spin' : '';
  const customStyle = `style="font-size: ${sizeValue}px; color: ${colorValue};"`;

  if (customize.value.type === "class") {
    return `<i class="flux-icon flux-icon-${selectedIcon.value}${spinClass}" ${customStyle}></i>`;
  }
  if (customize.value.type === "component") {
    return `<FluxIcon name="${selectedIcon.value}" size="${sizeValue}" color="${colorValue}"${strokeAttr}${spinAttr} />`;
  } 
  if (customize.value.type === "html") {
      return `<svg width="${sizeValue}" height="${sizeValue}" viewBox="0 0 24 24" fill="none" stroke="${colorValue}" stroke-width="${strokeValue}" stroke-linecap="round" stroke-linejoin="round" class="${spinClass.trim()}">${icons[selectedIcon.value]}</svg>`;
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
    
    <div class="sticky top-20 z-30 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm py-4 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div class="flex flex-col items-center gap-6">
            
            <div class="relative w-full max-w-xl group">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                    <FluxIcon name="search" size="20" />
                </span>
                <input v-model="searchQuery" type="text" placeholder="Search 1000+ icons..." class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl py-3 pl-12 pr-24 text-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                <div class="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500">
                    {{ displayedIcons.length }} / {{ filteredIcons.length }}
                </div>
            </div>

            <div class="flex flex-wrap justify-center gap-2">
                <button 
                    v-for="cat in categories" 
                    :key="cat.id"
                    @click="selectCategory(cat.id)"
                    class="px-4 py-1.5 rounded-full text-sm font-medium transition-all border"
                    :class="activeCategory === cat.id 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-105' 
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'"
                >
                    {{ cat.name }}
                </button>
            </div>
        </div>
    </div>

    <div v-if="filteredIcons.length === 0" class="text-center py-20">
        <div class="inline-block p-4 bg-slate-100 dark:bg-slate-900 rounded-full mb-4">
            <FluxIcon name="search-x" size="48" class="text-slate-400" />
        </div>
        <p class="text-slate-500">No icons found matching your criteria.</p>
        <button @click="searchQuery = ''; activeCategory = 'all'" class="mt-4 text-indigo-500 hover:underline">Clear Filters</button>
    </div>
    
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 pb-20">
      <div v-for="name in displayedIcons" :key="name" @click="openModal(name)" class="group relative bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden">
        
        <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>
        
        <FluxIcon :name="name" size="32" class="text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-all group-hover:scale-110 relative z-10" />
        <span class="text-[10px] font-medium text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 truncate w-full text-center capitalize relative z-10">{{ name }}</span>
      </div>
    </div>

    <div v-if="displayedIcons.length < filteredIcons.length" class="py-8 text-center">
      <span class="inline-flex items-center gap-2 text-sm text-slate-500 animate-pulse">
        <FluxIcon name="loader-5" spin size="16" /> Loading...
      </span>
    </div>
  </main>

  <Transition name="fade">
    <div v-if="isModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div @click="closeModal" class="absolute inset-0 bg-slate-900/60 dark:bg-black/90 backdrop-blur-sm transition-opacity"></div>
      
      <div class="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden transform transition-all scale-100">
        
        <div class="w-full md:w-5/12 bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-10 relative border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
          <div class="absolute inset-0 opacity-5 dark:opacity-10" style="background-image: radial-gradient(currentColor 1px, transparent 1px); background-size: 20px 20px;"></div>
          <FluxIcon :name="selectedIcon" :size="customize.size" :color="customize.color" :stroke-width="customize.stroke" :spin="customize.spin" class="relative z-10 drop-shadow-xl transition-all duration-300" />
        </div>

        <div class="w-full md:w-7/12 p-6 flex flex-col gap-6">
          <div class="flex justify-between items-start">
              <div>
                  <h3 class="text-2xl font-bold text-slate-900 dark:text-white select-all">{{ selectedIcon }}</h3>
                  <p class="text-xs text-slate-500 mt-1">Flux Icon Library</p>
              </div>
              <button @click="closeModal" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <FluxIcon name="x" size="20" />
              </button>
          </div>
          
          <div class="space-y-6">
              <div>
                <label class="text-[10px] font-bold text-slate-400 uppercase block mb-3 tracking-wider">Color</label>
                <div class="flex gap-3 items-center">
                    <button v-for="c in ['#6366f1','#10b981','#f43f5e','#f59e0b','#3b82f6','#000000','#ffffff']" :key="c" @click="customize.color=c" class="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hover:scale-110 focus:ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-indigo-500 transition-all" :style="{background:c}"></button>
                    <div class="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden relative cursor-pointer hover:border-indigo-500">
                        <input type="color" v-model="customize.color" class="absolute -top-2 -left-2 w-16 h-16 cursor-pointer p-0 border-0"/>
                        <FluxIcon name="plus" size="14" class="text-slate-400 pointer-events-none"/>
                    </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Size <span class="text-slate-900 dark:text-white">{{customize.size}}px</span></label>
                    <input v-model="customize.size" type="range" min="16" max="256" class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                </div>
                <div>
                    <label class="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Stroke <span class="text-slate-900 dark:text-white">{{customize.stroke}}</span></label>
                    <input v-model="customize.stroke" type="range" min="0.5" max="4" step="0.1" class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                </div>
              </div>

              <label class="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-500 transition-colors">
                 <span class="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <FluxIcon name="refresh-cw" size="16" :spin="true" class="text-indigo-500" /> Animated (Spin)
                 </span>
                 <input type="checkbox" v-model="customize.spin" class="w-5 h-5 accent-indigo-600 rounded border-gray-300 focus:ring-indigo-500">
              </label>
          </div>

          <div class="mt-auto">
            <div class="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mb-3">
              <button @click="customize.type='class'" :class="customize.type==='class' ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'" class="flex-1 py-2 text-xs font-bold rounded-lg transition-all">Class (HTML)</button>
              <button @click="customize.type='component'" :class="customize.type==='component' ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'" class="flex-1 py-2 text-xs font-bold rounded-lg transition-all">Vue / Nuxt</button>
              <button @click="customize.type='html'" :class="customize.type==='html' ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'" class="flex-1 py-2 text-xs font-bold rounded-lg transition-all">SVG</button>
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
/* Fade Transition */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-active .relative, .fade-leave-active .relative { transition: transform 0.2s ease; }
.fade-enter-from .relative, .fade-leave-to .relative { transform: scale(0.95); }
</style>