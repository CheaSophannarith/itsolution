<template>
    <div class="min-h-screen">
        <!-- Hero Section with Breadcrumb -->
        <div class="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16" style="background: linear-gradient(135deg, #459bcc 0%, #172554 100%)">
            <div class="max-w-7xl mx-auto px-2 sm:px-6">
                <!-- Breadcrumb -->
                <nav class="flex items-center gap-1 sm:gap-2 text-white/80 text-xs sm:text-sm mb-3 sm:mb-4 flex-wrap">
                    <NuxtLink to="/" class="hover:text-white">Home</NuxtLink>
                    <ChevronRight class="w-3 h-3 sm:w-4 sm:h-4" />
                    <span class="text-white">Contact Us</span>
                </nav>

                <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4">
                    Contact Us
                </h1>
                <p class="text-white/90 max-w-2xl text-sm sm:text-base">
                    Have a question or need IT solutions? We'd love to hear from you.
                </p>
            </div>
        </div>

        <!-- Main Content Section -->
        <div class="flex flex-col lg:flex-row mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 lg:py-12 gap-6 lg:gap-16">
            <!-- Left: Contact Info -->
            <div class="lg:w-1/2">
                <div class="space-y-6">
                    <!-- Location -->
                    <div class="flex items-start gap-4 group">
                        <div class="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors">
                            <MapPin class="w-6 h-6 text-brand" />
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-800 text-lg">Visit Us</h3>
                            <p class="text-gray-600 text-sm leading-relaxed">
                                St. Commercial, Chipmong Landmark,<br>
                                Sangkat Chak Angrae Leu, Khan Meanchey,<br>
                                Phnom Penh, Cambodia 120601
                            </p>
                        </div>
                    </div>

                    <!-- Phone -->
                    <div class="flex items-start gap-4 group">
                        <div class="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors">
                            <Phone class="w-6 h-6 text-brand" />
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-800 text-lg">Call Us</h3>
                            <div class="text-gray-600 text-sm space-y-0.5">
                                <a href="tel:+855998688883" class="block hover:text-brand transition-colors">099 86 88 83 (Cellcard)</a>
                                <a href="tel:+855178688883" class="block hover:text-brand transition-colors">017 86 88 83 (Cellcard)</a>
                                <a href="tel:+855708688883" class="block hover:text-brand transition-colors">070 86 88 83 (Smart)</a>
                            </div>
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="flex items-start gap-4 group">
                        <div class="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors">
                            <Mail class="w-6 h-6 text-brand" />
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-800 text-lg">Email Us</h3>
                            <a href="mailto:sales@itsolutiondigital.com" class="text-gray-600 text-sm hover:text-brand transition-colors">
                                sales@itsolutiondigital.com
                            </a>
                        </div>
                    </div>

                    <!-- Hours -->
                    <div class="flex items-start gap-4 group">
                        <div class="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors">
                            <Clock class="w-6 h-6 text-brand" />
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-800 text-lg">Business Hours</h3>
                            <p class="text-gray-600 text-sm">
                                Monday - Saturday<br>
                                08:00 AM - 05:30 PM
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Social/Quick Links -->
                <div class="flex gap-3 mt-8">
                    <a href="https://wa.me/855998688883" target="_blank"
                        class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                        <MessageCircle class="w-5 h-5" />
                        WhatsApp
                    </a>
                    <a href="https://t.me/+855998688883" target="_blank"
                        class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                        <Send class="w-5 h-5" />
                        Telegram
                    </a>
                </div>
            </div>

            <!-- Right: Map -->
            <div class="lg:w-1/2 bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 min-h-[400px] lg:min-h-[500px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.8!2d104.9234743!3d11.520857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109516b6478ec2d%3A0xa9612149c59cf41a!2sIT%20Solution%20Cambodia!5e0!3m2!1sen!2skh!4v1706000000000!5m2!1sen!2skh"
                    width="100%"
                    height="100%"
                    style="border:0;"
                    allowfullscreen
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>

        <!-- Trust Badges Section -->
        <div class="bg-gray-50 py-12 sm:py-16 border-t border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    <div v-for="badge in trustBadges" :key="badge.title" class="flex items-center gap-4">
                        <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0"
                            :class="badge.bgColor">
                            <component :is="badge.icon" class="w-7 h-7 sm:w-8 sm:h-8" :class="badge.iconColor" />
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-800 text-sm sm:text-base">{{ badge.title }}</h3>
                            <p class="text-xs sm:text-sm text-gray-600">{{ badge.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- FAQ Preview Section -->
        <div class="bg-white py-12 sm:py-16">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                <h2 class="text-xl sm:text-2xl font-bold text-blue-950 mb-4">Frequently Asked Questions</h2>
                <p class="text-gray-600 mb-8">Can't find what you're looking for? Check our FAQ or contact us directly.</p>

                <div class="space-y-4 text-left">
                    <div v-for="(faq, index) in faqs" :key="index"
                        class="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                            @click="toggleFaq(index)"
                            class="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <span class="font-medium text-gray-800 text-left">{{ faq.question }}</span>
                            <ChevronDown class="w-5 h-5 text-gray-500 transition-transform" :class="{ 'rotate-180': faq.open }" />
                        </button>
                        <Transition
                            enter-active-class="transition ease-out duration-200"
                            enter-from-class="opacity-0 -translate-y-1"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 -translate-y-1"
                        >
                            <div v-show="faq.open" class="p-4 text-gray-600 text-sm border-t border-gray-200">
                                {{ faq.answer }}
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useHead } from '#imports';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    MessageCircle,
    ChevronDown,
    ChevronRight,
    Award,
    RotateCcw,
    Globe,
    ShieldCheck
} from 'lucide-vue-next';

useHead({
    title: 'Contact Us | Tan',
    meta: [
        { name: 'description', content: 'Get in touch with IT Solution Cambodia. We are here to help with all your IT needs.' }
    ]
});

const trustBadges = [
    {
        title: 'Original Product',
        description: '100% Original product covered warranty by the vendor.',
        icon: Award,
        bgColor: 'bg-blue-100',
        iconColor: 'text-blue-600'
    },
    {
        title: '30 Days Warranty',
        description: 'You have the right to return your orders within 30 days.',
        icon: RotateCcw,
        bgColor: 'bg-green-100',
        iconColor: 'text-green-600'
    },
    {
        title: 'Global Shipping',
        description: 'Your orders are shipped seamlessly between countries.',
        icon: Globe,
        bgColor: 'bg-purple-100',
        iconColor: 'text-purple-600'
    },
    {
        title: '100% Secure',
        description: 'Your payments are secure with our private security network.',
        icon: ShieldCheck,
        bgColor: 'bg-orange-100',
        iconColor: 'text-orange-600'
    }
];

const faqs = ref([
    {
        question: 'What are your business hours?',
        answer: 'We are open Monday through Saturday from 08:00 AM to 05:30 PM. We are closed on Sundays and public holidays.',
        open: false
    },
    {
        question: 'How can I get technical support?',
        answer: 'You can reach our technical support team via phone, email, or WhatsApp. Our team typically responds within 24 hours on business days.',
        open: false
    },
    {
        question: 'Do you offer on-site services?',
        answer: 'Yes, we offer on-site technical support and installation services within Phnom Penh. Contact us for availability and pricing.',
        open: false
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept cash, bank transfers, and major credit/debit cards. For large orders, we also offer flexible payment terms.',
        open: false
    }
]);

const toggleFaq = (index: number) => {
    faqs.value[index].open = !faqs.value[index].open;
};
</script>
