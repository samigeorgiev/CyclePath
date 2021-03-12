/* global google */
import React, { useEffect, useState } from 'react'
import { DirectionsRenderer } from "react-google-maps";

const MapDirectionsRenderer = props => {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { places } = props;
    
    const waypoints = places.map(p =>({
        location: {lat: p.latitude, lng:p.longitude},
        stopover: true
    }))
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: 'BICYCLING',
        waypoints: waypoints
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          setError(result)
        }
      }
    );
  }, [props])

  if (error) {
    return <div>{error}</div>;
  }
  return directions && <DirectionsRenderer directions={directions} />
}

export default MapDirectionsRenderer;