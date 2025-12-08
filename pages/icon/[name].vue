<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
    
    <div class="max-w-5xl mx-auto" v-if="iconSvg">
      
      <nav class="flex text-sm text-slate-500 mb-8">
        <NuxtLink to="/" class="hover:text-indigo-500">Home</NuxtLink>
        <span class="mx-2">/</span>
        <span class="capitalize">{{ category }} Icons</span>
        <span class="mx-2">/</span>
        <span class="text-slate-900 dark:text-slate-200 font-bold">{{ iconName }}</span>
      </nav>

      <div class="grid md:grid-cols-2 gap-12">
        
        <div class="space-y-6">
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 flex items-center justify-center shadow-sm relative group overflow-hidden h-80">
            <div class="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
            
            <FluxIcon :name="iconName" :size="128" class="text-slate-900 dark:text-white relative z-10 drop-shadow-xl transition-transform duration-300 group-hover:scale-110" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button @click="copySvg" class="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/20 active:scale-95">
              <FluxIcon name="copy" size="20" /> Copy SVG
            </button>
            <button @click="downloadSvg" class="flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white py-3 rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors active:scale-95">
              <FluxIcon name="download-cloud" size="20" /> Download
            </button>
          </div>
        </div>

        <div class="prose prose-slate dark:prose-invert">
          <h1 class="text-3xl font-black capitalize mb-2 leading-tight">
            {{ iconTitle }} Icon
          </h1>
          <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Download the free <strong>{{ iconTitle }}</strong> vector icon. Optimized for web and mobile apps, this high-quality SVG icon is part of the <strong>{{ category }}</strong> collection in the Flux Icons library.
          </p>

          <h3>Icon Details</h3>
          <ul class="not-prose space-y-2 mb-6 text-sm">
            <li class="flex justify-between border-b border-slate-200 dark:border-slate-800 py-2">
              <span class="text-slate-500">Style</span>
              <span class="font-medium capitalize text-slate-900 dark:text-white">{{ style }}</span>
            </li>
            <li class="flex justify-between border-b border-slate-200 dark:border-slate-800 py-2">
              <span class="text-slate-500">Category</span>
              <span class="font-medium capitalize text-slate-900 dark:text-white">{{ category }}</span>
            </li>
            <li class="flex justify-between border-b border-slate-200 dark:border-slate-800 py-2">
              <span class="text-slate-500">License</span>
              <span class="font-medium text-slate-900 dark:text-white">MIT (Open Source)</span>
            </li>
          </ul>

          <h3>Usage in Vue & Nuxt</h3>
          <p>You can use this icon directly in your project using the FluxIcon component:</p>
          <div class="relative group">
             <pre class="bg-slate-900 text-slate-300 rounded-lg p-4 text-sm overflow-x-auto"><code>&lt;FluxIcon name="{{ iconName }}" size="24" /&gt;</code></pre>
          </div>

          <h3>Description</h3>
          <p>
            The {{ iconTitle }} icon represents {{ keywords }}. It is designed with a {{ style }} aesthetic, making it perfect for modern user interfaces, dashboards, and mobile applications requiring a clean and professional look. Like all Flux Icons, it fully supports tree-shaking and CSS styling customization.
          </p>
        </div>

      </div>

      <div class="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
        <h3 class="text-xl font-bold mb-6 text-slate-900 dark:text-white">Related Icons</h3>
        <div class="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
           <NuxtLink 
             v-for="rel in relatedIcons" 
             :key="rel" 
             :to="`/icon/${rel}`"
             class="flex-shrink-0 w-24 h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center hover:border-indigo-500 hover:shadow-lg transition-all group"
           >
             <FluxIcon :name="rel" size="32" class="text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 group-hover:scale-110 transition-all" />
           </NuxtLink>
        </div>
      </div>

    </div>
    
    <div v-else class="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div class="p-6 bg-slate-100 dark:bg-slate-900 rounded-full mb-4">
            <FluxIcon name="search-x" size="48" class="text-slate-400" />
        </div>
        <h1 class="text-4xl font-bold text-slate-900 dark:text-white mb-2">Icon Not Found</h1>
        <p class="text-slate-500 mb-6">The icon you are looking for does not exist or has been moved.</p>
        <NuxtLink to="/" class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors">Go Home</NuxtLink>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useFluxIcons } from '@/composables/useFluxIcons';

const route = useRoute();
const { icons } = useFluxIcons();
const iconName = route.params.name;
const iconSvg = icons[iconName];

// --- SEO TEXT GENERATOR ---
const iconTitle = computed(() => iconName ? iconName.replace(/-/g, ' ') : '');

const category = computed(() => {
    if (!iconName) return '';
    if (iconName.startsWith('aero')) return 'Aero Glass';
    if (iconName.startsWith('liquid')) return 'Liquid';
    if (iconName.includes('arrow')) return 'Arrows';
    if (iconName.includes('user')) return 'Users';
    if (iconName.includes('file')) return 'Files';
    return 'General UI';
});

const style = computed(() => {
    if (!iconName) return '';
    if (iconName.includes('outline')) return 'Outline';
    if (iconName.includes('solid') || iconName.includes('fill')) return 'Solid';
    if (iconName.startsWith('aero')) return '3D Glass';
    return 'Vector';
});

const keywords = computed(() => {
    if (!iconName) return '';
    const words = iconName.split('-');
    return words.join(', ') + ', vector, svg, icon, vue icon, nuxt icon';
});

// --- RELATED ICONS LOGIC ---
const relatedIcons = computed(() => {
    if (!iconSvg) return [];
    
    // İkonun kök ismini bul (örn: aero-home -> home)
    let root = iconName;
    if (iconName.startsWith('aero-')) root = iconName.replace('aero-', '');
    else if (iconName.startsWith('liquid-')) root = iconName.replace('liquid-', '');
    
    root = root.split('-')[0]; // İlk kelimeyi al (örn: arrow-left -> arrow)

    return Object.keys(icons)
        .filter(k => k.includes(root) && k !== iconName)
        .slice(0, 10);
});

// --- SVG DÜZELTİCİ VE SARMALAYICI FONKSİYON (HATAYI ÇÖZEN KISIM) ---
const getValidSvg = (raw) => {
    if (!raw) return '';
    
    // Eğer zaten <svg> etiketiyle başlıyorsa, olduğu gibi döndür (ama xmlns kontrolü iyi olur)
    if (raw.trim().startsWith('<svg')) {
        // İndirilen dosyanın tarayıcıda açılabilmesi için xmlns şarttır.
        if (!raw.includes('xmlns="http://www.w3.org/2000/svg"')) {
            return raw.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        return raw;
    }

    // Eğer sadece <path> vb. ise, onu <svg> içine sar
    let attrs = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"';
    
    // İkon türüne göre doğru dolgu/çizgi ayarlarını yap (Siyah dolgu sorununu çözer)
    if (iconName.includes('solid') || iconName.includes('fill') || iconName.includes('filled')) {
        attrs += ' fill="currentColor"';
    } else if (iconName.startsWith('aero') || iconName.startsWith('liquid')) {
        attrs += ' fill="none"'; // Aero/Liquid kendi renklerini içinde taşır
    } else {
        // Outline (Varsayılan)
        attrs += ' fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    }

    return `<svg ${attrs}>${raw}</svg>`;
};

// --- ACTIONS ---
const copySvg = () => {
    const validSvg = getValidSvg(iconSvg);
    navigator.clipboard.writeText(validSvg);
    // Basit alert yerine, eğer toast yapın varsa onu kullanabilirsin. Şimdilik alert.
    alert('SVG Code copied to clipboard!');
};

const downloadSvg = () => {
    const validSvg = getValidSvg(iconSvg);
    const blob = new Blob([validSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${iconName}.svg`;
    document.body.appendChild(a); // Firefox için gerekli
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// --- DYNAMIC SEO META ---
useHead({
    title: () => iconTitle.value ? `${iconTitle.value} Icon SVG - Free Download | Flux Icons` : 'Icon Not Found',
    meta: [
        { name: 'description', content: () => `Download the free ${iconTitle.value} SVG icon. High-quality ${style.value} style vector icon for Vue.js, Nuxt, and web design projects.` },
        { name: 'keywords', content: () => `${iconTitle.value}, ${keywords.value}, free icon, svg download` },
        // Sosyal Medya Kartları
        { property: 'og:title', content: () => `${iconTitle.value} Icon SVG` },
        { property: 'og:description', content: () => `Get the ${iconTitle.value} icon for your next project.` }
    ]
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { height: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>