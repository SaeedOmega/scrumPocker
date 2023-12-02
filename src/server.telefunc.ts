const points = new Map<string, string>()

export async function getPoint(): Promise<Map<string, string>> {
  return points
}

export async function setPoint(name: string, point: string): Promise<Map<string, string>> {
  points.set(name, point)
  return points
}
