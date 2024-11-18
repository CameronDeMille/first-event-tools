'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type ScheduleItem = {
  time: string
  description: string
  duration?: number
  isQualificationMatches?: boolean
}

export default function FinalSchedule({
  schedule,
}: {
  schedule: ScheduleItem[]
}) {
  const calculateEndTime = (startTime: string, durationHours: number) => {
    const [hours, minutes] = startTime.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes + durationHours * 60
    const endHours = Math.floor(totalMinutes / 60) % 24
    const endMinutes = totalMinutes % 60
    return `${endHours.toString().padStart(2, '0')}:${endMinutes
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Start Time</TableHead>
          <TableHead>End Time</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedule.map((item, index) => {
          const nextItem = schedule[index + 1]
          const duration = item.isQualificationMatches
            ? item.duration
            : nextItem
              ? // TODO: Remove eslint disables here. The code is likely to change here
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ((new Date(`2000/01/01 ${nextItem.time}`) as any) -
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (new Date(`2000/01/01 ${item.time}`) as any)) /
                3600000
              : undefined
          const endTime = duration
            ? calculateEndTime(item.time, duration)
            : undefined
          return (
            <TableRow key={index}>
              <TableCell>{item.time}</TableCell>
              <TableCell>{endTime}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{duration?.toFixed(2)} hours</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
