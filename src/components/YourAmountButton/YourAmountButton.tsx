import React, {FC, useState} from 'react';
import './YourAmountButton.css'

interface YourAmountButtonProps {
    selectedOption: number | null;
    setSelectedOption: (amount: number) => void;
    customAmount: string;
    setCustomAmount: (value: string) => void;
}

const YourAmountButton: FC<YourAmountButtonProps> = ({ selectedOption, setSelectedOption, customAmount, setCustomAmount }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Открытие модального окна
    const openModal = () => {
        setIsModalOpen(true);
        setSelectedOption(null);
    };

    // Закрытие модального окна
    const closeModal = () => {
        setIsModalOpen(false);
        setCustomAmount('');
    };

    // Обработка ввода пользователя, чтобы оставлять только корректные значения
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
        if (isNaN(numericValue) || numericValue <= 0 || numericValue > 100) {
            alert("Invalid amount. Please enter a number between 0.01 and 100 TON.");
            return;
        }

        // Устанавливаем выбранную сумму и закрываем модальное окно
        setSelectedOption(numericValue);
        setIsModalOpen(false);
    };

    // Проверка, активна ли кнопка подтверждения
    const isActive = !!selectedOption && customAmount !== '';
    const isConfirmButtonActive = customAmount !== '' && /^[1-9]\d*(\.\d{0,2})?$/.test(customAmount);

    return (
        <>
            {/* Кнопка открытия модального окна */}
            <button
                className={`your-amount-button ${isActive ? 'active' : ''}`}
                onClick={openModal}
            >
                {customAmount ? `${customAmount} TON` : 'Your Amount'}
            </button>

            {/* Модальное окно для ввода суммы */}
            {isModalOpen && (
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


////////////////// V1
// interface YourAmountButtonProps {
//     selectedOption:  number | null ;
//     setSelectedOption: (amount: number) => void;
//     customAmount: string,
//     setCustomAmount: (value: string) => void;
// }
//
// const YourAmountButton: FC<YourAmountButtonProps> = ({selectedOption, setSelectedOption, customAmount, setCustomAmount}) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//
//     const openModal = () => {
//         setIsModalOpen(true)
//         setSelectedOption(null)
//     };
//     const closeModal = () => {
//         setIsModalOpen(false)
//         setCustomAmount('')
//     }
//
//     const confirmAmount = () => {
//         if(/^[1-9]\d*$/.test(customAmount)) {
//             setSelectedOption(Number(customAmount));
//             setIsModalOpen(false)
//         } else {
//             alert('Please enter a valid amount greater than 0');
//         }
//     }
//
//     const isActive = !!selectedOption && customAmount !=='';
//
//     const isConfirmButtonActive = customAmount !== '' && /^[1-9]\d*$/.test(customAmount);
//
//
//     return (
//     <>
//         <button
//             className={`your-amount-button ${isActive ? 'active' : ''}`}
//             onClick={openModal}
//         >
//             {customAmount ? `${customAmount} TON` : 'Your Amount'}
//         </button>
//         {isModalOpen && (
//             <div className={'modal'}>
//                 <div className={'modal-content'}>
//                     <div className={'modal_header'}>ENTER YOUR AMOUNT</div>
//                     <input
//                         type="number"
//                         inputMode="numeric"
//                         value={customAmount}
//                         onChange={(e) => setCustomAmount(e.target.value)}
//                         onKeyDown={(e) => {
//                             if (['e', 'E', '+', '-'].includes(e.key)) {
//                                 e.preventDefault();
//                             }
//                         }}
//                         placeholder={"ENTER AMOUNT IN TON"}
//                         className={'custom-amount-input'}
//                         min={1}
//                         step={1}
//                     />
//                     <div className={'modal-actions'}>
//                         <button onClick={confirmAmount}
//                                 className={`confirm-button ${isConfirmButtonActive ? '' : 'disabled'}`}
//                                 disabled={!isConfirmButtonActive}
//                         >
//                             Confirm
//                         </button>
//                         <button onClick={closeModal} className={'cancel-button'}>
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         )}
//     </>
//   );
// };
//
// export default YourAmountButton;

