import { useEffect, useRef } from 'react'
import { startAnimatedBackground } from '@/lib/animatedBackground'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => startAnimatedBackground(canvasRef.current!), [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
}
