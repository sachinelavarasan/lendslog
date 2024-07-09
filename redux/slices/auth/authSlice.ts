import { createSlice, UnknownAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';

import * as authApi from '@/api/auth';
import { RootState } from '@/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface authState {
  error: null;
  isLoading: boolean;
  user: null; // user type
  isAuthenticateLoading: boolean;
}
const initialState: authState = {
  error: null,
  isLoading: false,
  user: null,
  isAuthenticateLoading: false
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsAuthenticateLoading(state, action) {
      state.isAuthenticateLoading = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setError, setIsLoading, setIsAuthenticateLoading, setUser, clearUser } = authSlice.actions;

export const logIn =
  (
    data: { email: string; password: string },
    callback: () => void
  ): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async dispatch => {
    try {
      dispatch(setIsLoading(true));

      const response = await authApi.logIn(data);

      const { jwtToken, user } = response.data;

      if (user) {
        dispatch(setUser(user));
        await AsyncStorage.setItem('@jwtToken', jwtToken);
        await AsyncStorage.setItem('@user', JSON.stringify(user));

        if (callback) {
          callback();
        }
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(setError(error.response?.data.error || 'Something went wrong.'));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const signUp =
  (
    data: { name?: string; password: string; email: string },
    callback: () => void
  ): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async dispatch => {
    dispatch(setIsLoading(true));

    try {
      await authApi.signUp(data);

      if (callback) {
        callback();
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(setError(error?.response?.data?.error || 'Something went wrong.'));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  export const fetchProfile =
  (callback?: () => void): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (
    dispatch
  ) => {

    try {
      dispatch(setIsAuthenticateLoading(true));
      const response = await authApi.fetchProfile();

      const { user } = response.data;

      if (user) {
        dispatch(setUser(user));
        await AsyncStorage.setItem("@user", JSON.stringify(user));
      }
    } catch (error: unknown) {
      if (callback) {
        dispatch(logout(callback));
      }
      // if (error instanceof AxiosError) {
      //   dispatch(
      //     setError(error?.response?.data?.message || "Something went wrong."),
      //   );
      // }
    } finally {
      dispatch(setIsAuthenticateLoading(false));
    }
  };

export const logout =
  (callBack?: () => void): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async dispatch => {
    dispatch(clearUser());
    await AsyncStorage.removeItem('@jwtToken');
    await AsyncStorage.removeItem('@user');
    if (callBack) {
      callBack();
    }
  };

export const authSelector = (state: { auth: authState }) => state.auth;

export const authReducer = authSlice.reducer;
