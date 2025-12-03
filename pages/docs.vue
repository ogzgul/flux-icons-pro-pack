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
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">Core Concepts</p>
            <a href="#install" class="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Installation</a>
            <a href="#props" class="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Component Props</a>
            
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mt-6 mb-3 px-3">Features</p>
            <a href="#animations" class="block px-3 py-2 rounded-md text-sm font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">Flux Motion (Animations)</a>
            <a href="#mixer" class="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Icon Mixer</a>
            <a href="#liquid" class="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Liquid Glass Style</a>
        </aside>

        <div class="lg:col-span-3 space-y-20">
            
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
                    Why settle for standard icons? With our exclusive <strong>Icon Mixer</strong>, you can combine any two icons to create unique, meaningful symbols for your application. Perfect for status indicators, badges, and complex UI states.
                </p>

                <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="space-y-4">
                        <div class="flex gap-4">
                             <div class="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                <FluxIcon name="folder-open" size="32" />
                             </div>
                             <div class="text-2xl font-bold flex items-center">+</div>
                             <div class="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                <FluxIcon name="lock-duotone" size="32" />
                             </div>
                             <div class="text-2xl font-bold flex items-center">=</div>
                             <div class="bg-white text-indigo-600 p-3 rounded-xl shadow-lg transform scale-110">
                                <FluxIcon name="file-lock-duotone" size="32" />
                             </div>
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
                    Elevate your design with our premium <strong>Liquid Glass</strong> icons. These are not just SVGs; they are crafted with gradients, opacity layers, and blur effects to mimic the look of frosted glass and 3D materials.
                </p>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div class="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-center">
                        <FluxIcon name="liquid-folder-music" size="48" />
                    </div>
                    <div class="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-center">
                        <FluxIcon name="liquid-rocket-launch" size="48" />
                    </div>
                    <div class="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-center">
                        <FluxIcon name="liquid-emoji-cool" size="48" />
                    </div>
                    <div class="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-center">
                        <FluxIcon name="liquid-chart-grow" size="48" />
                    </div>
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
                            <tr>
                                <td class="p-4 font-mono text-indigo-500">name</td>
                                <td class="p-4 text-slate-500">String</td>
                                <td class="p-4 text-slate-400">-</td>
                                <td class="p-4 text-slate-600 dark:text-slate-400">Icon name (e.g. "home", "user-duotone")</td>
                            </tr>
                            <tr>
                                <td class="p-4 font-mono text-indigo-500">size</td>
                                <td class="p-4 text-slate-500">Number | String</td>
                                <td class="p-4 text-slate-400">24</td>
                                <td class="p-4 text-slate-600 dark:text-slate-400">Size in pixels.</td>
                            </tr>
                            <tr>
                                <td class="p-4 font-mono text-indigo-500">animation</td>
                                <td class="p-4 text-slate-500">String</td>
                                <td class="p-4 text-slate-400">""</td>
                                <td class="p-4 text-slate-600 dark:text-slate-400">Hover effect (shake, beat, bounce-y...).</td>
                            </tr>
                             <tr>
                                <td class="p-4 font-mono text-indigo-500">color</td>
                                <td class="p-4 text-slate-500">String</td>
                                <td class="p-4 text-slate-400">currentColor</td>
                                <td class="p-4 text-slate-600 dark:text-slate-400">Fill or stroke color.</td>
                            </tr>
                        </tbody>
                    </table>
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
useHead({
  title: 'Documentation - Flux Icons',
  meta: [
    { name: 'description', content: 'Learn how to use Flux Icons with Vue & Nuxt. Detailed guide on props, animations, mixer, and customization.' }
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
</style>