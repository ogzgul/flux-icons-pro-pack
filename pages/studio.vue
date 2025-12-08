<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white pb-20">
    
    <div class="pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <span class="px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-widest mb-4 inline-block">
            Beta Release
        </span>
        <h1 class="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
            Design <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Viral Assets</span> in Seconds
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Flux Studio is a professional <strong>SVG & Image Generator</strong>. Create stunning Open Graph images, GitHub banners, and social media posts using the Flux Icons library without opening Figma or Photoshop.
        </p>
    </div>

    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        
        <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col lg:flex-row h-[850px] ring-1 ring-slate-900/5">
            
            <aside class="w-full lg:w-80 bg-slate-50/50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full flex-shrink-0">
                
                <div class="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span class="text-xs font-black uppercase tracking-wider text-slate-400">Tools</span>
                    <button @click="resetCanvas" class="text-xs font-bold text-red-500 hover:text-red-600 transition-colors">Reset</button>
                </div>

                <div class="flex p-2 gap-1 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    <button @click="activeTab = 'settings'" class="flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all" :class="activeTab === 'settings' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'">Canvas</button>
                    <button @click="activeTab = 'assets'" class="flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all" :class="activeTab === 'assets' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'">Assets</button>
                    <button @click="activeTab = 'layers'" class="flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all" :class="activeTab === 'layers' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'">Layers</button>
                </div>

                <div class="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-6">
                    
                  <div v-if="activeTab === 'settings'" class="space-y-6">
    
    <div>
        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Canvas Size</label>
        
        <div class="grid grid-cols-2 gap-2 mb-3">
            <button v-for="p in presets" :key="p.name" @click="applyPreset(p)" 
                class="p-3 border rounded-xl text-left hover:border-indigo-500 transition-all group relative overflow-hidden" 
                :class="canvas.width === p.w && canvas.height === p.h ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'">
                <span class="block text-xs font-bold relative z-10">{{ p.name }}</span>
                <span class="block text-[10px] opacity-60 font-mono mt-1 relative z-10">{{ p.w }}x{{ p.h }}</span>
            </button>
        </div>

        <div class="flex items-center gap-2">
            <div class="relative flex-1 group">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 group-focus-within:text-indigo-500 transition-colors">W</span>
                <input v-model.number="canvas.width" @input="fitToScreen" type="number" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-3 py-2.5 text-xs font-mono font-bold focus:border-indigo-500 focus:outline-none transition-colors placeholder:text-slate-300">
            </div>
            
            <span class="text-slate-300 dark:text-slate-700 text-[10px] font-bold">✕</span>
            
            <div class="relative flex-1 group">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 group-focus-within:text-indigo-500 transition-colors">H</span>
                <input v-model.number="canvas.height" @input="fitToScreen" type="number" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-3 py-2.5 text-xs font-mono font-bold focus:border-indigo-500 focus:outline-none transition-colors placeholder:text-slate-300">
            </div>
        </div>
    </div>

    <div>
        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Background</label>
        <div class="flex gap-2 mb-3">
            <div class="relative w-full h-10 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <input type="color" v-model="canvas.bgColor" class="absolute -top-2 -left-2 w-24 h-24 cursor-pointer p-0 border-0">
                <div class="absolute inset-0 pointer-events-none flex items-center justify-end px-3 text-[10px] font-mono font-bold text-slate-500 bg-white/50 dark:bg-black/50 backdrop-blur-sm w-fit ml-auto border-l border-slate-200 dark:border-slate-700">
                    {{ canvas.bgColor }}
                </div>
            </div>
        </div>
        <div class="relative group">
            <input type="file" @change="handleBgUpload" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
            <div class="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-center text-xs font-bold text-slate-500 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors flex items-center justify-center gap-2">
                <FluxIcon name="image" size="16" /> Upload Image
            </div>
        </div>
        <button v-if="canvas.bgImage" @click="canvas.bgImage = null" class="mt-2 text-[10px] text-red-500 font-bold hover:underline w-full text-right">Remove Image</button>
    </div>

    <div>
        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Export Format</label>
        <div class="flex p-1 bg-slate-200 dark:bg-slate-800 rounded-lg">
            <button v-for="fmt in ['png', 'jpeg', 'svg']" :key="fmt" @click="exportFormat = fmt" class="flex-1 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all" :class="exportFormat === fmt ? 'bg-white dark:bg-slate-700 shadow text-indigo-600' : 'text-slate-500'">{{ fmt }}</button>
        </div>
    </div>
</div>

                   <div v-if="activeTab === 'assets'" class="space-y-6">
    <div>
        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Flux Icons Library</label>
        <div class="relative group mb-3">
            <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><FluxIcon name="search" size="14" /></div>
            <input v-model="searchQuery" type="text" placeholder="Search 3500+ icons..." class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:border-indigo-500 focus:outline-none shadow-sm">
        </div>
        
        <div 
            class="grid grid-cols-4 gap-2 h-64 overflow-y-auto custom-scrollbar p-1 content-start"
            @scroll="loadMoreIcons"
        >
            <button v-for="icon in displayedIcons" :key="icon" @click="addIconLayer(icon)" 
                class="aspect-square flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-500 transition-all group"
                :title="icon">
                <FluxIcon :name="icon" size="20" class="text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
            </button>
            
            <div v-if="visibleIconLimit < allFilteredIcons.length" class="col-span-4 py-2 text-center text-[10px] text-slate-400 animate-pulse">
                Loading more...
            </div>
        </div>
        
        <p class="text-[10px] text-slate-400 mt-2 text-center">
            Showing {{ displayedIcons.length }} of {{ allFilteredIcons.length }} icons
        </p>
    </div>

    <button @click="addTextLayer" class="w-full py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm">
        <FluxIcon name="cursor-text" size="14" /> Add Text Layer
    </button>
</div>

                    <div v-if="activeTab === 'layers'" class="space-y-2">
                        <div v-if="layers.length === 0" class="text-center py-10 flex flex-col items-center">
                            <FluxIcon name="layers" size="32" class="text-slate-300 mb-2" />
                            <p class="text-slate-400 text-xs">Canvas is empty.</p>
                        </div>
                        
                        <div v-for="(layer, index) in layers.slice().reverse()" :key="layer.id" 
                             class="flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer group hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                             :class="selectedLayerId === layer.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'">
                            
                            <div class="w-6 h-6 flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-md text-slate-500 text-[10px] font-bold">
                                {{ layers.length - index }}
                            </div>
                            
                            <div class="text-slate-400">
                                <FluxIcon v-if="layer.type === 'icon'" :name="layer.content" size="14" />
                                <FluxIcon v-else-if="layer.type === 'text'" name="cursor-text" size="14" />
                                <FluxIcon v-else name="image" size="14" />
                            </div>

                            <div @click="selectLayer(layer.id)" class="flex-1 text-xs font-bold truncate select-none text-slate-700 dark:text-slate-200">
                                {{ layer.type === 'icon' ? layer.content : (layer.type === 'text' ? layer.text : 'Image') }}
                            </div>

                            <button @click="removeLayer(layer.id)" class="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-1 transition-all">
                                <FluxIcon name="trash-2" size="14" />
                            </button>
                        </div>
                    </div>

                </div>

                <div class="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <button @click="downloadCanvas" class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                        <FluxIcon name="download-cloud" size="18" /> Download Asset
                    </button>
                </div>
            </aside>

            <main ref="canvasContainer" class="flex-1 bg-slate-100 dark:bg-black/80 relative flex items-center justify-center overflow-hidden cursor-crosshair">
                
                <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px); background-size: 20px 20px;"></div>

                <div class="shadow-2xl transition-transform duration-200 ease-out origin-center ring-1 ring-black/10 dark:ring-white/10" :style="{ transform: `scale(${previewScale})` }">
                    <div 
                        id="flux-canvas"
                        class="relative overflow-hidden bg-white select-none transition-colors duration-300"
                        :style="{ 
                            width: canvas.width + 'px', 
                            height: canvas.height + 'px', 
                            backgroundColor: canvas.bgColor,
                            backgroundImage: canvas.bgImage ? `url(${canvas.bgImage})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }"
                        @mousedown.self="deselectLayer"
                    >
                        <div 
                            v-for="layer in layers" 
                            :key="layer.id"
                            class="absolute cursor-move group"
                            :style="{ 
                                left: layer.x + 'px', 
                                top: layer.y + 'px',
                                zIndex: layer.zIndex,
                                transform: `rotate(${layer.rotation}deg)`,
                                width: layer.type === 'text' ? 'auto' : layer.size + 'px',
                                height: layer.type === 'text' ? 'auto' : layer.size + 'px'
                            }"
                            @mousedown.stop="startDrag($event, layer)"
                        >
                            <div v-if="layer.type === 'icon'" class="w-full h-full" :style="{ color: layer.color }">
                                 <svg viewBox="0 0 24 24" class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                     <g v-html="getIconContent(layer.content)"></g>
                                 </svg>
                            </div>
                            <div v-if="layer.type === 'text'" 
                                 :style="{ fontSize: layer.size + 'px', color: layer.color, fontWeight: '900', fontFamily: 'sans-serif', lineHeight: 1 }"
                                 class="whitespace-nowrap drop-shadow-sm">
                                {{ layer.text }}
                            </div>
                            <img v-if="layer.type === 'image'" :src="layer.src" class="w-full h-full object-contain pointer-events-none" />
                            
                            <div v-if="selectedLayerId === layer.id" class="absolute -inset-2 border-2 border-indigo-500 border-dashed rounded pointer-events-none opacity-50"></div>
                        </div>
                    </div>
                </div>

                <div class="absolute bottom-6 right-6 bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-full text-xs font-bold font-mono shadow-lg border border-slate-200 dark:border-slate-700 backdrop-blur-md">
                    {{ Math.round(previewScale * 100) }}% Scale
                </div>
            </main>

            <aside class="w-full lg:w-72 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col h-full flex-shrink-0 p-5 overflow-y-auto">
                
                <div v-if="selectedLayer" class="space-y-6 animate-fade-in">
                    <div class="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
                        <h3 class="text-xs font-black uppercase tracking-wider text-slate-400">Properties</h3>
                        <div class="text-[10px] font-mono text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded">ID: {{ selectedLayer.id }}</div>
                    </div>

                    <div v-if="selectedLayer.type === 'text'">
                        <label class="text-[10px] font-bold text-slate-400 block mb-2">Text Content</label>
                        <input v-model="selectedLayer.text" type="text" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 outline-none transition-colors">
                    </div>

                    <div>
                        <label class="flex justify-between text-[10px] font-bold text-slate-400 mb-2">Size <span class="text-slate-900 dark:text-white">{{ selectedLayer.size }}px</span></label>
                        <input v-model.number="selectedLayer.size" type="range" min="10" max="800" class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600">
                    </div>

                    <div>
                        <label class="flex justify-between text-[10px] font-bold text-slate-400 mb-2">Rotation <span class="text-slate-900 dark:text-white">{{ selectedLayer.rotation }}°</span></label>
                        <input v-model.number="selectedLayer.rotation" type="range" min="0" max="360" class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600">
                    </div>

                    <div v-if="selectedLayer.type !== 'image'">
                        <label class="text-[10px] font-bold text-slate-400 block mb-2">Color</label>
                        <div class="flex gap-2">
                            <div class="relative w-10 h-10 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                                <input type="color" v-model="selectedLayer.color" class="absolute -top-2 -left-2 w-16 h-16 cursor-pointer p-0 border-0">
                            </div>
                            <input type="text" v-model="selectedLayer.color" class="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-mono uppercase focus:border-indigo-500 outline-none">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div>
                            <label class="text-[10px] font-bold text-slate-400 block mb-1">X Pos</label>
                            <input v-model.number="selectedLayer.x" type="number" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs">
                        </div>
                        <div>
                            <label class="text-[10px] font-bold text-slate-400 block mb-1">Y Pos</label>
                            <input v-model.number="selectedLayer.y" type="number" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs">
                        </div>
                    </div>

                    <button @click="removeLayer(selectedLayer.id)" class="w-full mt-4 py-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2">
                        <FluxIcon name="trash-2" size="14" /> Delete Layer
                    </button>
                </div>

                <div v-else class="flex flex-col items-center justify-center h-full text-center opacity-40">
                    <div class="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                        <FluxIcon name="hand-open" size="32" class="text-slate-400" />
                    </div>
                    <p class="text-xs font-bold text-slate-500">Select an element to edit</p>
                </div>

            </aside>

        </div>

    </div>

    <section class="max-w-4xl mx-auto px-6">
        <div class="prose prose-slate dark:prose-invert max-w-none">
            <h2 class="text-3xl font-black text-center mb-8">Why Use Flux Studio Pro?</h2>
            
            <div class="grid md:grid-cols-2 gap-8 mb-12">
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h3 class="text-xl font-bold mb-2 flex items-center gap-2">
                        <FluxIcon name="image" class="text-indigo-500" /> Open Graph Generator
                    </h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        Stop struggling with generic OG images. Create branded cover images for your blog posts, documentation, and marketing pages in seconds. Export in optimal 1200x630 resolution.
                    </p>
                </div>
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h3 class="text-xl font-bold mb-2 flex items-center gap-2">
                        <FluxIcon name="user-circle" class="text-pink-500" /> Vector Stickers
                    </h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        Design custom stickers for Discord, Slack, or Telegram. Combine Flux Icons with text, rotate them, change colors, and export as transparent PNGs or scalable SVGs.
                    </p>
                </div>
            </div>

            <h3 class="text-2xl font-bold mb-4">How to create a professional banner?</h3>
            <ol class="list-decimal pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                <li><strong>Choose Canvas Size:</strong> Select 'OG Cover' for social media or 'Twitter Header' for profiles.</li>
                <li><strong>Set Background:</strong> Use a solid brand color or upload your own background image.</li>
                <li><strong>Add Assets:</strong> Drag and drop Flux Icons onto the canvas. Use the search bar to find the perfect symbol.</li>
                <li><strong>Customize:</strong> Click on any layer to adjust size, rotation, color, and position.</li>
                <li><strong>Export:</strong> Click 'Export' and choose between PNG (for web) or SVG (for further editing).</li>
            </ol>
        </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useFluxIcons } from '@/composables/useFluxIcons';

useHead({
  title: 'Flux Studio Pro | Free Open Graph & Banner Generator',
  meta: [
    { name: 'description', content: 'Create professional social media banners, OG images, and vector stickers online using Flux Icons. Free SVG export, no signup required.' },
    { name: 'keywords', content: 'og image generator, banner maker, svg editor, open graph creator, flux icons studio' }
  ]
});

const { icons } = useFluxIcons();
const allKeys = Object.keys(icons);

// --- STATE ---
const activeTab = ref('assets');
const searchQuery = ref('');
const previewScale = ref(1);
const exportFormat = ref('png');
const canvasContainer = ref(null);


const visibleIconLimit = ref(50); // Başlangıçta kaç ikon gösterilecek?

// --- COMPUTED ---
// 1. Önce tüm ikonları filtrele (Search'e göre)
const allFilteredIcons = computed(() => {
    if (!searchQuery.value) return allKeys;
    return allKeys.filter(k => k.includes(searchQuery.value.toLowerCase()));
});

// 2. Sonra sadece görünen kısmını (Limit kadarını) DOM'a ver
const displayedIcons = computed(() => {
    return allFilteredIcons.value.slice(0, visibleIconLimit.value);
});

// --- ACTIONS ---
// Scroll olayını dinleyip limit artıracak fonksiyon
const loadMoreIcons = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    // Listenin sonuna yaklaşıldıysa (50px kala)
    if (scrollTop + clientHeight >= scrollHeight - 50) {
        if (visibleIconLimit.value < allFilteredIcons.value.length) {
            visibleIconLimit.value += 50; // 50 tane daha yükle
        }
    }
};

// Arama yapıldığında limiti sıfırla
watch(searchQuery, () => {
    visibleIconLimit.value = 50;
});


const canvas = ref({
    width: 1200,
    height: 630,
    bgColor: '#ffffff',
    bgImage: null
});

const layers = ref([]);
const selectedLayerId = ref(null);

// --- PRESETS ---
const presets = [
    { name: 'OG Cover', w: 1200, h: 630 },
    { name: 'Twitter Header', w: 1500, h: 500 },
    { name: 'Instagram Post', w: 1080, h: 1080 },
    { name: 'Icon / Logo', w: 512, h: 512 }
];

// --- COMPUTED ---
const filteredIcons = computed(() => {
    if (!searchQuery.value) return allKeys.slice(0, 100);
    return allKeys.filter(k => k.includes(searchQuery.value.toLowerCase())).slice(0, 100);
});

const selectedLayer = computed(() => layers.value.find(l => l.id === selectedLayerId.value));

// --- HELPER: ICON CONTENT PARSER ---
const getIconContent = (iconName) => {
    let raw = icons[iconName];
    if (!raw) return '';
    if (raw.includes('<svg')) {
        return raw.replace(/<svg[^>]*>|<\/svg>/g, ""); 
    }
    return raw;
};

// --- AUTO FIT LOGIC ---
const fitToScreen = () => {
    if (!canvasContainer.value) return;
    const containerW = canvasContainer.value.clientWidth - 64; 
    const containerH = canvasContainer.value.clientHeight - 64;
    const scaleW = containerW / canvas.value.width;
    const scaleH = containerH / canvas.value.height;
    previewScale.value = Math.min(scaleW, scaleH, 1) * 0.95; 
};

// --- ACTIONS ---
let idCounter = 0;

const addIconLayer = (iconName) => {
    layers.value.push({
        id: ++idCounter,
        type: 'icon',
        content: iconName,
        x: canvas.value.width / 2 - 50,
        y: canvas.value.height / 2 - 50,
        size: 100,
        color: '#4f46e5',
        rotation: 0,
        zIndex: layers.value.length + 1
    });
    selectedLayerId.value = idCounter;
};

const addTextLayer = () => {
    layers.value.push({
        id: ++idCounter,
        type: 'text',
        text: 'FLUX STUDIO',
        x: canvas.value.width / 2 - 150,
        y: canvas.value.height / 2,
        size: 64,
        color: '#1e293b',
        rotation: 0,
        zIndex: layers.value.length + 1
    });
    selectedLayerId.value = idCounter;
};

const handleBgUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        canvas.value.bgImage = ev.target.result;
    };
    reader.readAsDataURL(file);
};

const removeLayer = (id) => {
    layers.value = layers.value.filter(l => l.id !== id);
    if (selectedLayerId.value === id) selectedLayerId.value = null;
};

const selectLayer = (id) => {
    selectedLayerId.value = id;
};

const deselectLayer = () => {
    selectedLayerId.value = null;
};

const applyPreset = (p) => {
    canvas.value.width = p.w;
    canvas.value.height = p.h;
    nextTick(() => fitToScreen());
};

const resetCanvas = () => {
    if(confirm('Clear all layers?')) {
        layers.value = [];
        canvas.value.bgColor = '#ffffff';
        canvas.value.bgImage = null;
    }
};

// --- DRAG & DROP LOGIC ---
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let activeLayerInitial = { x: 0, y: 0 };

const startDrag = (e, layer) => {
    e.preventDefault(); 
    selectLayer(layer.id);
    isDragging = true;
    dragStart = { x: e.clientX, y: e.clientY };
    activeLayerInitial = { x: layer.x, y: layer.y };
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
};

const onDrag = (e) => {
    if (!isDragging || !selectedLayer.value) return;
    const deltaX = (e.clientX - dragStart.x) / previewScale.value;
    const deltaY = (e.clientY - dragStart.y) / previewScale.value;
    selectedLayer.value.x = activeLayerInitial.x + deltaX;
    selectedLayer.value.y = activeLayerInitial.y + deltaY;
};

const stopDrag = () => {
    isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
};
// --- EXPORT LOGIC ---
const downloadCanvas = () => {
    const node = document.getElementById('flux-canvas');
    if (!node) return;

    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(node);
    
    // --- FIX: XML/SVG STANDARDİZASYONU ---
    
    // 1. Namespace Eksikse Ekle
    if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
        source = source.replace(/^<div/, '<svg xmlns="http://www.w3.org/2000/svg"'); 
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    // 2. "linear" Hatasını Düzelt (Senin aldığın hata)
    // Hatalı: <animate ... linear ... />
    // Doğru:  <animate ... calcMode="linear" ... />
    source = source.replace(/\slinear(?=[\s>])/g, ' calcMode="linear"');

    // 3. "infinite" Hatasını Düzelt (Sık çıkar)
    // Hatalı: <animate ... infinite ... />
    // Doğru:  <animate ... repeatCount="indefinite" ... />
    source = source.replace(/\sinfinite(?=[\s>])/g, ' repeatCount="indefinite"');

    // 4. Div artıklarını temizle (Eğer serializer div'i aldıysa)
    if (source.startsWith('<div')) {
         // Bu nadir olur ama güvenlik önlemi
         source = source.replace('<div', '<svg').replace('</div>', '</svg>');
    }

    // --- GENERATE ---

    // Basit Mod: SVG stringine çevir (Canvas yapısını koruyarak)
    // Ancak yukarıdaki serializer zaten DOM'u aldı. Bizim manuel SVG oluşturma mantığımız
    // yerine, DOM'dan gelen temizlenmiş source'u kullanmak daha güvenli olabilir.
    // FAKAT senin kodunda manuel bir yapı kurmuştuk (layers döngüsü).
    // Eğer o yapıyı kullanıyorsan, 'getIconContent' içinden gelen veriyi de temizlemeliyiz.
    
    // YUKARIDAKİ DÜZELTME YETMEZSE, MANUEL OLUŞTURDUĞUMUZ KISMI DA DÜZELTELİM:
    
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.value.width}" height="${canvas.value.height}" viewBox="0 0 ${canvas.value.width} ${canvas.value.height}" style="background-color:${canvas.value.bgColor}">`;
    
    if (canvas.value.bgImage) {
        svgContent += `<image href="${canvas.value.bgImage}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />`;
    }

    layers.value.forEach(l => {
        const transform = `translate(${l.x} ${l.y}) rotate(${l.rotation} ${l.type==='text'?0:l.size/2} ${l.type==='text'?0:l.size/2})`;
        
        if (l.type === 'icon') {
            // İkon içeriğini al
            let path = getIconContent(l.content);
            
            // 🔥 BURASI KRİTİK: İkon verisi ham geldiği için burada da temizliyoruz
            path = path.replace(/\slinear(?=[\s>])/g, ' calcMode="linear"');
            path = path.replace(/\sinfinite(?=[\s>])/g, ' repeatCount="indefinite"');

            svgContent += `<g transform="${transform}" color="${l.color}"><svg width="${l.size}" height="${l.size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${path}</svg></g>`;
        } else if (l.type === 'text') {
            svgContent += `<text transform="${transform}" font-family="sans-serif" font-weight="900" font-size="${l.size}" fill="${l.color}" dominant-baseline="hanging">${l.text}</text>`;
        }
    });
    
    svgContent += `</svg>`;

    // İNDİRME İŞLEMİ
    if (exportFormat.value === 'svg') {
        const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgContent);
        triggerDownload(url, 'svg');
    } else {
        const img = new Image();
        // SVG içeriğini Data URL'e çevirirken de encode etmeliyiz
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgContent);
        img.onload = () => {
            const c = document.createElement('canvas');
            c.width = canvas.value.width;
            c.height = canvas.value.height;
            const ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const mime = exportFormat.value === 'jpeg' ? 'image/jpeg' : 'image/png';
            triggerDownload(c.toDataURL(mime, 0.9), exportFormat.value);
        };
    }
};

const triggerDownload = (url, ext) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `flux-design.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

onMounted(() => {
    window.addEventListener('resize', fitToScreen);
    nextTick(() => fitToScreen());
});
onUnmounted(() => {
    window.removeEventListener('resize', fitToScreen);
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
</style>