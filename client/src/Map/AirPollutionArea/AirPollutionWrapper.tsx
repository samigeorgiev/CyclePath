import React, { FunctionComponent, useEffect } from 'react';
import { useGetAirPollution } from '../../hooks/useGetAirPollution/useGetAirPollution';
import { Route } from '../PolyLine/Route';
import { AirPollutionArea } from './AirPollutionArea';
import { v4 as uuid } from 'uuid';

interface Props {
    routes: Route[];
}

export const AirPollutionWrapper: FunctionComponent<Props> = ({ routes }) => {
    const { airPollutions, getAirPollutions } = useGetAirPollution();

    useEffect(() => {
        getAirPollutions(routes);
    }, [routes]);

    if (!airPollutions || !routes) {
        return null;
    }

    return (
        <>
            {routes?.map((route: Route, index: number) => (
                <AirPollutionArea
                    key={uuid()}
                    route={route}
                    airPollution={airPollutions[index]}
                />
            ))}
        </>
    );
};
