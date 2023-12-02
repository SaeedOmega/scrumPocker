export { onGetPoint, onSetPoint }

const points = new Map()

async function onGetPoint() {
  return points
}

async function onSetPoint(name, point) {
  points.set(name, point)
  return points
}
