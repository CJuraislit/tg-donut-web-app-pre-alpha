import React from 'react';
import './WelcomeScreenTest.css'
import TonSymbol from '../../assets/images/TonSymbol23.svg'
import WelcomeDonutLogo from '../../assets/images/WelcomeDonutLogoNew.svg'

const WelcomeScreenTest = () => {
    return (
        <div className="welcome-screen">
            <div className="welcome-content">
                <p className="fade-text text-1"><span>NO</span> TASKS</p>
                <p className="fade-text text-2"><span>NO</span> GAMES</p>
                <div className="text-container-welcome">
                    <p className={'text text-3'}>GET 50%</p>
                    <p className={'text text-4'}>IN REAL <img src={TonSymbol} alt=""/> TON</p>
                    <p className={'text text-5'}>FROM FRIENDS</p>
                </div>
                <img
                    src={WelcomeDonutLogo}
                    alt="Donut Logo"
                    className="donut-animation"
                />
                <p className={"just-donut-text"}>JUST <span>DONUT</span></p>
            </div>
        </div>
    );
};

export default WelcomeScreenTest;
