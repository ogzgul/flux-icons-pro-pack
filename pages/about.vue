<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
    
    <div class="max-w-4xl w-full text-center mb-16">
      <div class="inline-block p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
         <FluxIcon name="layers-floating" size="48" class="text-indigo-600 dark:text-indigo-400" animation="float" />
      </div>
      <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
        About <span class="text-indigo-600 dark:text-indigo-400">Flux Icons</span>
      </h1>
      <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
        We are building the most comprehensive, customizable, and developer-friendly open-source icon ecosystem for the modern Vue & Nuxt community.
      </p>
    </div>

    <div class="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        
        <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500 transition-all duration-300 text-center group">
            <div class="mb-6 flex justify-center text-indigo-500 group-hover:scale-110 transition-transform"><FluxIcon name="gem-pro" size="40" /></div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Premium Quality</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Every icon is crafted on a 24px grid with pixel-perfect precision, ensuring crystal clear rendering on all devices.</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-pink-500 transition-all duration-300 text-center group">
            <div class="mb-6 flex justify-center text-pink-500 group-hover:scale-110 transition-transform"><FluxIcon name="magic-wand" size="40" /></div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Fully Customizable</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Control stroke widths, colors, sizes, and even toggle animations instantly via props to match your brand identity.</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 text-center group">
            <div class="mb-6 flex justify-center text-emerald-500 group-hover:scale-110 transition-transform"><FluxIcon name="code-block" size="40" /></div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Developer First</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Native Vue 3 & Nuxt 3 support with TypeScript definitions, tree-shaking, and zero-config implementation.</p>
        </div>

    </div>

    <div class="max-w-3xl w-full prose prose-lg prose-slate dark:prose-invert">
        
        <h2 class="text-3xl font-bold text-center mb-8">Our Story & Mission</h2>
        
        <p>
            The web has evolved, but icon libraries have largely remained stagnant. For years, developers relied on bloated icon fonts that caused layout shifts, rendering issues, and slow load times. We asked ourselves: <em>"Why isn't there a library designed specifically for the reactive era of Vue and Nuxt?"</em>
        </p>
        <p>
            That question gave birth to <strong>Flux Icons</strong>.
        </p>

        <h3>Bridging Design and Code</h3>
        <p>
            Flux Icons isn't just a collection of SVGs; it's a design system. We noticed that designers love the flexibility of tools like Figma, while developers need the performance of clean code. Flux Icons bridges this gap by providing:
        </p>
        <ul>
            <li><strong>Consistency:</strong> Uniform stroke weights and corner radiuses across 1500+ icons.</li>
            <li><strong>Interactivity:</strong> Built-in micro-interactions (shake, bounce, pulse) that make interfaces feel alive.</li>
            <li><strong>Versatility:</strong> Different styles (Solid, Outline, Liquid) for different contexts within the same application.</li>
        </ul>

        <h3>Why Open Source?</h3>
        <p>
            We believe that essential building blocks of the web should be accessible to everyone. Whether you are a student building your first portfolio, a freelancer working on a deadline, or a startup launching an MVP, you shouldn't have to worry about expensive licensing fees for basic UI elements.
        </p>
        <p>
            Flux Icons is licensed under the <strong>MIT License</strong>, meaning you can use it freely in personal and commercial projects. We rely on the community to help us grow, spot bugs, and suggest new icons.
        </p>

        <h3>The Technology Behind Flux</h3>
        <p>
            Performance is our core value. Unlike traditional libraries that force you to download megabytes of data, Flux Icons utilizes modern <strong>Tree-Shaking</strong> techniques. When you import <code>&lt;FluxIcon name="home" /&gt;</code>, your final bundle includes code <em>only</em> for the home icon. This results in lightning-fast websites and happy users.
        </p>

        <div class="not-prose mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
            <p class="text-slate-600 dark:text-slate-400 mb-6">Ready to build something amazing?</p>
            <div class="flex justify-center gap-4">
                <NuxtLink to="/docs" class="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
                    Read the Docs
                </NuxtLink>
                <NuxtLink to="/mixer" class="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition-colors">
                    Try Icon Mixer
                </NuxtLink>
            </div>
        </div>

    </div>

  </div>
</template>

<script setup>
useHead({
  title: 'About Us - Flux Icons | The Modern Icon Library',
  meta: [
    { name: 'description', content: 'Learn about the mission behind Flux Icons. An open-source, performance-first SVG icon library designed for Vue.js and Nuxt developers.' },
    { property: 'og:title', content: 'About Flux Icons - Our Mission' },
    { property: 'og:description', content: 'Bridging the gap between design elegance and developer efficiency with open-source icons.' }
  ]
})
</script>