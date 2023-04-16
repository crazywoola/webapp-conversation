import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

const secret = new TextEncoder().encode(
    'bananaiscool',
)
// const allowedContextKeys = ["foo"];

export const middleware = async (request: NextRequest) => {
    const response = NextResponse.next()
    try {
        const token = request.nextUrl.searchParams.get('access_token')
        if (token) {
            console.log(`JWT Token: ${token}`)
            const { payload } = await jose.jwtVerify(token, secret, {
                issuer: 'LangGenius:CE',
                subject: 'LangGenius:CE:Auth',
            })
            console.log(payload)
            response.cookies.set('access_token', token)
        } else {
            return new Error('No token provided')
        }
    } catch (_) {
        return response
    } finally {
        return response
    }
}
