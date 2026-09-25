export interface Rect { left: number; top: number; width: number; height: number }

/** Visible image rectangle for an object-fit:contain video (including letterboxing). */
export function containedVideoRect(element: Rect, videoWidth: number, videoHeight: number): Rect | null {
  if (![element.left, element.top, element.width, element.height, videoWidth, videoHeight].every(Number.isFinite) ||
      element.width <= 0 || element.height <= 0 || videoWidth <= 0 || videoHeight <= 0) return null
  const scale = Math.min(element.width / videoWidth, element.height / videoHeight)
  const width = videoWidth * scale
  const height = videoHeight * scale
  return { left: element.left + (element.width - width) / 2, top: element.top + (element.height - height) / 2, width, height }
}

export function normalizeVideoPoint(clientX: number, clientY: number, rect: Rect | null): { x: number; y: number } | null {
  if (!rect || !Number.isFinite(clientX) || !Number.isFinite(clientY) || rect.width <= 0 || rect.height <= 0) return null
  const x = (clientX - rect.left) / rect.width
  const y = (clientY - rect.top) / rect.height
  if (x < 0 || x > 1 || y < 0 || y > 1) return null
  return { x, y }
}
