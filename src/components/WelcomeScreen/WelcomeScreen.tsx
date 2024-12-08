import React from 'react';
import './WelcomeScreen.css'
import WelcomeDonutLogo from '../../assets/images/WelcomeDonutLogo.svg'

const WelcomeScreen = () => {
    return (
        <div className="welcome-screen">
            <div className="welcome-content">
                <p className={'text-with-shadow'}>No Games</p>
                <p className={'text-with-shadow'}>No Daily Check-In</p>
                <p className={'text-with-shadow'}>No Tasks</p>
                <h1>JUST DONUT</h1>
                <img src={WelcomeDonutLogo} alt="Donut Logo"/>
            </div>
        </div>
    );
};

export default WelcomeScreen;