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
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 flex items-center justify-center shadow-sm relative group overflow-hidden">
            <div class="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
            
            <FluxIcon :name="iconName" :size="128" class="text-slate-900 dark:text-white relative z-10 drop-shadow-xl" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button @click="copySvg" class="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-colors">
              <FluxIcon name="copy" size="20" /> Copy SVG
            </button>
            <button @click="downloadSvg" class="flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white py-3 rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
              <FluxIcon name="download-cloud" size="20" /> Download
            </button>
          </div>
        </div>

        <div class="prose prose-slate dark:prose-invert">
          <h1 class="text-3xl font-black capitalize mb-2">
            {{ iconTitle }} Icon
          </h1>
          <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Download the free <strong>{{ iconTitle }}</strong> vector icon. Optimized for web and mobile apps, this SVG icon is part of the <strong>{{ category }}</strong> collection in the Flux Icons library.
          </p>

          <h3>Icon Details</h3>
          <ul class="not-prose space-y-2 mb-6">
            <li class="flex justify-between border-b border-slate-200 dark:border-slate-800 py-2">
              <span class="text-slate-500">Style</span>
              <span class="font-medium capitalize">{{ style }}</span>
            </li>
            <li class="flex justify-between border-b border-slate-200 dark:border-slate-800 py-2">
              <span class="text-slate-500">Category</span>
              <span class="font-medium capitalize">{{ category }}</span>
            </li>
            <li class="flex justify-between border-b border-slate-200 dark:border-slate-800 py-2">
              <span class="text-slate-500">License</span>
              <span class="font-medium">MIT (Open Source)</span>
            </li>
          </ul>

          <h3>Usage in Vue & Nuxt</h3>
          <p>You can use this icon directly in your project using the FluxIcon component:</p>
          <pre class="bg-slate-900 text-slate-300 rounded-lg p-4 text-sm"><code>&lt;FluxIcon name="{{ iconName }}" size="24" /&gt;</code></pre>

          <h3>Description</h3>
          <p>
            The {{ iconTitle }} icon represents {{ keywords }}. It is designed with a {{ style }} aesthetic, making it perfect for modern user interfaces, dashboards, and mobile applications requiring a clean and professional look. Like all Flux Icons, it supports tree-shaking and CSS styling.
          </p>
        </div>

      </div>

      <div class="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
        <h3 class="text-xl font-bold mb-6">Related Icons</h3>
        <div class="flex gap-4 overflow-x-auto pb-4">
           <NuxtLink 
             v-for="rel in relatedIcons" 
             :key="rel" 
             :to="`/icon/${rel}`"
             class="flex-shrink-0 w-24 h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center hover:border-indigo-500 transition-colors"
           >
             <FluxIcon :name="rel" size="32" class="text-slate-600 dark:text-slate-400" />
           </NuxtLink>
        </div>
      </div>

    </div>
    
    <div v-else class="text-center py-20">
        <h1 class="text-4xl font-bold">Icon Not Found</h1>
        <NuxtLink to="/" class="text-indigo-500 mt-4 block">Go Home</NuxtLink>
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
// İkon isminden anlamlı metinler türetme
const iconTitle = computed(() => iconName.replace(/-/g, ' '));

const category = computed(() => {
    if (iconName.startsWith('aero')) return 'Aero Glass';
    if (iconName.startsWith('liquid')) return 'Liquid';
    if (iconName.includes('arrow')) return 'Arrows';
    if (iconName.includes('user')) return 'Users';
    return 'General UI';
});

const style = computed(() => {
    if (iconName.includes('outline')) return 'Outline';
    if (iconName.includes('solid') || iconName.includes('fill')) return 'Solid';
    if (iconName.startsWith('aero')) return '3D Glass';
    return 'Vector';
});

const keywords = computed(() => {
    const words = iconName.split('-');
    return words.join(', ') + ', vector, svg, icon';
});

// --- RELATED ICONS LOGIC ---
const relatedIcons = computed(() => {
    if (!iconSvg) return [];
    const root = iconName.split('-')[0] === 'aero' ? iconName.split('-')[1] : iconName.split('-')[0];
    return Object.keys(icons)
        .filter(k => k.includes(root) && k !== iconName)
        .slice(0, 10);
});

// --- ACTIONS ---
const copySvg = () => {
    navigator.clipboard.writeText(iconSvg);
    alert('SVG Copied!');
};

const downloadSvg = () => {
    const blob = new Blob([iconSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${iconName}.svg`;
    a.click();
};

// --- DYNAMIC SEO META ---
useHead({
    title: `${iconTitle.value} Icon SVG - Free Download | Flux Icons`,
    meta: [
        { name: 'description', content: `Download the free ${iconTitle.value} SVG icon. High-quality ${style.value} style vector icon for Vue.js, Nuxt, and web design projects.` },
        { name: 'keywords', content: `${iconTitle.value}, ${keywords.value}, free icon, svg download` }
    ]
});
</script>