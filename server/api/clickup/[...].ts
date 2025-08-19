interface IFetchError {
  response: {
    status: number
    statusText: string
    _data: {
      err: string
    }
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const method = getMethod(event)
  const url = getRouterParam(event, '_') || ''
  const query = getQuery(event)
  const body = method !== 'GET' ? await readBody(event) : undefined

  // Проверяем наличие API ключа
  if (!config.clickupApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'ClickUp API key not configured',
    })
  }

  try {
    const clickupUrl = `https://api.clickup.com/api/v2/${url}`

    // Подготавливаем заголовки
    const headers: Record<string, string> = {
      'Authorization': config.clickupApiKey,
      'Content-Type': 'application/json',
    }

    // Выполняем запрос к ClickUp API
    const response = await $fetch(clickupUrl, {
      method,
      headers,
      query,
      body,
      timeout: 10000,
    })

    return {
      success: true,
      data: response,
    }

  } catch (error) {
    console.error('ClickUp API Error:', error)

    throw createError({
      statusCode: (error as IFetchError).response?.status || 500,
      statusMessage: (error as IFetchError).response?._data?.err || (error as { message: string }).message || 'ClickUp API Error',
    })
  }
})
