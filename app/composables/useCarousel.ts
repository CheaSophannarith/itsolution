import type { Carousel } from '~/types';

interface CarouselResponse {
    data: Carousel[];
}

export function useCarousel() {
    const config = useRuntimeConfig();

    const { data, status, error } = useFetch<CarouselResponse>(
        `${config.public.apiBaseUrl}/api/v1/carousel`,
    );

    const carouselSlides = computed<Carousel[]>(() => {
        return data.value?.data ?? [];
    });

    return {
        carouselSlides,
        status,
        error,
    };
}
