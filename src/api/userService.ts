import apiClient from './apiClient';

// Получение баланса пользователя
export async function fetchUserPoints(userId: string): Promise<{points_balance: number; ton_balance: number }> {
    const { data } = await apiClient.get(`/users/${userId}/points`);
    return {
        points_balance: data.points_balance,
        ton_balance: data.ton_balance,
    };
}

export async function sendTransaction(userId: string, amountTON: number, referredBy?: string): Promise<void> {
    const payload: Record<string, any> = {
        user_id: userId,
        amount_ton: amountTON,
    };
    if (referredBy) {
        payload.referred_by = referredBy;
    }

    await apiClient.post(`/transactions`, payload);
}

export async function updateWalletAddress(userId: string, walletAddress: string): Promise<void> {
    try {
        const response = await apiClient.post(
            `/users/${userId}/update_wallet`,
            {
                wallet_address: walletAddress,
            },
            {
                headers: {'Content-Type': 'application/json'},
            }
            );
        console.log('Wallet updated successfully', response.data);
    } catch (error) {
        console.log('Error updating wallet address:' ,error);
    }
}

// История транзакций пользователя
export async function fetchTransactionHistory(userId: string): Promise<any[]> {
    const { data } = await apiClient.get(`/transactions/${userId}/history`);
    return data.transactions;
}

// Регистрация пользователя без реферального кода
export async function registerUser(userId: string, username: string): Promise<void> {
    await apiClient.post(`/users/${userId}/register`, { username });
}

// Регистрация пользователя с реферальным кодом
export async function registerUserWithReferral(userId: string, username: string, referredBy: string): Promise<void> {
    await apiClient.post(`/users/${userId}/register_with_referral`, {
        username,
        referred_by: referredBy,
    });
}

export async function fetchUserTonAmount(userId: string): Promise<{ user_id: string; ton_balance: number }> {
    const { data } = await apiClient.get(`/users/${userId}/ton_points`);

    return data;
}
