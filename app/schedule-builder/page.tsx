'use client'

// import CycleTimeTable from '@/components/cycle-time-table'
// import FinalSchedule from '@/components/final-schedule'
import GlobalInputs from '@/components/global-inputs'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

export type ScheduleItem = {
  time: string
  description?: string
  type: ScheduleBlockTypes
}

const SCHEDULE_BLOCK_TYPES = {
  JUDGING: {
    title: 'Judging',
    duration: 150,
  },
  JUDGING_AWARDS_DUE: {
    title: 'Judging Award Decisions Due',
    duration: undefined,
  },
  DRIVERS_MEETING: { title: 'Drivers Meeting', duration: 20 },
  OPENING_CEREMONY: { title: 'Opening Ceremony', duration: 20 },
  QUALIFICATION_ROUND: { title: 'Qualification Round', duration: 60 },
  LUNCH: { title: 'Lunch', duration: 45 },
  MATCH_BREAK: { title: 'Match Break', duration: 10 },
  ALLIANCE_BREAK: { title: 'Alliance Break', duration: 10 },
  ALLIANCE_SELECTION: { title: 'Alliance Selection', duration: 10 },
  PLAYOFF_ROUND: { title: 'Playoff Round', duration: 10 },
  PLAYOFF_BREAK: { title: 'Playoff Break', duration: 10 },
  FINAL_AWARDS: { title: 'Final Awards', duration: 10 },
} as const

type ScheduleBlockTypes =
  (typeof SCHEDULE_BLOCK_TYPES)[keyof typeof SCHEDULE_BLOCK_TYPES]

const DEFAULT_SCHEDULE = [
  {
    time: '08:30',
    type: SCHEDULE_BLOCK_TYPES.JUDGING,
  },
  {
    time: '11:00',
    type: SCHEDULE_BLOCK_TYPES.DRIVERS_MEETING,
  },
  {
    time: '11:20',
    type: SCHEDULE_BLOCK_TYPES.OPENING_CEREMONY,
  },
  {
    time: '11:40',
    type: SCHEDULE_BLOCK_TYPES.QUALIFICATION_ROUND,
  },
  {
    time: '12:40',
    type: SCHEDULE_BLOCK_TYPES.LUNCH,
  },
  {
    time: '13:25',
    type: SCHEDULE_BLOCK_TYPES.QUALIFICATION_ROUND,
  },
  {
    time: '14:25',
    type: SCHEDULE_BLOCK_TYPES.MATCH_BREAK,
  },
  {
    time: '14:35',
    type: SCHEDULE_BLOCK_TYPES.QUALIFICATION_ROUND,
  },
  {
    time: '15:50',
    type: SCHEDULE_BLOCK_TYPES.MATCH_BREAK,
  },
  {
    time: '16:00',
    type: SCHEDULE_BLOCK_TYPES.QUALIFICATION_ROUND,
  },
  {
    time: '16:45',
    type: SCHEDULE_BLOCK_TYPES.ALLIANCE_BREAK,
  },
  {
    time: '16:55',
    type: SCHEDULE_BLOCK_TYPES.ALLIANCE_SELECTION,
  },
  {
    time: '17:10',
    type: SCHEDULE_BLOCK_TYPES.PLAYOFF_ROUND,
  },
  {
    time: '17:30',
    type: SCHEDULE_BLOCK_TYPES.JUDGING_AWARDS_DUE,
  },
  {
    time: '17:55',
    type: SCHEDULE_BLOCK_TYPES.PLAYOFF_BREAK,
  },
  {
    time: '18:10',
    type: SCHEDULE_BLOCK_TYPES.PLAYOFF_ROUND,
  },
  {
    time: '18:13',
    type: SCHEDULE_BLOCK_TYPES.PLAYOFF_BREAK,
  },
  {
    time: '18:28',
    type: SCHEDULE_BLOCK_TYPES.PLAYOFF_ROUND,
  },
  {
    time: '18:31',
    type: SCHEDULE_BLOCK_TYPES.PLAYOFF_BREAK,
  },
  // IF needed
  {
    time: '18:46',
    type: SCHEDULE_BLOCK_TYPES.PLAYOFF_ROUND,
  },
  {
    time: '18:49',
    type: SCHEDULE_BLOCK_TYPES.FINAL_AWARDS,
  },
]

const scheduleBlockOptions = Object.values(SCHEDULE_BLOCK_TYPES)

export default function Page() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(DEFAULT_SCHEDULE)

  const addScheduleItem = () => {
    setSchedule([
      ...schedule,
      { time: '', type: SCHEDULE_BLOCK_TYPES.JUDGING, description: '' },
    ])
  }

  const updateScheduleItem = (
    index: number,
    field: 'time' | 'description' | 'type',
    value: string,
  ) => {
    const newSchedule = [...schedule]
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    newSchedule[index][field] = value

    setSchedule(newSchedule)
  }

  const removeScheduleItem = (index: number) => {
    setSchedule(schedule.filter((_, i) => i !== index))
  }

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto my-10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold justify-between flex">
            FTC Event Schedule Builder
            <ModeToggle />
          </CardTitle>
          <CardDescription>
            Plan your FIRST Tech Challenge event schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GlobalInputs />
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Event Schedule</h3>
            {schedule.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <Input
                  type="time"
                  value={item.time}
                  onChange={(e) =>
                    updateScheduleItem(index, 'time', e.target.value)
                  }
                  className="w-32"
                />

                {item.type?.duration && (
                  <Input
                    type="number"
                    value={item.type.duration}
                    onChange={(e) =>
                      updateScheduleItem(index, 'type', e.target.value)
                    }
                    min="10"
                    max="40"
                  />
                )}
                <Select
                  value={item.type.title}
                  onValueChange={(value) =>
                    updateScheduleItem(index, 'type', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a block type" />
                  </SelectTrigger>
                  <SelectContent>
                    {scheduleBlockOptions.map((option) => (
                      <SelectItem key={option.title} value={option.title}>
                        {option.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    updateScheduleItem(index, 'description', e.target.value)
                  }
                  className="flex-grow"
                  placeholder="Event description"
                />
                <Button
                  className="flex-shrink-0"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeScheduleItem(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={addScheduleItem} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Schedule Item
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
