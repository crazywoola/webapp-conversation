import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getInfo, getClientFromApiSk } from '@/app/api/utils/common'
import { OpenAIStream } from '@/app/api/utils/stream'

export async function POST(request: NextRequest) {
  const client = await getClientFromApiSk(request)
  const body = await request.json()
  const {
    inputs,
    query,
    conversation_id: conversationId,
    response_mode: responseMode
  } = body
  const { user } = getInfo(request);
  if (client) {
    const res = await client.createChatMessage(inputs, query, user, responseMode, conversationId)
    const stream = await OpenAIStream(res as any)
    return new Response(stream as any)
  }
  return NextResponse.json({
    error: 'No client'
  })

}