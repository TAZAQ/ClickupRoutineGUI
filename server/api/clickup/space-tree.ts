import { extractEventParams } from "~~/server/utils/extractEventParams";
import { throwBaseError } from "~~/server/utils/throwBaseError";
import type { IFetchError } from "~~/server/utils/types/IFetchError";
import { spaceTreeAdapter } from "~~/server/utils/adapters/spaceTree/spaceTreeAdapter";

type ISpaceTreeResponse = [
  { folders: unknown[] },
  { lists: unknown[] }
]

const cache = {
  data: null as { success: boolean, data: unknown[] } | null,
  timestamp: null as number | null,
}

export default defineEventHandler(async (event) => {
  if (cache.data && cache.timestamp && Date.now() - cache.timestamp < 60000) {

    return cache.data
  }

  const { clickupSpaceId } = useRuntimeConfig()
  const params = await extractEventParams(event)

  try {
    const foldersUrl = `https://api.clickup.com/api/v2/space/${clickupSpaceId}/folder`
    const nonFoldersUrl = `https://api.clickup.com/api/v2/space/${clickupSpaceId}/list`
    const foldersPromise = $fetch(foldersUrl, params)
    const nonFoldersPromise = $fetch(nonFoldersUrl, params)

    const data = await Promise.all([foldersPromise, nonFoldersPromise]) as ISpaceTreeResponse
    const adaptedData = spaceTreeAdapter.toClient(data)

    const res = { success: true, data: adaptedData }
    cache.data = res
    cache.timestamp = Date.now()

    return res
  } catch (error) { throwBaseError(error as IFetchError) }
})
