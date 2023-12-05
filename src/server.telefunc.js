export { onGetPoint, onSetPoint, onResetPoints }

const points = new Map()
const teams = [{ name: 'main', creator: 'admin', id: 1 }]
let counterID = 2

async function onGetPoint() {
  return points
}

async function onSetPoint(name, point) {
  points.set(name, { ...point, id: counterID })
  counterID++
}

async function onResetPoints() {
  points.clear()
}
async function onDelete(key) {
  points.delete(key)
  return points
}