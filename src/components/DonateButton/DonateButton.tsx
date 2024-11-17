import React from 'react';
import './DonateButton.css'
import {SendTransactionRequest, TonConnectUI, useTonConnectUI} from "@tonconnect/ui-react";

interface DonateButtonProps {
    isDisabled: boolean;
    selectedAmount: number | null;
}



const DonateButton = ({isDisabled, selectedAmount}: DonateButtonProps) => {
    const [tonConnectUI, setOptions] = useTonConnectUI()

    const handleTransaction = () => {
        if(!selectedAmount) return

        const transaction: SendTransactionRequest = {
            validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
            messages: [
                {
                    address:
                        "UQDTqiePOYQpPh-5hazEfo0wmkCtdIceVcMHB5b-cv3_ivTO", // message destination in user-friendly format
                    amount: (selectedAmount * 1000000000).toString(), // Toncoin in nanotons
                },
            ],
        };

        tonConnectUI.sendTransaction(transaction)
    }

    return (
        <button
            className={`donate_button ${isDisabled ? 'inactive' : 'active'}`}
            onClick={handleTransaction}
            disabled={isDisabled}
        >
            Donat
        </button>
    );
};

export default DonateButton;
