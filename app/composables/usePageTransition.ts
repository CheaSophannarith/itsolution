export const usePageTransition = (transitionName: 'page' | 'fade' | 'slide-left' | 'slide-right' | 'scale' = 'page') => {
  definePageMeta({
    pageTransition: {
      name: transitionName,
      mode: 'out-in'
    }
  })
}
