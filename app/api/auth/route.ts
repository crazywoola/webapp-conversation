import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const DECODE_KEY = 'bananaiscool'

export async function POST(request: Request) {
  const res = await request.json()

  try {
    const token = res.token || ''
    const payload = jwt.verify(
      token,
      DECODE_KEY,
      {
        algorithms: ['HS256'],
        issuer: 'LangGenius:CE',
        subject: 'LangGenius:CE:Auth',
      }
    );
    return NextResponse.json({ payload })
  } catch (err) {
    return NextResponse.json({ err })
  }
}
