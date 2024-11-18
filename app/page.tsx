'use client'

import CycleTimeTable from '@/components/cycle-time-table'
import FinalSchedule from '@/components/final-schedule'
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
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

type ScheduleItem = {
  time: string
  description: string
  duration?: number
  isQualificationMatches?: boolean
}

// TODO: Move code into hooks and components
export default function FTCEventScheduleBuilder() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    { time: '07:00', description: 'Volunteer Check-In' },
    { time: '07:30', description: 'Teams Check-In' },
    { time: '08:00', description: 'Judging Begins, Driver & Field Inspection' },
    { time: '10:30', description: 'Driver meeting' },
    { time: '10:45', description: 'Opening Ceremony' },
    {
      time: '11:00',
      description: 'Qualifying matches',
      isQualificationMatches: true,
    },
    { time: '12:30', description: 'Lunch break' },
    { time: '13:55', description: 'Alliance Selection Starts' },
    { time: '14:10', description: 'Semifinals' },
    { time: '14:35', description: 'Finals' },
    { time: '14:55', description: 'Finals end' },
    { time: '15:10', description: 'Award Ceremony Begins' },
    { time: '15:40', description: 'Award Ceremony Ends' },
  ])

  const addScheduleItem = () => {
    setSchedule([...schedule, { time: '', description: '' }])
  }

  const updateScheduleItem = (
    index: number,
    field: 'time' | 'description',
    value: string,
  ) => {
    const newSchedule = [...schedule]
    newSchedule[index][field] = value
    setSchedule(newSchedule)
  }

  const removeScheduleItem = (index: number) => {
    setSchedule(schedule.filter((_, i) => i !== index))
  }

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto mt-10">
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
          {/* TODO: Refactor with a hook/context */}
          <GlobalInputs setSchedule={setSchedule} />
          <CycleTimeTable />
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
                <Input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    updateScheduleItem(index, 'description', e.target.value)
                  }
                  className="flex-grow"
                  placeholder="Event description"
                />
                {item.isQualificationMatches && (
                  <div className="text-sm font-medium">
                    Duration: {item.duration?.toFixed(2)} hours
                  </div>
                )}
                <Button
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
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Final Schedule</h3>
            <FinalSchedule schedule={schedule} />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
