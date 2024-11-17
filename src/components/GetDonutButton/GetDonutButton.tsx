import React, {FC, useEffect, useState} from 'react';
import './GetDonutButton.css'
import {useTonWallet} from "@tonconnect/ui-react";

interface GetDonutButtonProps {
    onGetDonutButtonClick: () => void;
}

const GetDonutButton:FC<GetDonutButtonProps> = ({onGetDonutButtonClick}) => {
   const wallet = useTonWallet()
    const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false)

    useEffect(() => {
        setIsWalletConnected(!!wallet); // Устанавливаем true, если кошелек подключен
    }, [wallet]);

  return (
      <button
          className={`get-donut-button ${isWalletConnected ? 'active' : 'inactive'}`}
          disabled={!isWalletConnected}
          onClick={onGetDonutButtonClick}
      >
          Get $DONUT
      </button>
  );
};

export default GetDonutButton;
