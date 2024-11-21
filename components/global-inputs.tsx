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
import { useState } from 'react'

const matchesPerTeamOptions = [5, 6, 7, 8]

const cycleTimeOptions = Array.from({ length: 13 }, (_, i) => i * 0.5 + 4)

export default function GlobalInputs() {
  const [teams, setTeams] = useState(10)
  const [cycleTime, setCycleTime] = useState(5)
  const [matchesPerTeam, setMatchesPerTeam] = useState(5)

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
          <SelectTrigger>
            <SelectValue placeholder="Select cycle time" />
          </SelectTrigger>
          <SelectContent>
            {cycleTimeOptions.map((option) => (
              <SelectItem key={option} value={`${option}`}>
                {option}
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
          <SelectTrigger>
            <SelectValue placeholder="Select matches per team" />
          </SelectTrigger>
          <SelectContent>
            {matchesPerTeamOptions.map((option) => (
              <SelectItem key={option} value={`${option}`}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
