<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const showScrollButton = ref(false)

// Cookie (dark/light)
const colorMode = useCookie('flux_theme', {
  default: () => 'dark',
  watch: true
})

const isDark = computed(() => colorMode.value === 'dark')

// SSR uyumlu: html class
useHead({
  htmlAttrs: {
    class: computed(() => (isDark.value ? 'dark' : ''))
  }
})

// Client tarafında garanti: dark class'ını gerçekten ekle/çıkar
const syncHtmlClass = () => {
  if (process.client) {
    document.documentElement.classList.toggle('dark', isDark.value)
  }
}

watch(isDark, () => {
  syncHtmlClass()
}, { immediate: true })

const toggleTheme = () => {
  colorMode.value = isDark.value ? 'light' : 'dark'
}

const checkScroll = () => {
  showScrollButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
  syncHtmlClass()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <div class="min-h-screen transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-200 font-sans">
    <nav class="sticky top-0 z-50 border-b backdrop-blur-lg transition-colors border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-950/80">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 cursor-pointer group">
          <div class="bg-indigo-600 p-2 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold tracking-tighter leading-none">Flux<span class="text-indigo-500">Icons</span></h1>
            <span class="text-[10px] font-mono tracking-widest opacity-60">V1.0</span>
          </div>
        </NuxtLink>

        <div class="flex items-center gap-6">
          <div class="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
            <NuxtLink to="/" class="px-4 py-1.5 rounded-md text-sm font-medium transition-all" active-class="bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm">Icons</NuxtLink>
            <NuxtLink to="/mixer" class="px-4 py-1.5 rounded-md text-sm font-medium transition-all" active-class="bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm">Mixer</NuxtLink>
            <NuxtLink to="/pattern" class="px-4 py-1.5 rounded-md text-sm font-medium transition-all" active-class="bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm">Pattern</NuxtLink>
            <NuxtLink to="/tools" class="px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2" active-class="bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm">Tools</NuxtLink>
            <NuxtLink to="/blog" class="px-4 py-1.5 rounded-md text-sm font-medium transition-all" active-class="bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm">Blog</NuxtLink>
            <NuxtLink to="/docs" class="px-4 py-1.5 rounded-md text-sm font-medium transition-all" active-class="bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm">Docs</NuxtLink>
            <NuxtLink to="/install" class="px-4 py-1.5 rounded-md text-sm font-medium transition-all" active-class="bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm">Installation</NuxtLink>
            <NuxtLink to="/contact" class="px-4 py-1.5 rounded-md text-sm font-medium transition-all" active-class="bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm">Contact</NuxtLink>
          </div>

          <button @click="toggleTheme" class="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors">
            <svg v-if="isDark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2" /><path d="M12 21v2" />
              <path d="M4.22 4.22l1.42 1.42" /><path d="M18.36 18.36l1.42 1.42" />
              <path d="M1 12h2" /><path d="M21 12h2" />
              <path d="M4.22 19.78l1.42-1.42" /><path d="M18.36 5.64l1.42-1.42" />
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <slot />

    <Transition name="fade">
      <button
        v-if="showScrollButton"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-xl z-50 transition-all hover:scale-110 hover:-translate-y-1 group"
        aria-label="Scroll to top"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:animate-bounce">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<style>
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.dark ::-webkit-scrollbar-thumb { background: #334155; }

.fade-enter-active,
.fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
