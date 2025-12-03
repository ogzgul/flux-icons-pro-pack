<script setup>
import { ref } from 'vue'

const copiedState = ref({
    cdn: false,
    npm: false
});

const copyToClipboard = async (text, type) => {
    try {
        await navigator.clipboard.writeText(text);
        copiedState.value[type] = true;
        setTimeout(() => {
            copiedState.value[type] = false;
        }, 2000);
    } catch (err) {
        console.error('Copy error:', err);
    }
}
</script>

<template>
  <main class="max-w-4xl mx-auto p-6 py-12">
    <div class="text-center mb-16">
        <div class="inline-block p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
            <FluxIcon name="package" size="32" class="text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Setup & Usage</h1>
        <p class="text-slate-600 dark:text-slate-400 text-lg">Include the Flux Icon library in your project within seconds.</p>
    </div>

    <div class="space-y-12">

        <section class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm relative overflow-hidden">
            <div class="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">EASIEST METHOD</div>
            <h2 class="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                <span class="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                CDN (Quick Start)
            </h2>
            <p class="mb-4 text-slate-600 dark:text-slate-400">Without any installation, just paste this into the <code>&lt;head&gt;</code> section of your HTML file:</p>
            
            <div class="bg-slate-950 text-slate-200 p-4 rounded-lg font-mono text-xs md:text-sm flex justify-between items-center gap-4">
                <span class="break-all text-indigo-300">&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flux-icons-pro-pack@1.0.38/dist-font/flux-icons.css" /&gt;</span>
               <button 
                    @click="copyToClipboard('<link rel=\'stylesheet\' href=\'https://cdn.jsdelivr.net/npm/flux-icons-pro-pack@1.0.38/dist-font/flux-icons.css\' />', 'cdn')" 
                    class="shrink-0 px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-2"
                    :class="copiedState.cdn ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white'"
                    >
                    <FluxIcon v-if="copiedState.cdn" name="check" size="14" />
                    <FluxIcon v-else name="copy" size="14" />
                    {{ copiedState.cdn ? 'Copied!' : 'Copy' }}
                </button>

            </div>

            <div class="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                <p>Alternative Link (CamelCase):</p>
                <code class="block mt-1 select-all">https://cdn.jsdelivr.net/npm/flux-icons-pro-pack@latest/dist-font/flux-icons.css</code>
            </div>

            <div class="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                <p class="text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Usage:</p>
                <code class="text-xs sm:text-sm font-mono text-pink-500 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                    &lt;i class="flux-icon flux-icon-home"&gt;&lt;/i&gt;
                </code>
            </div>
        </section>

        <section class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
            <h2 class="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                <span class="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Install Package (NPM)
            </h2>
            <p class="mb-4 text-slate-600 dark:text-slate-400">For Vue or React projects, open your terminal and run:</p>
            <div class="bg-slate-950 text-slate-200 p-4 rounded-lg font-mono text-sm flex justify-between items-center">
                <span>npm install flux-icons-pro-pack</span>
                <button class="text-slate-500 hover:text-white">Copy</button>
            </div>

            <p class="mt-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                <NuxtLink to="https://www.npmjs.com/package/flux-icons-pro-pack" target="_blank" class="hover:underline">
                    View on NPM →
                </NuxtLink>
            </p>
        </section>

        <section class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
             <h2 class="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                <span class="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Register Globally
            </h2>
            <p class="mb-4 text-slate-600 dark:text-slate-400">Define it in the entry file of your Vue or Nuxt project (main.js or plugin):</p>
            <pre class="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
import { createApp } from 'vue'
import FluxIcons from 'flux-icons-pro-pack'

const app = createApp(App)
app.use(FluxIcons) // Makes all icons global
app.mount('#app')</pre>
        </section>

         <section class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
             <h2 class="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                <span class="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                Use the Component
            </h2>
            <p class="mb-4 text-slate-600 dark:text-slate-400">Now you can use it anywhere:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm flex items-center overflow-x-auto">
                    &lt;FluxIcon name="home" size="32" color="blue" /&gt;
                </div>
                <div class="flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                    <FluxIcon name="home" size="32" color="#4f46e5" />
                </div>
            </div>
        </section>
    </div>
  </main>
</template>
