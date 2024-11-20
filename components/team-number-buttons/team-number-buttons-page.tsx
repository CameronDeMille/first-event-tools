'use client'

import {
  TeamButton,
  TeamButtonImage,
} from '@/components/team-number-buttons/team-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

export default function TeamNumberButtonsPage({
  eventCode,
}: {
  eventCode: string
}) {
  console.log('eventCode', eventCode)

  const [teamNumber, setTeamNumber] = useState('12345')
  const [buttonScale, setButtonScale] = useState<TeamButtonSizes>(
    TEAM_BUTTON_SCALES['2.25'].size,
  )

  return (
    <div className="flex lg:flex-row flex-col">
      <Card className="h-full m-10 print:hidden border-t-4 border-t-orange-500 rounded-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            FIRST Tech Challenge Team Buttons
          </CardTitle>
        </CardHeader>
        <CardContent>
          Enter team number:
          <Input
            type="number"
            value={teamNumber}
            onChange={(e) => {
              setTeamNumber(e.target.value)
            }}
          />
          Button size (cut size):
          <Select
            onValueChange={(value: TeamButtonSizes) => setButtonScale(value)}
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
          <p>Designed for Chrome -- your mileage may vary in other browsers.</p>
          <p>
            Set margins in print dialog to either &quot;Default&quot; or
            &quot;None&quot; to get correct print sizing.
          </p>
          <Button onClick={() => window.print()}>🖨️ Print</Button>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2">
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
    </div>
  )
}
