// https://nuxt.com/docs/api/configuration/nuxt-config
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
        // Eğer public klasörüne favicon.ico attıysan:
        //{ rel: 'icon', type: 'image/x-icon',sizes: '192x192', href: '/favicon2.ico' },
        
        // Eğer PNG attıysan (örneğin logo.png):
        { rel: 'icon', type: 'image/png',sizes: '256x256', href: '/logo.png' }
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