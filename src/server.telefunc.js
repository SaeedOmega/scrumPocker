export { onGetPoint, onSetPoint, onResetPoints, onDelete }

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
async function onDelete(key) {
  points.delete(key)
  return points
}
