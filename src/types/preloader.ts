export type HyperspaceStar = {
  previousZ: number
  x: number
  y: number
  z: number
}

export type HyperspaceState = {
  animationFrame: number
  animationStart: number
  canvas: HTMLCanvasElement
  centerX: number
  centerY: number
  context: CanvasRenderingContext2D
  height: number
  stars: HyperspaceStar[]
  width: number
}

