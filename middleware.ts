import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

const secret = new TextEncoder().encode(
  'bananaiscool',
)

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next()
  try {
    const token = request.nextUrl.searchParams.get('access_token')
    const message = request.nextUrl.searchParams.get('message')
    if (message) {
      console.log(`Message: ${message}`)
      response.cookies.set('message', message)
    }
    if (token) {
      console.log(`JWT Token: ${token}`)
      await jose.jwtVerify(token, secret, {
        issuer: 'LangGenius:CE',
        subject: 'LangGenius:CE:Auth',
      })
      response.cookies.set('access_token', token)
    }
    return response
  }
  catch (_) {
    return response
  }
  finally {
    // eslint-disable-next-line no-unsafe-finally
    return response
  }
}
