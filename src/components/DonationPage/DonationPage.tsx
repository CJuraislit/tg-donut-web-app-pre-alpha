import React, {FC, useState} from 'react';
import './DonationPage.css'
import DonutSymbolDonation from '../../assets/images/DonutSymbolDonationPage.svg'
import ConnectButton from "../ConnectButton/ConnectButton";
import ChooseTonAmount from "../ChooseTonAmount/ChooseTonAmount";
import YourAmountButton from "../YourAmountButton/YourAmountButton";
import DonateButton from "../DonateButton/DonateButton";
import BackButton from "../BackButton/BackButton";

interface DonationPageProps {
    updatePoints: () => void;
}

const DonationPage:FC<DonationPageProps> = ({updatePoints}) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    // const [customAmount, setCustomAmount] = useState<string>('')

    // const resetCustomAmount = () => {
    //     setCustomAmount('')
    // }

    return (
        <div className="app-content-container">
            <div className={'donate-page-header'}>
                <BackButton/>
                <ConnectButton className={'connect-button-donation'} authClassName={'connect-button-auth-donation'}/>
            </div>
            <div className={'donate-page-message'}>MAKE A DONUT TO GET <img src={DonutSymbolDonation} alt="donut"/> DONUT
            </div>
            <div className={'ton-amount-container'}>
                <ChooseTonAmount tonNumber={0.5} textTon={'0,5'} textDonut={'500'} selectedOption={selectedOption} setSelectedOption={(value) => {
                    // resetCustomAmount()
                    setSelectedOption(value)
                }}/>
                <ChooseTonAmount tonNumber={2} textTon={'2'} textDonut={'4,000'} selectedOption={selectedOption} setSelectedOption={(value) => {
                    // resetCustomAmount()
                    setSelectedOption(value)
                }}/>
                <ChooseTonAmount tonNumber={10} textTon={'10'} textDonut={'50,000'} selectedOption={selectedOption} setSelectedOption={(value) => {
                    // resetCustomAmount()
                    setSelectedOption(value)
                }}/>
            </div>
            <YourAmountButton selectedOption={selectedOption} setSelectedOption={setSelectedOption} onTransactionComplete={updatePoints}/>
            <DonateButton isDisabled={selectedOption === null} selectedAmount={selectedOption} onTransactionComplete={updatePoints}/>
        </div>
    );
};

export default DonationPage;
