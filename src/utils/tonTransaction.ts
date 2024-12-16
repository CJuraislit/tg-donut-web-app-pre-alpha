import {SendTransactionRequest, useTonConnectUI} from "@tonconnect/ui-react";
import {useTelegram} from '../hooks/useTelegram';
import {sendTransaction} from "../api/userService";
import exp from "node:constants";


// const [tonConnectUI, setOptions] = useTonConnectUI()
// const {user} = useTelegram()

const createTransaction = async (transactionAmount:number, updatePoints: () => void, userId: number, tonConnectUI: any )  => {
    if(!transactionAmount) return

    try {
        const transaction: SendTransactionRequest = {
            validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
            messages: [
                {
                    address:
                        "UQDTqiePOYQpPh-5hazEfo0wmkCtdIceVcMHB5b-cv3_ivTO", // message destination in user-friendly format
                    amount: (transactionAmount * 1000000000).toString(), // Toncoin in nanotons
                },
            ],
        };


        await tonConnectUI.sendTransaction(transaction)

        await sendTransaction(String(userId), transactionAmount)

        updatePoints()
        alert('Transaction successfull')
    } catch (error) {
        console.log('error during transaction', error)
        alert('Transaction failed')
    }
}

export default createTransaction;
