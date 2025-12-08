<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      
      <div class="text-center mb-16 space-y-4">
        <h1 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
          Flux Icons <span class="text-indigo-600 dark:text-indigo-400">Documentation</span>
        </h1>
        <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Everything you need to know to build stunning, animated interfaces with the world's most versatile icon library.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        <aside class="hidden lg:block space-y-1 sticky top-24 h-fit">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">Getting Started</p>
            <a href="#intro" class="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Introduction</a>
            <a href="#install" class="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Installation</a>
            <a href="#usage" class="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Basic Usage</a>
            <a href="#props" class="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Props API</a>
            
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mt-6 mb-3 px-3">Advanced Features</p>
            <a href="#animations" class="block px-3 py-2 rounded-md text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20">Flux Motion (Animations)</a>
            <a href="#mixer" class="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Icon Mixer</a>
            <a href="#liquid" class="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Liquid Glass Style</a>
            
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mt-6 mb-3 px-3">Support</p>
            <a href="#faq" class="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">FAQ</a>
        </aside>

        <div class="lg:col-span-3 space-y-20">
            
            <section id="intro" class="scroll-mt-24 prose prose-slate dark:prose-invert max-w-none">
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Why Flux Icons?</h2>
                <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Flux Icons is not just another SVG pack. It is a comprehensive design system built specifically for modern frameworks like <strong>Vue 3</strong> and <strong>Nuxt 3</strong>. 
                    Unlike traditional icon fonts, Flux Icons leverages the power of components to deliver:
                </p>
                <ul class="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                    <li><strong>Tree-Shaking:</strong> Only the icons you use are included in your bundle.</li>
                    <li><strong>Performance:</strong> Zero runtime overhead with optimized SVGs.</li>
                    <li><strong>Interactivity:</strong> Built-in micro-animations on hover.</li>
                    <li><strong>Versatility:</strong> 1500+ icons in Solid, Outline, and Liquid styles.</li>
                </ul>
            </section>

            <section id="install" class="scroll-mt-24">
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-6">Installation</h2>
                <p class="text-slate-600 dark:text-slate-400 mb-4">Install the package via your favorite package manager:</p>
                
                <div class="bg-slate-900 rounded-xl p-6 border border-slate-800 relative group mb-6">
                    <code class="text-emerald-400 font-mono text-sm">npm install flux-icons-pro-pack</code>
                    <button @click="copy('npm install flux-icons-pro-pack')" class="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"><FluxIcon name="copy" size="18"/></button>
                </div>

                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">Setup in Nuxt 3</h3>
                <p class="text-slate-600 dark:text-slate-400 mb-4">Register the plugin in your <code class="text-pink-600 bg-pink-50 dark:bg-pink-900/30 px-1.5 py-0.5 rounded text-sm font-mono">plugins/flux-icons.ts</code> file:</p>
                
                <div class="bg-slate-900 rounded-xl p-6 border border-slate-800 relative group">
<pre class="text-slate-300 font-mono text-sm overflow-x-auto"><code>import { defineNuxtPlugin } from '#app'
import FluxIcons from 'flux-icons-pro-pack'
import 'flux-icons-pro-pack/dist-font/flux-icons.css' // Import CSS for animations

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FluxIcons)
})</code></pre>
                    <button @click="copy('import { defineNuxtPlugin } from \'#app\'\nimport FluxIcons from \'flux-icons-pro-pack\'...')" class="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"><FluxIcon name="copy" size="18"/></button>
                </div>
            </section>

            <section id="animations" class="scroll-mt-24">
                <div class="flex items-center gap-3 mb-6">
                    <div class="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-600 dark:text-pink-400">
                        <FluxIcon name="magic-wand" size="24" animation="wiggle" />
                    </div>
                    <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Flux Motion</h2>
                </div>
                
                <p class="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                    Bring your UI to life with our built-in micro-interactions. No extra CSS or JS required. Just add the <code class="text-pink-600 bg-pink-50 dark:bg-pink-900/30 px-1.5 py-0.5 rounded text-sm font-mono">animation</code> prop to any icon.
                </p>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div v-for="anim in ['shake', 'beat', 'bounce-y', 'pop', 'wiggle', 'drive', 'spin-pulse', 'glow']" :key="anim" class="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center gap-4 hover:border-pink-500 dark:hover:border-pink-500 transition-all cursor-pointer" @click="copyAnim(anim)">
                        <FluxIcon name="star-duo" size="40" :animation="anim" class="text-slate-800 dark:text-white group-hover:text-pink-500 transition-colors" />
                        <span class="text-xs font-mono text-slate-500 uppercase tracking-widest">{{ anim }}</span>
                        <div class="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                    </div>
                </div>

                <div class="bg-slate-900 rounded-xl p-6 border border-slate-800 relative group">
                    <code class="text-emerald-400 font-mono text-sm">&lt;FluxIcon name="bell" animation="shake" /&gt;</code>
                    <button @click="copy('<FluxIcon name=\'bell\' animation=\'shake\' />')" class="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"><FluxIcon name="copy" size="18"/></button>
                </div>
            </section>

            <section id="mixer" class="scroll-mt-24">
                <div class="flex items-center gap-3 mb-6">
                    <div class="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                        <FluxIcon name="layers-floating" size="24" animation="float" />
                    </div>
                    <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Icon Mixer</h2>
                </div>
                
                <p class="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Why settle for standard icons? With our exclusive <strong>Icon Mixer</strong>, you can combine any two icons to create unique, meaningful symbols for your application.
                </p>

                <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="space-y-4">
                        <div class="flex gap-4">
                             <div class="bg-white/20 p-3 rounded-xl backdrop-blur-sm"><FluxIcon name="folder-open" size="32" /></div>
                             <div class="text-2xl font-bold flex items-center">+</div>
                             <div class="bg-white/20 p-3 rounded-xl backdrop-blur-sm"><FluxIcon name="lock-duotone" size="32" /></div>
                             <div class="text-2xl font-bold flex items-center">=</div>
                             <div class="bg-white text-indigo-600 p-3 rounded-xl shadow-lg transform scale-110"><FluxIcon name="file-lock-duotone" size="32" /></div>
                        </div>
                        <p class="text-indigo-100 font-medium">Create combinations like "Secure Folder", "User Pro", "Add to Cart" and more.</p>
                    </div>
                    <NuxtLink to="/mixer" class="whitespace-nowrap bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-lg">
                        Try Mixer Now <FluxIcon name="arrow-right-heavy" size="18" />
                    </NuxtLink>
                </div>
            </section>

            <section id="liquid" class="scroll-mt-24">
                <div class="flex items-center gap-3 mb-6">
                    <div class="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg text-cyan-600 dark:text-cyan-400">
                        <FluxIcon name="liquid-abstract-drop" size="24" animation="float" />
                    </div>
                    <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Liquid Glass Style</h2>
                </div>
                
                <p class="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                    Elevate your design with our premium <strong>Liquid Glass</strong> icons. These are not just SVGs; they are crafted with gradients, opacity layers, and blur effects.
                </p>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div class="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-center"><FluxIcon name="liquid-folder-music" size="48" /></div>
                    <div class="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-center"><FluxIcon name="liquid-rocket-launch" size="48" /></div>
                    <div class="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-center"><FluxIcon name="liquid-emoji-cool" size="48" /></div>
                    <div class="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-center"><FluxIcon name="liquid-chart-grow" size="48" /></div>
                </div>
            </section>

            <section id="props" class="scroll-mt-24">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Component Props</h2>
                <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table class="w-full text-left text-sm">
                        <thead class="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th class="p-4 font-semibold text-slate-900 dark:text-white">Prop</th>
                                <th class="p-4 font-semibold text-slate-900 dark:text-white">Type</th>
                                <th class="p-4 font-semibold text-slate-900 dark:text-white">Default</th>
                                <th class="p-4 font-semibold text-slate-900 dark:text-white">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
                            <tr><td class="p-4 font-mono text-indigo-500">name</td><td class="p-4 text-slate-500">String</td><td class="p-4 text-slate-400">-</td><td class="p-4 text-slate-600 dark:text-slate-400">Icon name (e.g. "home").</td></tr>
                            <tr><td class="p-4 font-mono text-indigo-500">size</td><td class="p-4 text-slate-500">Number | String</td><td class="p-4 text-slate-400">24</td><td class="p-4 text-slate-600 dark:text-slate-400">Size in pixels.</td></tr>
                            <tr><td class="p-4 font-mono text-indigo-500">animation</td><td class="p-4 text-slate-500">String</td><td class="p-4 text-slate-400">""</td><td class="p-4 text-slate-600 dark:text-slate-400">Hover effect.</td></tr>
                            <tr><td class="p-4 font-mono text-indigo-500">color</td><td class="p-4 text-slate-500">String</td><td class="p-4 text-slate-400">currentColor</td><td class="p-4 text-slate-600 dark:text-slate-400">Fill or stroke color.</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="faq" class="scroll-mt-24">
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-8">Frequently Asked Questions</h2>
                <div class="space-y-6">
                    <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Is Flux Icons free to use?</h3>
                        <p class="text-slate-600 dark:text-slate-400 text-sm">Yes! Flux Icons is open-source and free for both personal and commercial projects. You can use it in your apps, websites, and designs without any cost.</p>
                    </div>
                    <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Can I use it with React or Svelte?</h3>
                        <p class="text-slate-600 dark:text-slate-400 text-sm">Currently, we have a dedicated Vue 3 / Nuxt 3 component. However, you can easily use the raw SVG code (available in our library) in React, Svelte, or vanilla HTML projects.</p>
                    </div>
                    <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Does it support Tree-Shaking?</h3>
                        <p class="text-slate-600 dark:text-slate-400 text-sm">Absolutely. The library is designed to be tree-shakeable, meaning only the icons you actually use will be included in your final JavaScript bundle, keeping your app fast and lightweight.</p>
                    </div>
                    <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">How can I customize the icons?</h3>
                        <p class="text-slate-600 dark:text-slate-400 text-sm">You can change the color using standard Tailwind classes (like `text-red-500`) or the `color` prop. The `size` prop adjusts the dimensions, and the `stroke-width` (for outline icons) is also customizable.</p>
                    </div>
                </div>
            </section>

        </div>
      </div>
    </div>
  </div>

  <Transition name="toast">
        <div v-if="showToast" class="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-[100] border border-slate-700 dark:border-slate-200">
            <FluxIcon name="check-circle-fill" class="text-emerald-500" size="20" />
            <span class="text-sm font-bold">{{ toastMessage }}</span>
        </div>
    </Transition>
</template>

<script setup>
import { ref } from 'vue';

useHead({
  title: 'Documentation - Flux Icons',
  meta: [
    { name: 'description', content: 'Comprehensive documentation for Flux Icons. Learn installation, props API, animations, and how to use the Icon Mixer in Vue and Nuxt projects.' },
    { property: 'og:title', content: 'Documentation - Flux Icons' },
    { property: 'og:description', content: 'Everything you need to know to build stunning interfaces with Flux Icons.' }
  ]
});

// --- TOAST STATE ---
const showToast = ref(false);
const toastMessage = ref('');

const copy = (text) => {
  navigator.clipboard.writeText(text);
  showToastWithMsg('Copied to clipboard! 🎉');
};

const copyAnim = (anim) => {
  const code = `<FluxIcon name="star-duo" animation="${anim}" />`;
  navigator.clipboard.writeText(code);
  showToastWithMsg(`Animation "${anim}" copied! 🚀`);
};

const showToastWithMsg = (msg) => {
    toastMessage.value = msg;
    showToast.value = true;
    setTimeout(() => showToast.value = false, 3000);
};
</script>

<style scoped>
.scroll-mt-24 {
    scroll-margin-top: 6rem;
}
/* Toast Animation */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>