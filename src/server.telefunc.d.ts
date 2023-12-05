export { onGetPoint, onSetPoint, onResetPoints, onDelete }

async function onGetPoint(): Promise<Map<string, person>>

async function onSetPoint(name: string, point: person): Promise<void>

async function onResetPoints(): Promise<void>

async function onDelete(key: string | null): Promise<void>
