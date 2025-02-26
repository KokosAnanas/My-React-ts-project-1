import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI } from './authAPI';

interface AuthState {
  id: string | null;
  name: string | null;
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface RegisterResponse {
  id: string;
  name: string;
  token: string;
}

interface LoginResponse {
  id: string;
  name: string;
  token: string;
}

const initialState: AuthState = {
  id: null,
  name: null,
  isAuthenticated: false,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk<RegisterResponse, { name: string; email: string; password: string }, { rejectValue: string }>(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerAPI(userData);
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('Произошла неизвестная ошибка');
      }
    }
  }
);

export const loginUser = createAsyncThunk<LoginResponse, { email: string; password: string }, { rejectValue: string }>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginAPI(credentials);
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('Произошла неизвестная ошибка');
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.id = null;
      state.name = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
      state.loading = false;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Ошибка регистрации';
    });
    
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      state.loading = false;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Ошибка авторизации';
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
