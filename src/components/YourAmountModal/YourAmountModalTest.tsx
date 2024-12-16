import React, {FC, useEffect, useRef, useState} from 'react';
import './YourAmountModal.css'
import TonSymbol from '../../assets/images/TonSymbolAmountModal.svg'
import TonText from '../../assets/images/TonTextAmpuntModal.svg'
import WalletLogo from '../../assets/images/WalletLogoAmountModal.svg'
import NotEnoughIcon from '../../assets/images/NotEnoughIconAmountModal.svg'
import CloseButton from '../../assets/images/CloseAmountButton.svg'
import createTransaction from "../../utils/tonTransaction";
import {useTelegram} from "../../hooks/useTelegram";
import {useTonConnectUI} from "@tonconnect/ui-react";

interface YourAmountModalTestProps {
    closeModal: () => void;
    onTransactionComplete: () => void;
}

const marks: number[] = [0.1, 0.3, 5, 10, 20, 50]

const getSegmentValue = (value:number, segments:number[]): number => {
    for (let i = 0; i < segments.length; i++) {
        if (value >= i * (100 / (segments.length - 1)) && value <= (i + 1) * (100 / (segments.length - 1))) {
            const segmentStart = segments[i];
            const segmentEnd = segments[i + 1];

            const segmentPosition = (value - i * (100 / (segments.length - 1))) / (100 / (segments.length - 1));
            return segmentStart + segmentPosition * (segmentEnd - segmentStart);
        }
    }
    return segments[segments.length - 1];
}

const calculateSliderPosition = (value: number, segments: number[]): number => {
    if (value < segments[0]) {
        return 0; // Начальное положение слайдера
    }

    for (let i = 0; i < segments.length - 1; i++) {
        if (value >= segments[i] && value <= segments[i + 1]) {
            const segmentStart = segments[i];
            const segmentEnd = segments[i + 1];
            const segmentWidth = 100 / (segments.length - 1);

            // Рассчитываем относительную позицию внутри сегмента
            const positionInSegment = ((value - segmentStart) / (segmentEnd - segmentStart)) * segmentWidth;

            // Позиция на слайдере = начало сегмента + относительная позиция
            return i * segmentWidth + positionInSegment;
        }
    }
    return 100; // Если значение больше последнего сегмента
};

const YourAmountModalTest:FC<YourAmountModalTestProps> = ({closeModal, onTransactionComplete}) => {
    const [customAmount, setCustomAmount] = useState<string>('0.1');
    const [sliderValue, setSliderValue] = useState<number>(0);
    const [calculatedValue, setCalculatedValue] = useState(0);    const [isEnough, setIsEnough] = React.useState<boolean>(true);
    const tonBalance = 40;
    const inputRef = useRef<HTMLInputElement>(null)
    const [tonConnectUI, setOptions] = useTonConnectUI()
    const {tg, user} = useTelegram()

    useEffect(() => {
        tg.disableVerticalSwipes()
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Заменяем запятые на точки
        value = value.replace(',', '.');

        // Разрешаем временные состояния, включая "0.", "0.0", "0.00"
        if (/^0$|^0\.$|^0\.\d{0,2}$|^\d*\.?\d{0,2}$/.test(value) || value === '') {
            let numericValue = parseFloat(value);

            if (value === '0.00') {
                value = '0.01'; // Преобразуем в минимально допустимое значение
                numericValue = 0.01;
            }

            if (value === '0') {
                setCustomAmount(value);
                setSliderValue(0);
                setCalculatedValue(0);
                return;
            }

            if (value.startsWith('0') && !value.startsWith('0.')) {
                value = value.replace(/^0+/, '');
            }

            // Если значение начинается с ".", преобразуем в "0."
            if (value.startsWith('.')) {
                value = '0' + value;
            }

            numericValue = parseFloat(value);


            // Обновляем текстовое поле
            setCustomAmount(value);

            // Если значение валидно, синхронизируем слайдер
            if (!isNaN(numericValue)) {
                const maxSegmentValue = marks[marks.length - 1];

                if (numericValue === 0 || numericValue < marks[0]) {
                    // Если значение равно 0, слайдер устанавливается на минимум
                    setSliderValue(0);
                    setCalculatedValue(0);
                } else {
                    // Ограничиваем значение до максимального сегмента
                    numericValue = Math.min(numericValue, maxSegmentValue);

                    // Рассчитываем позицию слайдера на основе введённого значения
                    const sliderPosition = calculateSliderPosition(numericValue, marks);
                    setSliderValue(sliderPosition);
                    setCalculatedValue(numericValue);
                }
            } else {
                // Если значение пустое, сбрасываем слайдер
                setSliderValue(0);
                setCalculatedValue(0);
            }
        }
    };

    const handleSliderValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);

        // Порог для магнитного эффекта
        const threshold = 2; // (можно менять по необходимости, в процентах)

        // Рассчитать ближайшую точку
        const nearestMark = marks.find((_, index) => {
            const markPosition = (index * 100) / (marks.length - 1);
            return Math.abs(value - markPosition) <= threshold;
        });

        // Если ползунок рядом с точкой, "примагнитить"
        const adjustedValue = nearestMark !== undefined
            ? (marks.indexOf(nearestMark) * 100) / (marks.length - 1)
            : value;

        setSliderValue(adjustedValue);

        // Рассчитать значение на основе сегментов
        const calculatedValue = getSegmentValue(adjustedValue, marks);
        setCalculatedValue(calculatedValue);

        // Синхронизировать с текстовым полем
        setCustomAmount(calculatedValue.toFixed(2));
    }

    return (
        <div className={'amount-modal-overlay'} onClick={closeModal}>
            <div className={'amount-modal-container'} onClick={(e) => e.stopPropagation()}>
                <button className={'amount-close-button'}>
                    <img src={CloseButton} alt="close" onClick={closeModal}/>
                </button>
                <span className={'amount-modal-message'}>ENTER YOUR <br/> AMOUNT</span>
                <div className="amount-input-container">
                    <img src={TonSymbol} alt="TON" className={'amount-input-symbol'}/>
                    <img src={TonText} alt="" className={'amount-input-text'}/>
                    <input
                        ref={inputRef}
                        type="text"
                        inputMode={'decimal'}
                        value={customAmount}
                        onChange={handleInputChange}
                        placeholder=""
                        className={`amount-input ${tonBalance >= parseFloat(customAmount) ? '' : 'with-error'}`}
                    />
                </div>
                <div className={'ton-info-container'}>
                    <div className={'ton-info-balance'}>
                        <img src={WalletLogo} alt="wallet"/>
                        <span>TON {tonBalance}</span>
                    </div>
                    {isEnough && (
                        <div className={'ton-info-warning'}>
                            <img src={NotEnoughIcon} alt="!" className={`${parseFloat(customAmount) >= tonBalance ? 'show-error' : ''}`}/>
                            <span className={`${parseFloat(customAmount) >= tonBalance ? 'show-error' : ''}`}>NOT ENOUGH TON </span>
                        </div>
                    )}
                </div>
                <div className="helpers">
                    <label className="range-slider">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="0.1"
                            value={sliderValue}
                            onChange={handleSliderValue}
                        />
                        <div className="marks">
                            <div className="line">
                                <div className="filled"
                                     style={{'--width': `${sliderValue}%`} as React.CSSProperties}></div>
                            </div>
                            <div className="inner">
                                {marks.map((mark, index) => (
                                    <div
                                        key={index}
                                        className={`item ${index === 0 ? 'is-first' : ''} ${
                                            index === marks.length - 1 ? 'is-last' : ''
                                        }`}
                                        style={{
                                            '--left': `${(index * 100) / (marks.length - 1)}%`,
                                        } as React.CSSProperties}
                                    >
                                        <div className="content">
                                            <div
                                                className={`point ${
                                                    sliderValue >= (index * 100) / (marks.length - 1)
                                                        ? 'active'
                                                        : ''
                                                }`}
                                            ></div>
                                            <div className="label">TON {mark}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </label>
                </div>
                <button
                    className={`amount-confirm-button ${tonBalance >= parseFloat(customAmount) ? 'active' : ''}`}
                    disabled={parseFloat(customAmount) > tonBalance }
                    onClick={() => createTransaction(parseFloat(customAmount), onTransactionComplete, user.id, tonConnectUI)}
                >
                    CONFIRM</button>
            </div>
        </div>
    )
};

export default YourAmountModalTest;
