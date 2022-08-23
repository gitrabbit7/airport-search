import { GoogleMap, InfoWindow, MarkerF } from '@react-google-maps/api'
import { FC, memo, useState } from 'react'

const markers = [
  {
    id: 1,
    name: 'Chicago, Illinois',
    position: { lat: 41.881832, lng: -87.623177 }
  },
  {
    id: 2,
    name: 'Denver, Colorado',
    position: { lat: 39.739235, lng: -104.99025 }
  },
  {
    id: 3,
    name: 'Los Angeles, California',
    position: { lat: 34.052235, lng: -118.243683 }
  },
  {
    id: 4,
    name: 'New York, New York',
    position: { lat: 40.712776, lng: -74.005974 }
  },
  {
    id: 5,
    name: 'New York, New York',
    position: { lat: -40.712776, lng: 74.005974 }
  }
]

// export interface IMapProps {}

export const Map: FC = memo(() => {
  const [activeMarker, setActiveMarker] = useState<number>()

  const handleActiveMarker = (id: number) => {
    if (id === activeMarker) {
      return
    }
    setActiveMarker(id)
  }

  const handleOnLoad = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds()
    markers.forEach(({ position }) => bounds.extend(position))
    map.fitBounds(bounds)
  }

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(-1)}
      mapContainerStyle={{ width: '100vw', height: '100vh' }}
    >
      {markers.map(({ id, name, position }) => (
        <MarkerF
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(-1)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </MarkerF>
      ))}
    </GoogleMap>
  )
})

Map.displayName = 'Map'

export default Map
