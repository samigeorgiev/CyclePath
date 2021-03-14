import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';
import { AuthContextInterface } from '../../context/Auth/AuthContext.interface';
import { Route } from '../../Map/PolyLine/Route';

interface GetAirPollution {
    airPollution: number | null;
    getAirPollution: (route: Route) => void;
}

const GET_AIR_POLLUTION_URL: string = `${process.env.REACT_APP_API_URL}/routes/air-pollution`;

export const useGetAirPollution = (): GetAirPollution => {
    const { authState } = useContext<AuthContextInterface>(AuthContext);

    const [airPollution, setAirPollution] = useState<number | null>(null);

    const getAirPollution = useCallback(
        (route: Route) => {
            fetch(GET_AIR_POLLUTION_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authState?.token}`
                },
                body: JSON.stringify({
                    startLat: route.start.lat,
                    startLon: route.start.long,
                    endLat: route.end.lat,
                    endLon: route.end.long
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setAirPollution(data.pollutionIndex);
                });
        },
        [AuthContext]
    );

    return {
        airPollution,
        getAirPollution
    };
};
