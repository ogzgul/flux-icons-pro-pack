<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      
      <div class="mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Terms of Service</h1>
        <p class="text-sm text-slate-500">Effective Date: {{ new Date().toLocaleDateString() }}</p>
      </div>

      <div class="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-300">
        
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white">1. Acceptance of Terms</h3>
        <p>
          By accessing and using Flux Icons (flux-icon.com), you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h3 class="text-xl font-semibold text-slate-900 dark:text-white">2. Use License</h3>
        <p>
          Flux Icons are open-source and typically licensed under the <strong>MIT License</strong>. This means:
        </p>
        <ul class="list-disc pl-5 space-y-2">
          <li>You are free to use these icons in personal and commercial projects.</li>
          <li>You can modify the icons to suit your needs.</li>
          <li>You cannot claim ownership of the icons themselves or sell them as a standalone icon pack.</li>
          <li>Attribution is appreciated but not strictly required.</li>
        </ul>

        <h3 class="text-xl font-semibold text-slate-900 dark:text-white">3. Disclaimer</h3>
        <p>
          The materials on Flux Icons' website are provided on an 'as is' basis. Flux Icons makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h3 class="text-xl font-semibold text-slate-900 dark:text-white">4. Limitations</h3>
        <p>
          In no event shall Flux Icons or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Flux Icons' website.
        </p>

        <h3 class="text-xl font-semibold text-slate-900 dark:text-white">5. Changes to Terms</h3>
        <p>
          Flux Icons reserves the right to revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Terms of Service - Flux Icons'
})
</script>