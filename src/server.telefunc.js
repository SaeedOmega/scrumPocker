export { onGetPoint, onSetPoint, onResetPoints }

const rooms = new Map()

function getRoom(name) {
  let room = rooms.get(name)
  if (!room) {
    room = { room: new Map(), createDate: new Date('2023/12/30/ 11:50:00') }
    rooms.set(name, room)
  }
  return room
}

async function onGetPoint(roomName) {
  const room = getRoom(roomName)
  return room.room
}

async function onSetPoint(name, point, roomName = 'main') {
  const room = getRoom(roomName)
  room.room.set(name, point)
  room.createDate = new Date()
  return room.createDate
}

async function onResetPoints(roomName) {
  const room = getRoom(roomName)
  room.createDate = new Date()
  room.clear()
}

setInterval(() => {
  rooms.forEach((room, index) => {
    if (Math.floor((+new Date() - +new Date(room.createDate)) / 60000) > 30) {
      rooms.delete(index)
    }
  })
}, 6000)
