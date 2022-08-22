/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useCallback, useState } from 'react'

import { IAirport } from '@/types'
import { getAirports } from '@/utils/airport'

export const useGetAirports = () => {
  const [airports, setAirports] = useState<IAirport[]>([])
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const keyword = e.target.value
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

  return {
    airports,
    handleInputChange
  }
}
