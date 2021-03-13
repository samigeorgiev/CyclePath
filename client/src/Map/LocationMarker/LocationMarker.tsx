import { DivIcon, LatLng, LocationEvent, Map } from 'leaflet';
import { FunctionComponent, useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

interface Props {
    position: LatLng;
    message: string;
}

export const LocationMarker: FunctionComponent<Props> = (props) => {
    return (
        <Marker
            position={props.position}
            icon={
                new DivIcon({
                    html: `<img src='/images/marker-icon.png' alt='marker'/>`
                })
            }
        >
            <Popup>{props.message}</Popup>
        </Marker>
    );
};
