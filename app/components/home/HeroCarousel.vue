<template>
    <ClientOnly>
        <div class="relative w-full overflow-hidden" data-aos="fade-in">
            <Carousel
                class="w-full"
                :opts="{ align: 'start', loop: true }"
                @init-api="onCarouselInit">
                <CarouselContent>
                    <CarouselItem
                        v-for="(slide, index) in slides"
                        :key="slide.uuid">
                        <div class="relative w-full aspect-4/3 sm:aspect-16/7 lg:aspect-21/8 overflow-hidden">
                            <picture>
                                <source :srcset="slide.desktop" media="(min-width: 640px)" />
                                <img
                                    :src="slide.mobile || slide.desktop"
                                    :alt="slide.title || 'Carousel slide'"
                                    class="w-full h-full object-cover"
                                    width="1920"
                                    height="730"
                                    :fetchpriority="index === 0 ? 'high' : 'auto'"
                                    :loading="index === 0 ? 'eager' : 'lazy'" />
                            </picture>
                        </div>
                    </CarouselItem>
                </CarouselContent>

                <!-- Navigation Arrows -->
                <div class="absolute top-1/2 -translate-y-1/2 left-2 sm:left-6 z-20">
                    <CarouselPrevious
                        class="relative left-0 translate-x-0 translate-y-0 bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/40 hover:border-white/40 w-8 h-8 sm:w-11 sm:h-11 lg:w-13 lg:h-13" />
                </div>
                <div class="absolute top-1/2 -translate-y-1/2 right-2 sm:right-6 z-20">
                    <CarouselNext
                        class="relative right-0 translate-x-0 translate-y-0 bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/40 hover:border-white/40 w-8 h-8 sm:w-11 sm:h-11 lg:w-13 lg:h-13" />
                </div>

                <!-- Pagination Dots -->
                <div class="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20">
                    <button
                        v-for="(slide, index) in slides"
                        :key="slide.uuid"
                        @click="() => carouselApi?.scrollTo(index)"
                        :class="[
                            'h-1.5 sm:h-2 rounded-full transition-all duration-300',
                            currentSlide === index
                                ? 'bg-white w-5 sm:w-7'
                                : 'bg-white/50 hover:bg-white/70 w-1.5 sm:w-2'
                        ]"
                        :aria-label="`Go to slide ${index + 1}`" />
                </div>
            </Carousel>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
    import { ref, onUnmounted } from 'vue';
    import type { CarouselApi } from '~/components/ui/carousel';
    import type { Carousel } from '~/types';

    defineProps<{
        slides: Carousel[];
    }>();

    const carouselApi = ref<CarouselApi>();
    const currentSlide = ref(0);
    let autoplayInterval: NodeJS.Timeout | null = null;

    function onCarouselInit(api: CarouselApi) {
        if (!api) return;
        carouselApi.value = api;
        currentSlide.value = api.selectedScrollSnap();
        api.on('select', () => {
            currentSlide.value = api.selectedScrollSnap();
        });
        startAutoplay();
    }

    function startAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        autoplayInterval = setInterval(() => {
            carouselApi.value?.scrollNext();
        }, 4000);
    }

    onUnmounted(() => {
        if (autoplayInterval) clearInterval(autoplayInterval);
    });
</script>