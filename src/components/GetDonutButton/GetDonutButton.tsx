import React, {FC, useEffect, useState} from 'react';
import './GetDonutButton.css'
import {useTonWallet} from "@tonconnect/ui-react";
import activeDonutSymbol from '../../assets/images/ActiveDonutSymbol.svg'
import inactiveDonutSymbol from '../../assets/images/InactiveDonutSymbol.svg'


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
          className={`get-donut-button ${isWalletConnected ? '' : 'inactive'}`}
          // disabled={!isWalletConnected}
          onClick={onGetDonutButtonClick}
      >
          <span>Get</span>
          <img className={'donut-symbol'} src={isWalletConnected ? activeDonutSymbol : inactiveDonutSymbol} alt={'Donut Symbol'}/>
          <span>DONUT</span>
      </button>
  );
};

export default GetDonutButton;
