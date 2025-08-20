export default defineEventHandler((event) => {
  const config = useRuntimeConfig()

  if (!config.clickupApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'ClickUp API key not configured',
    })
  }
})
