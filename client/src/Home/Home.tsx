import { Typography } from '@material-ui/core'
import React from 'react'
import styles from './Home.module.scss'

interface Props {}

const Home: React.FC<Props> = () => {
    return (
        <div className={styles.root}>
            <img
                className={styles.banner}
                alt='Home Banner'
                src='images/eco_bike.webp'
            />
            <Typography className={styles.moto} color='primary'>
                Take a ride
                <br />
                on the green side
            </Typography>
            <blockquote className={styles.message}>
                <Typography component='p'>
                    &#x26a0; Unfortunately, duo to limitations of the server, we
                    are unable to supply a map of Sofia. However you will be
                    able to try our product on a map of Monaco with a default
                    location.
                </Typography>
            </blockquote>
        </div>
    )
}

export default Home
