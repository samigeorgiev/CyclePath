import React, { FunctionComponent, useEffect } from 'react'
import { useGetAirPollution } from '../../hooks/useGetAirPollution/useGetAirPollution'
import { Route } from '../PolyLine/Route'
import { AirPollutionArea } from './AirPollutionArea'
import { v4 as uuid } from 'uuid'

interface Props {
    routes: Route[]
    visible: boolean
}

export const AirPollutionWrapper: FunctionComponent<Props> = ({
    routes,
    visible
}) => {
    const { airPollutions, getAirPollutions } = useGetAirPollution()

    useEffect(() => {
        getAirPollutions(routes)
    }, [routes])

    if (!airPollutions || !routes) {
        return null
    }

    return (
        <>
            {visible &&
                routes.map((route: Route, index: number) => (
                    <AirPollutionArea
                        key={uuid()}
                        route={route}
                        airPollution={airPollutions[index]}
                    />
                ))}
        </>
    )
}
