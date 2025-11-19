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
  <span v-else style="color:red; font-size:10px;">?</span>
</template>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>