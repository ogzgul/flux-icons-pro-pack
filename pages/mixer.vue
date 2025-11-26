<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useFluxIcons } from '@/composables/useFluxIcons';

// --- SAYFA BAŞLIĞI ---
useHead({
  title: 'Mixer'
});


const { icons } = useFluxIcons();

// --- STATE ---
const searchQueryBase = ref('folder'); 
const searchQueryBadge = ref('plus');  
const badgePosition = ref('bottom-right'); 

const settings = ref({
    baseColor: '#6366f1',
    badgeColor: '#ef4444',
    size: 128,
    baseStroke: 2,
    badgeStroke: 2,
    badgeScale: 0.45,
    badgeX: 13,
    badgeY: 13
});

// --- INFINITE SCROLL ---
const baseLimit = ref(60);
const badgeLimit = ref(60);
const allIconNames = Object.keys(icons);

const baseList = computed(() => {
    const query = searchQueryBase.value.toLowerCase();
    let result = allIconNames;
    if (query) result = result.filter(n => n.includes(query));
    return result.slice(0, baseLimit.value);
});

const badgeList = computed(() => {
    const query = searchQueryBadge.value.toLowerCase();
    let result = allIconNames;
    if (query) result = result.filter(n => n.includes(query));
    return result.slice(0, badgeLimit.value);
});

const handleBaseScroll = (e) => {
    if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 50) baseLimit.value += 60;
};
const handleBadgeScroll = (e) => {
    if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 50) badgeLimit.value += 60;
};

watch(searchQueryBase, () => { baseLimit.value = 60; });
watch(searchQueryBadge, () => { badgeLimit.value = 60; });

// DEFAULT SELECTED ICONS
const selectedBase = ref('folder');
const selectedBadge = ref('plus-heavy');

const isSolid = (content) => {
    if (!content) return false;
    return content.includes('fill=') && !content.includes('fill="none"') || content.includes('stroke="none"');
};

const getRawContent = (name) => {
    let content = icons[name] || "";
    return content.replace(/<svg[^>]*>|<\/svg>/g, '');
};

const badgeTransform = computed(() => {
    const scale = settings.value.badgeScale;
    return `translate(${settings.value.badgeX}, ${settings.value.badgeY}) scale(${scale})`;
});

const finalSvgCode = computed(() => {
    let baseContent = getRawContent(selectedBase.value);
    let badgeContent = getRawContent(selectedBadge.value);
    
    if (!baseContent) baseContent = '<path d="" />'; 
    if (!badgeContent) badgeContent = '<path d="" />';

    const baseIsSolid = isSolid(baseContent);
    const badgeIsSolid = isSolid(badgeContent);

    baseContent = baseContent.replaceAll('currentColor', settings.value.baseColor);
    badgeContent = badgeContent.replaceAll('currentColor', settings.value.badgeColor);

    const baseStyle = baseIsSolid 
        ? `fill="${settings.value.baseColor}" stroke="none"` 
        : `fill="none" stroke="${settings.value.baseColor}" stroke-width="${settings.value.baseStroke}" stroke-linecap="round" stroke-linejoin="round"`;

    const badgeStyle = badgeIsSolid
        ? `fill="${settings.value.badgeColor}" stroke="none"`
        : `fill="none" stroke="${settings.value.badgeColor}" stroke-width="${settings.value.badgeStroke}" stroke-linecap="round" stroke-linejoin="round"`;

    return `<svg width="${settings.value.size}" height="${settings.value.size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g ${baseStyle}>
    ${baseContent}
  </g>
  <g transform="${badgeTransform.value}">
     <g ${badgeStyle}>
        ${badgeContent}
     </g>
  </g>
</svg>`;
});

const copyCode = () => {
    navigator.clipboard.writeText(finalSvgCode.value);
    alert('SVG Copied!');
};

const centerBadge = () => {
    settings.value.badgeX = 6;
    settings.value.badgeY = 6;
};

// Pozisyon butonları için X/Y güncelleme
const setPosition = (pos) => {
    const scale = settings.value.badgeScale;
    const offset = 24 * (1 - scale);
    
    if(pos === 'tl') { settings.value.badgeX = 0; settings.value.badgeY = 0; }
    if(pos === 'tr') { settings.value.badgeX = offset; settings.value.badgeY = 0; }
    if(pos === 'bl') { settings.value.badgeX = 0; settings.value.badgeY = offset; }
    if(pos === 'br') { settings.value.badgeX = offset; settings.value.badgeY = offset; }
    if(pos === 'center') { settings.value.badgeX = offset/2; settings.value.badgeY = offset/2; }
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
    
    <div class="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
            <h1 class="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <span class="bg-indigo-600 text-white p-2 rounded-lg"><FluxIcon name="layers-floating" size="24" /></span>
                Flux Icon Mixer
            </h1>
            <p class="text-slate-500 mt-2 text-sm">Combine two icons, customize colors, and generate unique SVG.</p>
        </div>
        <NuxtLink to="/" class="text-sm font-bold text-indigo-600 hover:text-indigo-500 flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <FluxIcon name="arrow-left-circle" size="20" /> Back to Home
        </NuxtLink>
    </div>

    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div class="lg:col-span-4 space-y-6">
            <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <label class="text-xs font-bold text-slate-400 uppercase mb-3 block">1. Base Icon</label>
                <div class="relative mb-3">
                    <FluxIcon name="search" size="16" class="absolute left-3 top-3 text-slate-400" />
                    <input v-model="searchQueryBase" type="text" placeholder="Search: folder..." class="w-full bg-slate-100 dark:bg-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 ring-indigo-500">
                </div>
                <div class="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto custom-scrollbar pr-1" @scroll="handleBaseScroll">
                    <button v-for="name in baseList" :key="name" @click="selectedBase=name" 
                        class="p-2 rounded-lg transition-all flex justify-center aspect-square items-center group relative"
                        :class="selectedBase===name ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-offset-2 ring-indigo-500 dark:ring-offset-slate-900' : 'hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-500 dark:text-slate-400'">
                        <FluxIcon :name="name" size="24" />
                    </button>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <label class="text-xs font-bold text-slate-400 uppercase mb-3 block">2. Badge Icon</label>
                <div class="relative mb-3">
                    <FluxIcon name="search" size="16" class="absolute left-3 top-3 text-slate-400" />
                    <input v-model="searchQueryBadge" type="text" placeholder="Search: plus..." class="w-full bg-slate-100 dark:bg-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 ring-indigo-500">
                </div>
                <div class="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto custom-scrollbar pr-1" @scroll="handleBadgeScroll">
                    <button v-for="name in badgeList" :key="name" @click="selectedBadge=name" 
                        class="p-2 rounded-lg transition-all flex justify-center aspect-square items-center group relative"
                        :class="selectedBadge===name ? 'bg-pink-600 text-white shadow-lg ring-2 ring-offset-2 ring-pink-500 dark:ring-offset-slate-900' : 'hover:bg-pink-50 dark:hover:bg-pink-900/30 text-slate-500 dark:text-slate-400'">
                        <FluxIcon :name="name" size="20" />
                    </button>
                </div>
            </div>
        </div>

        <div class="lg:col-span-8 flex flex-col gap-6">
            
            <div class="bg-slate-200 border border-slate-300 dark:border-slate-700 rounded-3xl p-8 shadow-xl flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden">
                <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#94a3b8 1px, transparent 1px); background-size: 20px 20px;"></div>
                <div class="relative transition-all duration-300 z-10 drop-shadow-xl" v-html="finalSvgCode"></div>
                
                <div class="absolute bottom-4 flex gap-2 bg-white border border-slate-200 p-1 rounded-lg z-20 shadow-sm">
                    <button @click="setPosition('tl')" class="p-2 hover:bg-slate-100 rounded text-slate-500" title="Top Left">↖</button>
                    <button @click="setPosition('tr')" class="p-2 hover:bg-slate-100 rounded text-slate-500" title="Top Right">↗</button>
                    <button @click="setPosition('center')" class="p-2 hover:bg-slate-100 rounded text-slate-500" title="Center">•</button>
                    <button @click="setPosition('bl')" class="p-2 hover:bg-slate-100 rounded text-slate-500" title="Bottom Left">↙</button>
                    <button @click="setPosition('br')" class="p-2 hover:bg-slate-100 rounded text-indigo-600 font-bold bg-slate-50" title="Bottom Right">↘</button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5">
                    
                    <div class="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div>
                            <label class="text-[10px] font-bold text-slate-400 uppercase block">Base Color</label>
                            <div class="flex items-center gap-2 mt-1">
                                <div class="w-6 h-6 rounded-full border shadow-sm" :style="{background: settings.baseColor}"></div>
                                <input type="color" v-model="settings.baseColor" class="w-8 h-8 opacity-0 absolute cursor-pointer" />
                                <span class="text-xs font-mono text-slate-600 dark:text-slate-400">{{ settings.baseColor }}</span>
                            </div>
                        </div>
                        <div>
                            <label class="text-[10px] font-bold text-slate-400 uppercase block">Badge Color</label>
                             <div class="flex items-center gap-2 mt-1">
                                <div class="w-6 h-6 rounded-full border shadow-sm" :style="{background: settings.badgeColor}"></div>
                                <input type="color" v-model="settings.badgeColor" class="w-8 h-8 opacity-0 absolute cursor-pointer" />
                                <span class="text-xs font-mono text-slate-600 dark:text-slate-400">{{ settings.badgeColor }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                        <div>
                            <label class="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">Position X</label>
                            <input v-model="settings.badgeX" type="range" min="-5" max="20" step="0.5" class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                        </div>
                        <div>
                            <label class="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">Position Y</label>
                            <input v-model="settings.badgeY" type="range" min="-5" max="20" step="0.5" class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                        </div>
                        <button @click="centerBadge" class="col-span-2 text-xs text-indigo-500 hover:text-indigo-600 font-medium mt-1 text-center w-full">Reset to Center</button>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                         <div>
                            <label class="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">Base Stroke</label>
                            <input v-model="settings.baseStroke" type="range" min="0.5" max="4" step="0.1" class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                        </div>
                        <div>
                            <label class="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">Badge Stroke</label>
                            <input v-model="settings.badgeStroke" type="range" min="0.5" max="4" step="0.1" class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500" />
                        </div>
                    </div>
                    
                    <div>
                        <label class="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">Badge Scale (%{{ Math.round(settings.badgeScale * 100) }})</label>
                        <input v-model="settings.badgeScale" type="range" min="0.2" max="1.0" step="0.05" class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500" />
                    </div>

                    <div>
                        <label class="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">Output Size ({{settings.size}}px)</label>
                        <input v-model="settings.size" type="range" min="32" max="512" class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                    </div>
                </div>

                <div class="bg-slate-950 text-slate-300 p-5 rounded-2xl font-mono text-xs relative group overflow-hidden flex flex-col">
                    <div class="overflow-auto custom-scrollbar h-full pb-10 whitespace-pre-wrap">
                        {{ finalSvgCode }}
                    </div>
                    <div class="absolute bottom-0 left-0 w-full p-4 bg-slate-950/90 backdrop-blur-sm flex justify-end border-t border-slate-800">
                        <button @click="copyCode" class="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors font-bold shadow-lg flex items-center gap-2">
                            <FluxIcon name="copy" size="16" /> Copy SVG
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>