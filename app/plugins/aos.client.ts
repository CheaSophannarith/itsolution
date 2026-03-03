import AOS from 'aos'
import 'aos/dist/aos.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:suspense:resolve', () => {
    AOS.init({
      duration: 600,
      easing: 'ease-out',
      once: true,
      offset: 100,
      delay: 0,
      disable: false,
    })
  })
})
