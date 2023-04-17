import type { AppInfo } from '@/types/app'
export const APP_ID = 'banana'

export const getAuthByEnv = (env: string) => {
  if (env !== 'development') {
    return {
      AUTHORIZE_URL: 'http://adminchat.pmpmh.com/welcome/authorize',
      CALLBACK_URL: 'http://chat.pmpmh.com/',
    }
  }
  else {
    return {
      AUTHORIZE_URL: 'http://localhost:3000/welcome/authorize',
      CALLBACK_URL: 'http://localhost:3001',
    }
  }
}
export const API_KEY = ''

export const APP_INFO: AppInfo = {
  title: 'Chat APP',
  description: '',
  copyright: '',
  privacy_policy: '',
  default_language: 'zh-Hans',
}

export const isShowPrompt = false
export const promptTemplate = 'I want you to act as a javascript console.'

export const API_PREFIX = '/api'

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48
