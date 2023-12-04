export { onGetPoint, onSetPoint, onResetPoints, onDelete }

async function onGetPoint(): Promise<Map<string, string>>

async function onSetPoint(name: string, point: string): Promise<void>

async function onResetPoints(): Promise<void>

async function onDelete(key: string | null): Promise<Map<string, string>>
