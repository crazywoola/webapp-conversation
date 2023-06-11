import { type NextRequest } from 'next/server'
import * as jose from 'jose'
import { APP_ID } from '@/config'
const userPrefix = `user_${APP_ID}:`
import { ChatClient } from 'dify-client'
import { v4 } from 'uuid'


const secret = new TextEncoder().encode(
  'bananaiscool',
)

export const getClientFromApiSk = async (request: NextRequest) => {
  const ak = request.cookies.get('access_token')?.value
  console.log('client document.cookie.ak', ak)
  try {
    if (ak !== undefined) {
      const { payload } = await jose.jwtVerify(ak, secret, {
        issuer: 'LangGenius:CE',
        subject: 'LangGenius:CE:Auth',
      }) as any
      const sk = payload.app_info.api_key
      return new ChatClient(sk)
    }
    else {
      return null
    }
  }
  catch (err) {
    console.log(err)
    return null
  }
}

export const getInfo = (request: NextRequest) => {
  const sessionId = request.cookies.get('session_id')?.value || v4();
  const user = userPrefix + sessionId;
  return {
    sessionId,
    user,
  }
}

export const setSession = (sessionId: string) => {
  return { 'Set-Cookie': `session_id=${sessionId}` }
}
