import { prefetchTeamsByEvent } from '@/api/team-number-button/queries'
import TeamNumberButtonsPage from '@/components/team-number-buttons/team-number-buttons-page'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

type Params = {
  eventCode: string
}

export const Page = async ({ searchParams }: { searchParams: Params }) => {
  const queryClient = new QueryClient()

  await prefetchTeamsByEvent(queryClient, searchParams.eventCode)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeamNumberButtonsPage eventCode={searchParams.eventCode} />
    </HydrationBoundary>
  )
}

export default Page
