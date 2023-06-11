import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getClientFromApiSk, getInfo } from '@/app/api/utils/common'

export async function POST(request: NextRequest) {
  const client = await getClientFromApiSk(request)
  const body = await request.json()
  const {
    inputs,
    query,
    conversation_id: conversationId,
    response_mode: responseMode,
  } = body
  const { user } = getInfo(request)
  const cookieStore = cookies()
  const ak = cookieStore.get('access_token')

  if (client) {
    const res = await client.createChatMessage(inputs, query, user, responseMode, conversationId)
    return new Response(res.data as any)
  }
  return NextResponse.json({
    error: 'No client',
    ak,
  })
}
