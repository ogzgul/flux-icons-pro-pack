<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useFluxIcons } from '@/composables/useFluxIcons'; // Composable yolunu kontrol et

// Ikon verisini al
const { icons } = useFluxIcons();

// --- AYARLAR ---
const searchQuery = ref("");
const visibleCount = ref(50); 
const selectedIcon = ref(null);
const isModalOpen = ref(false);
const copied = ref(false);

// YENİ: Varsayılan type 'class' yapıldı (Bootstrap stili)
const customize = ref({ 
  size: 64, 
  color: "#818cf8", 
  stroke: 2, 
  type: "class", 
  spin: false 
});

const allIconNames = computed(() => Object.keys(icons).sort());

const filteredIcons = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return allIconNames.value.filter(name => name.includes(query));
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

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

const openModal = (name) => { 
    selectedIcon.value = name; 
    isModalOpen.value = true; 
    copied.value = false; 
    // Modal her açıldığında varsayılan olarak Class'a dönmesini istersen:
    // customize.value.type = 'class'; 
};
const closeModal = () => { isModalOpen.value = false; };

// --- KOD ÜRETİCİ (GÜNCELLENDİ) ---
const generatedCode = computed(() => {
  if (!selectedIcon.value) return "";

  // Değerleri al
  const sizeValue = customize.value.size;
  const colorValue = customize.value.color;
  const strokeValue = customize.value.stroke;
  
  // Değişkenler
  const strokeAttr = strokeValue !== 2 ? ` stroke-width="${strokeValue}"` : '';
  const spinAttr = customize.value.spin ? ' spin' : '';
  const spinClass = customize.value.spin ? ' animate-spin' : '';

  // 1. WEBFONT / CLASS ÇIKTISI (Bootstrap Stili - Varsayılan)
  if (customize.value.type === "class") {
    // Font boyutu ve rengi style ile verilir
    return `<i class="flux-icon flux-icon-${selectedIcon.value}${spinClass}" style="font-size: ${sizeValue}px; color: ${colorValue};"></i>`;
  }

  // 2. VUE COMPONENT ÇIKTISI
  if (customize.value.type === "component") {
    return `<FluxIcon name="${selectedIcon.value}" size="${sizeValue}" color="${colorValue}"${strokeAttr}${spinAttr} />`;
  } 
  
  // 3. RAW SVG ÇIKTISI
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
  <main class="max-w-7xl mx-auto p-6">
    
    <div class="mb-8 flex flex-col items-center gap-4">
        <div class="relative w-full max-w-xl group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                <FluxIcon name="search" size="20" />
            </span>
            <input v-model="searchQuery" type="text" placeholder="1000+ İkon içinde ara..." class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500">
                {{ displayedIcons.length }} / {{ filteredIcons.length }}
            </div>
        </div>
    </div>

    <div v-if="filteredIcons.length === 0" class="text-center py-20 text-slate-500">Sonuç bulunamadı.</div>
    
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      <div v-for="name in displayedIcons" :key="name" @click="openModal(name)" class="group bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">
        <FluxIcon :name="name" size="32" class="text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-all group-hover:scale-110" />
        <span class="text-xs font-medium text-slate-500 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-200 truncate w-full text-center capitalize">{{ name }}</span>
      </div>
    </div>

    <div v-if="displayedIcons.length < filteredIcons.length" class="py-12 text-center">
      <span class="inline-flex items-center gap-2 text-sm text-slate-500">
        <FluxIcon name="loader-5" spin size="16" /> Yükleniyor...
      </span>
    </div>
  </main>

  <Transition name="fade">
    <div v-if="isModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div @click="closeModal" class="absolute inset-0 bg-slate-900/40 dark:bg-black/80 backdrop-blur-sm"></div>
      <div class="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        <div class="w-full md:w-5/12 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-center p-10 relative">
          <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#6366f1 1px, transparent 1px); background-size: 16px 16px;"></div>
          <FluxIcon :name="selectedIcon" :size="customize.size" :color="customize.color" :stroke-width="customize.stroke" :spin="customize.spin" class="relative z-10 drop-shadow-xl transition-all duration-300" />
        </div>

        <div class="w-full md:w-7/12 p-6 flex flex-col gap-6">
          <div class="flex justify-between items-start">
              <div>
                  <h3 class="text-2xl font-bold capitalize text-slate-900 dark:text-white">{{ selectedIcon }}</h3>
                  <p class="text-xs text-slate-500 mt-1">Flux Icon Library</p>
              </div>
              <button @click="closeModal" class="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">✕</button>
          </div>
          
          <div class="space-y-5">
              <div>
                <label class="text-[10px] font-bold text-slate-400 uppercase block mb-2 tracking-wider">Renk</label>
                <div class="flex gap-2 items-center">
                    <button v-for="c in ['#ffffff','#000000','#818cf8','#34d399','#f472b6','#fbbf24']" :key="c" @click="customize.color=c" class="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm focus:ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-indigo-500 transition-transform active:scale-90" :style="{background:c}"></button>
                    <input type="color" v-model="customize.color" class="h-8 w-8 bg-transparent cursor-pointer border-none p-0"/>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Boyut <span>{{customize.size}}px</span></label>
                    <input v-model="customize.size" type="range" min="16" max="128" class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                </div>
                <div>
                    <label class="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Kalınlık <span>{{customize.stroke}}</span></label>
                    <input v-model="customize.stroke" type="range" min="0.5" max="3" step="0.1" class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                </div>
              </div>

              <div class="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                 <span class="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <FluxIcon name="loader-5" size="14" :spin="true" /> Hareketli (Spin)
                 </span>
                 <input type="checkbox" v-model="customize.spin" class="w-5 h-5 accent-indigo-500 rounded cursor-pointer">
              </div>
          </div>

          <div class="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
            <div class="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800 mb-2 gap-1">
              <button @click="customize.type='class'" :class="{'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow':customize.type=='class'}" class="flex-1 py-1.5 text-xs font-medium text-slate-500 rounded transition-all">Class / HTML</button>
              <button @click="customize.type='component'" :class="{'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow':customize.type=='component'}" class="flex-1 py-1.5 text-xs font-medium text-slate-500 rounded transition-all">Nuxt / Vue</button>
              <button @click="customize.type='html'" :class="{'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow':customize.type=='html'}" class="flex-1 py-1.5 text-xs font-medium text-slate-500 rounded transition-all">SVG</button>
            </div>
            <div class="relative group">
              <pre class="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 p-3 rounded-lg text-[10px] font-mono overflow-x-auto custom-scrollbar h-20 flex items-center select-all">{{ generatedCode }}</pre>
              <button @click="copyToClipboard" class="absolute top-2 right-2 px-3 py-1 rounded text-[10px] font-bold transition-all" :class="copied?'bg-emerald-500 text-white':'bg-indigo-600 hover:bg-indigo-500 text-white'">{{ copied ? 'Kopyalandı!' : 'Kopyala' }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>