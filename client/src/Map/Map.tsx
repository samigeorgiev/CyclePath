import { FormControlLabel, Switch, useMediaQuery } from '@material-ui/core';
import {
    LatLng,
    LatLngExpression,
    LatLngLiteral,
    LocationEvent,
    Map as LeafletMap
} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useCallback, useEffect, useState } from 'react';
import { Pane, TileLayer, useMapEvents, ZoomControl } from 'react-leaflet';
import { v4 as uuid } from 'uuid';
import { useGetRoute } from '../hooks/useGetRoute/useGetRoute';
import { AirPollutionArea } from './AirPollutionArea';
import { AirPollutionWrapper } from './AirPollutionArea/AirPollutionWrapper';
import { LocationMarker } from './LocationMarker';
import { PolyLine } from './PolyLine';
import { Route } from './PolyLine/Route';
import styles from './Map.module.scss';
import { SiTailwindcss } from 'react-icons/si';

interface Props {
    destination: LatLngLiteral | null;
}

export const Map: React.FC<Props> = (props) => {
    const { getRoute, routes } = useGetRoute();

    const [position, setPosition] = useState<LatLngLiteral | null>(null);

    const [visible, setVisible] = useState<boolean>(false);

    const [shouldReload, setShouldReload] = useState<boolean>(true);

    const matches = useMediaQuery('(min-width:600px)');

    const forceReload = useCallback(() => {
        setShouldReload(true);
    }, []);

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
        if (props.destination && position && shouldReload) {
            getRoute(
                [position.lat, position.lng],
                [props.destination.lat, props.destination.lng]
            );
            map.fitBounds([
                [position.lat, position.lng],
                [props.destination.lat, props.destination.lng]
            ]);
            setShouldReload(false);
        }
    }, [props.destination, shouldReload]);

    return (
        <>
            <FormControlLabel
                control={
                    <Switch
                        checked={visible}
                        onChange={() => {
                            setVisible((v) => !v);
                        }}
                        name='air-toggle'
                        color='primary'
                    />
                }
                label={matches ? 'Air Pollution' : <SiTailwindcss className={styles.wind}/>}
                className={styles.toggle}
            />
            {routes?.map((route: Route) => (
                <PolyLine
                    key={uuid()}
                    route={route}
                    forceReload={forceReload}
                />
            ))}
            <Pane style={{ zIndex: 399 }} name='air-polution'>
                {routes && (
                    <AirPollutionWrapper routes={routes} visible={visible} />
                )}
            </Pane>
            <TileLayer
                zIndex={-100}
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
