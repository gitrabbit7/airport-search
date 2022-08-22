import {
  Autocomplete as MuiAutocomplete,
  styled,
  TextField
} from '@mui/material'
import React, { FC, memo, useEffect, useState } from 'react'

import { useGetAirports } from '@/hooks'
import { IAirport } from '@/types'

export interface IAutoCompleteProps {
  /**
   * AutoComplete Component ID
   */
  id: string
  /**
   * Autocomplete Label
   */
  label: string
}

const CustomAutoComplete = styled(MuiAutocomplete)(() => ({
  '& .MuiChip-root': {
    borderRadius: '4px',
    background: 'transparent'
  }
}))

export const AutoComplete: FC<IAutoCompleteProps> = memo(
  ({ label = '', ...props }: IAutoCompleteProps) => {
    const { airports, handleInputChange } = useGetAirports()
    const [availableAirports, setAvailableAirports] = useState<IAirport[]>([])

    useEffect(() => {
      airports.forEach(function (airport) {
        airport.label = airport.name + ', ' + airport.iata
      })

      setAvailableAirports(airports)
    }, [airports])

    return (
      <CustomAutoComplete
        {...props}
        disablePortal
        options={availableAirports ?? []}
        sx={{ width: 300 }}
        renderInput={params => (
          <TextField {...params} onChange={handleInputChange} label={label} />
        )}
      />
    )
  }
)

AutoComplete.displayName = 'AutoComplete'

export default AutoComplete
