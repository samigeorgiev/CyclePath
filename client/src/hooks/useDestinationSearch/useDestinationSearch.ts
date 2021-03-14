import { LatLng, LatLngLiteral } from 'leaflet';
import { useCallback, useState } from 'react';

interface UseDestinationSearch {
    destination: LatLngLiteral | null;
    getDestinationFromSearch: (search: string) => void;
}

const MAPS_API_URL: string =
    'https://maps.googleapis.com/maps/api/geocode/json?address=';

const keyQuery: string = `&key=${process.env.REACT_APP_MAPS_KEY}`;

export const useDestinationSearch = (): UseDestinationSearch => {
    const [destination, setDestination] = useState<LatLng | null>(null);

    const getDestinationFromSearch = useCallback((search: string) => {
        if (!search.trim()) {
            return;
        }

        const searchForQuery: string = search.split(' ').join('+');

        fetch(MAPS_API_URL + searchForQuery + keyQuery)
            .then((res: Response) => res.json())
            .then((data) => {
                if (data.status !== 'OK') {
                    return;
                }

                if (destination?.equals(data.results[0].geometry.location)) {
                    return;
                }

                setDestination(data.results[0].geometry.location);
            });
    }, []);

    return {
        destination,
        getDestinationFromSearch
    };
};
