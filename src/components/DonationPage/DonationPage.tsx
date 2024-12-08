import React, {FC, useState} from 'react';
import './DonationPage.css'
import ConnectButton from "../ConnectButton/ConnectButton";
import ChooseTonAmount from "../ChooseTonAmount/ChooseTonAmount";
import YourAmountButton from "../YourAmountButton/YourAmountButton";
import DonateButton from "../DonateButton/DonateButton";

interface DonationPageProps {
    updatePoints: () => void;
}

const DonationPage:FC<DonationPageProps> = ({updatePoints}) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [customAmount, setCustomAmount] = useState<string>('')

    const resetCustomAmount = () => {
        setCustomAmount('')
    }

    return (
        <div className="app-content-container">
            <ConnectButton/>
            <div className={'donate-page-message'}>Make a donate to get $DONUT</div>
            <div className={'ton-amount-container'}>
                <ChooseTonAmount tonNumber={0.5} text={'TON 0.5'} selectedOption={selectedOption} setSelectedOption={(value) => {
                    resetCustomAmount()
                    setSelectedOption(value)
                }}/>
                <ChooseTonAmount tonNumber={2} text={'TON 2'} selectedOption={selectedOption} setSelectedOption={(value) => {
                    resetCustomAmount()
                    setSelectedOption(value)
                }}/>
                <ChooseTonAmount tonNumber={10} text={'TON 10'} selectedOption={selectedOption} setSelectedOption={(value) => {
                    resetCustomAmount()
                    setSelectedOption(value)
                }}/>
                <YourAmountButton selectedOption={selectedOption} setSelectedOption={setSelectedOption} customAmount={customAmount} setCustomAmount={setCustomAmount}/>
            </div>
            <DonateButton isDisabled={selectedOption === null} selectedAmount={selectedOption} onTransactionComplete={updatePoints}/>
        </div>
    );
};

export default DonationPage;
