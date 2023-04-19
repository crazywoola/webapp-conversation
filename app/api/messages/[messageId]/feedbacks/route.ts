import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getInfo, getClientFromApiSk } from '@/app/api/utils/common'

export async function POST(request: NextRequest, { params }: {
  params: { messageId: string }
}) {
  const client = await getClientFromApiSk(request)
  const cookieStore = cookies()
  const ak = cookieStore.get('access_token')
  const body = await request.json()
  const {
    rating
  } = body
  const { messageId } = params
  const { user } = getInfo(request);
  if (client) {
    const { data }: any = await client.messageFeedback(messageId, rating, user)
    return NextResponse.json(data)
  }
  return NextResponse.json({
    error: 'No client',
    ak,
  })

}
