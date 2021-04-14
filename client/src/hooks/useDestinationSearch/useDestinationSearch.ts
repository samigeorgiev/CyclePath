import { LatLng, LatLngLiteral } from 'leaflet'
import { useCallback, useState } from 'react'

interface UseDestinationSearch {
    destination: LatLngLiteral | null
    getDestinationFromSearch: (search: string) => void
}

const MAPS_API_URL: string =
    'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'

export const useDestinationSearch = (
    userLocation: LatLngLiteral | null
): UseDestinationSearch => {
    const inputType = 'inputtype=textquery'
    const locationBias = `locationbias=circle:2000@${userLocation?.lat},${userLocation?.lng}`
    const fields = 'fields=formatted_address,geometry'
    const apiKey = `key=${process.env.REACT_APP_MAPS_KEY}`

    const [destination, setDestination] = useState<LatLng | null>(null)

    const getDestinationFromSearch = useCallback((search: string) => {
        if (!search.trim() || !userLocation) {
            return
        }

        const searchQuery: string = `input=${search.split(' ').join('+')}`

        fetch(
            `${MAPS_API_URL}?${searchQuery}&${inputType}&${locationBias}&${fields}&${apiKey}`
        )
            .then((res: Response) => res.json())
            .then((data) => {
                if (data.status !== 'OK') {
                    return
                }

                if (destination?.equals(data.results[0].geometry.location)) {
                    return
                }

                setDestination(data.results[0].geometry.location)
            })
    }, [])

    return {
        destination,
        getDestinationFromSearch
    }
}
