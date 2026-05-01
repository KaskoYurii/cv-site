import type { HyperspaceStar, HyperspaceState } from '@/types/preloader'

export const preloaderDuration = 5400
export const preloaderSessionKey = 'cv-site-preloader-seen'

const focalLength = 360
const maxPixelRatio = 1.5
const starCount = 900

function getSpeed(elapsed: number) {
  if (elapsed < 1500) {
    return 2
  }

  if (elapsed < 3000) {
    return 2 + (elapsed - 1500) / 40
  }

  if (elapsed < 4300) {
    return 42 + (elapsed - 3000) / 10
  }

  return 8
}

function createStar(state: HyperspaceState): HyperspaceStar {
  return {
    previousZ: Math.random() * state.width,
    x: (Math.random() - 0.5) * state.width * 2,
    y: (Math.random() - 0.5) * state.height * 2,
    z: Math.random() * state.width,
  }
}

function resetStar(state: HyperspaceState, star: HyperspaceStar) {
  star.x = (Math.random() - 0.5) * state.width * 2
  star.y = (Math.random() - 0.5) * state.height * 2
  star.z = state.width
  star.previousZ = state.width
}

function resizeCanvas(state: HyperspaceState) {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, maxPixelRatio)

  state.width = window.innerWidth
  state.height = window.innerHeight
  state.centerX = state.width / 2
  state.centerY = state.height / 2
  state.canvas.width = Math.floor(state.width * pixelRatio)
  state.canvas.height = Math.floor(state.height * pixelRatio)
  state.canvas.style.width = `${state.width}px`
  state.canvas.style.height = `${state.height}px`
  state.context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  state.stars = Array.from({ length: starCount }, () => createStar(state))
}

function drawStar(state: HyperspaceState, star: HyperspaceStar, elapsed: number, speed: number) {
  const { centerX, centerY, context, height, width } = state

  star.previousZ = star.z
  star.z -= speed

  if (star.z < 1) {
    resetStar(state, star)
    return
  }

  const currentX = centerX + (star.x / star.z) * focalLength
  const currentY = centerY + (star.y / star.z) * focalLength
  const previousX = centerX + (star.x / star.previousZ) * focalLength
  const previousY = centerY + (star.y / star.previousZ) * focalLength

  if (currentX < 0 || currentX > width || currentY < 0 || currentY > height) {
    resetStar(state, star)
    return
  }

  const opacity = Math.min(1, 1 - star.z / width)
  const lineWidth = elapsed > 1800 ? Math.min(3, speed / 28) : 1

  context.strokeStyle = `rgba(255, ${190 + opacity * 40}, ${155 + opacity * 80}, ${opacity})`
  context.lineWidth = lineWidth
  context.beginPath()
  context.moveTo(previousX, previousY)
  context.lineTo(currentX, currentY)
  context.stroke()
}

function renderFrame(state: HyperspaceState, time: number) {
  const elapsed = time - state.animationStart
  const speed = getSpeed(elapsed)

  state.context.fillStyle = 'rgba(0, 0, 0, 0.35)'
  state.context.fillRect(0, 0, state.width, state.height)
  state.context.lineCap = 'round'

  for (const star of state.stars) {
    drawStar(state, star, elapsed, speed)
  }

  if (elapsed < preloaderDuration + 200) {
    state.animationFrame = window.requestAnimationFrame((nextTime) => renderFrame(state, nextTime))
  }
}

export function startHyperspacePreloader(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')

  if (!context) {
    return () => {}
  }

  const state: HyperspaceState = {
    animationFrame: 0,
    animationStart: performance.now(),
    canvas,
    centerX: 0,
    centerY: 0,
    context,
    height: 0,
    stars: [],
    width: 0,
  }

  const handleResize = () => resizeCanvas(state)

  handleResize()
  window.addEventListener('resize', handleResize)
  state.animationFrame = window.requestAnimationFrame((time) => renderFrame(state, time))

  return () => {
    window.cancelAnimationFrame(state.animationFrame)
    window.removeEventListener('resize', handleResize)
  }
}

