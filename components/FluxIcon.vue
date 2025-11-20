<script setup lang="ts">
import { computed } from 'vue';
import { useFluxIcons } from '@/composables/useFluxIcons'; // VEYA lib içindeyse: import { icons } from './icons';

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  color: { type: String, default: "currentColor" },
  strokeWidth: { type: [Number, String], default: 2 },
  className: { type: String, default: "" },
  spin: { type: Boolean, default: false }
});

// İkon verisini çek
const { icons } = useFluxIcons(); // Eğer lib'deysen: const iconPath = computed(() => icons[props.name] || "");
const iconPath = computed(() => icons[props.name] || "");

// İkonun "Dolu" (Solid/Brand) olup olmadığını anlayan akıllı kontrol
const isSolid = computed(() => {
  const path = iconPath.value;
  // İçinde stroke="none" veya fill="currentColor" (ama fill="none" değil) geçiyorsa doludur.
  return path.includes('stroke="none"') || (path.includes('fill=') && !path.includes('fill="none"'));
});
</script>

<template>
  <svg 
    v-if="iconPath"
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" 
    :fill="isSolid ? 'none' : 'none'" 
    :stroke="isSolid ? 'none' : color" 
    :stroke-width="isSolid ? '0' : strokeWidth"
    stroke-linecap="round" 
    stroke-linejoin="round"
    :class="[className, { 'animate-spin': spin }]" 
    v-html="iconPath"
  ></svg>
  <span v-else class="text-xs text-red-500">?</span>
</template>

<style>
/* Global Animasyon (Scoped DEĞİL) */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
  transform-origin: center; /* Merkezin kaymasını engeller */
}
</style>