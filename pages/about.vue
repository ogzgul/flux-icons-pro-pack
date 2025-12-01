<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
    
    <div class="max-w-4xl w-full text-center mb-12">
      <div class="inline-block p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
         <FluxIcon name="layers-floating" size="48" class="text-indigo-600 dark:text-indigo-400" />
      </div>
      <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
        About Flux Icons
      </h1>
      <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        The most comprehensive, modern, and developer-friendly open-source icon library for Vue & Nuxt.
      </p>
    </div>

    <div class="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow text-center">
            <div class="mb-4 flex justify-center text-indigo-500"><FluxIcon name="gem-pro" size="32" /></div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Premium Quality</h3>
            <p class="text-sm text-slate-500">Every icon is crafted with pixel-perfect precision, ensuring clarity on any screen.</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow text-center">
            <div class="mb-4 flex justify-center text-pink-500"><FluxIcon name="magic-wand" size="32" /></div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Fully Customizable</h3>
            <p class="text-sm text-slate-500">Change strokes, colors, sizes, and even animations instantly to fit your brand.</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow text-center">
            <div class="mb-4 flex justify-center text-emerald-500"><FluxIcon name="code-block" size="32" /></div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Developer First</h3>
            <p class="text-sm text-slate-500">Built for Vue 3 & Nuxt 3 with TypeScript support and easy integration.</p>
        </div>

    </div>

  </div>
</template>

<script setup>
useHead({
  title: 'About Us - Flux Icons'
})
</script>