export { onGetPoint, onSetPoint, onResetPoints }

async function onGetPoint(roomName: string): Promise<Map<string, person>>

async function onSetPoint(name: string, point: person, roomName: string): Promise<void>

async function onResetPoints(name: string): Promise<void>
