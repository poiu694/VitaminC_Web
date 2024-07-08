import type { ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'

import SearchInput from '@/components/search-input'

interface SearchFormProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onResetValue: VoidFunction
  onSubmit: (formData: FormData) => void
}

const SearchForm = ({
  value,
  onChange,
  onSubmit,
  onResetValue,
}: SearchFormProps) => {
  const router = useRouter()

  return (
    <form action={onSubmit}>
      <SearchInput
        ref={(node) => {
          node?.focus()
        }}
        name="query"
        value={value}
        leftIcon={{
          icon: {
            type: 'caretLeft',
            size: 'xl',
          },
          label: '뒤로 가기',
          onClick: () => router.back(),
        }}
        rightIcon={{
          icon: { type: 'delete', size: 'xl', onClick: onResetValue },
          label: '입력 내용 지우기',
        }}
        onChange={onChange}
      />
    </form>
  )
}

export default SearchForm
