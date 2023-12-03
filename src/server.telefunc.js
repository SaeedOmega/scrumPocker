export { onGetPoint, onSetPoint, onResetPoints }

const points = new Map()

async function onGetPoint() {
  return points
}

async function onSetPoint(name, point) {
  points.set(name, point)
}

async function onResetPoints() {
  points.clear()
}
