import React from 'react'
import Map from './Map/Map';

const googleMapsApiKey = "AIzaSyCw_TCGtabbNofC-_WTwyAaRuq7RfZ6Knk";

const MapContainer = () => {

  const places = [
    {latitude: 25.8103146, longitude: -80.1751609},
    {latitude: 27.9947147, longitude: -82.5943645},
    {latitude: 28.4813018, longitude: -81.4387899}
  ]
  
  return (
    <div>
      <Map
        googleMapURL={
        'https://maps.googleapis.com/maps/api/js?key=' +
        googleMapsApiKey +
        '&libraries=geometry,drawing,places'
        }
        markers={places}
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div style={{height: "80vh"}}/>}
        mapElement={<div style={{height: `100%`}}/>}
        defaultCenter={{lat: 25.798939, lng: -80.291409}}
      />
    </div>
  );
}

export default MapContainer;