import React, {FC} from 'react';

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

                <div className={'modal-actions'}>
                    {/* Кнопка подтверждения */}
                    <button
                        onClick={confirmAmount}
                        className={`confirm-button ${isConfirmButtonActive ? '' : 'disabled'}`}
                        disabled={!isConfirmButtonActive}
                    >
                        Confirm
                    </button>
                    {/* Кнопка отмены */}
                    <button onClick={() => setIsModalOpen(false)} className={'cancel-button'}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default YourAmountModal;
