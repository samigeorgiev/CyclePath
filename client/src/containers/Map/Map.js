import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './Map.css';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const MapContainer = (props) => {
  return (
    <div className="MapContainer">
      <Map
        google={props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: 37.090240,
            lng: -95.712891
          }
        }
      />
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCw_TCGtabbNofC-_WTwyAaRuq7RfZ6Knk'
})(MapContainer);