import React, {FC, useState} from 'react';
import './YourAmountButton.css'

interface YourAmountButtonProps {
    selectedOption:  number | null ;
    setSelectedOption: (amount: number) => void;
    customAmount: string,
    setCustomAmount: (value: string) => void;
}

const YourAmountButton: FC<YourAmountButtonProps> = ({selectedOption, setSelectedOption, customAmount, setCustomAmount}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true)
        setSelectedOption(null)
    };
    const closeModal = () => {
        setIsModalOpen(false)
        setCustomAmount('')
    }

    const confirmAmount = () => {
        if(/^[1-9]\d*$/.test(customAmount)) {
            setSelectedOption(Number(customAmount));
            setIsModalOpen(false)
        } else {
            alert('Please enter a valid amount greater than 0');
        }
    }

    const isActive = !!selectedOption && customAmount !=='';

    const isConfirmButtonActive = customAmount !== '' && /^[1-9]\d*$/.test(customAmount);


    return (
    <>
        <button
            className={`your-amount-button ${isActive ? 'active' : ''}`}
            onClick={openModal}
        >
            {customAmount ? `${customAmount} TON` : 'Your Amount'}
        </button>
        {isModalOpen && (
            <div className={'modal'}>
                <div className={'modal-content'}>
                    <div className={'modal_header'}>ENTER YOUR AMOUNT</div>
                    <input
                        type="number"
                        inputMode="numeric"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        onKeyDown={(e) => {
                            if (['e', 'E', '+', '-'].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        placeholder={"ENTER AMOUNT IN TON"}
                        className={'custom-amount-input'}
                        min={1}
                        step={1}
                    />
                    <div className={'modal-actions'}>
                        <button onClick={confirmAmount}
                                className={`confirm-button ${isConfirmButtonActive ? '' : 'disabled'}`}
                                disabled={!isConfirmButtonActive}
                        >
                            Confirm
                        </button>
                        <button onClick={closeModal} className={'cancel-button'}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
  );
};

export default YourAmountButton;
