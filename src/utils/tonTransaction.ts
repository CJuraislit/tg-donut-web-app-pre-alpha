import {SendTransactionRequest, useTonConnectUI} from "@tonconnect/ui-react";
import {useTelegram} from '../hooks/useTelegram';
import {sendTransaction} from "../api/userService";
import exp from "node:constants";
import {Cell} from "@ton/core";
import {TonClient, beginCell} from "@ton/ton";
import {Address} from "@ton/core";

// const client = new TonClient({endpoint: 'https://toncenter.com/api/v2/jsonRPC'})

// const getTransactionDetails = async (
//     client: TonClient,
//     senderAddress: string,
//     recipientAddress: string,
//     expectedValue: bigint,
//     maxWaitTime: number = 30,
//     pollingInterval: number = 3,
// ) => {
//     const address = Address.parse(senderAddress)
//     const startTime = Math.floor(Date.now() / 1000)
//
//     while (true) {
//         const transactions = await client.getTransactions(address, {limit: 10})
//
//         const matchingTransaction = transactions.find((tx) => {
//
//         })
//     }
//
// }

// const [tonConnectUI, setOptions] = useTonConnectUI()
// const {user} = useTelegram()

const createTransaction = async (transactionAmount:number, updatePoints: () => void, userId: number, tonConnectUI: any )  => {
    if(!transactionAmount) return
    const body = beginCell()
        .storeUint(0, 32)
        .storeStringRefTail(String(userId))
        .endCell()

    try {
        const transaction: SendTransactionRequest = {
            validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
            messages: [
                {
                    address:
                        "UQDTqiePOYQpPh-5hazEfo0wmkCtdIceVcMHB5b-cv3_ivTO", // message destination in user-friendly format
                    amount: (transactionAmount * 1000000000).toString(), // Toncoin in nanotons
                    payload: body.toBoc().toString('base64'),
                },
            ],
        };


        const result = await tonConnectUI.sendTransaction(transaction)


        // await sendTransaction(String(userId), transactionAmount)

        // updatePoints()
        alert('Transaction successfull')
    } catch (error) {
        console.log('error during transaction', error)
        alert('Transaction failed')
    }
}

export default createTransaction;
