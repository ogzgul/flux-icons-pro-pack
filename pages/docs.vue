<template>
  <main class="max-w-5xl mx-auto p-6 py-12">
    
    <div class="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
        <h1 class="text-4xl font-bold mb-2">Dokümantasyon</h1>
        <p class="text-xl text-slate-500">Flux ikonlarını projenizde profesyonelce kullanın.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <aside class="hidden lg:block space-y-1">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">İçerik</p>
            <a href="#props" class="block px-3 py-2 rounded-md text-sm font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">Props (Özellikler)</a>
            <a href="#helpers" class="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">Helper Classlar</a>
            <a href="#examples" class="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">Örnekler</a>
        </aside>

        <div class="lg:col-span-3 space-y-16">
            
            <section id="props">
                <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                    <FluxIcon name="settings-2" class="text-indigo-500" /> Bileşen Özellikleri (Props)
                </h2>
                
                <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table class="w-full text-left text-sm">
                        <thead class="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th class="p-4 font-semibold">Prop</th>
                                <th class="p-4 font-semibold">Tip</th>
                                <th class="p-4 font-semibold">Varsayılan</th>
                                <th class="p-4 font-semibold">Açıklama</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                            <tr class="bg-white dark:bg-slate-950">
                                <td class="p-4 font-mono text-indigo-500">name</td>
                                <td class="p-4">String</td>
                                <td class="p-4 text-slate-400">-</td>
                                <td class="p-4">İkonun adı (örn: "home", "user")</td>
                            </tr>
                            <tr class="bg-white dark:bg-slate-950">
                                <td class="p-4 font-mono text-indigo-500">size</td>
                                <td class="p-4">Number | String</td>
                                <td class="p-4 text-slate-400">24</td>
                                <td class="p-4">İkon boyutu (pixel cinsinden)</td>
                            </tr>
                            <tr class="bg-white dark:bg-slate-950">
                                <td class="p-4 font-mono text-indigo-500">spin</td>
                                <td class="p-4">Boolean</td>
                                <td class="p-4 text-slate-400">false</td>
                                <td class="p-4">İkonun kendi ekseninde dönmesini sağlar.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="helpers">
                <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                    <FluxIcon name="tool" class="text-indigo-500" /> Helper Class Örnekleri
                </h2>
                <p class="mb-4 text-slate-600 dark:text-slate-400">Tailwind CSS ile ikonları kolayca hizalayabilir ve renklendirebilirsiniz.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div class="border border-slate-200 dark:border-slate-800 rounded-xl p-6">
                        <h3 class="font-bold mb-2">Buton İçinde Kullanım</h3>
                        <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                            <FluxIcon name="download" size="18" />
                            İndir
                        </button>
                        <pre class="mt-4 text-xs bg-slate-950 text-slate-300 p-3 rounded">flex items-center gap-2</pre>
                    </div>

                    <div class="border border-slate-200 dark:border-slate-800 rounded-xl p-6">
                        <h3 class="font-bold mb-2">Input İçinde Kullanım</h3>
                        <div class="relative">
                            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <FluxIcon name="search" size="18" />
                            </span>
                            <input type="text" placeholder="Ara..." class="pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full bg-transparent">
                        </div>
                        <pre class="mt-4 text-xs bg-slate-950 text-slate-300 p-3 rounded">absolute left-3 top-1/2</pre>
                    </div>

                </div>
            </section>
            
            <section id="examples">
                 <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                    <FluxIcon name="loader-2" spin class="text-indigo-500" /> Spinner & Loaderlar
                </h2>
                <div class="flex flex-wrap gap-8 p-8 bg-slate-100 dark:bg-slate-900 rounded-xl justify-center">
                    <FluxIcon name="loader-2" spin size="32" class="text-indigo-600" />
                    <FluxIcon name="loader-4" spin size="32" class="text-emerald-500" />
                    <FluxIcon name="loader-5" spin size="32" class="text-rose-500" />
                    <FluxIcon name="refresh-cw" spin size="32" class="text-amber-500" />
                    <FluxIcon name="settings" spin size="32" class="text-slate-500" />
                </div>
            </section>

        </div>
    </div>

  </main>
</template>