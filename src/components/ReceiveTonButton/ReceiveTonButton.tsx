import React, {FC} from 'react';
import './ReceiveTonButton.css'
import activeTonSymbol from '../../assets/images/ActiveTonSymbol.svg'
import inactiveTonSymbol from '../../assets/images/InactiveDonutSymbol.svg'

interface ReciveTonButtonProps {
    onReceiveTonButtonClick: () => void;
}

const ReceiveTonButton: FC<ReciveTonButtonProps> = ({onReceiveTonButtonClick}) => {

  return (
    <button
        className={'receive_ton_button'}
        onClick={onReceiveTonButtonClick}
    >
        <span>Receive</span>
        <img className={'ton-symbol'} src={activeTonSymbol} alt="Ton Symnol"/>
        <span>TON</span>
    </button>
  );
};

export default ReceiveTonButton;
