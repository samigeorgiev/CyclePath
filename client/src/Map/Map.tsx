import { LatLng, LocationEvent, Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { TileLayer, useMapEvents } from 'react-leaflet';
import { v4 as uuid } from 'uuid';
import { AirPollutionArea } from './AirPollutionArea';
import { LocationMarker } from './LocationMarker';
import { PolyLine } from './PolyLine';
import { Route } from './PolyLine/Route';

interface Props {
    destination: LatLng | null;
}

export const Map: React.FC<Props> = (props) => {
    const [routes, setRoutes] = useState<Route[]>([]);

    const [position, setPosition] = useState<LatLng | null>(null);

    const map: LeafletMap = useMapEvents({
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
            setRoutes([
                {
                    start: [position.lat, position.lng],
                    end: [props.destination.lat, props.destination.lng],
                    rating: 2
                }
            ]);
            map.fitBounds([
                [position.lat, position.lng],
                [props.destination.lat, props.destination.lng]
            ]);
        }
    }, [props.destination]);

    return (
        <>
            {routes.map((route: Route, i) => (
                <div key={uuid()}>
                    <PolyLine route={route} />
                    <AirPollutionArea route={route} />
                </div>
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
