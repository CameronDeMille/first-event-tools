import { fetchQueryTeamsByEvent } from '@/api/team-number-button/queries'
import { Team } from '@/api/team-number-button/types'
import TeamNumberButtonsPage from '@/components/team-number-buttons/team-number-buttons-page'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

type Params = {
  eventCode: string
}

export default async function Page({ searchParams }: { searchParams: Params }) {
  const queryClient = new QueryClient()

  let teams: Team[] = []

  if (searchParams.eventCode) {
    teams = await fetchQueryTeamsByEvent(queryClient, searchParams.eventCode)
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeamNumberButtonsPage eventCode={searchParams.eventCode} teams={teams} />
    </HydrationBoundary>
  )
}
