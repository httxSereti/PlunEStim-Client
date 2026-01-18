export interface User {
    id: string;
    role?: UserRole;
    permissions: Array<string>
    display_name: string;
    is_guest?: boolean;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isGuest: boolean;
    loading: boolean;
    error: string | null;
}

export enum UserRole {
    ROOT = 'root',
    ADMIN = 'admin',
    TRUSTED = 'trusted',
    OPERATOR = 'operator',
    USER = 'user',
    GUEST = 'guest',
}

export interface AuthTokens {
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
}

export interface LoginCredentials {
    magic_token: string;
}

export interface LoginResponse {
    success: boolean;
    token?: string;
    user?: User;
    error?: string;
}
