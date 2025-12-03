import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date) => {
  const originalDate = new Date(date)
  const formatedDate = format(originalDate, 'dd MMM yyyy')
  return formatedDate
}
