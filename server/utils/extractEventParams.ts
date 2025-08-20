import type { EventHandlerRequest, H3Event } from "h3";
import { getHeaders } from "~~/server/utils/getHeaders";

export const extractEventParams = async (event: H3Event<EventHandlerRequest>) => {
  const method = getMethod(event)
  const urlPart = getRouterParam(event, '_') || ''
  const query = getQuery(event)
  const body = method !== 'GET' ? await readBody(event) : undefined

  return {
    method,
    urlPart,
    query,
    body,
    timeout: 10000,
    headers: getHeaders(),
  }
}
