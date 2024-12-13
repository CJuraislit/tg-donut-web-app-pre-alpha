import React, {FC, useState} from 'react';
import './YourAmountButton.css'
import YourAmountModal from "../YourAmountModal/YourAmountModal";
import YourAmountModalTest from "../YourAmountModal/YourAmountModalTest";

interface YourAmountButtonProps {
    selectedOption: number | null;
    setSelectedOption: (amount: number) => void;
}

const YourAmountButton: FC<YourAmountButtonProps> = ({ selectedOption, setSelectedOption }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Открытие модального окна
    const openModal = () => {
        setIsModalOpen(true);
        setSelectedOption(null);
    };

    // Закрытие модального окна
    const closeModal = () => {
        setIsModalOpen(false);
        // setCustomAmount('');
    };

    const isActive = !selectedOption;

    return (
        <>
            {/* Кнопка открытия модального окна */}
            <button
                className={`your-amount-button ${isActive ? 'active' : ''}`}
                onClick={openModal}
            >
                YOUR AMOUNT
            </button>

            {/* Модальное окно для ввода суммы */}
            {isModalOpen && (
               // <YourAmountModal setIsModalOpen={setIsModalOpen}/>
               <YourAmountModalTest setIsModalOpen={setIsModalOpen}/>
            )}
        </>
    );
};

export default YourAmountButton;


