'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Clock, Users, RepeatIcon } from 'lucide-react'
import { useState, useMemo, useEffect, Dispatch, SetStateAction } from 'react'

type ScheduleItem = {
  time: string
  description: string
  duration?: number
  isQualificationMatches?: boolean
}

export default function GlobalInputs({
  setSchedule,
}: {
  setSchedule: Dispatch<SetStateAction<ScheduleItem[]>>
}) {
  const [teams, setTeams] = useState(10)
  const [cycleTime, setCycleTime] = useState(5)
  const [matchesPerTeam, setMatchesPerTeam] = useState(5)

  const calculateResult = (t: number, c: number, m: number) => {
    const totalMatches = Math.ceil((t * m) / 2)
    return Number(((totalMatches * c) / 60).toFixed(2))
  }

  const result = useMemo(
    () => calculateResult(teams, cycleTime, matchesPerTeam),
    [teams, cycleTime, matchesPerTeam],
  )

  useEffect(() => {
    setSchedule((prevSchedule) => {
      const updatedSchedule = [...prevSchedule]
      const qualMatchIndex = updatedSchedule.findIndex(
        (item) => item.isQualificationMatches,
      )
      if (qualMatchIndex !== -1) {
        updatedSchedule[qualMatchIndex].duration = result
      }
      return updatedSchedule
    })
  }, [result, setSchedule])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="space-y-2">
        <Label htmlFor="teams" className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          Number of Teams
        </Label>
        <Input
          id="teams"
          type="number"
          value={teams}
          onChange={(e) =>
            setTeams(Math.max(10, Math.min(40, Number(e.target.value))))
          }
          min="10"
          max="40"
          className="text-lg"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cycleTime" className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Cycle Time (minutes)
        </Label>
        <Select
          value={cycleTime.toString()}
          onValueChange={(value) => setCycleTime(Number(value))}
        >
          <SelectTrigger className="text-lg">
            <SelectValue placeholder="Select cycle time" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 13 }, (_, i) => (
              <SelectItem key={i} value={(i * 0.5 + 4).toString()}>
                {(i * 0.5 + 4).toFixed(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="matchesPerTeam" className="flex items-center gap-2">
          <RepeatIcon className="w-4 h-4" />
          Matches per Team
        </Label>
        <Select
          value={matchesPerTeam.toString()}
          onValueChange={(value) => setMatchesPerTeam(Number(value))}
        >
          <SelectTrigger className="text-lg">
            <SelectValue placeholder="Select matches per team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="6">6</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
