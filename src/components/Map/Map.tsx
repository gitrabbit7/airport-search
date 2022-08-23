import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api'
import { FC, memo, useEffect, useState } from 'react'

import { IMarker } from '@/types'

export interface IMapProps {
  /**
   * Information of FROM Marker
   */
  fromLocation: IMarker | undefined
  /**
   * Information of TO Marker
   */
  toLocation: IMarker | undefined
}

const defaultPosition = {
  lat: 48.856389,
  lng: 2.352222
}

export const Map: FC<IMapProps> = memo(
  ({ fromLocation, toLocation }: IMapProps) => {
    const [map, setMap] = useState<google.maps.Map>()
    const [activeMarker, setActiveMarker] = useState<number>()

    useEffect(() => {
      const bounds = new google.maps.LatLngBounds()

      if (fromLocation?.position.lat && fromLocation?.position.lng) {
        bounds.extend(fromLocation?.position)
        map?.fitBounds(bounds)
      }

      if (toLocation?.position.lat && toLocation?.position.lng) {
        bounds.extend(toLocation?.position)
        map?.fitBounds(bounds)
      }
    }, [fromLocation, toLocation])

    const handleActiveMarker = (id: number) => {
      if (id !== activeMarker) {
        setActiveMarker(id)
      }
    }

    const handleOnLoad = (mapIns: google.maps.Map) => {
      mapIns.setOptions({
        maxZoom: 8
      })
      setMap(mapIns)
    }

    return (
      <GoogleMap
        onLoad={handleOnLoad}
        center={defaultPosition}
        zoom={3}
        onClick={() => setActiveMarker(-1)}
        mapContainerStyle={{ width: '100vw', height: '100vh' }}
      >
        {fromLocation?.position.lat && fromLocation.position.lng && (
          <Marker
            position={fromLocation?.position}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }}
            onClick={() => handleActiveMarker(fromLocation?.id)}
          >
            {activeMarker === fromLocation?.id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(-1)}>
                <div>{fromLocation.name}</div>
              </InfoWindow>
            ) : null}
          </Marker>
        )}
        {toLocation?.position.lat && toLocation.position.lng && (
          <Marker
            position={toLocation?.position}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }}
            onClick={() => handleActiveMarker(toLocation?.id)}
          >
            {activeMarker === toLocation?.id && (
              <InfoWindow onCloseClick={() => setActiveMarker(-1)}>
                <div>{toLocation?.name}</div>
              </InfoWindow>
            )}
          </Marker>
        )}
      </GoogleMap>
    )
  }
)

Map.displayName = 'Map'

export default Map
