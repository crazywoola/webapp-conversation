import { type NextRequest } from 'next/server'
import { APP_ID, API_KEY } from '@/config'
import { ChatClient } from '../sdk'
const userPrefix = `user_${APP_ID}:`;
const uuid = require('uuid')
import * as jose from 'jose'

const secret = new TextEncoder().encode(
  'bananaiscool',
)

export const getClientFromApiSk = async (request: NextRequest) => {
  const ak = request.cookies.get('access_token')?.value

  try {
    if (ak) {
      const { payload } = await jose.jwtVerify(ak, secret, {
        issuer: 'LangGenius:CE',
        subject: 'LangGenius:CE:Auth',
      }) as any
      const sk = payload.app_info.api_key
      return new ChatClient(sk)
    }
  } catch (_) {
    return null
  }
}
export const getInfo = (request: NextRequest) => {
  const sessionId = request.cookies.get('session_id')?.value || uuid.v4();
  const user = userPrefix + sessionId;
  return {
    sessionId,
    user
  }
}

export const setSession = (sessionId: string) => {
  return { 'Set-Cookie': `session_id=${sessionId}` }
}

export const client = new ChatClient(API_KEY)