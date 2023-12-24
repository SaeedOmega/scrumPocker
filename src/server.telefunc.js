export { onGetPoint, onSetPoint, onResetPoints, onDelete }

// for protected data type
import { shield } from 'telefunc'
const shieldType = shield.type

const points = new Map()

async function onGetPoint() {
  return points
}

shield(onSetPoint, [shieldType.string, shieldType.or(shieldType.string, shieldType.null)])
async function onSetPoint(name, point) {
  points.set(name, point)
}

async function onResetPoints() {
  points.clear()
}

shield(onDelete, [shieldType.string])
async function onDelete(key) {
  points.delete(key)
  return points
}
