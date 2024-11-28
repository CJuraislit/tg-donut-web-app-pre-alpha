import React, {FC} from 'react';
import './NavigationButtons.css'
import HomePageIcon from '../../assets/images/HomePageIcon.svg'
import LeaderboardPageIcon from '../../assets/images/LeaderboardPageIcon.svg'

interface NavigationButtonsProps {
    HomeHandleClick: () => void;
    LeaderboardHandleClick: () => void;
}

const NavigationButtons:FC<NavigationButtonsProps> = ({HomeHandleClick, LeaderboardHandleClick}) => {
  return (
    <div className='navigation-container'>
      <button className={'navigation-button'} onClick={HomeHandleClick}>
          <img src={HomePageIcon} alt="home-page-icon" />
      </button>
      <button className={'navigation-button'} onClick={LeaderboardHandleClick}>
          <img src={LeaderboardPageIcon} alt="leaderboard-page-icon" />
      </button>
    </div>
  );
};

export default NavigationButtons;
