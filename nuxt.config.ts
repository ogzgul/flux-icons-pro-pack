// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from 'nuxt/config'
// 👇 1. İKON VERİSİNİ BURAYA ÇAĞIRIYORUZ (Hatanın çözümü bu)
import { icons } from './lib/icons'
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-gtag',
    '@nuxtjs/sitemap' // <-- BURAYA EKLE
  ],
  // Sitemap Ayarı (Kendi site adresini yaz)
  // HATA VEREN "site: {}" YERİNE BUNU KULLAN:
  site: {
    url: 'https://flux-icon.com',
  },
  // 👇 2. SITEMAP AYARLARI (Dinamik Linkler)
  sitemap: {
    // 3500+ sayfa olduğu için 'urls' fonksiyonu ile besliyoruz
    urls: async () => {
      return Object.keys(icons).map(name => `/icon/${name}`)
    },
    // Sitemap dosyasının çok şişmemesi için varsayılan ayarlar
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date()
    }
  },
  gtag: {
      id: 'G-3C1VRW18EF' // <--- KENDİ GA4 ÖLÇÜM KİMLİĞİNİ BURAYA YAPIŞTIR
    },
  css: [
    '~/assets/css/main.css',       // DOĞRU (Tilde ile başlar)
    '~/assets/css/animations.css'  // DOĞRU (Tilde ile başlar)
  ],
// --- BURASI YENİ: HEAD AYARLARI (SEO & FAVICON) ---
  app: {
    head: {
      // Tarayıcı Sekmesinde Görünecek Başlık
      title: 'Flux Icons | Premium Open Source Icon Library',
      
      // Meta Etiketleri (SEO için)
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '1300+ Modern, Animated, and Customizable SVG Icons for Vue & Nuxt.' },
        { name: 'theme-color', content: '#4f46e5' } // Mobilde tarayıcı çubuğu rengi (Indigo)
      ],

      // Favicon (Sekme İkonu) Ayarları
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        // 2. GOOGLE ARAMA SONUÇLARI İÇİN (Çözüm Bu!)
        // En az 192x192 olmalı.
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon.png' },
        // 3. Apple Cihazlar İçin (Opsiyonel ama önerilir)
        { rel: 'apple-touch-icon', href: '/icon.png' }

      ],

      // AdSense Kodu (İlerde aktifleşince buraya ID gelecek)
  
      script: [
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8958196183964469',
          async: true,
          crossorigin: 'anonymous'
        }
      ]



    }
  },
  
})