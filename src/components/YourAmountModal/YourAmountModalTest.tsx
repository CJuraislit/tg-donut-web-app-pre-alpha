import React, {FC, useState} from 'react';
import './YourAmountModal.css'
import TonSymbol from '../../assets/images/TonSymbolAmountModal.svg'
import TonText from '../../assets/images/TonTextAmpuntModal.svg'
import WalletLogo from '../../assets/images/WalletLogoAmountModal.svg'
import NotEnoughIcon from '../../assets/images/NotEnoughIconAmountModal.svg'

interface YourAmountModalTestProps {
    setIsModalOpen: (isOpen: boolean) => void;
}

const YourAmountModalTest:FC<YourAmountModalTestProps> = ({setIsModalOpen}) => {
    const numDots = 6;
    const sliderValues = [0.1, 0.3, 5, 10, 20, 50]
    const [customAmount, setCustomAmount] = useState<string>('');
    const [selectedValue, setSelectedValue] = useState<number>(sliderValues[0]);
    const [isEnough, setIsEnough] = React.useState<boolean>(true);
    const tonBalance = 0;


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Заменяем запятые на точки для унификации
        value = value.replace(",", ".");

        // Проверяем, что строка соответствует числовому формату с максимум 2 знаками после точки
        // Пример: 10.99, 100, 0.99 — допустимо
        if (/^\d*(\.\d{0,2})?$/.test(value)) {
            const numericValue = parseFloat(value);

            // Ограничиваем максимальное значение до 100 TON
            if (numericValue <= 100 || isNaN(numericValue)) {
                setCustomAmount(value);
            }
        }
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const index = parseInt(e.target.value, 10);
        setSelectedValue(sliderValues[index]);
    }


    return (
        <div className={'amount-modal-overlay'}>
            <div className={'amount-modal-container'}>
                <span className={'amount-modal-message'}>ENTER YOUR <br/> AMOUNT</span>
                <div className="amount-input-container">
                    <img src={TonSymbol} alt="TON" className={'amount-input-symbol'} />
                    <img src={TonText} alt="" className={'amount-input-text'} />
                        <input
                            type="text"
                            inputMode={'decimal'}
                            value={customAmount}
                            onChange={handleInputChange}
                            placeholder=""
                            className={'amount-input'}
                        />
                </div>
                <div className={'ton-info-container'}>
                    <div className={'ton-info-balance'}>
                        <img src={WalletLogo} alt="wallet"/>
                        <span>TON {tonBalance}</span>
                    </div>
                    {isEnough && (
                        <div className={'ton-info-warning'}>
                            <img src={NotEnoughIcon} alt="!"/>
                            <span>NOT ENOUGH TON</span>
                        </div>
                    )}
                </div>
                <div className={'slider-input-container'}>
                    <input
                        type="range"
                        min={'0'}
                        max={sliderValues.length - 1}
                        step={1}
                        value={sliderValues.indexOf(selectedValue)}
                        onChange={handleSliderChange}
                        className={'slider-input'}
                    />
                    <div className={'dot-container'}>
                        {Array.from({length: numDots}).map((_, index) => (
                            <div key={index} className={'slider-dot'}></div>
                        ))}
                    </div>
                </div>

                <button className={'amount-confirm-button'}>CONFIRM</button>
            </div>
        </div>
    );
};

export default YourAmountModalTest;
