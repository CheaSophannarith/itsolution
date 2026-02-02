import AOS from 'aos'
import 'aos/dist/aos.css'

export default defineNuxtPlugin(() => {
  if (process.client) {
    // Wait for DOM and hydration to complete before initializing AOS
    nextTick(() => {
      AOS.init({
        duration: 600,
        easing: 'ease-out',
        once: true,
        offset: 100,
        delay: 0,
        // Disable animations on phone to improve performance
        disable: 'phone'
      })
      
      // Refresh AOS on route changes
      AOS.refresh()
    })
  }
})
