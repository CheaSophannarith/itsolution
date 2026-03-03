<template>
    <div class="bg-linear-to-b from-gray-50 to-white py-16 sm:py-24 mt-5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
            <ClientOnly>
                <div class="text-center mb-12 sm:mb-16" data-aos="fade-up">
                    <span class="text-xs font-semibold tracking-widest uppercase text-brand mb-3 block">
                        Our Advantages
                    </span>
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                        Why Choose IT Solution Digital
                    </h2>
                    <p class="text-gray-500 text-sm sm:text-base max-w-lg mx-auto">
                        Cambodia's trusted IT shop for computers, phones, monitors, printers &amp; accessories in Phnom Penh
                    </p>
                </div>

                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                    <div
                        v-for="(feature, index) in features"
                        :key="feature.title"
                        data-aos="fade-up"
                        :data-aos-delay="index * 100"
                        class="text-center group transition-all duration-500 bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200">
                        <div class="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-brand/10 to-brand/5 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:from-brand/15 group-hover:to-brand/10 transition-all duration-500">
                            <component :is="feature.icon" class="w-8 h-8 sm:w-10 sm:h-10 text-brand" />
                        </div>
                        <h3 class="font-bold text-gray-900 mb-2 text-base sm:text-lg">{{ feature.title }}</h3>
                        <p class="text-sm text-gray-500 leading-relaxed">{{ feature.description }}</p>
                    </div>
                </div>
            </ClientOnly>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Truck, Shield, Headset, Award } from 'lucide-vue-next';

    const features = [
        {
            title: 'Fast Delivery',
            description: 'Same-day delivery in Phnom Penh. Nationwide shipping to all provinces across Cambodia.',
            icon: Truck,
        },
        {
            title: 'Genuine Products',
            description: '100% authentic computers, phones, monitors, printers & IT accessories with full manufacturer warranty.',
            icon: Shield,
        },
        {
            title: 'Khmer Expert Support',
            description: '24/7 Khmer-speaking tech support. On-site repair & remote IT assistance available nationwide.',
            icon: Headset,
        },
        {
            title: 'Best Price in Cambodia',
            description: 'Competitive pricing on computers, phones, monitors, printers & all IT accessories. Price-match guarantee.',
            icon: Award,
        },
    ];
</script>