import React, {FC, useEffect, useState} from 'react';
import './ConnectModal.css'
import CloseModal from '../../assets/images/CloseModal.svg'
import StatusIconModal from '../../assets/images/StatusIconModal.svg'
import {useTonConnectUI} from "@tonconnect/ui-react";

interface ConnectedModalProps {
    walletAddress: string;
    onClose: () => void;
}

const ConnectModal:FC<ConnectedModalProps> = ({walletAddress, onClose, }) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [tonConnectUI] = useTonConnectUI();

    const handleClose = () => {
        setIsVisible(false); // Запускаем анимацию скрытия
    };

    const  handleDisconnect = async () => {
        setIsVisible(false); // Сначала запускаем анимацию закрытия

        // Выполняем отключение кошелька отдельно
        setTimeout(async () => {
            try {
                await tonConnectUI.disconnect(); // Отключаем кошелек после запуска анимации
            } catch (err) {
                console.error('Failed to disconnect wallet:', err);
            }
        }, 300); // Задержка совпадает с длительностью анимации
    }

    useEffect(() => {
        if (!isVisible) {
            const timer = setTimeout(() => {
                onClose(); // Закрываем окно через родителя
            }, 300); // Время завершения анимации (должно совпадать с CSS)
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <>
            <div className={`modal-overlay ${isVisible ? 'active' : ''}`} onClick={handleClose}></div>
            <div className={`modal ${!isVisible ? 'slide-out' : ''}`}>
                <div className={'modal-header'}>
                    <p className={'modal-header-wallet'}>Wallet</p>
                    <button className={'modal-close'} onClick={handleClose}><img src={CloseModal} alt="close"/></button>
                </div>
                <div className={'modal-content'}>
                    <p className={'modal-content-wallet'}>{`${walletAddress.slice(0, 3)}...${walletAddress.slice(-3)}`}</p>
                    <div className={'modal-content-status'}>
                        <img src={StatusIconModal} alt="status"/>
                        <p className={'active-status'}>ACTIVE</p>
                    </div>
                </div>
                <div className={'modal-footer'}>
                    <button onClick={handleDisconnect}>Disconnect</button>
                </div>
            </div>
        </>
    );
};

export default ConnectModal;
