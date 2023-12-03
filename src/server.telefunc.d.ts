export { onGetPoint, onSetPoint, onResetPoints }

async function onGetPoint(): Promise<Map<string, string>>

async function onSetPoint(name: string, point: string): Promise<void>

async function onResetPoints(): Promise<void>
