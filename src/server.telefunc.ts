const points = new Map<string, number>()

export async function getPoint(): Promise<Map<string, number>> {
  return points
}

export async function setPoint(name: string, point: number): Promise<Map<string, number>> {
  points.set(name, point)
  return points
}
