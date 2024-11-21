import { TeamsResponse } from './types'

export const fetchTeamsByEvent = async (eventCode: string) => {
  const username = process.env.FTC_API_USERNAME
  const password = process.env.FTC_API_PASSWORD

  const headers = new Headers()

  headers.set('Authorization', 'Basic ' + btoa(username + ':' + password))

  const response = await fetch(
    `https://ftc-api.firstinspires.org/v2.0/2024/teams?eventCode=${eventCode}`,
    {
      method: 'GET',
      headers,
    },
  )

  if (response.ok) {
    const data: TeamsResponse = await response.json()

    return data.teams
  }

  throw new Error('Failed to fetch data.')
}
