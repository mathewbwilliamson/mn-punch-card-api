export interface BasicResource {
    id: number;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

export interface RainforestAccountInfo {
    api_key: string;
    name: string;
    email: string;
    plan: string;
    credits_used: number;
    credits_limit: number;
    credits_remaining: number;
    overage_allowed: boolean;
    overage_enabled: boolean;
    overage_limit: number;
    overage_used: number;
}
export interface RainforestAccountRequest {
    request_info: { success: boolean };
    account_info: RainforestAccountInfo;
}

export interface RainforestAccountData {
    creditsUsed: number;
    creditsRemaining: number;
    creditsLimit: number;
    overageLimit: number;
    overageUsed: number;
}
