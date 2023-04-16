import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getInfo, setSession, getClientFromApiSk } from '@/app/api/utils/common'

export async function GET(request: NextRequest) {
  const client = await getClientFromApiSk(request)
  const { sessionId, user } = getInfo(request);
  if (client) {
    const { data }: any = await client.getConversations(user);
    return NextResponse.json(data, {
      headers: setSession(sessionId)
    })
  }
  return NextResponse.json({
    error: 'No client'
  })
}