export type TeamsResponse = {
  teams: Team[]
  teamCountTotal: number
  teamCountPage: number
  pageCurrent: number
  pageTotal: number
}

export type Team = {
  teamNumber: number
  displayTeamNumber: string
  nameFull: string
  nameShort: string
  schoolName: string
  city: string
  stateProv: string
  country: string
  website: string
  rookieYear: number
  robotName: string
  districtCode: string
  homeCMP: string
  homeRegion: string
  displayLocation: string
}
