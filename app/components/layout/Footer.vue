<template>
    <footer class="bg-brand text-white">
        <!-- Main Footer Content -->
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16">
                <!-- My Account -->
                <div>
                    <h3 class="font-bold text-base sm:text-lg mb-5 uppercase tracking-widest text-white">My Account</h3>
                    <ul class="space-y-3 sm:space-y-4">
                        <li v-for="link in accountLinks" :key="link.name">
                            <NuxtLink
                                :to="link.path"
                                class="text-sm sm:text-base text-white/60 hover:text-white transition-colors duration-200"
                            >
                                {{ link.name }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- About Us -->
                <div>
                    <h3 class="font-bold text-base sm:text-lg mb-5 uppercase tracking-widest text-white">About Us</h3>
                    <ul class="space-y-3 sm:space-y-4">
                        <li v-for="link in aboutLinks" :key="link.name">
                            <NuxtLink
                                :to="link.path"
                                class="text-sm sm:text-base text-white/60 hover:text-white transition-colors duration-200"
                            >
                                {{ link.name }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Contact Us -->
                <div class="col-span-2 lg:col-span-1">
                    <h3 class="font-bold text-base sm:text-lg mb-5 uppercase tracking-widest text-white">Contact Us</h3>
                    <div class="space-y-4 text-sm sm:text-base text-white/60">
                        <div v-for="phone in phoneNumbers" :key="phone.number" class="flex items-center gap-3">
                            <Phone class="w-4 h-4 shrink-0 text-white/80" />
                            <span>{{ phone.number }} ({{ phone.carrier }})</span>
                        </div>
                        <div class="flex items-center gap-3 hover:text-white transition-colors duration-200">
                            <Mail class="w-4 h-4 shrink-0 text-white/80" />
                            <a href="mailto:sales@itsolutiondigital.com" class="break-all">
                                sales@itsolutiondigital.com
                            </a>
                        </div>
                        <div class="flex items-start gap-3">
                            <MapPin class="w-4 h-4 mt-1 shrink-0 text-white/80" />
                            <span class="leading-relaxed">
                                St. Commercial, Chipmong Landmark, Sangkat Chak Angrae Leu, Khan Meanchey, Phnom Penh, Cambodia 120601
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-white/20">
            <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5 sm:py-6">
                <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p class="text-sm text-white/50 text-center sm:text-left">
                        &copy; {{ currentYear }} TANXLM. All rights reserved.
                    </p>
                    <div class="flex items-center gap-4">
                        <a href="#" class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors duration-200">
                            <Facebook class="w-4 h-4" />
                        </a>
                        <a href="#" class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors duration-200">
                            <Instagram class="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-vue-next';

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
