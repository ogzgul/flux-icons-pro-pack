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

    <!-- Asıl uygulama -->
    <NuxtLayout>
      <NuxtPage />
      <CookieBanner />
    </NuxtLayout>
  </div>
</template>
