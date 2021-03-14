import {
    LatLng,
    LatLngExpression,
    LatLngLiteral,
    LocationEvent,
    Map as LeafletMap
} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { Pane, TileLayer, useMapEvents, ZoomControl } from 'react-leaflet';
import { v4 as uuid } from 'uuid';
import { useGetRoute } from '../hooks/useGetRoute/useGetRoute';
import { AirPollutionArea } from './AirPollutionArea';
import { LocationMarker } from './LocationMarker';
import { PolyLine } from './PolyLine';
import { Route } from './PolyLine/Route';

interface Props {
    destination: LatLngLiteral | null;
}

export const Map: React.FC<Props> = (props) => {
    const { getRoute, routes } = useGetRoute();

    const [position, setPosition] = useState<LatLngLiteral | null>(null);

    const map: LeafletMap = useMapEvents({
        locationfound(event: LocationEvent) {
            // setPosition(event.latlng);
            setPosition({ lat: 43.73429996534598, lng: 7.418578619024726 });
            map.flyTo(
                { lat: 43.73429996534598, lng: 7.418578619024726 },
                map.getZoom(),
                { duration: 1 }
            );
        }
    });

    useEffect(() => {
        map.locate();
    }, []);

    useEffect(() => {
        if (props.destination && position) {
            console.log('success');
            getRoute(
                [position.lat, position.lng],
                [props.destination.lat, props.destination.lng]
            );
            map.fitBounds([
                [position.lat, position.lng],
                [props.destination.lat, props.destination.lng]
            ]);
        }
    }, [props.destination]);

    return (
        <>
            <Pane name='custom' style={{ zIndex: 10000 }}>
                {routes?.map((route: Route) => (
                    <PolyLine key={uuid()} route={route} />
                ))}
            </Pane>
            {routes?.map((route: Route) => (
                <AirPollutionArea key={uuid()} route={route} />
            ))}
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <LocationMarker message='Current location' position={position} />
            <LocationMarker
                message='Destination'
                position={props.destination}
            />
        </>
    );
};
