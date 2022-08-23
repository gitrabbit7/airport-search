import { ICountry, IState } from 'src/types'

export interface IAirport {
  label: string
  name: string
  city: string
  iata: string
  country: ICountry
  state: IState
  latitude: string
  longitude: string
}
