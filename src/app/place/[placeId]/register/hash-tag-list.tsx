'use client'

import { useState } from 'react'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import BottomModal from '@/components/common/bottom-modal'
import { notify } from '@/components/common/custom-toast'
import Icon from '@/components/common/icon'
import SearchInput from '@/components/common/search-input'
import Typography from '@/components/common/typography'
import { APIError } from '@/models/api'
import type { TagItem } from '@/models/api/maps'
import type { ClassName } from '@/models/common'
import { api } from '@/utils/api'
import cn from '@/utils/cn'

const MAX_TAG_LENGTH = 16

interface HashTagListProps extends ClassName {
  defaultTags: TagItem[]
  selectedTags: TagItem[]
  mapId: string
  onClickTag: (tag: TagItem) => void
}

const HashTagList = ({
  defaultTags,
  className,
  selectedTags,
  mapId,
  onClickTag,
}: HashTagListProps) => {
  const [customTag, setCustomTag] = useState<string>('')
  const [tags, setTags] = useState<TagItem[]>(defaultTags)
  const [isOpenCustomTagModal, setIsOpenCustomModalTag] = useState(false)

  const addTagToServer = async (name: string) => {
    try {
      if (!mapId) return

      const response = await api.maps.id.tag.post({ id: mapId, name })
      setTags((prev) => [...prev, response.data])
      onClickTag(response.data)
    } catch (error) {
      if (error instanceof APIError) {
        notify.error(error.message)
      }
    }
  }

  const handleAddTag = (name: string) => {
    setCustomTag('')
    setIsOpenCustomModalTag(false)
    if (name === '') return

    const isAlreadyExist = tags.find((tag) => tag.name === name)
    if (isAlreadyExist) {
      notify.error('이미 있는 태그입니다.')
      return
    }
    if (name.length > MAX_TAG_LENGTH) {
      notify.error('태그가 너무 깁니다.')
      return
    }
    addTagToServer(name)
  }

  return (
    <>
      <section className={cn('flex flex-col gap-3', className)}>
        <Typography size="body4" color="neutral-300" className="font-bold">
          # 해시태그
        </Typography>

        <ul className="no-scrollbar flex max-h-[calc(100vh-300px)] flex-wrap gap-x-3 gap-y-[10px] overflow-y-scroll">
          {tags.map((tag) => {
            const isActive = selectedTags.includes(tag)

            return (
              <li key={`${tag.name}-${tag.iconType}`}>
                <button
                  className={cn(
                    'flex h-[35px] w-fit items-center gap-1 rounded-[20px] px-[10px] py-2 transition-colors',
                    isActive ? 'bg-orange-400' : 'bg-neutral-500',
                  )}
                  onClick={() => onClickTag(tag)}
                >
                  {tag.iconType && (
                    <Icon type={tag.iconType} size="md" aria-hidden />
                  )}
                  <Typography as="span" size="body3" color="neutral-000">
                    {tag.name}
                  </Typography>
                </button>
              </li>
            )
          })}

          <li>
            <AccessibleIconButton
              icon={{ type: 'plus', size: 'md' }}
              label="사용자 태그 추가"
              className="flex h-full min-h-[35px] w-[36px] items-center justify-center rounded-[20px] bg-neutral-500"
              onClick={() => setIsOpenCustomModalTag(true)}
            />
          </li>
        </ul>
      </section>

      <BottomModal
        title="나만의 태그를 만들어보세요"
        scrollable={false}
        body={
          <SearchInput
            ref={(node) => node?.focus()}
            value={customTag}
            placeholder="식당과 관련된 맛, 분위기... 등등 을 적어보세요"
            maxLength={MAX_TAG_LENGTH}
            rightIcon={{
              icon: { type: 'delete', size: 'xl' },
              label: '입력된 사용자 태그 지우기',
              onClick: () => setCustomTag(''),
            }}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                handleAddTag(customTag)
              }
            }}
          />
        }
        layout="alert"
        isOpen={isOpenCustomTagModal}
        confirmMessage="추가"
        onConfirm={() => handleAddTag(customTag)}
        onClose={() => setIsOpenCustomModalTag(false)}
      />
    </>
  )
}

export default HashTagList
