import { Box, styled, Typography } from '@mui/material'
import { useLoadScript } from '@react-google-maps/api'
import React from 'react'

import { AutoComplete, Map } from '@/components'
import { REACT_APP_GOOGLE_MAP_API_KEY } from '@/configs/env'

const SearchContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  position: 'absolute',
  top: theme.spacing(4),
  right: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(2),
  zIndex: 99,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1)
}))

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAP_API_KEY as string
  })

  const AppStyle = {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    zIndex: 1,
  }

  return (
    <Box sx={AppStyle}>
      <SearchContainer>
        <Typography sx={{fontSize: 14, marginBottom: '8px'}}>Search Airports with Name or IATA Code</Typography>
        <AutoComplete id='From_AutoComplete' label='From' />
        <AutoComplete id='To_AutoComplete' label='To' />
      </SearchContainer>
      {isLoaded ? <Map /> : null}
    </Box>
  )
}

export default App
