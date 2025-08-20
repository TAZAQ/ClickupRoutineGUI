export interface IFetchError {
  response: {
    status: number
    statusText: string
    _data: {
      err: string
    }
  }
}
