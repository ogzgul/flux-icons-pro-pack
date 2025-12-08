<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
    <article class="max-w-3xl mx-auto">
      
      <div class="text-center mb-10">
        <span class="text-emerald-600 dark:text-emerald-400 font-bold tracking-wider text-sm uppercase">Vue.js Tutorial</span>
        <h1 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-3 mb-6 leading-tight">
          Mastering Tree-Shaking with Flux Icons
        </h1>
        <div class="flex items-center justify-center gap-4 text-slate-500 text-sm">
          <div class="flex items-center gap-2">
            <FluxIcon name="code-block" size="18" /> Flux Team
          </div>
          <span class="w-1 h-1 rounded-full bg-slate-400"></span>
          <time>December 5, 2024</time>
        </div>
      </div>

      <div class="prose prose-lg prose-slate dark:prose-invert max-w-none">
        <p class="lead">
          Performance is key in modern web applications. Loading a library with 3000+ icons when you only display 10 on your landing page is bad practice. This guide explains how Flux Icons handles optimization automatically.
        </p>

        <h3>What is Tree-Shaking?</h3>
        <p>
          Tree-shaking is a term commonly used in the JavaScript context for dead-code elimination. It relies on the static structure of ES2015 module syntax, i.e., <code>import</code> and <code>export</code>. Imagine your application as a tree. The green leaves are the code you actually use. The brown, dead leaves are the unused code. Tree-shaking shakes the tree to let the dead leaves fall off.
        </p>

        <h3>How Flux Icons Implements It</h3>
        <p>
          When you use Flux Icons in your Nuxt or Vue project, we provide modular exports. Although you can import everything for rapid prototyping, production builds are smarter.
        </p>

        <pre class="bg-slate-900 text-slate-300 p-4 rounded-lg text-sm"><code>// Good for prototyping (Imports all, but build tools might still optimize)
import { icons } from 'flux-icons-pro-pack';

// Best for performance (Direct import)
import { IconHome, IconUser } from 'flux-icons-pro-pack';</code></pre>

        <h3>The Role of build-css.js</h3>
        <p>
          In our library, we use a custom script to generate minimal CSS. Unlike other libraries that ship with a 5MB CSS file containing all Base64 icons, Flux Icons allows you to generate a font file that only contains the classes you need, or rely entirely on the Vue component which injects SVGs inline.
        </p>

        <h3>Lazy Loading Icons</h3>
        <p>
          For large dashboards, you can also use Vue's <code>defineAsyncComponent</code> to load heavy icons only when they are needed (e.g., inside a modal that isn't initially visible). Flux Icons components are compatible with this pattern out of the box.
        </p>

        <h3>Summary</h3>
        <p>
          By using Flux Icons, you are already benefiting from modern bundler optimizations. Keep your imports clean, update your dependencies, and enjoy a blazing fast website.
        </p>
      </div>

      <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <NuxtLink to="/blog" class="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
          <FluxIcon name="arrow-curve-up-left" size="20" /> Back to Blog
        </NuxtLink>
      </div>

    </article>
  </div>
</template>

<script setup>
useHead({
  title: 'Mastering Tree-Shaking - Flux Icons Blog',
  meta: [
    { name: 'description', content: 'Learn how to optimize your Vue.js application bundle size by using tree-shaking with the Flux Icons library.' }
  ]
})
</script>