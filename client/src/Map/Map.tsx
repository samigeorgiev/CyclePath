import {
    DivIcon,
    LatLng,
    LatLngExpression,
    LocationEvent,
    Map as LMap
} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import {
    Marker,
    Polyline,
    Popup,
    TileLayer,
    useMapEvents
} from 'react-leaflet';
import { LocationMarker } from './LocationMarker';

interface Props {
    destination: LatLng | null;
}

// const apiUrl = `${process.env.REACT_APP_API_URL}/route?start=${start}&end=${end}`

export const Map: React.FC<Props> = (props) => {
    const [edges] = useState<LatLngExpression[]>([]);

    const [position, setPosition] = useState<LatLng | null>(null);

    const map: LMap = useMapEvents({
        locationfound(event: LocationEvent) {
            setPosition(event.latlng);
            map.flyTo(event.latlng, map.getZoom(), { duration: 1 });
        }
    });

    useEffect(() => {
        map.locate();
    }, []);

    useEffect(() => {
        if (props.destination && position) {
            map.fitBounds([
                [position.lat, position.lng],
                [props.destination.lat, props.destination.lng]
            ]);
        }
    }, [props.destination]);

    return (
        <>
            {edges.map((e, i) => {
                if (i === edges.length - 1) return;

                return (
                    <Polyline key={i} positions={[e, edges[i + 1]]}>
                        <Popup>
                            <p>add rating</p>
                            {new Array(5).fill(1).map((_, i) => (
                                <button key={i}>{i + 1}</button>
                            ))}
                            <p></p>
                            <button
                                onClick={() => {
                                    console.log(e, edges[i + 1]);
                                }}
                            >
                                Submit
                            </button>
                        </Popup>
                    </Polyline>
                );
            })}

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {position && (
                <LocationMarker
                    message='Current location'
                    position={position}
                />
            )}

            {props.destination && position && (
                <>
                    <LocationMarker
                        message='Destination'
                        position={props.destination}
                    />

                    <Polyline positions={[position, props.destination]}>
                        <Popup>
                            <p>add rating</p>
                            {new Array(5).fill(1).map((_, i) => (
                                <button key={i}>{i + 1}</button>
                            ))}
                            <p></p>
                            <button onClick={() => {}}>Submit</button>
                        </Popup>
                    </Polyline>
                </>
            )}
        </>
    );
};
