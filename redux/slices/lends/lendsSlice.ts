import { createSlice, PayloadAction, ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RootState } from '@/redux/store';
import * as lendsApi from '@/api/lends';

import { lendsSchemaType } from '@/utils/schema';

export interface Lends {
  name: string;
  amount: string;
  type: string;
  id?: number;
}

interface LendsState {
  log: Lends[];
  error: null;
  isLoading: boolean;
  allLends: lendsSchemaType[];
  weekLends: lendsSchemaType[];
  monthLends: lendsSchemaType[];
}

const initialState: LendsState = {
  log: [],
  error: null,
  isLoading: false,
  allLends: [],
  weekLends: [],
  monthLends: [],
};

export const LendsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    addLends: (state, action: PayloadAction<{ name: string; amount: string; type: string }>) => {
      state.log.push({
        id: Math.floor(Math.random() * 9999),
        name: action.payload.name,
        amount: action.payload.amount,
        type: action.payload.type,
      });
    },
    editLends: (
      state,
      action: PayloadAction<{ id: number; name: string; amount: string; type: string }>
    ) => {
      state.log.map((data: Lends) => {
        if (data.id === action.payload.id) {
          data.name = action.payload.name;
          data.amount = action.payload.amount;
          data.amount = action.payload.type;
        } else {
          return data;
        }
      });
    },
    deleteLends: (state, action: PayloadAction<{ id: number }>) => {
      state.log = state.log.filter(log => log.id !== action.payload.id);
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setAllLends(state, action) {
      state.allLends = action.payload;
    },
    setWeekLends(state, action) {
      state.weekLends = action.payload;
    },
    setMonthLends(state, action) {
      state.monthLends = action.payload;
    },
    // clearLend(state) {
    //   state.lends = null;
    // },
  },
});

export const {
  addLends,
  editLends,
  deleteLends,
  setError,
  setIsLoading,
  setAllLends,
  setWeekLends,
  setMonthLends
  // clearLend,
} = LendsSlice.actions;

export const add =
  (
    data: lendsSchemaType,
    callback: () => void
  ): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async dispatch => {
    dispatch(setIsLoading(true));

    try {
      await lendsApi.add(data);

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

export const getAllLends =
  (): ThunkAction<void, RootState, unknown, UnknownAction> => async dispatch => {
    try {
      dispatch(setIsLoading(true));
      const response = await lendsApi.getAll();

      const { allLends, weekLends, monthLends } = response.data;

      if (allLends.length) {
        dispatch(setAllLends(allLends));
      }
      if (weekLends.length) {
        dispatch(setWeekLends(weekLends));
      }
      if (monthLends.length) {
        dispatch(setMonthLends(monthLends));
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(setError(error?.response?.data?.message || 'Something went wrong.'));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const lendsSelector = (state: { lends: LendsState }) => state.lends;

export const lendsReducer = LendsSlice.reducer;
