
export const getHeaders = () => {
  const config = useRuntimeConfig()

  return {
    'Authorization': config.clickupApiKey,
    'Content-Type': 'application/json',
  }
}
