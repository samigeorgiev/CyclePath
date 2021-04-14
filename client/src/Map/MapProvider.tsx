import { TextField } from '@material-ui/core'
import { LatLngLiteral, LocationEvent, Map as LeafletMap } from 'leaflet'
import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState
} from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { useMapEvents } from 'react-leaflet'
import { useDestinationSearch } from '../hooks/useDestinationSearch/useDestinationSearch'
import { Map } from './Map'
import styles from './Map.module.scss'

interface Props {}

export const MapProvider: FunctionComponent<Props> = (props) => {
    const [position, setPosition] = useState<LatLngLiteral | null>(null)
    const { destination, getDestinationFromSearch } = useDestinationSearch(
        position
    )

    const [search, setSearch] = useState<string>('')

    const searchChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value)
        },
        []
    )

    const map: LeafletMap = useMapEvents({
        locationfound(event: LocationEvent) {
            // setPosition(event.latlng);
            setPosition({ lat: 43.73429996534598, lng: 7.418578619024726 })
            map.flyTo(
                { lat: 43.73429996534598, lng: 7.418578619024726 },
                map.getZoom(),
                { duration: 1 }
            )
        }
    })

    useEffect(() => {
        map.locate()
        const pane = map.createPane('popup')

        pane.style.zIndex = '600'
    }, [])

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
            <Map destination={destination} position={position} />
        </>
    )
}
