export { onGetPoint, onSetPoint, onResetPoints, onDelete, onGetRooms, onAddRoom, onDeleteRoom }

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

async function onGetRooms() {
  return teams
}

async function onAddRoom(team) {
  if (teams.indexOf(team) == -1) {
    teams.push({ ...team, creatorID: counterID })
    return 'Created'
  }
  return 'Name Has Already'
}

async function onDeleteRoom(team) {
  teams.splice(teams.indexOf(team), 1)
}
