import React from 'react';
import './ChooseTonAmount.css'
import ChooseTonAmountSymbol from '../../assets/images/ChooseTonAmountSymbol.svg'

interface ChooseTonAmountProps {
    tonNumber: number,
    textTon: string,
    textDonut: string,
    selectedOption: number | null,
    setSelectedOption: (value: number) => void,
    // resetCustomAmount: () => void;
}

const ChooseTonAmount = ({tonNumber, textTon, textDonut ,selectedOption, setSelectedOption}: ChooseTonAmountProps) => {
    const isActive = selectedOption === tonNumber

    const handleClick = () => {
        setSelectedOption(tonNumber)
    }

    return (
    <button
        className={`ton_amount ${isActive ? 'active' : ''}`}
        onClick={handleClick}
    >
        <div className={'choose-ton-amount-container'}>
            <img src={ChooseTonAmountSymbol} alt="TON"/>
            <span>TON {textTon}</span>
        </div>
        <div className={`choose-donut-amount-container ${isActive ? 'active' : ''}`}>
            <span>DONUT {textDonut}</span>
        </div>
    </button>
  );
};

export default ChooseTonAmount;
