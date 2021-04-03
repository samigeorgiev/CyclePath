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
            <span className={styles.moto}>
                Take a ride
                <br />
                on the green side
            </span>
        </div>
    )
}

export default Home
