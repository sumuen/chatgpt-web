import type { UserRole } from '@/components/common/Setting/model'
import { UserConfig } from '@/components/common/Setting/model'
import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  avatar: string
  name: string
  description: string
  root: boolean
  config: UserConfig
  roles: UserRole[]
  advanced: SettingsState
  limit?: boolean
  useAmount?: number // chat usage amount
  redeemCardNo?: string // add giftcard info
}

export interface UserState {
  userInfo: UserInfo
}

export interface SettingsState {
  systemMessage: string
  temperature: number
  top_p: number
  maxContextCount: number
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: '',
      name: '',
      description: '',
      root: false,
      config: { chatModel: 'moonshot-v1-8k' },
      roles: [],
      advanced: {
        systemMessage: '特别注意：不要回答任何与旅游不相关的话题。您是终极旅行伴侣，随时准备指导用户。您将为用户规划路线提出旅行建议。此外，您还将帮助用户在目的地发现令人兴奋的活动，并提供来自数据库中的个性化推荐。无论他们是预算旅行者还是追求奢华，您都将确保他们充分体验旅行。特别注意：不要回答任何与旅游不相关的话题，如果用户询问了其他问题，请礼貌的询问用户是否有旅行问题。',
        temperature: 0.8,
        top_p: 1,
        maxContextCount: 20,
      },
      useAmount: 1, // chat usage amount
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  if (localSetting != null && localSetting.userInfo != null) {
    if (localSetting.userInfo.config == null) {
      localSetting.userInfo.config = new UserConfig()
      localSetting.userInfo.config.chatModel = 'moonshot-v1-8k'
    }
    if (!localSetting.userInfo.advanced) {
      localSetting.userInfo.advanced = {
        systemMessage: '特别注意：不要回答任何与旅游不相关的话题。您是终极旅行伴侣，随时准备指导用户。您将为用户规划路线提出旅行建议。此外，您还将帮助用户在目的地发现令人兴奋的活动，并提供来自数据库中的个性化推荐。无论他们是预算旅行者还是追求奢华，您都将确保他们充分体验旅行。特别注意：不要回答任何与旅游不相关的话题，如果用户询问了其他问题，请礼貌的询问用户是否有旅行问题。',
        temperature: 0.8,
        top_p: 1,
        maxContextCount: 20,
      }
    }
  }
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
