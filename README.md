# Flux Icons Pro Pack ⚡️

![Version](https://img.shields.io/npm/v/flux-icons-pro-pack)
![License](https://img.shields.io/npm/l/flux-icons-pro-pack)

> **1000+ Modern, Animated, and Customizable SVG Icons for Vue 3 & Nuxt.**

Flux Icons is a comprehensive icon library designed for modern web applications. It features a unique "disconnected line" aesthetic, solid brand logos, and built-in animation capabilities.

## ✨ Features

- **1000+ Icons:** From UI controls to obscure categories like Crypto, Space, Medical, and Brands.
- **Vue 3 Native:** Built specifically for Vue 3 and Nuxt ecosystem.
- **Tree-Shakeable:** Optimized for performance. Only imports what you use.
- **Customizable:** Control size, color, stroke width via props.
- **Animated:** Built-in `spin` prop for loading states and gears.
- **Dual Style:** Includes both Line (Flux) and Solid (Brand) styles.

---

## 📦 Installation

You can install the package via NPM, Yarn, or PNPM.

```bash
# npm
npm install flux-icons-pro-pack

# yarn
yarn add flux-icons-pro-pack

# pnpm
pnpm add flux-icons-pro-pack

## 🚀 Usage

### 1. Global Registration (Vue 3)

Register the library once in your main entry file (`main.js` or `main.ts`) to use the `<FluxIcon />` component anywhere in your app.

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import FluxIcons from 'flux-icons-pro-pack'

const app = createApp(App)

app.use(FluxIcons) // Registers <FluxIcon /> globally
app.mount('#app')

##Global Registration (Nuxt 3)
Create a plugin file at plugins/flux-icons.js:

##import FluxIcons from 'flux-icons-pro-pack'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FluxIcons)
})
##🎨 Component Usage
Once registered, you can use the component in your templates with simple props.
<template>
  <div class="icon-container">
    
    <FluxIcon name="home" />

    <FluxIcon name="user" color="#6366f1" size="32" />

    <FluxIcon name="settings" stroke-width="1.5" />

    <FluxIcon name="loader-5" spin />
    <FluxIcon name="gear" spin color="orange" />

    <FluxIcon name="brand-apple" size="40" />
    <FluxIcon name="crypto-btc-color" size="40" />

    <FluxIcon name="bell" class="text-red-500 hover:scale-110 transition-transform" />

  </div>
</template>


## 📄 License

Released under the [MIT License](./LICENSE).

Copyright © 2025 Flux Icons