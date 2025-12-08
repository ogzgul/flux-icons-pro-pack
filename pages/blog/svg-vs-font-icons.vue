<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
    <article class="max-w-3xl mx-auto">
      
      <div class="text-center mb-10">
        <span class="text-indigo-600 dark:text-indigo-400 font-bold tracking-wider text-sm uppercase">Performance Guide</span>
        <h1 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-3 mb-6 leading-tight">
          Why SVG Icons Are Superior to Icon Fonts in 2024
        </h1>
        <div class="flex items-center justify-center gap-4 text-slate-500 text-sm">
          <div class="flex items-center gap-2">
            <FluxIcon name="user-contrast-circle" size="18" /> Flux Team
          </div>
          <span class="w-1 h-1 rounded-full bg-slate-400"></span>
          <time>December 6, 2024</time>
        </div>
      </div>

      <div class="prose prose-lg prose-slate dark:prose-invert max-w-none">
        <p class="lead">
          For over a decade, icon fonts (like FontAwesome) ruled the web. They were easy to use—just include a CSS file and type a class name. However, as web technologies advanced, the limitations of font-based icons became apparent. Enter SVG (Scalable Vector Graphics).
        </p>

        <h3>1. Sharpness and Rendering Quality</h3>
        <p>
          Icon fonts are treated as text by the browser. This means they are subject to anti-aliasing (font smoothing), which can make icons look blurry on certain screens or at small sizes. SVGs are mathematical vectors; they render pixel-perfectly at any size, zoom level, or screen density (Retina displays).
        </p>

        <h3>2. Accessibility (a11y)</h3>
        <p>
          Screen readers often struggle with icon fonts. If the CSS fails to load, a user might see weird characters (like empty squares) instead of an icon. SVGs allow you to use <code>&lt;title&gt;</code> and <code>desc</code> tags directly within the code, making them semantically understandable for assistive technologies.
        </p>

        <h3>3. Multi-Color Support</h3>
        <p>
          Icon fonts are monochromatic (single color), just like text letters. While you can use some CSS hacks, creating multi-colored icons is difficult. SVGs, like our <strong>Flux Icons Liquid Style</strong>, support multiple colors, gradients, and opacity layers natively.
        </p>

        <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800 not-prose my-8">
          <h4 class="font-bold text-indigo-700 dark:text-indigo-300 text-lg mb-2">Did you know?</h4>
          <p class="text-slate-700 dark:text-slate-300 text-sm">
            Flux Icons supports animations directly via props because they are SVGs. You cannot easily animate individual paths of a font icon!
          </p>
        </div>

        <h3>4. File Size and HTTP Requests</h3>
        <p>
          When you use an icon font, you often load the entire library (hundreds of kilobytes) even if you only use 5 icons. With modern frameworks like Vue and Nuxt, using an SVG component library (like Flux Icons) enables <strong>Tree-Shaking</strong>. This means only the 5 icons you actually use are bundled into your final JavaScript file.
        </p>

        <h3>Conclusion</h3>
        <p>
          While icon fonts played a huge role in web history, inline SVGs are the modern standard. They offer better control, performance, and visual fidelity. If you are starting a new project in 2024, sticking to an SVG library like Flux Icons is the best decision for your users.
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
  title: 'Why SVG Icons Are Superior - Flux Icons Blog',
  meta: [
    { name: 'description', content: 'Discover why SVGs offer better performance, accessibility, and quality compared to traditional icon fonts in modern web development.' }
  ]
})
</script>