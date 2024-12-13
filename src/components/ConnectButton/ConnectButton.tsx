import React, {FC, useEffect, useState} from 'react';
import {TonConnectButton, TonConnectUI, useTonAddress, useTonConnectUI, useTonWallet,} from "@tonconnect/ui-react";
import './ConnectButton.css'
import ConnectModal from "../ConnectModal/ConnectModal";
import CheckMark from '../../assets/images/CheckMarkConnectButton.svg'
import TonSymbol from '../../assets/images/TonSymbolConnectButton.svg'

interface ConnectButtonProps {
    className?: string;
    authClassName?: string;
}

const ConnectButton:FC<ConnectButtonProps> = ({className, authClassName}) => {
    const [tonConnectUI] = useTonConnectUI();
    const walletAddress = useTonAddress();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleConnect =  async ()=> {
        try {
            await tonConnectUI.openModal();
            console.log("Modal opened successfully");
        } catch (err) {
            console.error('Failed to open modal:', err);
        }
    }

    return (
    <>
        {/*walletAddress*/}
        { walletAddress ? (
            <>
                <button
                    onClick={toggleModal}
                    className={`connect-button-auth ${authClassName || ''}`}
                >
                    <img src={TonSymbol} alt=""/>
                    <p className={'wallet-address'}>{`${walletAddress.slice(0, 3)}...${walletAddress.slice(-3)}`}</p>
                    <img src={CheckMark} alt=""/>
                </button>

            {isModalOpen && (
                <ConnectModal walletAddress={walletAddress} onClose={() => setIsModalOpen(false)} />
            )}
            </>
        ): (
            <>
                <button
                    onClick={handleConnect}
                    className={`connect-button ${className || ''}`}
                >
                    CONNECT WALLET
                </button>
            </>
        )}
    </>
    );
};

export default ConnectButton;
