import { configureStore, createSlice } from '@reduxjs/toolkit';

const cropsSlice = createSlice({
  name: 'crops',
  initialState: {
    crops: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCrops: (state, action) => {
      state.crops = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCrops, setLoading, setError } = cropsSlice.actions;
export const { setUser, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    crops: cropsSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
