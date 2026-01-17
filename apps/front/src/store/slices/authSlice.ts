import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface User {
    id: string;
    role: string;
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

// Helper to safely access localStorage
const getStoredToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

const initialState: AuthState = {
    user: null,
    token: getStoredToken(),
    isAuthenticated: false,
    isGuest: false,
    loading: false,
    error: null,
};

const API_URL = 'http://localhost:8000';

// Async thunks
export const login = createAsyncThunk<
    { access_token: string; token_type: string; user: User },
    { magic_token: string }
>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/auth/login?magic_token=${encodeURIComponent(credentials.magic_token)}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error.detail || 'Login failed');
            }

            const data = await response.json();
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', data.access_token);
            }

            // Fetch user data with the new token
            const userResponse = await fetch(`${API_URL}/auth/me`, {
                headers: { 'Authorization': `Bearer ${data.access_token}` },
            });

            if (!userResponse.ok) {
                return rejectWithValue('Failed to fetch user data');
            }

            const user = await userResponse.json();

            return {
                access_token: data.access_token,
                token_type: data.token_type,
                user: user,
            };

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return rejectWithValue('Network error');
        }
    }
);

export const guestLogin = createAsyncThunk<
    { access_token: string; token_type: string; user: User }
>(
    'auth/guestLogin',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/auth/guest`, {
                method: 'POST',
            });

            if (!response.ok) {
                return rejectWithValue('Guest login failed');
            }

            const data = await response.json();
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', data.access_token);
            }
            return data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return rejectWithValue('Network error');
        }
    }
);

export const verifyToken = createAsyncThunk<
    { user: User; token: string }
>(
    'auth/verifyToken',
    async (_, { rejectWithValue }) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) {
            return rejectWithValue('No token found');
        }

        try {
            const response = await fetch(`${API_URL}/auth/me`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('token');
                }
                return rejectWithValue('Token verification failed');
            }

            const user = await response.json();
            return { user, token };
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
            }
            return rejectWithValue('Network error');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isGuest = false;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.isGuest = false;
            state.user = action.payload.user;
            state.token = action.payload.access_token;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Guest Login
        builder.addCase(guestLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(guestLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.isGuest = true;
            state.user = action.payload.user;
            state.token = action.payload.access_token;
        });
        builder.addCase(guestLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Verify Token
        builder.addCase(verifyToken.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(verifyToken.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.isGuest = action.payload.user.is_guest || false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        });
        builder.addCase(verifyToken.rejected, (state) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isGuest = false;
        });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;