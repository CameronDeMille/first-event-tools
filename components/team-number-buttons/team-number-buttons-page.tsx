'use client'

import { ModeToggle } from '../mode-toggle'
import {
  Form as FormProvider,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const eventCodeFormSchema = z.object({
  eventCode: z.string(),
})

const newTeamNumberFormSchema = z.object({
  newTeamNumber: z.string().min(1, { message: 'Required' }),
})

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
  const [buttonScale, setButtonScale] = useState<TeamButtonSizes>(
    TEAM_BUTTON_SCALES['2.25'].size,
  )

  const eventCodeForm = useForm<z.infer<typeof eventCodeFormSchema>>({
    resolver: zodResolver(eventCodeFormSchema),
    defaultValues: {
      eventCode: eventCode ?? '',
    },
  })

  const newTeamNumberForm = useForm<z.infer<typeof newTeamNumberFormSchema>>({
    resolver: zodResolver(newTeamNumberFormSchema),
    defaultValues: {
      newTeamNumber: '',
    },
  })

  const onNewTeamNumberSubmit = (
    values: z.infer<typeof newTeamNumberFormSchema>,
  ) => {
    setTeamNumbers((teamNumbers) => [
      ...teamNumbers,
      Number(values.newTeamNumber),
    ])
    newTeamNumberForm.reset()
  }

  const onEventCodeSubmit = (values: z.infer<typeof eventCodeFormSchema>) => {
    window.location.href = `/?eventCode=${values.eventCode}`
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Card className="h-full m-10 print:hidden border-t-4 border-t-orange-500 rounded-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold justify-between flex items-end gap-2">
            FIRST Tech Challenge Team Buttons
            <div className="shrink-0 flex self-start">
              <ModeToggle />
            </div>
          </CardTitle>
          <CardDescription>
            Designed for Chrome. Set margins in print dialog to either
            &quot;Default&quot; or &quot;None&quot; to get correct print sizing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center flex-col lg:flex-row lg:items-start">
            <div className="flex gap-3 flex-col flex-1 w-full">
              <div className="flex items-end gap-4">
                <FormProvider {...newTeamNumberForm}>
                  <form
                    onSubmit={newTeamNumberForm.handleSubmit(
                      onNewTeamNumberSubmit,
                    )}
                    className="flex flex-row items-center w-full"
                  >
                    <FormField
                      control={newTeamNumberForm.control}
                      name="newTeamNumber"
                      render={({ field }) => (
                        <FormItem className="w-full sm:w-auto">
                          <FormLabel>Enter Team Number</FormLabel>
                          <FormControl>
                            <div className="flex sm:flex-row flex-col gap-4">
                              <Input
                                {...field}
                                type="text"
                                placeholder="12345"
                              />
                              <Button
                                type="submit"
                                disabled={
                                  newTeamNumberForm.formState.isSubmitting ||
                                  !newTeamNumberForm.formState.isDirty
                                }
                              >
                                Add Team
                              </Button>
                              <Button
                                type="button"
                                onClick={() => {
                                  setTeamNumbers((teamNumbers) => [
                                    ...teamNumbers,
                                    Math.min(...teamNumbers) > 0
                                      ? -1
                                      : Math.min(...teamNumbers) - 1,
                                  ])
                                }}
                              >
                                Add Blank
                              </Button>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Team numbers are added one at a time
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </FormProvider>
              </div>
              <div className="flex items-end gap-4">
                <FormProvider {...eventCodeForm}>
                  <form
                    onSubmit={eventCodeForm.handleSubmit(onEventCodeSubmit)}
                    className="flex flex-row items-center w-full"
                  >
                    <FormField
                      control={eventCodeForm.control}
                      name="eventCode"
                      render={({ field }) => (
                        <FormItem className="w-full sm:w-auto">
                          <FormLabel>Enter Event Code</FormLabel>
                          <FormControl>
                            <div className="flex sm:flex-row flex-col gap-4">
                              <Input
                                {...field}
                                type="text"
                                placeholder="FTCCMP1"
                              />
                              <Button
                                type="submit"
                                disabled={
                                  eventCodeForm.formState.isSubmitting ||
                                  !eventCodeForm.formState.isDirty
                                }
                              >
                                Import Teams
                              </Button>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Event codes can be found on{' '}
                            <a
                              className="text-blue-500 underline hover:text-blue-800"
                              target="_blank"
                              rel="noreferrer"
                              href="https://ftc-events.firstinspires.org/"
                            >
                              FTC Events
                            </a>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </FormProvider>
              </div>
              <div className="mb-5 sm:max-w-[185px]">
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
              <div className="min-h-24">
                <ul className="flex gap-1 flex-wrap">
                  {teamNumbers.map((teamNumber, index) => (
                    <Pill
                      onRemove={() => {
                        setTeamNumbers((teamNumbers) =>
                          teamNumbers.filter(
                            (_teamNumber) => _teamNumber != teamNumber,
                          ),
                        )
                      }}
                      key={index}
                    >
                      {teamNumber < 0 ? 'Blank' : teamNumber}
                    </Pill>
                  ))}
                </ul>
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
          <Button className="sm:w-auto w-full" onClick={() => window.print()}>
            🖨️ Print
          </Button>
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
                    {teamNumber < 0 ? '' : teamNumber}
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
