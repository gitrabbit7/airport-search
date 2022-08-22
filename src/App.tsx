import React from 'react'

import { AutoComplete } from '@/components'

function App() {
  const AppStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  }

  return (
    <div style={AppStyle}>
      <AutoComplete id='From_AutoComplete' label='From' />
      <AutoComplete id='To_AutoComplete' label='To' />
    </div>
  )
}

export default App
