import { useEffect, useRef } from 'react'

// A dot that trails the mouse and swells over anything clickable. Real pointers only;
// the system cursor stays visible.
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = ref.current!
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return
    }

    const target = { x: -100, y: -100 }
    const pos = { ...target }
    let frame = 0

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX
      target.y = event.clientY
      dot.dataset.hover = String(Boolean((event.target as Element).closest('a, button')))
    }
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.2
      pos.y += (target.y - pos.y) * 0.2
      dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="cursor pointer-events-none fixed top-0 left-0 z-50 size-3 rounded-full bg-white mix-blend-difference"
    />
  )
}
