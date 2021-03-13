import React, { FunctionComponent } from 'react';
import { Polyline, Popup } from 'react-leaflet';
import { useRateRoute } from '../../hooks/useRateRoute/useRateRoute';
import { Route } from './Route';

interface Props {
    route: Route;
}

export const PolyLine: FunctionComponent<Props> = ({ route }) => {
    const rateRoute = useRateRoute();

    return (
        <Polyline positions={[route.start, route.end]}>
            <Popup>
                <p>add rating</p>
                {new Array(5).fill(1).map((_, i) => (
                    <button key={i}>{i + 1}</button>
                ))}
                <p></p>
                <button
                    onClick={() => {
                        rateRoute({
                            nodeOneId: 7271008793,
                            nodeTwoId: 1684697691,
                            rating: 3
                        });
                    }}
                >
                    Submit
                </button>
            </Popup>
        </Polyline>
    );
};
