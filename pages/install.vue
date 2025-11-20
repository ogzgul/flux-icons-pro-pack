<template>
  <main class="max-w-4xl mx-auto p-6 py-12">
    <div class="text-center mb-16">
        <div class="inline-block p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
            <FluxIcon name="package" size="32" class="text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Kurulum & Kullanım</h1>
        <p class="text-slate-600 dark:text-slate-400 text-lg">Flux İkon kütüphanesini projene saniyeler içinde dahil et.</p>
    </div>

    <div class="space-y-12">

        <section class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm relative overflow-hidden">
            <div class="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">EN KOLAY YÖNTEM</div>
            <h2 class="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                <span class="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                CDN (Hızlı Başlangıç)
            </h2>
            <p class="mb-4 text-slate-600 dark:text-slate-400">Hiçbir kurulum yapmadan, sadece bu kodu HTML dosyanızın <code>&lt;head&gt;</code> kısmına yapıştırın:</p>
            
            <div class="bg-slate-950 text-slate-200 p-4 rounded-lg font-mono text-xs md:text-sm flex justify-between items-center gap-4">
                <span class="break-all text-indigo-300">&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flux-icons-pro-pack@latest/dist-font/flux-icons.css" /&gt;</span>
                <button class="text-slate-500 hover:text-white shrink-0">Kopyala</button>
            </div>

            <div class="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                <p>Alternatif Link (CamelCase):</p>
                <code class="block mt-1 select-all">https://cdn.jsdelivr.net/npm/flux-icons-pro-pack@1.0.20/dist-font/flux-icons.css</code>
            </div>

            <div class="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                <p class="text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Kullanım:</p>
                <code class="text-xs sm:text-sm font-mono text-pink-500 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                    &lt;i class="flux-icon flux-icon-home"&gt;&lt;/i&gt;
                </code>
            </div>
        </section>

        <section class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
            <h2 class="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                <span class="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Paketi Yükle (NPM)
            </h2>
            <p class="mb-4 text-slate-600 dark:text-slate-400">Vue veya React projeleri için terminali aç ve çalıştır:</p>
            <div class="bg-slate-950 text-slate-200 p-4 rounded-lg font-mono text-sm flex justify-between items-center">
                <span>npm install flux-icons-pro-pack</span>
                <button class="text-slate-500 hover:text-white">Kopyala</button>
            </div>
        </section>

        <section class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
             <h2 class="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                <span class="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Kayıt Et (Global)
            </h2>
            <p class="mb-4 text-slate-600 dark:text-slate-400">Vue veya Nuxt projenin giriş dosyasında (main.js veya plugin) tanımla:</p>
            <pre class="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
import { createApp } from 'vue'
import FluxIcons from 'flux-icons-pro-pack'

const app = createApp(App)
app.use(FluxIcons) // Tüm ikonları global yapar
app.mount('#app')</pre>
        </section>

         <section class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
             <h2 class="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                <span class="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                Bileşeni Kullan
            </h2>
            <p class="mb-4 text-slate-600 dark:text-slate-400">Artık her yerde kullanabilirsin:</p>
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