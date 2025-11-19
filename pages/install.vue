<template>
  <main class="max-w-4xl mx-auto p-6 py-12">
    <div class="text-center mb-16">
        <div class="inline-block p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
            <FluxIcon name="package" size="32" class="text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 class="text-4xl font-bold mb-4">Kurulum & Kullanım</h1>
        <p class="text-slate-600 dark:text-slate-400 text-lg">Flux İkon kütüphanesini projene saniyeler içinde dahil et.</p>
    </div>

    <div class="space-y-12">
        <section class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
            <h2 class="text-2xl font-bold mb-4 flex items-center gap-3">
                <span class="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Paketi Yükle
            </h2>
            <p class="mb-4 text-slate-600 dark:text-slate-400">Terminali aç ve aşağıdaki komutu çalıştır:</p>
            <div class="bg-slate-950 text-slate-200 p-4 rounded-lg font-mono text-sm flex justify-between items-center">
                <span>npm install flux-icons-pro-pack</span>
                <button class="text-slate-500 hover:text-white">Kopyala</button>
            </div>
        </section>

        <section class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
             <h2 class="text-2xl font-bold mb-4 flex items-center gap-3">
                <span class="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
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
             <h2 class="text-2xl font-bold mb-4 flex items-center gap-3">
                <span class="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Bileşeni Kullan
            </h2>
            <p class="mb-4 text-slate-600 dark:text-slate-400">Artık her yerde kullanabilirsin:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-sm flex items-center">
                    &lt;FluxIcon name="home" size="32" color="blue" /&gt;
                </div>
                <div class="flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                    <FluxIcon name="home" size="32" color="#4f46e5" />
                </div>
            </div>
        </section>
    </div>
  </main>
</template>