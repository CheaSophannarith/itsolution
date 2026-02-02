export const useScrollLock = () => {
  const forceUnlockScroll = () => {
    if (typeof document === 'undefined') return
    
    // Reset all possible scroll-blocking styles
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.overflow = ''
    document.body.style.overflowX = ''
    document.body.style.overflowY = ''
    document.body.style.width = ''
    document.body.style.height = ''
    
    // Also check documentElement
    document.documentElement.style.overflow = ''
    document.documentElement.style.position = ''
    
    // Force scroll to be enabled
    document.body.classList.remove('overflow-hidden')
    document.documentElement.classList.remove('overflow-hidden')
    
    // Force a reflow
    document.body.offsetHeight
  }

  return {
    forceUnlockScroll
  }
}