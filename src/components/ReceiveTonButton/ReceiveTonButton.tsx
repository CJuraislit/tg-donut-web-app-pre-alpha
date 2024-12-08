import React, {FC} from 'react';
import './ReceiveTonButton.css'

interface ReciveTonButtonProps {
    onReceiveTonButtonClick: () => void;
}

const ReciveTonButton: FC<ReciveTonButtonProps> = ({onReceiveTonButtonClick}) => {

  return (
    <button
        className={'receive_ton_button'}
        onClick={onReceiveTonButtonClick}
    >
        Receive $TON
    </button>
  );
};

export default ReciveTonButton;
