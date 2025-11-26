<template>
  <footer class="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-auto py-12">
    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      
      <div class="flex flex-col items-center md:items-start gap-2">
        <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
          <FluxIcon name="layers-floating" class="text-indigo-600" />
          <span>Flux Icons</span>
        </div>
        <p class="text-sm text-slate-500 text-center md:text-left">
          © {{ new Date().getFullYear() }} Flux Icons. Open source & premium design.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
        <NuxtLink to="/about" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</NuxtLink>
        <NuxtLink to="/docs" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Docs</NuxtLink>
        <NuxtLink to="/privacy-policy" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</NuxtLink>
        <NuxtLink to="/terms" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</NuxtLink>
      </div>

    </div>
  </footer>
</template>