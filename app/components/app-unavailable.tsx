'use client'
import React, { FC } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { AUTHORIZE_URL, CALLBACK_URL } from '@/config'
interface IAppUnavailableProps {
  isUnknwonReason: boolean
}

const AppUnavailable: FC<IAppUnavailableProps> = ({
  isUnknwonReason
}) => {
  const { t } = useTranslation()
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex items-center justify-center w-screen'>
        <h1 className='mr-5 h-[50px] leading-[50px] pr-5 text-[24px] font-medium'
          style={{
            borderRight: '1px solid rgba(0,0,0,.3)',
          }}>401</h1>
        <div className='text-sm mr-5'>

          <Link href={`${AUTHORIZE_URL}?callback_url=${CALLBACK_URL}`} className='flex items-center mr-3 hover:border-b hover:boder-b-1 hover:boder-primary-300'>
            <div className="">{t('app.common.appNeedLogin')}</div>
          </Link>
        </div>
      </div>
      <div className='flex w-full items-center justify-center mt-5'>

      </div>
    </div>
  )
}
export default React.memo(AppUnavailable)
