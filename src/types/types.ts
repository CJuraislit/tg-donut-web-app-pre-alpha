export interface UserPointsResponse {
    points: number;
}

export interface TransactionRequest {
    user_id: string;
    amount_ton: number;
}
