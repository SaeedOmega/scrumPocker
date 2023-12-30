export { onGetPoint, onSetPoint, onResetPoints, onDelete }

async function onGetPoint(roomName: string): Promise<Map<string, person>>

async function onSetPoint(name: string, point: person, roomName: string): Promise<void>

async function onResetPoints(roomName: string): Promise<void>

async function onDelete(key: string | null): Promise<void>
