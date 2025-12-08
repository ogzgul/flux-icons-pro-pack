<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      
      <div class="text-center mb-12">
        <h1 class="text-4xl font-black text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h1>
        <p class="text-slate-600 dark:text-slate-400">Common questions about licensing, technical usage, and customization.</p>
      </div>

      <div class="space-y-6">
        
        <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <FluxIcon name="shield-check" class="text-emerald-500" />
            Is Flux Icons completely free?
          </h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Yes! Flux Icons is open-source under the MIT License. You can use it in personal portfolios, commercial websites, SaaS products, and mobile apps without paying a cent. Attribution is appreciated but not mandatory.
          </p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <FluxIcon name="code-block" class="text-indigo-500" />
            Does it work with React, Svelte, or Angular?
          </h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Our primary package is optimized for <strong>Vue 3 and Nuxt 3</strong> via a dedicated component. However, since the library is based on standard SVGs, you can copy the SVG code directly from our library (using the "Copy SVG" button) and use it in React, Svelte, Angular, or even plain HTML projects.
          </p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <FluxIcon name="layers-floating" class="text-pink-500" />
            How do I change the stroke width?
          </h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            If you are using the Vue component, you can use the <code>:stroke-width="2"</code> prop. Note that this only applies to <strong>Outline</strong> icons. Solid, Liquid, and Aero styles have fixed internal strokes to maintain their artistic integrity.
          </p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <FluxIcon name="download-cloud" class="text-sky-500" />
            Can I download the icons as PNG?
          </h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Currently, we focus on SVG for scalability and performance. However, you can copy the SVG code and paste it into design tools like Figma, Sketch, or Adobe Illustrator to export them as PNG if needed. We also have a dedicated <NuxtLink to="/tools" class="text-indigo-500 hover:underline">Figma Plugin</NuxtLink>.
          </p>
        </div>

      </div>

      <div class="mt-12 text-center">
        <p class="text-slate-500 mb-4">Still have questions?</p>
        <NuxtLink to="/contact" class="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
          Contact Support
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'FAQ - Flux Icons',
  meta: [
    { name: 'description', content: 'Frequently Asked Questions about Flux Icons licensing, usage with React/Vue, and customization options.' }
  ]
})
</script>