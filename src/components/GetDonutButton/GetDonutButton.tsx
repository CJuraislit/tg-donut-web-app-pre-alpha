import React, {FC} from 'react';
import './GetDonutButton.css'

interface GetDonutButtonProps {
    onGetDonutButtonClick: () => void;
    isWalletConnected: boolean;
}

const GetDonutButton:FC<GetDonutButtonProps> = ({onGetDonutButtonClick, isWalletConnected }) => {
  return (
      <button
          className={`topUpButton ${isWalletConnected ? 'active' : 'inactive'}`}
          onClick={onGetDonutButtonClick}
          disabled={!isWalletConnected}
      >
          Get $DONUT
      </button>
  );
};

export default GetDonutButton;
