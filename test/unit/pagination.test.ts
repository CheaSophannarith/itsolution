import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import { usePagination } from '../../app/composables/usePagination'

const makeItems = (count: number) => Array.from({ length: count }, (_, i) => i + 1)

describe('usePagination', () => {
    beforeEach(() => {
        vi.stubGlobal('window', { scrollTo: vi.fn() })
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('starts on page 1', () => {
        const { currentPage } = usePagination(makeItems(20))
        expect(currentPage.value).toBe(1)
    })

    it('calculates totalPages correctly', () => {
        const { totalPages } = usePagination(makeItems(20))
        expect(totalPages.value).toBe(3) // ceil(20 / 8)
    })

    it('returns first 8 items on page 1', () => {
        const { paginatedItems } = usePagination(makeItems(20))
        expect(paginatedItems.value).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
    })

    it('returns correct items when navigating to page 2', () => {
        const { currentPage, paginatedItems } = usePagination(makeItems(20))
        currentPage.value = 2
        expect(paginatedItems.value).toEqual([9, 10, 11, 12, 13, 14, 15, 16])
    })

    it('returns remaining items on the last page', () => {
        const { currentPage, paginatedItems } = usePagination(makeItems(20))
        currentPage.value = 3
        expect(paginatedItems.value).toEqual([17, 18, 19, 20])
    })

    it('resetPage goes back to page 1', () => {
        const { currentPage, resetPage } = usePagination(makeItems(20))
        currentPage.value = 3
        resetPage()
        expect(currentPage.value).toBe(1)
    })

    it('respects custom itemsPerPage', () => {
        const { totalPages, paginatedItems } = usePagination(makeItems(10), { itemsPerPage: 5 })
        expect(totalPages.value).toBe(2)
        expect(paginatedItems.value).toHaveLength(5)
    })

    it('works with a reactive ref array and reacts to changes', () => {
        const items = ref(makeItems(8))
        const { totalPages } = usePagination(items)
        expect(totalPages.value).toBe(1)
        items.value = makeItems(16)
        expect(totalPages.value).toBe(2)
    })

    it('returns 0 totalPages for an empty array', () => {
        const { totalPages, paginatedItems } = usePagination([])
        expect(totalPages.value).toBe(0)
        expect(paginatedItems.value).toHaveLength(0)
    })
})
