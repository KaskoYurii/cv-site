import { useEffect, useRef, useState } from 'react'
import {
  preloaderDuration,
  preloaderSessionKey,
  startHyperspacePreloader,
} from '@/lib/hyperspacePreloader'

export function SitePreloader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(
    () => sessionStorage.getItem(preloaderSessionKey) !== 'true',
  )

  useEffect(() => {
    if (!isVisible) {
      return
    }

    const timeout = window.setTimeout(() => {
      sessionStorage.setItem(preloaderSessionKey, 'true')
      setIsVisible(false)
    }, preloaderDuration)

    return () => window.clearTimeout(timeout)
  }, [isVisible])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!isVisible || !canvas) {
      return
    }

    return startHyperspacePreloader(canvas)
  }, [isVisible])

  if (!isVisible) {
    return null
  }

  return (
    <div className="preloader" aria-label="Loading site" role="status">
      <canvas ref={canvasRef} className="preloader__canvas" />
      <div className="preloader__flash" aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </div>
  )
}
