import React, {FC, useState} from 'react';
import './YourAmountModal.css'
import TestTestSlider from "../TestTestSlider/TestTestSlider";

interface YourAmountModalProps {
    setIsModalOpen: (isOpen: boolean) => void;
}

const YourAmountModal:FC<YourAmountModalProps> = ({setIsModalOpen}) => {
    const [customAmount, setCustomAmount] = React.useState<string>('');

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

    // Подтверждение введенной суммы
    const confirmAmount = () => {
        const numericValue = parseFloat(customAmount);

        // Проверка на корректность введенной суммы
        if (isNaN(numericValue)) {
            alert("Invalid amount. Please enter a number between 0.01 and 100 TON.");
            return;
        }

        setIsModalOpen(false);
    };

    const isConfirmButtonActive = customAmount !== '' && /^[1-9]\d*(\.\d{0,2})?$/.test(customAmount);


    //
    const sliderValues = [0.1, 0.3, 5, 10, 20, 50]; // значения слайдера
    const [inputValue, setInputValue] = useState<number>(0.1);
    const [isSliderActive, setIsSliderActive] = useState<boolean>(true); // следит за активным источником изменений
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const index = parseInt(e.target.value, 10);
        setInputValue(sliderValues[index]); // Устанавливаем значение из массива
        setIsSliderActive(true); // Слайдер становится активным источником
    };

    return (
        <div className={'modal-donation'}>
            <div className={'modal-donation-content'}>
                <div className={'modal-donation-header'}>ENTER YOUR AMOUNT</div>

                {/* Инпут для ввода суммы */}
                <input
                    type="text" // изменен тип на "text", чтобы пользователь мог вводить и точку, и запятую
                    inputMode="decimal" // это позволяет клавиатуре на мобильных устройствах показывать цифры и точку
                    value={customAmount}
                    onChange={handleInputChange} // Обработка изменения значения
                    placeholder="0.01 - 100 TON" // Подсказка для пользователя
                    className={'custom-amount-input'}
                />
                <TestTestSlider/>
            </div>
        </div>
    );
};

export default YourAmountModal;
