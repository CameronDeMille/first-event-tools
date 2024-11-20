import { TeamsResponse } from './types'

export const fetchTeamsByEvent = async (eventCode: string) => {
  console.log('Test42 fetching teams')

  const username = ''
  const password = ''

  const headers = new Headers()

  headers.set('Authorization', 'Basic ' + btoa(username + ':' + password))

  const response = await fetch(
    `http://ftc-api.firstinspires.org/v2.0/2024/teams?eventCode=${eventCode}`,
    {
      method: 'GET',
      headers,
    },
  )
  console.log('Test42 response', response)

  if (response.ok) {
    const data: TeamsResponse = await response.json()

    return data.teams
  }

  throw new Error('Failed to fetch data.')
}
