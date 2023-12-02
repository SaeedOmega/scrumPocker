export { onGetPoint, onSetPoint }

async function onGetPoint(): Promise<Map<string, string>>

async function onSetPoint(name: string, point: string): Promise<void>
