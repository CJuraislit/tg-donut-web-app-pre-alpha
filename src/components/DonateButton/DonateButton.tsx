import React, {FC, useState} from 'react';
import './DonateButton.css'
import {SendTransactionRequest, TonConnectUI, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {useTelegram} from "../../hooks/useTelegram";
import {sendTransaction} from "../../api/userService";


interface DonateButtonProps {
    isDisabled: boolean;
    selectedAmount: number | null;
    onTransactionComplete: () => void;
}



const DonateButton: FC<DonateButtonProps> = ({isDisabled, selectedAmount, onTransactionComplete}) => {
    const [tonConnectUI, setOptions] = useTonConnectUI()
    const {user} = useTelegram()



    const handleTransaction = async () => {
        if(!selectedAmount) return

        try {
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

            await tonConnectUI.sendTransaction(transaction)

            await sendTransaction(String(user?.id), selectedAmount)

            onTransactionComplete()
            alert('Transaction successfull')
        } catch (error) {
            console.log('error during transaction', error)
            alert('Transaction failed')
        }

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
