import React from 'react';
import './ChooseTonAmount.css'

interface ChooseTonAmountProps {
    tonNumber: number,
    text: string,
    selectedOption: number | null,
    setSelectedOption: (value: number) => void,
    // resetCustomAmount: () => void;
}

const ChooseTonAmount = ({tonNumber, text, selectedOption, setSelectedOption}: ChooseTonAmountProps) => {
    const isActive = selectedOption === tonNumber

    const handleClick = () => {
        setSelectedOption(tonNumber)
    }

    return (
    <button
        className={`ton_amount ${isActive ? 'active' : ''}`}
        onClick={handleClick}
    >
        {text}
    </button>
  );
};

export default ChooseTonAmount;
