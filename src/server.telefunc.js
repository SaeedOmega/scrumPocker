export { onGetPoint, onSetPoint, onResetPoints }

/**
 * مپ ذخیره سازی اتاق ها
 */
const rooms = new Map()

/**
 * این تابع یک نام میگیره و اگر اتاقی با آن نام وجود داشت اونو برمیگردونه
 * و اگر وجود نداشت اون اتاق رو میسازه و برمیگردونه
 */
function getRoom(name) {
  let room = rooms.get(name)
  if (!room) {
    room = new Map()
    rooms.set(name, room)
  }
  return room
}

/**
 * این تایع یک نام میگیرد و امتیاز های اون اتاق رو برمیگردونه
 */
async function onGetPoint(roomName) {
  const room = getRoom(roomName)
  return room
}

/**
 * این تابع نام کاربر و امتیاز و نام اتاق را میگیرد
 * و ابتدا اتاق مربوطه را انتخاب میکند و امتیاز و نام کاربر را در آن اتاق ثبت میکند
 */
async function onSetPoint(name, point, roomName = 'main') {
  const room = getRoom(roomName)
  room.set(name, point)
}

/**
 * نام اتاق را میگیرد و  کل امتیاز های آن اتاق را پاک میکند
 */
async function onResetPoints(roomName) {
  const room = getRoom(roomName)
  room.clear()
}
