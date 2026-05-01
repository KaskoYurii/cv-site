export type Star = {
  x: number
  y: number
  radius: number
  alpha: number
  phase: number
}

export type PointerPosition = {
  x: number
  y: number
  targetX: number
  targetY: number
}

export type BackgroundState = {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  width: number
  height: number
  frame: number
  stars: Star[]
  pointer: PointerPosition
}
