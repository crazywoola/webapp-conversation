'use client'
import type { FC } from 'react'
import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'next/navigation'
import { getAuthByEnv } from '@/config'
type IAppUnavailableProps = {
  error: string
  env?: string
}

const AppUnavailable: FC<IAppUnavailableProps> = ({
  error,
  env = 'development',
}) => {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const app_id = searchParams.get('app_id')
  const { AUTHORIZE_URL, CALLBACK_URL } = getAuthByEnv(env)
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex items-center justify-center w-screen'>
        <h1 className='mr-5 h-[50px] leading-[50px] pr-5 text-[24px] font-medium'
          style={{
            borderRight: '1px solid rgba(0,0,0,.3)',
          }}>401</h1>
        <div className='text-sm mr-5'>

          <Link href={`${AUTHORIZE_URL}?app_id=${app_id}&callback_url=${CALLBACK_URL}`} className='flex items-center mr-3 hover:border-b hover:boder-b-1 hover:boder-primary-300'>
            <div className="">{error || t('app.common.appNeedLogin')}</div>
          </Link>
        </div>
      </div>
      <div className='flex w-full items-center justify-center mt-5'>

      </div>
    </div>
  )
}
export default React.memo(AppUnavailable)
