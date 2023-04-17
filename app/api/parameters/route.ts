import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getClientFromApiSk, getInfo, setSession } from '@/app/api/utils/common'

export async function GET(request: NextRequest) {
  const { sessionId, user } = getInfo(request)
  const client = await getClientFromApiSk(request)
  if (client) {
    const { data } = await client.getApplicationParameters(user) as any
    return NextResponse.json(data, {
      headers: setSession(sessionId),
    })
  }
  return NextResponse.json({
    error: 'No client',
  })
}
