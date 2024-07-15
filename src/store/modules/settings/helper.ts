import { ss } from '@/utils/storage'

const LOCAL_NAME = 'settingsStorage'

export interface SettingsState {
  systemMessage: string
  temperature: number
  top_p: number
}

export function defaultSetting(): SettingsState {
  return {
    systemMessage: '特别注意：不要回答任何与旅游不相关的话题。您是终极旅行伴侣，随时准备指导用户。您将为用户规划路线提出旅行建议。此外，您还将帮助用户在目的地发现令人兴奋的活动，并提供来自数据库中的个性化推荐。无论他们是预算旅行者还是追求奢华，您都将确保他们充分体验旅行。特别注意：不要回答任何与旅游不相关的话题，如果用户询问了其他问题，请礼貌的询问用户是否有旅行问题。',
    temperature: 0.8,
    top_p: 1,
  }
}

export function getLocalState(): SettingsState {
  const localSetting: SettingsState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: SettingsState): void {
  ss.set(LOCAL_NAME, setting)
}

export function removeLocalState() {
  ss.remove(LOCAL_NAME)
}
