import React from 'react';
import styles from './Home.module.scss';
import bikeBanner from '../assets/eco_bike.jpg';

interface Props {}

const Home: React.FC<Props> = () => {
    return (
        <div className={styles.root}>
            <img className={styles.banner} alt='Home Banner' src={bikeBanner} />
            <div className={styles.moto}>
                Take a ride
                <br />
                on the green side
            </div>
        </div>
    );
};

export default Home;
