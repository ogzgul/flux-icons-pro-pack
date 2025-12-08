<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
    <article class="max-w-3xl mx-auto">
      
      <div class="text-center mb-10">
        <span class="text-purple-600 dark:text-purple-400 font-bold tracking-wider text-sm uppercase">Best Practices</span>
        <h1 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-3 mb-6 leading-tight">
          The Ultimate Guide to Accessible Icons (A11y)
        </h1>
        <div class="flex items-center justify-center gap-4 text-slate-500 text-sm">
          <div class="flex items-center gap-2">
            <FluxIcon name="user-check-contrast" size="18" /> Flux Team
          </div>
          <span class="w-1 h-1 rounded-full bg-slate-400"></span>
          <time>December 6, 2024</time>
        </div>
      </div>

      <div class="prose prose-lg prose-slate dark:prose-invert max-w-none">
        <p class="lead">
          Icons are a vital part of modern UI, but they can be a barrier for users relying on screen readers if not implemented correctly. Flux Icons is built with accessibility in mind. Here is how to ensure your icons are accessible to everyone.
        </p>

        <h3>1. Decorative vs. Semantic Icons</h3>
        <p>
          The first step is deciding if an icon is decorative or functional.
        </p>
        <ul>
            <li><strong>Decorative:</strong> An icon next to a button label (e.g., a "Save" icon next to the text "Save"). It adds visual flair but no new information.</li>
            <li><strong>Semantic (Functional):</strong> A standalone icon button (e.g., a "Trash" icon with no text). The icon <em>is</em> the label.</li>
        </ul>

        <h3>2. Handling Decorative Icons</h3>
        <p>
          For decorative icons, you want screen readers to ignore them completely. Otherwise, a user might hear "Graphic, Save" instead of just "Save". In Flux Icons, SVGs are automatically set to `aria-hidden="true"` by default when no title is provided, but it's good practice to be explicit.
        </p>
        <pre class="bg-slate-900 text-slate-300 p-4 rounded-lg text-sm"><code>&lt;button&gt;
  &lt;FluxIcon name="save" aria-hidden="true" /&gt;
  Save Changes
&lt;/button&gt;</code></pre>

        <h3>3. Handling Semantic Icons</h3>
        <p>
          For standalone icons, you <strong>must</strong> provide a text alternative. Since Flux Icons renders inline SVGs, you can use `aria-label` on the wrapper button or link.
        </p>
        <pre class="bg-slate-900 text-slate-300 p-4 rounded-lg text-sm"><code>&lt;button aria-label="Delete Item"&gt;
  &lt;FluxIcon name="trash-solid" /&gt;
&lt;/button&gt;</code></pre>

        <h3>4. Color Contrast</h3>
        <p>
          Don't rely on color alone to convey meaning. For example, in a form error, don't just turn the icon red. Use a specific "Error" icon (like `alert-circle`) combined with the color. Ensure your icon color has a contrast ratio of at least 3:1 against the background.
        </p>

        <h3>Summary</h3>
        <p>
          Making your web app accessible isn't just a legal requirement; it's the right thing to do. Flux Icons provides the raw SVG structure you need to build inclusive interfaces. Use `aria-labels`, check your contrast, and keep building for everyone.
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
  title: 'Accessible Icons Guide - Flux Icons Blog',
  meta: [
    { name: 'description', content: 'Learn how to use Flux Icons accessibly. A guide to ARIA labels, semantic icons, and color contrast for modern web development.' }
  ]
})
</script>