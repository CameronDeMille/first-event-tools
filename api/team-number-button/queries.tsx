import { fetchTeamsByEvent } from './fetchers'
import { QueryClient, useQuery } from '@tanstack/react-query'

const QueryKeys = {
  TEAMS: 'teams',
} as const

export const useTeamsByEvent = (eventCode: string) =>
  useQuery({
    queryKey: [QueryKeys.TEAMS, eventCode],
    queryFn: () => fetchTeamsByEvent(eventCode),
  })

export const prefetchTeamsByEvent = async (
  queryClient: QueryClient,
  eventCode: string,
) =>
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.TEAMS, eventCode],
    queryFn: () => fetchTeamsByEvent(eventCode),
  })

export const fetchQueryTeamsByEvent = async (
  queryClient: QueryClient,
  eventCode: string,
) =>
  await queryClient.fetchQuery({
    queryKey: [QueryKeys.TEAMS, eventCode],
    queryFn: () => fetchTeamsByEvent(eventCode),
  })
