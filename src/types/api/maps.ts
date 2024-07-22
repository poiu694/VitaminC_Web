import type { IconKey } from '@/components/common/icon'
import type { User } from '@/models/user.interface'

export interface TagItem {
  id: number
  type?: IconKey
  mapId: string
  content: string
  createdAt: string
}

export interface MapDataType {
  id: string
  name: string
  users: User[]
  registeredPlaceCount: number
  createdAt: Date
  updatedAt: Date
}