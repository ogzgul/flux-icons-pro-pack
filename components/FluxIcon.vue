<script setup lang="ts">
import { computed } from 'vue';
// Eğer 'lib' klasörüne taşıdıysan yolu ona göre düzelt, 
// yoksa composables'dan çekmeye devam et.
import { useFluxIcons } from '@/composables/useFluxIcons'; 

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  color: { type: String, default: "currentColor" },
  strokeWidth: { type: [Number, String], default: 1 },
  className: { type: String, default: "" },
  spin: { type: Boolean, default: false },
  // YENİ: Animasyon Prop'u
  // Örnek kullanım: animation="shake", animation="beat", animation="bounce-y"
  animation: { type: String, default: "" }
});

// İkon verisini çek
const { icons } = useFluxIcons();
const iconPath = computed(() => icons[props.name] || "");

// İkonun "Dolu" (Solid/Brand/Liquid) olup olmadığını anlayan kontrol
const isSolid = computed(() => {
  const path = iconPath.value;
  // İçinde stroke="none" varsa veya fill varsa (ama fill="none" değilse) bu bir dolu ikondur.
  return path.includes('stroke="none"') || (path.includes('fill=') && !path.includes('fill="none"'));
});

// YENİ: Animasyon Sınıfını Hesapla
// Gelen "shake" değerini "flux-anim-shake" sınıfına dönüştürür.
const animationClass = computed(() => {
    if (!props.animation) return "";
    return `flux-anim-${props.animation}`;
});
</script>

<template>
  <svg 
    v-if="iconPath"
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" 
    :fill="isSolid ? 'none' : 'none'" 
    :stroke="isSolid ? 'none' : 'currentColor'" 
    :stroke-width="isSolid ? '0' : strokeWidth"
    stroke-linecap="round" 
    stroke-linejoin="round"
    :class="[
        className, 
        { 'animate-spin': spin },
        animationClass // YENİ: Animasyon sınıfı buraya eklendi
    ]"
    :style="{ color: color }"
    v-html="iconPath"
  ></svg>
  <span v-else class="text-xs text-red-500">?</span>
</template>

<style>
/* Global Spin Animasyonu (Mevcut olan) */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
  transform-origin: center;
}

/* Diğer animasyonlar (shake, beat vb.) assets/css/flux-animations.css dosyasından gelecek */
</style>