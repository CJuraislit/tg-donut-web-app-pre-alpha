import React, {FC} from 'react';
import './MainPage1.css'
import DonutLogo from '../../assets/images/DonutLogo.svg'
import ConnectButton from "../ConnectButton/ConnectButton";
import DonutCountSection from "../DonutCountSection/DonutCountSection";
import GetDonutButton from "../GetDonutButton/GetDonutButton";
import ReceiveTonButton from "../ReceiveTonButton/ReceiveTonButton";
import {useNavigate} from "react-router-dom";

interface MainPageProps {
    points: number | null;
    updatePoints: () => void;

}

const MainPage:FC<MainPageProps> = ({points, updatePoints}) => {
    const navigate = useNavigate();

    const onGetDonutButtonClick = ()=> {
        navigate("/donation");
    }

    const onReceiveTonButtonClick = ()=> {
        navigate("/friends");
    }

  return (
    <div className={'app-main-container'}>
        <ConnectButton className={'connect-button-main'} authClassName={'connect-button-auth-main'}/>
        <DonutCountSection points={points} updatePoints={updatePoints}/>
        <img className={'donut-logo'} src={DonutLogo} alt="DonutLogo"/>
        <GetDonutButton onGetDonutButtonClick={onGetDonutButtonClick}/>
        <ReceiveTonButton onReceiveTonButtonClick={onReceiveTonButtonClick} />
    </div>
  );
};

export default MainPage;
