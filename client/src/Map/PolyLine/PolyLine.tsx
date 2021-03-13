import React, { FunctionComponent, useState } from 'react';
import { Polyline, Popup } from 'react-leaflet';
import { useRateRoute } from '../../hooks/useRateRoute/useRateRoute';
import { Route } from './Route';

interface Props {
    route: Route;
}

const ratingColorMap = new Map<number, string>([
    [1, 'red'],
    [2, 'orange'],
    [3, 'yellow'],
    [4, 'green'],
    [5, 'lime']
]);

export const PolyLine: FunctionComponent<Props> = ({ route }) => {
    const rateRoute = useRateRoute();

    const [rating, setRating] = useState<number>(1);

    return (
        <Polyline
            color={ratingColorMap.get(route.rating)}
            positions={[route.start, route.end]}
        >
            <Popup>
                <p>add rating</p>
                {new Array(5).fill(1).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setRating(i + 1);
                        }}
                        style={{
                            backgroundColor: i + 1 <= rating ? 'red' : 'blue',
                            fontSize: '1.5rem',
                            padding: '0.7rem'
                        }}
                    >
                        {i + 1}
                    </button>
                ))}
                <p></p>
                <button
                    onClick={() => {
                        rateRoute({
                            nodeOneId: 7271008793,
                            nodeTwoId: 1684697691,
                            rating
                        });
                    }}
                >
                    Submit
                </button>
            </Popup>
        </Polyline>
    );
};
