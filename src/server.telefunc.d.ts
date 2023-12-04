export { onGetPoint, onSetPoint, onResetPoints, onDelete, onGetRooms, onAddRoom, onDeleteRoom }

type person = {
  point: string
  room: string
  id?: number
}

type room = {
  name: string
  creator: string
  creatorID?: number
}

async function onGetPoint(): Promise<Map<string, person>>

async function onSetPoint(name: string, point: person): Promise<void>

async function onResetPoints(): Promise<void>

async function onDelete(key: string | null): Promise<void>

async function onGetRooms(): Promise<Array<room>>

async function onAddRoom(room: room): Promise<string>

async function onDeleteRoom(room: room): Promise<void>
