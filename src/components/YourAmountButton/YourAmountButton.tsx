import React, {FC, useState} from 'react';
import './YourAmountButton.css'
import YourAmountModal from "../YourAmountModal/YourAmountModal";

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

    // Обработка ввода пользователя, чтобы оставлять только корректные значения
    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     let value = e.target.value;
    //
    //     // Заменяем запятые на точки для унификации
    //     value = value.replace(",", ".");
    //
    //     // Проверяем, что строка соответствует числовому формату с максимум 2 знаками после точки
    //     // Пример: 10.99, 100, 0.99 — допустимо
    //     if (/^\d*(\.\d{0,2})?$/.test(value)) {
    //         const numericValue = parseFloat(value);
    //
    //         // Ограничиваем максимальное значение до 100 TON
    //         if (numericValue <= 100 || isNaN(numericValue)) {
    //             setCustomAmount(value);
    //         }
    //     }
    // };

    // Подтверждение введенной суммы
    // const confirmAmount = () => {
    //     const numericValue = parseFloat(customAmount);
    //
    //     // Проверка на корректность введенной суммы
    //     if (isNaN(numericValue) || numericValue <= 0 || numericValue > 100) {
    //         alert("Invalid amount. Please enter a number between 0.01 and 100 TON.");
    //         return;
    //     }
    //
    //     // Устанавливаем выбранную сумму и закрываем модальное окно
    //     setSelectedOption(numericValue);
    //     setIsModalOpen(false);
    // };

    // Проверка, активна ли кнопка подтверждения
    // const isActive = !!selectedOption && customAmount !== '';
    const isActive = !selectedOption;
    // const isConfirmButtonActive = customAmount !== '' && /^[1-9]\d*(\.\d{0,2})?$/.test(customAmount);

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
               <YourAmountModal setIsModalOpen={setIsModalOpen}/>
            )}
        </>
    );
};

export default YourAmountButton;


