import { LatLngExpression } from 'leaflet';
import { FunctionComponent, useCallback, useState } from 'react';
import { MapContainer } from 'react-leaflet';
import { useDestinationSearch } from '../hooks/useDestinationSearch/useDestinationSearch';
import { Map } from './Map';
import styles from './Map.module.scss';

interface Props {}

const defaultLocation: LatLngExpression = {
    lat: 37.3347986,
    lng: -122.0091069
};

export const MapProvider: FunctionComponent<Props> = (props) => {
    const { destination, getDestinationFromSearch } = useDestinationSearch();

    const [search, setSearch] = useState<string>('');

    const searchChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
        },
        []
    );

    return (
        <>
            <input type='text' value={search} onChange={searchChangeHandler} />
            <button onClick={() => getDestinationFromSearch(search)}>
                Search
            </button>
            <MapContainer
                center={defaultLocation}
                zoom={15}
                className={styles.root}
            >
                <Map destination={destination} />
            </MapContainer>
        </>
    );
};
