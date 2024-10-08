import { api } from './api'
import getCookie from './storage/cookie'

import { setCookie } from '@/app/actions'
import { RECENT_MAP_ID } from '@/constants/cookie'

export const checkMapId = async () => {
  let mapId = getCookie(RECENT_MAP_ID)
  // TODO: check if mapId is valid
  if (mapId) return mapId

  try {
    const res = await api.maps.get()
    const maps = res.data
    mapId = maps[0]?.id
    if (mapId) {
      setCookie(RECENT_MAP_ID, mapId)
    }
  } catch {
  } finally {
    return mapId
  }
}
