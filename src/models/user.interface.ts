/* User */
type UserRole = 'ADMIN' | 'USER'
type Provider = 'KAKAO'
export interface User {
  id: number
  nickname?: string
  provider: Provider
  providerId: string
  role: UserRole
}

export interface Creator {
  id: User['id']
  nickname: User['nickname']
}

export interface Token {
  token: string
}
