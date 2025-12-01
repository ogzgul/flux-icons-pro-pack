<script setup>
import { ref, computed } from 'vue';
import { useFluxIcons } from '@/composables/useFluxIcons';

// --- SEO & META AYARLARI (KRİTİK KISIM) ---
useHead({ 
    title: 'Free SVG Viewer & Image to SVG & Base64 Converter | Flux Tools',
    meta: [
        { name: 'description', content: 'Use our free developer tools to convert PNG/JPG images to SVG Data URI strings and preview SVG code instantly. Secure, client-side, and fast.' },
        { name: 'keywords', content: 'svg viewer, image to base64, data uri converter, online svg editor, png to svg code, developer tools, flux icons' },
        // Open Graph (Sosyal Medya Paylaşımı İçin)
        { property: 'og:title', content: 'Flux Tools - Developer Utilities' },
        { property: 'og:description', content: 'Convert images to code and preview SVGs instantly.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://flux-icon.com/tools' },
    ],
    // Google'a "Bu bir Web Uygulamasıdır" diyoruz (Schema)
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Flux Developer Tools",
                "applicationCategory": "DeveloperApplication",
                "operatingSystem": "Web",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "description": "A suite of free online tools for developers including Image to Base64 converter and SVG Code Viewer."
            })
        }
    ]
});

// --- TOOL 1: IMAGE TO DATA URI ---
const uploadedImage = ref(null);
const dataUri = ref('');
const isDragging = ref(false);
const copiedUri = ref(false);
const outputFormat = ref('svg'); // base64, img, svg
const imgDim = ref({ w: 0, h: 0 });

const handleFileUpload = (event) => {
    const file = event.target.files?.[0] || event.dataTransfer?.files?.[0];
    if (file) processFile(file);
};

const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const res = e.target.result;
        dataUri.value = res;
        uploadedImage.value = { name: file.name, size: (file.size / 1024).toFixed(2) + ' KB' };
        const i = new Image();
        i.onload = () => { imgDim.value = { w: i.width, h: i.height }; };
        i.src = res;
    };
    reader.readAsDataURL(file);
};

// Çıktı Formatını Ayarla
const generatedOutput = computed(() => {
    if (!dataUri.value) return '';
    if (outputFormat.value === 'img') return `<img src="${dataUri.value}" alt="${uploadedImage.value?.name}" width="${imgDim.value.w}" height="${imgDim.value.h}" />`;
    if (outputFormat.value === 'svg') return `<svg width="${imgDim.value.w}" height="${imgDim.value.h}" viewBox="0 0 ${imgDim.value.w} ${imgDim.value.h}" xmlns="http://www.w3.org/2000/svg">\n  <image href="${dataUri.value}" width="${imgDim.value.w}" height="${imgDim.value.h}" />\n</svg>`;
    return dataUri.value;
});

const copyDataUri = () => {
    navigator.clipboard.writeText(generatedOutput.value);
    copiedUri.value = true;
    setTimeout(() => copiedUri.value = false, 2000);
};

// --- TOOL 2: SVG VIEWER ---
const svgInput = ref(`<svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="12" cy="12" r="10" />\n  <path d="M8 14s1.5 2 4 2 4-2 4-2" />\n  <line x1="9" y1="9" x2="9.01" y2="9" />\n  <line x1="15" y1="9" x2="15.01" y2="9" />\n</svg>`);
const svgError = ref(false);

const previewSvg = computed(() => {
    svgError.value = false;
    if (!svgInput.value.trim()) return '';
    if (!svgInput.value.includes('<svg')) {
        svgError.value = true;
        return '';
    }
    return svgInput.value;
});
// Hata Durumunu Sürekli Takip Eden Değişken
const hasSvgError = computed(() => {
    const code = svgInput.value.trim();
    if (!code) return false; // Boşsa hata yok (sadece boş görünür)
    // Basit Doğrulama: İçinde <svg ve > var mı?
    return !(code.toLowerCase().includes('<svg') && code.includes('>'));
});
const formatSvg = () => {
    const formatted = svgInput.value
        .replace(/>\s*</g, '>\n<') // Tagleri alt alta al
        .replace(/\s{2,}/g, ' ')    // Fazla boşlukları sil
        .trim();
    svgInput.value = formatted;
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
    <div class="max-w-6xl mx-auto space-y-16">
        
        <div class="text-center space-y-4">
            <h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                Flux <span class="text-indigo-600 dark:text-indigo-400">Tools</span>
            </h1>
            <p class="text-lg text-slate-600 dark:text-slate-400">
                Free developer utilities: Image to Base64 Converter & SVG Viewer.
            </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
            
            <div class="space-y-6">
                <div class="flex items-center gap-3">
                    <div class="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600">
                        <FluxIcon name="file-image" size="24" />
                    </div>
                    <div>
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white">Image to Data URI</h2>
                        <p class="text-xs text-slate-500">Convert PNG/JPG to SVG & Base64 string.</p>
                    </div>
                </div>

                <div class="border-2 border-dashed rounded-3xl p-8 text-center transition-all relative group"
                    :class="isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 bg-white dark:bg-slate-900'"
                    @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @drop.prevent="isDragging = false; handleFileUpload($event)">
                    <input type="file" accept="image/*" @change="handleFileUpload" class="absolute inset-0 opacity-0 cursor-pointer z-20" />
                    
                    <div v-if="!dataUri" class="flex flex-col items-center gap-3 py-8">
                        <div class="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 group-hover:text-indigo-500 group-hover:scale-110 transition-all">
                            <FluxIcon name="upload-cloud" size="32" />
                        </div>
                        <p class="text-sm font-medium text-slate-600 dark:text-slate-300">Drag & Drop or <span class="text-indigo-500">Browse</span></p>
                        <p class="text-xs text-slate-400">PNG, JPG, GIF, WEBP</p>
                    </div>

                    <div v-else class="flex flex-col items-center gap-4">
                        <img :src="dataUri" class="h-32 object-contain bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-2 shadow-sm" />
                        <div class="text-xs text-slate-500">
                            <p class="font-bold text-slate-900 dark:text-white">{{ uploadedImage.name }}</p>
                            <p>{{ uploadedImage.size }} • {{ imgDim.w }}x{{ imgDim.h }}px</p>
                        </div>
                        <button @click="dataUri = null; uploadedImage = null" class="text-xs text-rose-500 hover:underline z-30 relative">Remove</button>
                    </div>
                </div>

                <div v-if="dataUri" class="bg-slate-900 rounded-2xl p-1 border border-slate-800 animate-fade-in">
                    <div class="flex border-b border-slate-800 p-1 gap-1">
                        <button v-for="fmt in ['base64', 'img', 'svg']" :key="fmt" @click="outputFormat=fmt" class="flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all" :class="outputFormat===fmt ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'">{{ fmt }}</button>
                    </div>
                    <div class="p-4 relative group">
                        <textarea readonly class="w-full h-32 bg-transparent text-slate-400 text-[10px] font-mono outline-none resize-none custom-scrollbar">{{ generatedOutput }}</textarea>
                        <button @click="copyDataUri" class="absolute top-2 right-2 bg-slate-800 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                            <FluxIcon v-if="copiedUri" name="check" size="14" class="text-emerald-500" />
                            <FluxIcon v-else name="copy" size="14" />
                        </button>
                    </div>
                </div>
            </div>

            <div class="space-y-6">
                <div class="flex items-center gap-3">
                    <div class="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600">
                        <FluxIcon name="liquid-code-brackets" size="24" />
                    </div>
                    <div>
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white">SVG Viewer</h2>
                        <p class="text-xs text-slate-500">Paste code to preview instantly.</p>
                    </div>
                </div>

                <div class="grid grid-rows-[1fr_auto] h-[500px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
                   <div class="relative flex items-center justify-center bg-slate-50 dark:bg-slate-950/50 p-8 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
                         <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 20px 20px;"></div>
                         
                         <div v-if="!hasSvgError" v-html="svgInput" class="w-full h-full flex items-center justify-center text-indigo-600 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-[200px] [&>svg]:max-h-[200px] transition-all"></div>
                         
                         <div v-else class="flex flex-col items-center text-rose-500 gap-2 animate-bounce">
                             <FluxIcon name="alert-octagon" size="32" />
                             <span class="text-sm font-bold">Invalid SVG Code</span>
                         </div>
                    </div>
                    <div class="bg-slate-900 p-0 flex flex-col h-1/2">
                        <div class="flex justify-between items-center px-4 py-2 border-b border-slate-800 bg-slate-950">
                            <span class="text-[10px] font-bold text-slate-500 uppercase">Source Code</span>
                            <button @click="formatSvg" class="text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded transition-colors">Prettify</button>
                        </div>
                        <textarea v-model="svgInput" placeholder="Paste your <svg> code here..." class="w-full h-full bg-slate-900 text-blue-300 text-xs font-mono p-4 outline-none resize-none custom-scrollbar leading-relaxed"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <section class="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 max-w-4xl mx-auto text-center md:text-left">
            <div class="grid md:grid-cols-2 gap-12">
                <div class="space-y-4">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white">Why use Image to Base64?</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Converting images to <strong>Base64 Data URI</strong> reduces HTTP requests, making your website load faster. It allows you to embed small images directly into HTML or CSS files without needing separate image files.
                    </p>
                </div>
                <div class="space-y-4">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white">About SVG Viewer</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Our <strong>Online SVG Viewer</strong> helps developers debug and preview SVG code instantly. Paste your code, see the result, and format it with one click. Perfect for icons, logos, and vector graphics.
                    </p>
                </div>
            </div>
        </section>

    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; border-radius: 4px; }
.animate-fade-in { animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>