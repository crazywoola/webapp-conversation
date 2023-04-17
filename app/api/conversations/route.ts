import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getClientFromApiSk, getInfo, setSession } from '@/app/api/utils/common'

export async function GET(request: NextRequest) {
  const client = await getClientFromApiSk(request)
  const { sessionId, user } = getInfo(request)
  const cookieStore = cookies()
  const ak = cookieStore.get('access_token')

  if (client) {
    const { data }: any = await client.getConversations(user)
    return NextResponse.json(data, {
      headers: setSession(sessionId),
    })
  }
  return NextResponse.json({
    error: 'No client',
    ak,
  })
}
