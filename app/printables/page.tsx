'use server'

import { fetchQueryTeamsByEvent } from '@/api/team-number-button/queries'
import { Team } from '@/api/team-number-button/types'
import TeamNumberButtonsPage from '@/components/team-number-buttons/team-number-buttons-page'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

type Params = Promise<{
  eventCode: string
}>

export default async function Page({ searchParams }: { searchParams: Params }) {
  const queryClient = new QueryClient()

  const { eventCode } = await searchParams

  let teams: Team[] = []

  if (eventCode) {
    teams = await fetchQueryTeamsByEvent(queryClient, eventCode)
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeamNumberButtonsPage eventCode={eventCode} teams={teams} />
    </HydrationBoundary>
  )
}
