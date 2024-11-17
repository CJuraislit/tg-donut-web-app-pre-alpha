import React, {FC, useState} from 'react';
import './YourAmountButton.css'

interface YourAmountButtonProps {
    selectedOption:  number | null ;
    setSelectedOption: (amount: number) => void;
}

const YourAmountButton: FC<YourAmountButtonProps> = ({selectedOption, setSelectedOption}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customAmount, setCustomAmount] = useState<string>(selectedOption ? selectedOption.toString : '');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false)
        setCustomAmount(selectedOption ? selectedOption.toString() : '')
    }

    const confirmAmount = () => {
        if(/^[1-9]\d*$/.test(customAmount)) {
            setSelectedOption(Number(customAmount));
            setIsModalOpen(false)
        } else {
            alert('Please enter a valid amount greater than 0');
        }
    }

    const isActive = !!selectedOption;

  return (
    <>
        <button
            onClick={openModal}
        >
            {selectedOption ? `${selectedOption} TON` : 'Your Amount'}
        </button>
        {isModalOpen && (
            <div className={'modal'}>
                <div className={'modal-content'}>
                    <h3>Enter Your Amount</h3>
                    <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        onKeyDown={(e) => {
                            if (['e', 'E', '+', '-'].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        placeholder={"Enter Amount In TON"}
                        className={'custom-amount-input'}
                        min={1}
                        step={1}
                    />
                    <div className={'modal-actions'}>
                        <button onClick={confirmAmount} className={'confirm-button'}>
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
