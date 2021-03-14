import React, { FunctionComponent, useState } from 'react';
import { Polyline, Popup, useMap } from 'react-leaflet';
import { useRateRoute } from '../../hooks/useRateRoute/useRateRoute';
import { Route } from './Route';
import {
    SentimentVeryDissatisfied,
    SentimentDissatisfied,
    SentimentSatisfied,
    SentimentSatisfiedAlt,
    SentimentVerySatisfied
} from '@material-ui/icons';
import { Box, Button, Typography } from '@material-ui/core';
import { Rating, IconContainerProps } from '@material-ui/lab';
import styles from './PolyLine.module.scss';

interface Props {
    route: Route;
    forceReload: () => void;
    active: boolean;
}

const ratingColorMap = new Map<number, string>([
    [1, 'red'],
    [2, 'orange'],
    [3, 'yellow'],
    [4, 'green'],
    [5, 'lime']
]);

const customIcons: {
    [index: string]: { icon: React.ReactElement; label: string };
} = {
    1: {
        icon: <SentimentVeryDissatisfied />,
        label: 'Very Dissatisfied'
    },
    2: {
        icon: <SentimentDissatisfied />,
        label: 'Dissatisfied'
    },
    3: {
        icon: <SentimentSatisfied />,
        label: 'Neutral'
    },
    4: {
        icon: <SentimentSatisfiedAlt />,
        label: 'Satisfied'
    },
    5: {
        icon: <SentimentVerySatisfied />,
        label: 'Very Satisfied'
    }
};

function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

export const PolyLine: FunctionComponent<Props> = ({
    route,
    forceReload,
    active
}) => {
    const rateRoute = useRateRoute();

    const [rating, setRating] = useState<number>(1);

    const map = useMap();

    return (
        <Polyline
            className={styles.PopUp}
            color={active ? ratingColorMap.get(route.rating) : 'grey'}
            positions={[
                [route.start.lat, route.start.long],
                [route.end.lat, route.end.long]
            ]}
        >
            <Popup className={styles.PopUp}>
                <Box
                    className={styles.Box}
                    component='fieldset'
                    borderColor='transparent'
                >
                    <Typography variant='h6' component='legend'>
                        Rate Route
                    </Typography>
                    <Rating
                        name='customized-icons'
                        size='large'
                        value={rating}
                        onChange={(e, value: number | null) => {
                            if (!value) {
                                return;
                            }

                            setRating(value);
                        }}
                        getLabelText={(value: number) =>
                            customIcons[value].label
                        }
                        color={ratingColorMap.get(rating)}
                        IconContainerComponent={IconContainer}
                    />
                </Box>
                <Button
                    variant='contained'
                    fullWidth
                    color='primary'
                    onClick={() => {
                        map.closePopup();
                        rateRoute({
                            nodeOneId: route.start.nodeId,
                            nodeTwoId: route.end.nodeId,
                            rating
                        });
                        forceReload();
                    }}
                >
                    Submit
                </Button>
            </Popup>
        </Polyline>
    );
};
