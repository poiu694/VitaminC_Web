'use client'

import cn from '@/utils/cn'

import { Button, Typography } from '../common'
import BoardingDivider from './boarding-divider'
import BoardingBottom from './boarding-bottom'
import type { ClassName } from '../../models/interface'

const InvitedExpiredBoardingPass = ({ className }: ClassName) => {
  return (
    <div className={cn('flex flex-col w-full', className)}>
      <div className="pt-5 flex flex-col gap-1 justify-content items-center bg-neutral-600 rounded-t-3xl">
        <img src="/images/ship.png" aria-hidden className="w-[31px] h-[35px]" />
        <Typography size="h5" color="neutral-300">
          Boarding Pass
        </Typography>
      </div>

      <BoardingDivider />

      <div className="pt-2 px-5 flex flex-col gap-1 bg-neutral-600">
        <Typography size="body4" color="neutral-300" className="text-left">
          Boarding Time
        </Typography>
        <Typography size="h4" color="orange-300" className="text-left">
          앗.. 탑승 시간이 지나버렸어요..
        </Typography>
      </div>

      <div className="px-[20px] bg-neutral-600">
        <Button disabled className="my-5">
          승선하기
        </Button>
      </div>

      <BoardingBottom />
    </div>
  )
}

export default InvitedExpiredBoardingPass
