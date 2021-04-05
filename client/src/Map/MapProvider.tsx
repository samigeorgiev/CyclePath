import { TextField } from '@material-ui/core'
import { LatLngExpression } from 'leaflet'
import { FunctionComponent, useCallback, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { MapContainer } from 'react-leaflet'
import { useDestinationSearch } from '../hooks/useDestinationSearch/useDestinationSearch'
import { Map } from './Map'
import styles from './Map.module.scss'

interface Props {}

const defaultLocation: LatLngExpression = {
    lat: 37.3347986,
    lng: -122.0091069
}

export const MapProvider: FunctionComponent<Props> = (props) => {
    const { destination, getDestinationFromSearch } = useDestinationSearch()

    const [search, setSearch] = useState<string>('')

    const searchChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value)
        },
        []
    )

    return (
        <>
            <TextField
                id='input-with-icon-textfield'
                value={search}
                variant='outlined'
                onChange={searchChangeHandler}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        getDestinationFromSearch(search)
                    }
                }}
                fullWidth
                className={styles.search}
                InputProps={{
                    startAdornment: <HiOutlineSearch />
                }}
            />
            <MapContainer
                center={defaultLocation}
                zoom={15}
                className={styles.root}
                zoomControl={false}
            >
                <Map destination={destination} />
            </MapContainer>
        </>
    )
}
