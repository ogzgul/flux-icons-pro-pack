<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      
      <div class="text-center mb-16 space-y-6">
        <span class="px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-widest">
          Flux Icons Academy
        </span>
        <h1 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
          Design & Development <span class="text-indigo-600 dark:text-indigo-400">Insights</span>
        </h1>
        <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Deep dives into modern web development, icon optimization techniques, Vue.js best practices, and accessibility standards.
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24">
        
        <NuxtLink to="/blog/svg-vs-font-icons" class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
          <div class="h-56 bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
             <FluxIcon name="code-block" size="80" class="text-slate-300 dark:text-slate-700 group-hover:scale-110 transition-transform duration-500" />
             <div class="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
          </div>
          <div class="p-8 flex-1 flex flex-col">
            <span class="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-3">Performance</span>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
              Why SVG Icons Are Superior to Icon Fonts in 2024
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
              Stop using large font files that slow down your site. Discover why inline SVGs offer better accessibility, sharper rendering, and faster load times.
            </p>
            <div class="mt-auto flex items-center gap-3 text-sm font-medium text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-4">
              <FluxIcon name="aero-nebula-clock" size="16" />
              <span>5 min read</span>
              <span class="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Dec 6, 2024</span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/blog/vue-icon-optimization" class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
          <div class="h-56 bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
             <FluxIcon name="layers-floating" size="80" class="text-slate-300 dark:text-slate-700 group-hover:scale-110 transition-transform duration-500" />
             <div class="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
          </div>
          <div class="p-8 flex-1 flex flex-col">
            <span class="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">Vue.js</span>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
              Mastering Tree-Shaking with Flux Icons
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
              Reduce your bundle size significantly. Learn how to use the modern import syntax to include only the icons you need in your Nuxt 3 project.
            </p>
            <div class="mt-auto flex items-center gap-3 text-sm font-medium text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-4">
              <FluxIcon name="aero-nebula-clock" size="16" />
              <span>8 min read</span>
              <span class="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Dec 5, 2024</span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/blog/accessibility-guide" class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
          <div class="h-56 bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
             <FluxIcon name="user-check-contrast" size="80" class="text-slate-300 dark:text-slate-700 group-hover:scale-110 transition-transform duration-500" />
             <div class="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
          </div>
          <div class="p-8 flex-1 flex flex-col">
            <span class="text-xs font-bold text-purple-500 uppercase tracking-wider mb-3">A11y</span>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
              The Ultimate Guide to Accessible Icons (A11y)
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
              Don't leave users behind. Learn the best practices for ARIA labels, semantic icons, and color contrast to make your UI inclusive for everyone.
            </p>
            <div class="mt-auto flex items-center gap-3 text-sm font-medium text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-4">
              <FluxIcon name="aero-nebula-clock" size="16" />
              <span>6 min read</span>
              <span class="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Dec 6, 2024</span>
            </div>
          </div>
        </NuxtLink>

      </div>

      <section class="border-t border-slate-200 dark:border-slate-800 pt-16">
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">About Our Blog</h2>
        <div class="grid md:grid-cols-2 gap-12 text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
                Welcome to the official Flux Icons Blog. Our mission is to provide high-quality, technical content for frontend developers and UI designers. We believe that icons are more than just decoration; they are essential tools for communication and user experience.
            </p>
            <p>
                In this blog, we cover a wide range of topics including <strong>Vue.js component optimization</strong>, <strong>SVG animation techniques</strong>, and <strong>web accessibility standards</strong>. Our tutorials are designed to help you build faster, more inclusive, and visually stunning applications using the Flux Icons library. Stay tuned for regular updates and deep dives into the world of modern web development.
            </p>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Blog - Flux Icons | Web Development & Design Tutorials',
  meta: [
    { name: 'description', content: 'Explore expert tutorials on Vue.js, Nuxt 3, SVG optimization, and web accessibility. The official blog of the Flux Icons library.' },
    { property: 'og:title', content: 'Flux Icons Blog - Insights for Developers' },
    { property: 'og:description', content: 'Technical guides and design tips for building better web interfaces.' }
  ]
})
</script>