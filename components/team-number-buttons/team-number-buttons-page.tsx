'use client'

import { ModeToggle } from '../mode-toggle'
import { Label } from '../ui/label'
import { Pill } from '../ui/pill'
import { Team } from '@/api/team-number-button/types'
import {
  TeamButton,
  TeamButtonImage,
} from '@/components/team-number-buttons/team-button'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const TEAM_BUTTON_IMAGES = [
  {
    url: 'https://pmichaud.com/itd-driver.png',
    alt: 'Team Button with the FIRST Tech Challenge logo, into the deep logo, and a driver heading',
    className: 'fill-white',
  },
  {
    url: 'https://pmichaud.com/itd-driver.png',
    alt: 'Team Button with the FIRST Tech Challenge logo, into the deep logo, and a driver sub heading',
    className: 'fill-white',
  },
  {
    url: 'https://pmichaud.com/itd-coach.png',
    alt: 'Team Button with the FIRST Tech Challenge logo, into the deep logo, and a drive coach sub eading',
    className: 'fill-orange-500',
  },
  {
    url: 'https://pmichaud.com/itd-human.png',
    alt: 'Team Button with the FIRST Tech Challenge logo, into the deep logo, and a human player sub heading',
    className: 'fill-white',
  },
  {
    url: 'https://pmichaud.com/itd-media.png',
    alt: 'Team Button with the FIRST Tech Challenge logo, into the deep logo, and a media sub heading',
    className: 'fill-white',
  },
  {
    url: 'https://pmichaud.com/itd-blank.png',
    alt: 'Team Button with the FIRST Tech Challenge logo, into the deep logo, and no sub heading',
    className: 'fill-white',
  },
] as const

const TEAM_BUTTON_SCALES = {
  '1.50': { className: 'scale-[0.587]', size: '1.50', cutSize: '1.76' },
  '1.75': { className: 'scale-[0.66]', size: '1.75', cutSize: '1.97' },
  '2.25': { className: 'scale-[0.8333]', size: '2.25', cutSize: '2.50' },
  '2.50': { className: 'scale-[0.9333]', size: '2.50', cutSize: '2.80' },
  '3.00': { className: 'scale-[1.115]', size: '3.00', cutSize: '3.35' },
} as const

const teamButtonScaleOptions = Object.values(TEAM_BUTTON_SCALES)

type TeamButtonSizes = keyof typeof TEAM_BUTTON_SCALES

const exampleTeamButtonImage = TEAM_BUTTON_IMAGES[0]
const EXAMPLE_TEAM_NUMBER = 12345

export default function TeamNumberButtonsPage({
  eventCode,
  teams,
}: {
  eventCode: string
  teams: Team[]
}) {
  const [teamNumbers, setTeamNumbers] = useState(
    teams.map((team) => team.teamNumber),
  )
  const [newTeamNumber, setNewTeamNumber] = useState<number>()
  const [buttonScale, setButtonScale] = useState<TeamButtonSizes>(
    TEAM_BUTTON_SCALES['2.25'].size,
  )
  const [newEventCode, setNewEventCode] = useState(eventCode)

  const router = useRouter()

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="h-full m-10 print:hidden border-t-4 border-t-orange-500 rounded-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold justify-between flex items-end">
            FIRST Tech Challenge Team Buttons <ModeToggle />
          </CardTitle>
          <CardDescription>
            Designed for Chrome. Set margins in print dialog to either
            &quot;Default&quot; or &quot;None&quot; to get correct print sizing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex lg:items-center flex-col lg:flex-row items-start">
            <div className="flex gap-3 flex-col">
              <div className="flex items-end gap-4">
                <div>
                  <Label htmlFor="text">Enter Team Number:</Label>
                  <Input
                    id="newTeamNumber"
                    type="number"
                    value={newTeamNumber}
                    onChange={(e) => {
                      setNewTeamNumber(Number(e.target.value))
                    }}
                  />
                </div>
                <Button
                  onClick={() => {
                    if (newTeamNumber) {
                      setTeamNumbers((teamNumbers) => [
                        ...teamNumbers,
                        newTeamNumber,
                      ])
                    }
                  }}
                >
                  Add Team
                </Button>
              </div>
              <div className="flex items-end gap-4">
                <div>
                  <Label htmlFor="newEventCode">Enter Event Code:</Label>
                  <Input
                    id="newEventCode"
                    type="text"
                    defaultValue={newEventCode}
                    onChange={(e) => {
                      setNewEventCode(e.target.value)
                    }}
                  />
                </div>
                <Button
                  onClick={() => router.replace(`/?eventCode=${newEventCode}`)}
                >
                  Import Teams
                </Button>
              </div>
              <div className="flex gap-1 flex-wrap">
                {teamNumbers.map((teamNumber) => (
                  <Pill
                    onRemove={() => {
                      setTeamNumbers((teamNumbers) =>
                        teamNumbers.filter(
                          (_teamNumber) => _teamNumber != teamNumber,
                        ),
                      )
                    }}
                    key={teamNumber}
                    label={`${teamNumber}${teamNumber < 10000 ? ' ' : ''}`}
                    // className="w-20"
                  />
                ))}
              </div>
              <div className="mb-5">
                <Label htmlFor="buttonScale"> Button size (cut size):</Label>
                <Select
                  name="buttonScale"
                  onValueChange={(value: TeamButtonSizes) =>
                    setButtonScale(value)
                  }
                  value={buttonScale}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {teamButtonScaleOptions.map((option) => (
                      <SelectItem key={option.size} value={option.size}>
                        {option.size} ({option.cutSize})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mx-auto">
              <div className="w-[288px]">
                <TeamButton
                  className={`${TEAM_BUTTON_SCALES[buttonScale].className} ${exampleTeamButtonImage.className}`}
                >
                  <TeamButtonImage
                    src={exampleTeamButtonImage.url}
                    alt={exampleTeamButtonImage.alt}
                  >
                    {EXAMPLE_TEAM_NUMBER}
                  </TeamButtonImage>
                </TeamButton>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => window.print()}>🖨️ Print</Button>
        </CardFooter>
      </Card>
      <div className="hidden print:block">
        {teamNumbers.map((teamNumber) => (
          <div className="grid grid-cols-2" key={teamNumber}>
            {TEAM_BUTTON_IMAGES.map((image, index) => (
              <div className="w-[288px]" key={index}>
                <TeamButton
                  className={`${TEAM_BUTTON_SCALES[buttonScale].className} ${image.className}`}
                >
                  <TeamButtonImage src={image.url} alt={image.alt}>
                    {teamNumber}
                  </TeamButtonImage>
                </TeamButton>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
