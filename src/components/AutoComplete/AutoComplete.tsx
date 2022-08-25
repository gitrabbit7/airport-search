import {
  Autocomplete as MuiAutocomplete,
  styled,
  TextField
} from '@mui/material'
import React, { FC, memo, useEffect, useState } from 'react'

import { useGetAirports, useToast } from '@/hooks'
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
      isLoading,
      term,
      airports,
      singleAirport,
      handleInputChange,
      handleAutomCompleteChange
    } = useGetAirports()
    const [availableAirports, setAvailableAirports] = useState<IAirport[]>([])
    const { showToast } = useToast()

    useEffect(() => {
      if (term.length > 2) {
        if (airports.length) {
          airports.forEach(function (airport) {
            airport.label = airport.name + ', ' + airport.iata
          })
          setAvailableAirports(airports)
        } else {
          showToast({
            type: 'warning',
            message: 'No results found for search term.'
          })
          setAvailableAirports([])
        }
      } else {
        setAvailableAirports([])
      }
    }, [airports])

    useEffect(() => {
      handleAutoCompleteChanged(singleAirport)
    }, [singleAirport])

    return (
      <CustomAutoComplete
        loading={isLoading}
        {...props}
        disablePortal
        options={availableAirports}
        sx={{ width: 300 }}
        filterOptions={option => {
          return option
        }}
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
