<script setup>
// Sayfa başlıklarını otomatik yönetir
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Flux Icons` : 'Flux Icons | Premium Library'
  }
})
</script>

<template>
  <div>
    <!-- Netlify'ın build sırasında göreceği GİZLİ form -->
    <form
      name="contact"
      netlify
      netlify-honeypot="bot-field"
      hidden
    >
      <input type="text" name="name" />
      <input type="email" name="email" />
      <textarea name="message"></textarea>
    </form>

   <div class="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
    <NuxtLayout>
      
      <div class="flex-grow">
        <NuxtPage />
      </div>

      <FluxFooter />

      <CookieBanner />

    </NuxtLayout>
  </div>
  </div>
</template>
