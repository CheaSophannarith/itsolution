import { computed, nextTick, ref, watch, type Ref } from 'vue';

export function usePagination<T>(
    items: Ref<T[]> | T[],
    options: { itemsPerPage?: number; scrollTarget?: Ref<HTMLElement | null> } = {}
) {
    const { itemsPerPage = 8, scrollTarget } = options;
    const currentPage = ref(1);

    const source = computed(() => (Array.isArray(items) ? items : items.value));

    const totalPages = computed(() => Math.ceil(source.value.length / itemsPerPage));

    const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        return source.value.slice(start, start + itemsPerPage);
    });

    const resetPage = () => {
        currentPage.value = 1;
    };

    watch(currentPage, () => {
        nextTick(() => {
            scrollTarget?.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    return {
        currentPage,
        itemsPerPage,
        totalPages,
        paginatedItems,
        resetPage,
    };
}