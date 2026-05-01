import type { BackgroundState, Star } from '@/types/background'

const STAR_COUNT = 230
const MAX_PIXEL_RATIO = 1.35
const GRAVITY_RADIUS = 145

function createStars(width: number, height: number): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.15 + 0.25,
    alpha: Math.random() * 0.32 + 0.08,
    phase: Math.random() * Math.PI * 2,
  }))
}

function resizeCanvas(state: BackgroundState) {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO)

  state.width = window.innerWidth
  state.height = window.innerHeight
  state.canvas.width = Math.floor(state.width * pixelRatio)
  state.canvas.height = Math.floor(state.height * pixelRatio)
  state.canvas.style.width = `${state.width}px`
  state.canvas.style.height = `${state.height}px`
  state.context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  state.stars = createStars(state.width, state.height)
}

function drawEventHorizon(state: BackgroundState) {
  const { context, pointer } = state
  const glow = context.createRadialGradient(pointer.x, pointer.y, 6, pointer.x, pointer.y, 92)

  glow.addColorStop(0, 'rgba(0, 0, 0, 0.86)')
  glow.addColorStop(0.34, 'rgba(0, 0, 0, 0.62)')
  glow.addColorStop(0.62, 'rgba(255, 91, 0, 0.045)')
  glow.addColorStop(1, 'rgba(255, 91, 0, 0)')

  context.fillStyle = glow
  context.beginPath()
  context.arc(pointer.x, pointer.y, 120, 0, Math.PI * 2)
  context.fill()

  context.strokeStyle = 'rgba(255, 98, 0, 0.14)'
  context.lineWidth = 1
  context.beginPath()
  context.arc(pointer.x, pointer.y, 28, 0, Math.PI * 2)
  context.stroke()
}

function drawStarField(state: BackgroundState, time: number) {
  const { context, pointer, stars } = state

  for (const star of stars) {
    const dx = star.x - pointer.x
    const dy = star.y - pointer.y
    const distance = Math.hypot(dx, dy)
    const influence = Math.max(0, 1 - distance / GRAVITY_RADIUS)
    const baseAngle = Math.atan2(dy, dx)
    const swirl = influence * (1.55 + Math.sin(time * 0.0012 + star.phase) * 0.28)
    const fall = influence * influence * 34
    const angle = baseAngle + swirl
    const x = star.x - Math.cos(baseAngle) * fall + Math.cos(angle) * influence * 14
    const y = star.y - Math.sin(baseAngle) * fall + Math.sin(angle) * influence * 14
    const twinkle = Math.sin(time * 0.0018 + star.phase) * 0.28 + 0.72
    const alpha = star.alpha * twinkle * Math.max(0, 1 - influence * 0.82)

    if (influence > 0.08) {
      drawTrail(context, star, x, y, angle, influence)
    }

    if (alpha <= 0.015) {
      continue
    }

    context.fillStyle = `rgba(255, 226, 198, ${alpha * 0.82})`
    context.beginPath()
    context.arc(x, y, star.radius, 0, Math.PI * 2)
    context.fill()
  }
}

function drawTrail(
  context: CanvasRenderingContext2D,
  star: Star,
  x: number,
  y: number,
  angle: number,
  influence: number,
) {
  const tailLength = influence * 26
  const tailAngle = angle - Math.PI * 0.5

  context.strokeStyle = `rgba(255, ${118 + influence * 68}, 42, ${influence * 0.28})`
  context.lineWidth = Math.max(0.32, star.radius * 0.68)
  context.beginPath()
  context.moveTo(x, y)
  context.lineTo(x - Math.cos(tailAngle) * tailLength, y - Math.sin(tailAngle) * tailLength)
  context.stroke()
}

function renderFrame(state: BackgroundState, time: number) {
  const { context, pointer, width, height } = state

  pointer.x += (pointer.targetX - pointer.x) * 0.14
  pointer.y += (pointer.targetY - pointer.y) * 0.14

  context.clearRect(0, 0, width, height)
  context.fillStyle = '#000'
  context.fillRect(0, 0, width, height)

  drawStarField(state, time)
  drawEventHorizon(state)

  state.frame = window.requestAnimationFrame((nextTime) => renderFrame(state, nextTime))
}

export function startAnimatedBackground(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')

  if (!context) {
    return () => {}
  }

  const state: BackgroundState = {
    canvas,
    context,
    width: window.innerWidth,
    height: window.innerHeight,
    frame: 0,
    stars: [],
    pointer: {
      x: window.innerWidth * 0.72,
      y: window.innerHeight * 0.44,
      targetX: window.innerWidth * 0.72,
      targetY: window.innerHeight * 0.44,
    },
  }

  const handleResize = () => resizeCanvas(state)
  const handlePointerMove = (event: PointerEvent) => {
    state.pointer.targetX = event.clientX
    state.pointer.targetY = event.clientY
  }

  handleResize()
  window.addEventListener('resize', handleResize)
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  state.frame = window.requestAnimationFrame((time) => renderFrame(state, time))

  return () => {
    window.cancelAnimationFrame(state.frame)
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('pointermove', handlePointerMove)
  }
}

