<template>
    <div
        v-if="brands && brands.length > 0"
        class="bg-white py-10 sm:py-12 border-t border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ClientOnly>
                <!-- Section Header -->
                <div
                    class="flex items-center justify-between mb-6 sm:mb-8"
                    data-aos="fade-up">
                    <div class="flex items-center gap-3">
                        <div class="w-1 h-6 bg-brand rounded-full"></div>
                        <span class="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-gray-800">
                            Shop by Brand
                        </span>
                    </div>
                    <NuxtLink
                        to="/brands"
                        class="inline-flex items-center gap-1.5 text-xs sm:text-sm text-brand hover:text-brand/80 font-semibold transition-colors group border border-brand/30 hover:border-brand/60 rounded-full px-3 py-1.5">
                        View All
                        <ChevronRight class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </NuxtLink>
                </div>

                <!-- Brands Carousel -->
                <div data-aos="fade-up" data-aos-delay="100">
                    <Carousel
                        class="w-full"
                        :opts="{ align: 'start', loop: false }">
                        <CarouselContent class="-ml-2 sm:-ml-3">
                            <CarouselItem
                                v-for="brand in brands"
                                :key="brand.uuid"
                                class="pl-2 sm:pl-3 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-[12.5%]">
                                <NuxtLink
                                    :to="`/brands/${brand.slug}`"
                                    :title="brand.name"
                                    class="group flex items-center justify-center aspect-square p-2.5 sm:p-3 rounded-xl bg-white border border-gray-100 hover:border-brand/40 hover:shadow-md transition-all duration-300 overflow-hidden">
                                    <img
                                        v-if="brand.logo"
                                        :src="brand.logo"
                                        :alt="brand.name"
                                        class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                        loading="lazy"
                                        width="80"
                                        height="80" />
                                    <span
                                        v-else
                                        class="text-[10px] sm:text-xs font-bold text-gray-500 group-hover:text-brand transition-colors text-center leading-tight break-words hyphens-auto px-1">
                                        {{ brand.name }}
                                    </span>
                                </NuxtLink>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious
                            class="-left-4 sm:-left-5 size-9 rounded-full border border-gray-200 bg-white shadow-md hover:shadow-lg hover:border-brand hover:text-brand transition-all duration-200" />
                        <CarouselNext
                            class="-right-4 sm:-right-5 size-9 rounded-full border border-gray-200 bg-white shadow-md hover:shadow-lg hover:border-brand hover:text-brand transition-all duration-200" />
                    </Carousel>
                </div>
            </ClientOnly>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ChevronRight } from 'lucide-vue-next';
    import type { Brand } from '~/types';

    defineProps<{
        brands: Brand[];
    }>();
</script>