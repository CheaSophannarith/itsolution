import { ref, computed } from 'vue'

const hideHeader = ref(false)
const forceVisible = ref(false)

export function useHeaderVisibility() {
    const isHidden = computed(() => hideHeader.value && !forceVisible.value)

    function setHidden(val: boolean) {
        hideHeader.value = val
    }

    /**
     * Temporarily force the header into view, run a callback once it has
     * transitioned in (300 ms), then release the override.
     */
    function withHeaderVisible(callback: () => void, holdMs = 1000) {
        forceVisible.value = true
        // Wait for the header slide-in transition (300 ms) before callback
        setTimeout(() => {
            callback()
            // Release after the hold period so the header can hide again naturally
            setTimeout(() => {
                forceVisible.value = false
            }, holdMs)
        }, 320)
    }

    return { isHidden, setHidden, withHeaderVisible }
}