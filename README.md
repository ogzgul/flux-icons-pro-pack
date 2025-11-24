# Flux Icons Pro Pack ⚡️

![Version](https://img.shields.io/npm/v/flux-icons-pro-pack)
![License](https://img.shields.io/npm/l/flux-icons-pro-pack)

**1000+ Modern, Animated, Customizable SVG Icons for Vue 3, Nuxt & Universal Web Projects.**  
Flux Icons offers a distinct “disconnected line” style, solid brand icons, color sets, and built-in animation support.

👉 Full documentation: https://flux-icon.com

---

## ✨ Features

- 1000+ icons (UI, Crypto, Medical, Space, Social, Brands, etc.)
- Vue 3 & Nuxt native  
- Highly customizable (color, size, stroke width)  
- Animated icons with `spin` prop  
- Dual style: Flux Line + Solid/Brand  
- CDN support for use in any framework

---

## ⚡️ Quick Start (CDN)

Add inside `<head>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flux-icons-pro-pack@latest/dist-font/flux-icons.css" />
```
Or :

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flux-icons-pro-pack@1.0.27/dist-font/flux-icons.css" />
```
Use anywhere:

```html
<i class="flux-icon flux-icon-home" style="font-size: 48px; color: #6366f1;"></i>
<i class="flux-icon flux-icon-user"></i>
<i class="flux-icon flux-icon-loader-5 animate-spin"></i>
```

---

## 📦 Installation

```bash
npm install flux-icons-pro-pack
# or
yarn add flux-icons-pro-pack
# or
pnpm add flux-icons-pro-pack
```

---

# 🚀 Usage in Vue 3

`main.js`:

```js
import { createApp } from 'vue'
import App from './App.vue'

import FluxIcons from 'flux-icons-pro-pack'

const app = createApp(App)
app.use(FluxIcons)
app.mount('#app')
```

---

# 🚀 Usage in Nuxt 3

Create: `plugins/flux-icons.js`

```js
import FluxIcons from 'flux-icons-pro-pack'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FluxIcons)
})
```

---

## 🎨 Component Usage

```vue
<template>
  <div>

    <FluxIcon name="home" />

    <FluxIcon name="user" color="#6366f1" size="32" />

    <FluxIcon name="settings" stroke-width="1.5" />

    <FluxIcon name="loader-5" spin />
    <FluxIcon name="gear" spin color="orange" />

    <FluxIcon name="brand-apple" size="40" />
    <FluxIcon name="crypto-btc-color" size="40" />

    <FluxIcon
      name="bell"
      class="text-red-500 hover:scale-110 transition-transform"
    />

  </div>
</template>
```

### Props

| Prop           | Type           | Default       | Description          |
|----------------|----------------|---------------|----------------------|
| name           | String         | —             | Icon name            |
| size           | Number/String  | 24            | Size in px           |
| color          | String         | currentColor  | Icon color           |
| stroke-width   | Number/String  | 2             | Line thickness       |
| spin           | Boolean        | false         | Enables rotation     |

---

# 🌐 Use in ANY Framework (Webfont Mode)

Import CSS:

```js
import 'flux-icons-pro-pack/dist-font/flux-icons.css'
```

Use `<i>`:

```html
<i class="flux-icon flux-icon-home"></i>
<i class="flux-icon flux-icon-user" style="font-size: 32px; color: blue;"></i>
<i class="flux-icon flux-icon-loader-5 animate-spin"></i>
```

---

## 📄 License

MIT License  
© 2025 Flux Icons
