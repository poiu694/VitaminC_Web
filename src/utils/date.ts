export class DateOrderError extends Error {
  constructor() {
    super('인자의 순서가 잘못되었습니다.(endDate < startDate)')
  }
}

/**
 * 그리니치 천문대로부터 특정 날짜까지 몇 일이 떨어져 있는지 계산합니다.
 * @param targetDate - 계산할 대상 날짜
 * @returns 그리니치 천문대 기준으로부터 떨어진 일 수
 */
const getDaysFromGreenwich = (targetDate: Date): number => {
  const greenwichDate = new Date('1970-01-01T00:00:00Z')
  const MS_PER_DAY = 1000 * 60 * 60 * 24

  const diffInMs = targetDate.getTime() - greenwichDate.getTime()
  const diffInDays = Math.floor(diffInMs / MS_PER_DAY)

  return diffInDays
}

export const getDiffDateText = (startDate: Date, endDate: Date): number => {
  if (endDate.getTime() < startDate.getTime()) {
    throw new DateOrderError()
  }

  const startDay = getDaysFromGreenwich(startDate)
  const endDay = getDaysFromGreenwich(endDate)
  const diffDay = endDay - startDay

  return diffDay + 1
}
