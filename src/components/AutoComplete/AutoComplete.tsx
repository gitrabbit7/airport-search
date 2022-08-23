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
  /**
   * Function Fired when the FROM AutoComplete changed
   */
  handleAutoCompleteChanged: (autoCompleteNameairport: IAirport) => void
}

const CustomAutoComplete = styled(MuiAutocomplete<IAirport>)(() => ({
  '& .MuiChip-root': {
    borderRadius: '4px',
    background: 'transparent'
  }
}))

export const AutoComplete: FC<IAutoCompleteProps> = memo(
  ({ label = '', handleAutoCompleteChanged, ...props }: IAutoCompleteProps) => {
    const {
      term,
      airports,
      singleAirport,
      handleInputChange,
      handleAutomCompleteChange
    } = useGetAirports()
    const [availableAirports, setAvailableAirports] = useState<IAirport[]>([])

    useEffect(() => {
      airports.forEach(function (airport) {
        airport.label = airport.name + ', ' + airport.iata
      })
      setAvailableAirports(airports)
    }, [airports])

    useEffect(() => {
      handleAutoCompleteChanged(singleAirport)
    }, [singleAirport])

    return (
      <CustomAutoComplete
        loading={term.length > 2 ? true : false}
        {...props}
        disablePortal
        options={availableAirports ?? []}
        sx={{ width: 300 }}
        onChange={handleAutomCompleteChange}
        renderInput={params => (
          <TextField {...params} onChange={handleInputChange} label={label} />
        )}
      />
    )
  }
)

AutoComplete.displayName = 'AutoComplete'

export default AutoComplete
