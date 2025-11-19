<script setup lang="ts">
import { computed } from 'vue';
import { useFluxIcons } from '@/composables/useFluxIcons';

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  color: { type: String, default: "currentColor" },
  strokeWidth: { type: [Number, String], default: 2 },
  className: { type: String, default: "" },
  spin: { type: Boolean, default: false } // <--- YENİ ÖZELLİK: SPIN
});

const { icons } = useFluxIcons();
const iconPath = computed(() => icons[props.name] || "");
</script>

<template>
  <svg 
    v-if="iconPath"
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" 
    fill="none" 
    :stroke="iconPath.includes('stroke=&quot;none&quot;') ? 'none' : color" 
    :stroke-width="iconPath.includes('stroke=&quot;none&quot;') ? '0' : strokeWidth"
    stroke-linecap="round" 
    stroke-linejoin="round"
    :class="[className, { 'animate-spin': spin }]" 
    v-html="iconPath"
  ></svg>
  <span v-else class="text-xs text-red-500">?</span>
</template>

<style scoped>
/* Eğer Tailwind yoksa bu CSS çalışır */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>