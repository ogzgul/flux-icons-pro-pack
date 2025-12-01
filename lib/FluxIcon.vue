<script setup>
import { computed } from 'vue';
import { icons } from './icons.js';

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  color: { type: String, default: "currentColor" },
  strokeWidth: { type: [Number, String], default: 1 }, // Varsayılan incelttik
  className: { type: String, default: "" },
  spin: { type: Boolean, default: false },
  // YENİ: Animasyon Prop'u
  animation: { type: String, default: "" }
});

const iconPath = computed(() => icons[props.name] || "");

const iconType = computed(() => {
  const name = props.name;
  if (name.startsWith('liquid-') || name.startsWith('flag-') || name.startsWith('avatar-') || name.startsWith('aero-') || name.startsWith('sticker-') || name.startsWith('brand-original')) {
    return 'original';
  }
  return 'universal';
});

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
    :class="[
        className, 
        { 'flux-spin': spin },
        animationClass
    ]"
    :style="{ color: color }"
    
    :fill="iconType === 'original' ? 'none' : 'none'" 
    :stroke-width="iconType === 'original' ? 0 : strokeWidth"
    
    stroke-linecap="round" 
    stroke-linejoin="round"
    v-html="iconPath"
  ></svg>
  
  <span v-else style="color:red; font-size:10px; display:inline-block; width:24px; text-align:center;">?</span>
</template>

<style>
/* Sadece temel spin burada, diğerleri CSS dosyasından gelecek */
@keyframes flux-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.flux-spin {
  animation: flux-spin 1s linear infinite;
  transform-origin: center;
}
</style>