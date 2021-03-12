import 'leaflet/dist/leaflet.css'
import React from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import styles from './Map.module.scss'

interface Props {}

const Map: React.FC<Props> = () => {
    const places = [
        { lat: 43.731026, lng: 7.425535 },
        { lat: 27.9947147, lng: -82.5943645 },
        { lat: 28.4813018, lng: -81.4387899 }
    ]

    return (
        <MapContainer center={places[0]} zoom={13} className={styles.root}>
            <Polyline positions={places} />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={places[0]}>
                <Popup>Destination</Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map
