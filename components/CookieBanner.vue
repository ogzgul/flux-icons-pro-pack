<script setup>
const { icons } = useFluxIcons(); // İkonları kullanmak için
const cookieConsent = useCookie('flux_consent', { default: () => null, maxAge: 31536000 }); // 1 yıl sakla
const isVisible = ref(false);

onMounted(() => {
    // Eğer çerez tercihi yapılmamışsa 1 saniye sonra göster
    if (cookieConsent.value === null) {
        setTimeout(() => {
            isVisible.value = true;
        }, 1000);
    }
});

const accept = () => {
    cookieConsent.value = 'accepted';
    isVisible.value = false;
};

const decline = () => {
    cookieConsent.value = 'declined';
    isVisible.value = false;
};
</script>

<template>
  <Transition name="slide-up">
    <div v-if="isVisible" class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[100]">
      <div class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-5 rounded-2xl shadow-2xl flex flex-col gap-4">
        
        <div class="flex items-start gap-4">
            <div class="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400 shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons['food-cookie'] || icons['flux-icon']"></svg>
            </div>
            <div>
                <h4 class="font-bold text-slate-900 dark:text-white text-sm">We use cookies 🍪</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    We use cookies to improve your experience and save your preferences (like icon color & size).
                </p>
            </div>
        </div>

        <div class="flex gap-2 justify-end">
            <button @click="decline" class="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors">Decline</button>
            <button @click="accept" class="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95">Accept</button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>