import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface';
import { Route } from '../../Map/PolyLine/Route';

interface GetAirPollutions {
    airPollutions: number[] | null;
    getAirPollutions: (routes: Route[]) => void;
}

const GET_AIR_POLLUTION_URL: string = `${process.env.REACT_APP_API_URL}/routes/air-pollution`;

export const useGetAirPollution = (): GetAirPollutions => {
    const { authState } = useContext<AuthContextInterface>(AuthContext);

    const [airPollutions, setAirPollutions] = useState<number[] | null>(null);

    const getAirPollutions = useCallback(
        (routes: Route[]) => {
            fetch(GET_AIR_POLLUTION_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authState?.token}`
                },
                body: JSON.stringify(
                    routes.map((route: Route) => ({
                        startLat: route.start.lat,
                        startLon: route.start.long,
                        endLat: route.end.lat,
                        endLon: route.end.long
                    }))
                )
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setAirPollutions(data.map((a: any) => a.pollutionIndex));
                });
        },
        [AuthContext]
    );

    return {
        airPollutions,
        getAirPollutions
    };
};
