<script setup>
import { computed } from 'vue';
import { icons } from './icons.js'; // Veriyi yan dosyadan çekiyoruz

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  color: { type: String, default: "currentColor" },
  strokeWidth: { type: [Number, String], default: 2 },
  className: { type: String, default: "" },
  spin: { type: Boolean, default: false }
});

const iconPath = computed(() => icons[props.name] || "");

// İkonun türünü analiz eden akıllı kontrol
const iconType = computed(() => {
  const path = iconPath.value;
  const name = props.name;

  // 1. Liquid / Renkli İkonlar (Bunlara müdahale etme, olduğu gibi göster)
  if (name.startsWith('liquid-') || name.startsWith('flag-') || name.startsWith('sticker-')) {
    return 'original';
  }

  // 2. Dolu (Solid/Brand) İkonlar (Stroke yok, Fill var)
  if (path.includes('stroke="none"') || (path.includes('fill=') && !path.includes('fill="none"'))) {
    return 'solid';
  }

  // 3. Varsayılan: Çizgisel (Outline) İkonlar
  return 'outline';
});
</script>

<template>
  <svg 
    v-if="iconPath"
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" 
    :class="[className, { 'flux-spin': spin }]"
    :style="{ color: color }"
    
    :fill="iconType === 'outline' ? 'none' : (iconType === 'original' ? 'none' : 'currentColor')"
    
    :stroke="iconType === 'outline' ? 'currentColor' : 'none'"
    
    :stroke-width="iconType === 'outline' ? strokeWidth : '0'"
    
    stroke-linecap="round" 
    stroke-linejoin="round"
    v-html="iconPath"
  ></svg>
  <span v-else style="color:red; font-size:10px; display:inline-block; width:24px; text-align:center;">?</span>
</template>

<style>
/* Global Animasyon (Scoped DEĞİL, her yerde çalışsın) */
@keyframes flux-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.flux-spin {
  animation: flux-spin 1s linear infinite;
  transform-origin: center;
}
</style>