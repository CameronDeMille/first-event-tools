import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateDuration = ({
  startTime,
  endTime,
}: {
  startTime: string
  endTime: string
}) => {
  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  const startMinutes = toMinutes(startTime)
  const endMinutes = toMinutes(endTime)

  const diffMinutes = (endMinutes - startMinutes + 24 * 60) % (24 * 60)

  return diffMinutes
}
