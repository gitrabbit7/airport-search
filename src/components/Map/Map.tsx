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
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [activeMarker, setActiveMarker] = useState<number>()
    const [flightPath, setFlightPath] = useState<google.maps.Polyline | null>(
      null
    )

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

      if (fromLocation?.position.lat && toLocation?.position.lat) {
        const flightPathCoordinates = [
          fromLocation.position,
          toLocation.position
        ]
        const path = new google.maps.Polyline({
          path: flightPathCoordinates,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        })

        path?.setMap(map)
        setFlightPath(path)
      } else {
        flightPath?.setMap(null)
      }
    }, [fromLocation, toLocation])

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
            animation={google.maps.Animation.BOUNCE}
          >
            {activeMarker === fromLocation?.id ? (
              <InfoWindow>
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
            animation={google.maps.Animation.BOUNCE}
          >
            {activeMarker === toLocation?.id && (
              <InfoWindow>
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
