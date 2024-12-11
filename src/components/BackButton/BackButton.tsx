import React from 'react';
import BackIcon from '../../assets/images/BackIcon.svg'
import './BackButton.css'
import {useNavigate} from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <button onClick={goBack} className={'back-button'}>
            <img src={BackIcon} alt="back"/>
        </button>
    );
};

export default BackButton;
