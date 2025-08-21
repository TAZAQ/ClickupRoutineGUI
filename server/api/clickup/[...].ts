import type { IFetchError } from "~~/server/utils/types/IFetchError";
import { extractEventParams } from "~~/server/utils/extractEventParams";
import { throwBaseError } from "~~/server/utils/throwBaseError";

export default defineEventHandler(async (event) => {
  const params = await extractEventParams(event)

  try {
    const clickupUrl = `https://api.clickup.com/api/v2/${params.urlPart}`
    const data = await $fetch(clickupUrl, params)

    return { success: true, data }
  } catch (error) { throwBaseError(error as IFetchError) }
})
