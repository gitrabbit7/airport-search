/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AutocompleteValue } from '@mui/material'
import { useCallback, useState } from 'react'

import { IAirport } from '@/types'
import { getAirports, getSingleAirPort } from '@/utils/airport'

const InitialAirPortValue = {
  label: '',
  name: '',
  city: '',
  iata: '',
  country: {
    name: '',
    iso: ''
  },
  state: {
    name: '',
    abbr: ''
  },
  latitude: '',
  longitude: ''
}

export const useGetAirports = () => {
  const [term, setTerm] = useState('')
  const [airports, setAirports] = useState<IAirport[]>([])
  const [singleAirport, setSingleAirport] =
    useState<IAirport>(InitialAirPortValue)
  const [timer, setTimer] = useState<NodeJS.Timeout>()

  const fetchAirports = useCallback(
    async (keyword: string) => {
      const response = await getAirports(keyword)
      setAirports(
        response.status ? (response.data?.airports as IAirport[]) ?? [] : []
      )
    },
    [getAirports]
  )

  const fetchSingleAirport = useCallback(
    async (iata: string) => {
      const response = await getSingleAirPort(iata)
      setSingleAirport(
        response.status
          ? (response.data?.airport as IAirport) ?? InitialAirPortValue
          : InitialAirPortValue
      )
    },
    [getSingleAirPort]
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const keyword = e.target.value
    setTerm(keyword)
    if (keyword?.length) {
      clearTimeout(timer)
      const newTimer = setTimeout(() => {
        fetchAirports(keyword)
      }, 500)
      setTimer(newTimer)
    } else {
      setAirports([])
    }
  }

  const handleAutomCompleteChange = (
    e: React.SyntheticEvent,
    value: AutocompleteValue<IAirport, false, false, false>
  ) => {
    e.preventDefault()
    if (!value) setAirports([])
    const iata = value?.iata as string
    fetchSingleAirport(iata)
  }

  return {
    term,
    singleAirport,
    airports,
    handleInputChange,
    handleAutomCompleteChange
  }
}
