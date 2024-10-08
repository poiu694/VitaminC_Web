import Typography from '@/components/common/typography'
import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'
import type { PlaceDetail } from '@/models/api/place'
import Link from 'next/link'

interface AIRecommendPlaceBoxProps extends ClassName {
  place: {
    name: PlaceDetail['name']
    address: PlaceDetail['address']
    reason: string
    placeId: PlaceDetail['id']
  }
}

const AIRecommendPlaceBox = ({
  className,
  place,
}: AIRecommendPlaceBoxProps) => {
  return (
    <section className={cn('rounded-[20px] bg-neutral-600 py-5', className)}>
      <div className="flex flex-col gap-[2px] px-5">
        <Typography size="h5" color="neutral-000">
          {place.name}
        </Typography>
        <Typography size="body3" color="neutral-200">
          {place.address}
        </Typography>
      </div>

      <div className="my-3 h-[1px] w-full bg-neutral-500" />

      <div className="flex flex-col gap-1 px-5 pb-3">
        <Typography
          size="h6"
          className="inline-block w-fit bg-gradient-to-r from-orange-400 to-purple-300 bg-clip-text text-transparent"
        >
          AI봇의 추천 이유
        </Typography>
        <Typography
          size="body3"
          color="neutral-000"
          className="truncate-3-lines"
        >
          {place.reason}
        </Typography>
      </div>

      <div className="px-5">
        <Link
          href={`/place/${place.placeId}`}
          className="flex w-full items-center justify-center rounded-full bg-neutral-500 py-3"
        >
          <Typography size="body1" color="neutral-000">
            맛집 상세 보기
          </Typography>
        </Link>
      </div>
    </section>
  )
}

export default AIRecommendPlaceBox
