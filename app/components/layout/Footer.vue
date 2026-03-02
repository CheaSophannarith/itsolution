<template>
    <footer class="bg-brand/9 text-black">
        <!-- Main Footer Content -->
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-12">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                <!-- My Account -->
                <div>
                    <h3 class="font-bold text-lg sm:text-xl mb-4 sm:mb-5 text-black">My Account</h3>
                    <ul class="space-y-2 sm:space-y-3">
                        <li v-for="link in accountLinks" :key="link.name">
                            <NuxtLink :to="link.path" class="text-sm sm:text-base text-black/80 hover:text-brand">
                                {{ link.name }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- About Us -->
                <div>
                    <h3 class="font-bold text-lg sm:text-xl mb-4 sm:mb-5 text-black">About Us</h3>
                    <ul class="space-y-2 sm:space-y-3">
                        <li v-for="link in aboutLinks" :key="link.name">
                            <NuxtLink :to="link.path" class="text-sm sm:text-base text-black/80 hover:text-brand">
                                {{ link.name }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Contact Us -->
                <div class="col-span-2 lg:col-span-1">
                    <h3 class="font-bold text-lg sm:text-xl mb-4 sm:mb-5 text-black">Contact Us</h3>
                    <div class="space-y-3 sm:space-y-4 text-sm sm:text-base text-black/80">
                        <div v-for="phone in phoneNumbers" :key="phone.number" class="flex items-center gap-3">
                            <Phone class="w-5 h-5 shrink-0" />
                            <a :href="`tel:${phone.number.replace(/\s/g, '')}`" class="hover:text-brand">
                                {{ phone.number }} ({{ phone.carrier }})
                            </a>
                        </div>
                        <div class="flex items-center gap-3">
                            <Mail class="w-5 h-5 shrink-0" />
                            <a href="mailto:sales@itsolutiondigital.com" class="hover:text-brand break-all">
                                sales@itsolutiondigital.com
                            </a>
                        </div>
                        <div class="flex items-start gap-3">
                            <MapPin class="w-5 h-5 mt-0.5 shrink-0" />
                            <span>
                                St. Commercial, Chipmong Landmark, Sangkat Chak Angrae Leu, Khan Meanchey, Phnom Penh, Cambodia 120601
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-brand/20">
            <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5 sm:py-6">
                <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p class="text-sm sm:text-base text-black/70 text-center sm:text-left">
                        &copy; {{ currentYear }} Copyright by IT Solution Digital
                    </p>
                    <div class="flex items-center gap-5">
                        <a href="https://www.facebook.com/ITSolutionCam/" class="text-black/70 hover:text-brand" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="https://t.me/hengitsolution" class="text-black/70 hover:text-brand" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Phone, Mail, MapPin } from 'lucide-vue-next';

const currentYear = computed(() => new Date().getFullYear());

const accountLinks = [
    { name: 'Profile', path: '/profile' },
    { name: 'My order', path: '/orders' }
];

const aboutLinks = [
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms & Conditions', path: '/terms-and-conditions' }
];


const phoneNumbers = [
    { number: '099 86 88 83', carrier: 'Cellcard' },
    { number: '017 86 88 83', carrier: 'Cellcard' },
    { number: '070 86 88 83', carrier: 'Smart' }
];
</script>
