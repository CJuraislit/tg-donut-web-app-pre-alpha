import React, {FC} from 'react';
import './NavigationButtons.css'
import HomePageIcon from '../../assets/images/HomePageIcon.svg'
import LeaderboardPageIcon from '../../assets/images/LeaderboardPageIcon.svg'
import {useNavigate} from "react-router-dom";

const NavigationButtons:FC= () => {
    const navigate = useNavigate();

    return (
    <div className='navigation-container'>
      <button className={'navigation-button'} onClick={() => navigate('/') }>
          <img src={HomePageIcon} alt="home-page-icon" />
      </button>
      <button className={'navigation-button'} onClick={() => navigate('/leaderboard')}>
          <img src={LeaderboardPageIcon} alt="leaderboard-page-icon" />
      </button>
    </div>
    );
};

export default NavigationButtons;
