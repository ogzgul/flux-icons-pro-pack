<script setup>
// Sayfa başlıklarını otomatik yönetir
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Flux Icons` : 'Flux Icons | Premium Library';
  }
})
</script>


<template>
  <NuxtLayout>
    <NuxtPage />
    <CookieBanner />
  </NuxtLayout>
</template>