export interface ApiResponse<T = never> {
    success: boolean;
    data?: T;
    error?: ApiError;
    timestamp: number;
}

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, never>;
}
