import type { FC } from 'react'
import React from 'react'
import { cookies } from 'next/headers'

import type { IMainProps } from '@/app/components'
import Main from '@/app/components'

const App: FC<IMainProps> = () => {
  const cookieStore = cookies()
  const access_token = cookieStore.get('access_token')?.value || ''

  return (
    <Main env={process.env.NODE_ENV} access_token={access_token} />
  )
}

export default React.memo(App)
