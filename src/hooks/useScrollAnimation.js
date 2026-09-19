import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(options = {}) {
  const { threshold = 0.1, triggerOnce = true } = options
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) observer.disconnect()
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, triggerOnce])

  return { ref, isVisible }
}
