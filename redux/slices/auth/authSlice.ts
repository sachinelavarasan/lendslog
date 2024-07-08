import { createSlice, UnknownAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';

import * as authApi from '@/api/auth';
import { RootState } from '@/redux/store';

interface authState {
  error: null;
  isLoading: boolean;
  user: null; // user type
}
const initialState: authState = {
  error: null,
  isLoading: false,
  user: null,
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
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setError, setIsLoading, setUser } = authSlice.actions;

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
        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('userId', user.us_id);

        if (callback) {
          callback();
        }
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(setError(error?.response?.data?.message || 'Something went wrong.'));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const signUp =
  (
    data: { name: string; password: string; email: string },
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
        dispatch(setError(error?.response?.data?.message || 'Something went wrong.'));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const logout =
  (callBack?: () => void): ThunkAction<void, RootState, unknown, UnknownAction> =>
  dispatch => {
    // dispatch(clearUser());
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    if (callBack) {
      callBack();
    }
  };

export const authSelector = (state: { auth: authState }) => state.auth;

export const authReducer = authSlice.reducer;
