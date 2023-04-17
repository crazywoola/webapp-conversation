import type { FC } from 'react'
import React from 'react'

import type { IMainProps } from '@/app/components'
import Main from '@/app/components'

const App: FC<IMainProps> = () => {
  return (
    <Main env={process.env.NODE_ENV} />
  )
}

export default React.memo(App)
