import { useCallback } from 'react';
import { RateRouteDto } from './RateRouteDto';

const RATE_ROUTE_URL: string = `${process.env.REACT_APP_API_URL}/routes/rate`;

export const useRateRoute = (): ((rateRouteDto: RateRouteDto) => void) => {
    const rateRoute = useCallback((rateRouteDto: RateRouteDto) => {
        fetch(RATE_ROUTE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rateRouteDto)
        });
    }, []);

    return rateRoute;
};
