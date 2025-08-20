
export const throwBaseError = (error: IFetchError) => {
  console.error('ClickUp API Error:', error)

  throw createError({
    statusCode: error.response?.status || 500,
    statusMessage: error.response?._data?.err
      || (error as unknown as { message: string }).message
      || 'ClickUp API Error',
  })
}
