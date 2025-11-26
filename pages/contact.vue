<script setup>
import { ref } from 'vue';

useHead({
  title: 'Contact Us - Flux Icons'
});

const loading = ref(false);
const success = ref(false);
const error = ref(false);

// Form Verileri
const formData = ref({
    name: '',
    email: '',
    message: ''
});

// Form Gönderme Fonksiyonu
const handleSubmit = async (e) => {
    loading.value = true;
    error.value = false;
    success.value = false;

    try {
        // Netlify'a veriyi POST ediyoruz
        await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                "form-name": "contact",
                ...formData.value
            }).toString()
        });

        // Başarılı olursa
        success.value = true;
        formData.value = { name: '', email: '', message: '' }; // Formu temizle
    } catch (err) {
        console.error(err);
        error.value = true;
    } finally {
        loading.value = false;
    }
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-xl mx-auto">
        
        <div class="text-center mb-10">
            <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Get in Touch</h1>
            <p class="text-slate-600 dark:text-slate-400">Have questions, suggestions, or just want to say hi?</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
            
            <div v-if="success" class="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-center gap-3 text-emerald-700 dark:text-emerald-400">
                <FluxIcon name="check-circle-fill" size="24" />
                <div>
                    <p class="font-bold">Message Sent!</p>
                    <p class="text-xs opacity-80">We'll get back to you soon.</p>
                </div>
            </div>

            <div v-if="error" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                Something went wrong. Please try again later.
            </div>

            <form 
                name="contact" 
                method="POST" 
                data-netlify="true" 
                data-netlify-honeypot="bot-field"
                @submit.prevent="handleSubmit"
                class="space-y-6"
                v-if="!success"
            >
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />

                <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                    <input v-model="formData.name" type="text" name="name" required class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Your Name">
                </div>

                <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                    <input v-model="formData.email" type="email" name="email" required class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="you@example.com">
                </div>

                <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                    <textarea v-model="formData.message" name="message" rows="4" required class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="How can we help?"></textarea>
                </div>

                <button type="submit" :disabled="loading" class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <FluxIcon v-if="loading" name="loader-5" spin size="20" />
                    <FluxIcon v-else name="send-fill" size="20" /> 
                    {{ loading ? 'Sending...' : 'Send Message' }}
                </button>
            </form>

            <div class="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                <p class="text-sm text-slate-500 mb-2">Or email us directly:</p>
                <a href="mailto:support@flux-icon.com" class="text-indigo-600 font-medium hover:underline flex items-center justify-center gap-2">
                    <FluxIcon name="mail-solid" size="18" /> support@flux-icon.com
                </a>
            </div>
        </div>

    </div>
  </div>
</template>