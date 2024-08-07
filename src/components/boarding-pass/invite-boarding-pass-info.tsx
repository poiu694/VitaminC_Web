import { SINGLE } from './constant'
import { Typography } from '../common'
import { InviteBoardingPass } from './types'
import BoardingDivider from './boarding-divider'
import { formatDate } from '../../utils/date'

const InviteBoardingPassInfo = ({
  mapName,
  creator,
  numOfCrews,
  expirationTime,
}: InviteBoardingPass) => {
  return (
    <>
      <div className="pt-5 flex flex-col gap-1 justify-content items-center bg-neutral-600 rounded-t-3xl">
        <img src="/images/ship.png" aria-hidden className="w-[31px] h-[35px]" />
        <Typography size="h5" color="neutral-300">
          Boarding Pass
        </Typography>
      </div>

      <div className="w-full pt-5 px-5 flex bg-neutral-600 mt-[-0.5px]">
        <div className="flex flex-col gap-1 flex-1">
          <Typography size="body4" color="neutral-300" className="text-left">
            Flight
          </Typography>
          <Typography size="h4" color="neutral-000" className="text-left">
            {mapName}
          </Typography>
        </div>
        <div className="flex flex-col gap-1 flex-1 bg-neutral-600">
          <Typography size="body4" color="neutral-300" className="text-left">
            Crew
          </Typography>
          <Typography size="h4" color="neutral-000" className="text-left">
            {numOfCrews === SINGLE
              ? creator.nickname
              : `${creator.nickname} 외 ${(numOfCrews - 1).toLocaleString()}명`}
          </Typography>
        </div>
      </div>

      <BoardingDivider />

      <div className="pt-2 px-5 flex flex-col gap-1 bg-neutral-600">
        <Typography size="body4" color="neutral-300" className="text-left">
          Boarding Time
        </Typography>
        <Typography size="h4" color="neutral-000" className="text-left">
          {formatDate(expirationTime)}
        </Typography>
      </div>
    </>
  )
}

export default InviteBoardingPassInfo
