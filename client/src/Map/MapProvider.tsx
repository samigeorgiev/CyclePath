import { Icon, InputAdornment, TextField } from '@material-ui/core'
import {
    LatLng,
    LatLngLiteral,
    LocationEvent,
    Map as LeafletMap
} from 'leaflet'
import React, { useEffect, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { useMapEvents } from 'react-leaflet'
import { Map } from './Map'
import styles from './Map.module.scss'

interface Props {}

const MAPS_API_URL: string =
    'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'

export const MapProvider: React.FC<Props> = (props) => {
    const [position, setPosition] = useState<LatLngLiteral | null>(null)
    const [destination, setDestination] = useState<LatLng | null>(null)
    const [search, setSearch] = useState<string>('')

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

    const getDestinationFromSearch = async () => {
        if (!search.trim() || !position) return

        const inputType = 'inputtype=textquery'
        const locationBias = `locationbias=circle:2000@${position?.lat},${position?.lng}`
        const fields = 'fields=formatted_address,geometry'
        const apiKey = `key=${process.env.REACT_APP_MAPS_KEY}`

        const searchQuery: string = `input=${search.split(' ').join('+')}`

        const res = await fetch(
            `${MAPS_API_URL}?${searchQuery}&${inputType}&${locationBias}&${fields}&${apiKey}`
        )
        console.log(res)
        if (!res.ok) return
        const data = await res.json()
        if (destination?.equals(data.results[0].geometry.location)) return

        setDestination(data.results[0].geometry.location)
    }

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    getDestinationFromSearch()
                }}
            >
                <TextField
                    id='input-with-icon-textfield'
                    value={search}
                    variant='outlined'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearch(e.target.value)
                    }}
                    fullWidth
                    className={styles.search}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Icon
                                    color='primary'
                                    component={HiOutlineSearch}
                                />
                            </InputAdornment>
                        )
                    }}
                />
            </form>

            <Map destination={destination} position={position} />
        </>
    )
}
