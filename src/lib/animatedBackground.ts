type Star = {
  x: number
  y: number
  radius: number
  alpha: number
  phase: number
}

type BackgroundState = {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  width: number
  height: number
  frame: number
  stars: Star[]
  pointer: { x: number; y: number; targetX: number; targetY: number }
}

const STAR_COUNT = 230
const MAX_PIXEL_RATIO = 1.35
const GRAVITY_RADIUS = 145

function createStars(width: number, height: number): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.35 + 0.4,
    alpha: Math.random() * 0.42 + 0.14,
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

const HORIZON_RADIUS = 26
const DISK_TILT = -0.38

// Gargantua in 2D: a tilted accretion disk that passes behind and in front of the
// horizon, brighter on the approaching side, plus a photon ring and a lensed arc on top.
function drawBlackHole(state: BackgroundState, time: number) {
  const { context, pointer } = state
  const R = HORIZON_RADIUS
  const spin = time * 0.0011

  const glow = context.createRadialGradient(pointer.x, pointer.y, R, pointer.x, pointer.y, R * 6)
  glow.addColorStop(0, 'rgba(255, 91, 0, 0.16)')
  glow.addColorStop(0.5, 'rgba(255, 91, 0, 0.04)')
  glow.addColorStop(1, 'rgba(255, 91, 0, 0)')
  context.fillStyle = glow
  context.beginPath()
  context.arc(pointer.x, pointer.y, R * 6, 0, Math.PI * 2)
  context.fill()

  context.save()
  context.translate(pointer.x, pointer.y)
  context.rotate(DISK_TILT)

  // Doppler beaming: the side moving toward the viewer is hotter and brighter.
  const beaming = context.createLinearGradient(-R * 4, 0, R * 4, 0)
  beaming.addColorStop(0, 'rgba(255, 236, 210, 1)')
  beaming.addColorStop(0.45, 'rgba(255, 150, 60, 0.85)')
  beaming.addColorStop(1, 'rgba(200, 60, 0, 0.3)')

  const disk = (from: number, to: number) => {
    context.strokeStyle = beaming
    for (let i = 0; i < 16; i++) {
      const t = i / 16
      const rx = R * (1.55 + t * 2.3)
      // Turbulent bands drift around the disk over time.
      const band = 0.5 + 0.5 * Math.sin(spin * (1.4 - t) + i * 2.1)
      context.globalAlpha = (1 - t) ** 1.6 * (0.35 + band * 0.5)
      context.lineWidth = R * 0.24
      context.beginPath()
      context.ellipse(0, 0, rx, rx * 0.26, 0, from, to)
      context.stroke()
    }
    context.globalAlpha = 1
  }

  // Back half of the disk, then the horizon, then the front half.
  disk(Math.PI, Math.PI * 2)

  context.fillStyle = '#000'
  context.beginPath()
  context.arc(0, 0, R, 0, Math.PI * 2)
  context.fill()

  disk(0, Math.PI)

  // Light from the far side bends over the top: the lensed arc.
  context.strokeStyle = beaming
  for (let i = 0; i < 4; i++) {
    context.globalAlpha = 0.5 - i * 0.1
    context.lineWidth = R * 0.14
    context.beginPath()
    context.ellipse(0, 0, R * (1.18 + i * 0.1), R * (1.16 + i * 0.14), 0, Math.PI * 1.04, Math.PI * 1.96)
    context.stroke()
  }
  context.globalAlpha = 1

  // Photon ring: the thin bright edge right outside the horizon.
  context.strokeStyle = 'rgba(255, 215, 170, 0.55)'
  context.lineWidth = 0.9
  context.shadowColor = 'rgba(255, 150, 50, 0.8)'
  context.shadowBlur = 8
  context.beginPath()
  context.arc(0, 0, R * 1.04, 0, Math.PI * 2)
  context.stroke()
  context.shadowBlur = 0

  context.restore()
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

    context.fillStyle = `rgba(255, 230, 205, ${alpha * 0.96})`
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
  drawBlackHole(state, time)

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
