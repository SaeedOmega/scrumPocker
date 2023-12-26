export { onGetPoint, onSetPoint, onResetPoints, onDelete }

const points = new Map()
const rooms = new Map()

function getRoom(name) {
  let room = rooms.get(name)
  if (!room) {
    room = new Map()
    rooms.set(name, room)
  }
  return room
}

async function onGetPoint(roomName) {
  const room = getRoom(roomName)
  return room
}

async function onSetPoint(name, point, roomName = 'main') {
  const room = getRoom(roomName)
  room.set(name, point)
}

async function onResetPoints(roomName) {
  const room = getRoom(roomName)
  room.clear()
}
async function onDelete(key) {
  points.delete(key)
  return points
}
