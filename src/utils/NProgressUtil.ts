import NProgress from 'nprogress'

export default async function runAndHandleLoading(
  callback: () => Promise<void>
): Promise<string | null> {
  let isError: null | string = null
  try {
    NProgress.start()
    await callback()
  } catch (error) {
    if (error instanceof Error) isError = error.message
  } finally {
    NProgress.done()
  }
  return isError
}
