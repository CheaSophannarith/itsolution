<template>
    <footer class="bg-gray-200 text-black border-t-4 border-brand">
        <!-- Main Footer Content -->
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-12">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
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

                <!-- Support -->
                <div>
                    <h3 class="font-bold text-lg sm:text-xl mb-4 sm:mb-5 text-black">Support</h3>
                    <ul class="space-y-2 sm:space-y-3">
                        <li v-for="link in supportLinks" :key="link.name">
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
                        &copy; {{ currentYear }} TANXLM. All rights reserved.
                    </p>
                    <div class="flex items-center gap-5">
                        <a href="#" class="text-black/70 hover:text-brand">
                            <Facebook class="w-6 h-6" />
                        </a>
                        <a href="#" class="text-black/70 hover:text-brand">
                            <Instagram class="w-6 h-6" />
                        </a>
                        <a href="#" class="text-black/70 hover:text-brand">
                            <Twitter class="w-6 h-6" />
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
    { name: 'Profile', path: '/account/profile' },
    { name: 'View Cart', path: '/cart' },
    { name: 'Wishlist', path: '/wishlist' }
];

const aboutLinks = [
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms & Conditions', path: '/terms-and-conditions' }
];

const supportLinks = [
    { name: 'Help Center', path: '/help' },
    { name: 'My Account', path: '/account' },
    { name: 'Order History', path: '/account/orders' }
];

const phoneNumbers = [
    { number: '099 86 88 83', carrier: 'Cellcard' },
    { number: '017 86 88 83', carrier: 'Cellcard' },
    { number: '070 86 88 83', carrier: 'Smart' }
];
</script>
