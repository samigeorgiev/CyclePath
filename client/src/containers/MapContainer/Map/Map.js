/* global google */
import React, { useState } from 'react';
import { compose, withProps } from 'recompose';
import './Map.css';
import MapDirectionsRenderer from '../../../components/Map/MapDirectionRenderer/MapDirectionsRenderer';
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker
} from "react-google-maps";

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
    >
      {props.markers.map((marker, index) => {
        const position = { lat: marker.latitude, lng: marker.longitude };
        return <Marker key={index} position={position} />;
      })}
      <MapDirectionsRenderer
        places={props.markers}
        travelMode={google.maps.TravelMode.DRIVING}
      />
    </GoogleMap>
  ))
);

export default Map;