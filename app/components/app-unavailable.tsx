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
  const { AUTHORIZE_URL, CALLBACK_URL, DASHBOARD_URL } = getAuthByEnv(env)
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex items-center justify-center w-screen'>
        <h1 className='mr-5 h-[50px] leading-[50px] pr-5 text-[24px] font-medium'
          style={{
            borderRight: '1px solid rgba(0,0,0,.3)',
          }}>{t(error)}</h1>
        <div className='inline-flex'>
          <Link
            href={`${AUTHORIZE_URL}?app_id=${app_id}&callback_url=${CALLBACK_URL}`}
            className=' flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'
          >
            <div className="">{t('app.common.login')}</div>
          </Link>
        </div>
      </div>
      <div className='flex w-full items-center justify-center mt-5 flex-col gap-2'>
        <p className='text-base text-gray-700'>{t('message.tip.contact_us')}</p>
        <p className='text-xs text-gray-500'>
          <Link href={DASHBOARD_URL}>
            {t('message.tip.dashboard')}
          </Link>
        </p>
      </div>
    </div>
  )
}
export default React.memo(AppUnavailable)
