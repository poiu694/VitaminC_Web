'use client'

import { forwardRef, useEffect, useState } from 'react'

import type { FilterIdsType } from './page'

import { notify } from '@/components/common/custom-toast'
import FilterButton from '@/components/common/filter-button'
import EmptyPlaceList from '@/components/place/empty-place-list'
import PlaceListItem from '@/components/place/place-list-item'
import useFetch from '@/hooks/use-fetch'
import { APIError } from '@/models/api/index'
import type { PlaceType } from '@/models/api/place'
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'
import { api } from '@/utils/api'

interface PlaceListBottomSheetProps {
  places: PlaceType[] | null
  mapId: string
  selectedFilter?: FilterIdsType
  onClickFilterButton: VoidFunction
  onRefreshOldPlace: VoidFunction
}

const PlaceListBottomSheet = forwardRef<
  HTMLElement[],
  PlaceListBottomSheetProps
>(
  (
    { places, mapId, selectedFilter, onClickFilterButton, onRefreshOldPlace },
    ref,
  ) => {
    const [placeList, setPlaceList] = useState<PlaceType[]>(places || [])
    const { data: user, revalidate } = useFetch(api.users.me.get, {
      key: ['user'],
    })
    const userId = user?.id
    const numOfSelectedFilter =
      (selectedFilter?.category !== 'all' ? 1 : 0) +
      (selectedFilter?.tags.length ?? 0)

    const { data: slicedPlaceList, listRef } = useInfiniteScroll<PlaceType>({
      totalData: placeList,
      itemsPerPage: 10,
    })

    const getIsLike = (place: PlaceType): boolean => {
      if (typeof userId === 'undefined') return false

      if (place.likedUser?.some((liked) => liked.id === userId)) return true

      return false
    }
    const handleLike = async (place: PlaceType) => {
      if (!userId) return
      try {
        setPlaceList((prevPlaces) =>
          prevPlaces.map((p) =>
            p.place.id === place.place.id
              ? {
                  ...p,
                  likedUser: getIsLike(place)
                    ? p.likedUser?.filter((liked) => liked.id !== userId)
                    : [...(p.likedUser ?? []), { id: userId }],
                }
              : p,
          ),
        )
        if (getIsLike(place)) {
          await api.place.mapId.placeId.like.delete({
            mapId,
            placeId: place.place.id,
          })
        } else {
          await api.place.mapId.placeId.like.put({
            mapId,
            placeId: place.place.id,
          })
        }
        revalidate(['places', mapId])
      } catch (error) {
        if (error instanceof APIError) {
          notify.error(error.message)
        }
      } finally {
        onRefreshOldPlace()
      }
    }

    useEffect(() => {
      if (places) {
        setPlaceList(places)
      }
    }, [places])

    if (numOfSelectedFilter === 0 && places?.length === 0) {
      return (
        <EmptyPlaceList
          ref={(element) => {
            if (typeof ref !== 'function' && ref?.current) {
              ref.current[0] = element as HTMLDivElement
            }
          }}
          className="pt-16"
          message={`등록한 맛집이 없어요\n맛집을 검색하고 저장해보세요`}
        />
      )
    }

    return (
      <div className="flex h-full flex-col">
        <div
          ref={(element) => {
            if (typeof ref !== 'function' && ref?.current) {
              ref.current[0] = element as HTMLDivElement
            }
          }}
          className="z-10 h-[38px] bg-[#212124] px-5 shadow-[rgba(33,33,36,1)_0px_4px_2px_-2px]"
        >
          <FilterButton
            numOfSelectedFilter={numOfSelectedFilter}
            icon={{ type: 'filter' }}
            onClick={onClickFilterButton}
          >
            필터
          </FilterButton>
        </div>
        {slicedPlaceList.length > 0 ? (
          <div
            ref={listRef}
            className="no-scrollbar flex-1 overflow-y-scroll overscroll-contain px-5"
          >
            <ul
              ref={(element) => {
                if (typeof ref !== 'function' && ref?.current) {
                  ref.current[1] = element as HTMLUListElement
                }
              }}
            >
              {slicedPlaceList.map((place, index) => (
                <li key={`bottom-sheet-${place.place.kakaoPlace.id}-${index}`}>
                  <PlaceListItem
                    placeId={place.place.kakaoPlace.id}
                    address={place.place.kakaoPlace.address}
                    name={place.place.kakaoPlace.name}
                    rating={place.place.kakaoPlace.score ?? 0}
                    images={place.place.kakaoPlace.menuList
                      .map((menu) => menu.photo)
                      .filter((photo) => !!photo)}
                    tags={place.tags}
                    pick={{
                      isLiked: getIsLike(place),
                      isMyPick: place.createdBy?.id === userId,
                      numOfLikes: place.likedUser?.length || 0,

                      onClickLike: (e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleLike(place)
                      },
                    }}
                    className="first:pt-1"
                  />
                  <hr className="my-[2px] h-[1px] border-0 bg-neutral-600 last:hidden" />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          !!numOfSelectedFilter && (
            <EmptyPlaceList
              ref={(element) => {
                if (typeof ref !== 'function' && ref?.current) {
                  ref.current[1] = element as HTMLDivElement
                }
              }}
              message="해당 음식점이 없어요"
            />
          )
        )}
      </div>
    )
  },
)

PlaceListBottomSheet.displayName = 'PlaceListBottomSheet'

export default PlaceListBottomSheet
