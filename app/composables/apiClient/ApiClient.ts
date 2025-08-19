interface IApiResponse<DataType = unknown> {
  success: boolean
  data: DataType
  message?: string
}

interface IApiError {
  statusCode: number
  statusMessage: string
}

class ApiClient {
  constructor(private readonly baseUrl: string = '/api/clickup') {}

  // Задачи (Tasks)
  async getTasks(listId: string, query?: Record<string, string>) {
    return this.handleRequest(`list/${listId}/task`, { query })
  }

  async getTask(taskId: string) {
    return this.handleRequest(`task/${taskId}`)
  }


  private async handleRequest<T = unknown>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
      body?: object
      query?: Record<string, unknown>
    } = {}
  ): Promise<IApiResponse<T>> {
    const { method = 'GET', body, query } = options

    try {
      const response = await $fetch<IApiResponse<T>>(`${this.baseUrl}/${endpoint}`, {
        method,
        body: method !== 'GET' ? body : undefined,
        query,
      })

      if (!response.success) {
        throw new Error(response.message || 'API request failed')
      }

      return response
    } catch (error: unknown) {
      console.error('API Client Error:', error)
      throw {
        statusCode: (error as IApiError).statusCode || 500,
        message: (error as IApiError).statusMessage || (error as { message: string }).message || 'Unknown error',
      }
    }
  }
}

export const apiClient = new ApiClient();
