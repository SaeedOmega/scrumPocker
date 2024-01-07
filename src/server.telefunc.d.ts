export { onGetPoint, onSetPoint, onResetPoints }

async function onGetPoint(roomName: string): Promise<Map<string, person>>

async function onSetPoint(name: string, point: person, roomName: string): Promise<void>

async function onResetPoints(roomName: string): Promise<void>

