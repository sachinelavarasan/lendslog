import { createSlice, PayloadAction, ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RootState } from '@/redux/store';
import * as lendsApi from '@/api/lends';

import { EditLendsSchemaType, lendsSchemaType } from '@/utils/schema';
import { IinstallmentTimelines, TodayLends, INotifications } from '@/utils/types/lends';

export interface Lends {
  name: string;
  amount: string;
  type: string;
  id?: number;
}

interface LendsState {
  timelines: IinstallmentTimelines[];
  error: null;
  isLoading: boolean;
  allLends: lendsSchemaType[];
  weekLends: lendsSchemaType[];
  monthLends: lendsSchemaType[];
  currentLend: lendsSchemaType | null;
  todayLends: TodayLends[];
  todayNotifications: INotifications[];
  olderNotifications: INotifications[];
}

const initialState: LendsState = {
  timelines: [],
  error: null,
  isLoading: false,
  allLends: [],
  weekLends: [],
  monthLends: [],
  currentLend: null,
  todayLends: [],
  todayNotifications: [],
  olderNotifications: [],
};

export const LendsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    addLends: (state, action: PayloadAction<IinstallmentTimelines>) => {
      state.timelines.push(action.payload);
    },
    editLends: (state, action: PayloadAction<IinstallmentTimelines>) => {
      state.timelines.map((data: IinstallmentTimelines) => {
        if (data.it_lend_id === action.payload.it_lend_id) {
          return { ...data };
        } else {
          return data;
        }
      });
    },
    deleteLends: (state, action: PayloadAction<{ id: number }>) => {
      state.timelines = state.timelines.filter(
        timeline => timeline.it_lend_id !== action.payload.id
      );
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
    setCurrentLend(state, action) {
      state.currentLend = action.payload;
    },
    setWeekLends(state, action) {
      state.weekLends = action.payload;
    },
    setMonthLends(state, action) {
      state.monthLends = action.payload;
    },
    setEditLend(
      state,
      action: PayloadAction<{ editLend: lendsSchemaType; ld_id: number; term_type: number }>
    ) {
      state.allLends = state.allLends.map(lend => {
        if (lend.ld_id === action.payload.ld_id) {
          return action.payload.editLend;
        }
        return lend;
      });
      if (action.payload.term_type === 1) {
        state.weekLends = state.weekLends.map(lend => {
          if (lend.ld_id === action.payload.ld_id) {
            return action.payload.editLend;
          }
          return lend;
        });
      } else {
        state.monthLends = state.monthLends.map(lend => {
          if (lend.ld_id === action.payload.ld_id) {
            return action.payload.editLend;
          }
          return lend;
        });
      }
    },
    setTodayLends(state, action) {
      state.todayLends = action.payload;
    },
    // clearLend(state) {
    //   state.lends = null;
    // },'   
     setTodayNotifications(state, action) {
      state.todayNotifications = action.payload;
    },
    setOlderNotifications(state, action) {
      state.olderNotifications = action.payload;
    },
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
  setMonthLends,
  // clearLend,
  setCurrentLend,
  setEditLend,
  setTodayLends,
  setTodayNotifications,
  setOlderNotifications
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
export const edit =
  (
    data: EditLendsSchemaType,
    ld_id: number,
    callback: (lend: any) => void
  ): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async dispatch => {
    dispatch(setIsLoading(true));

    try {
      const response = await lendsApi.edit(data, ld_id);
      const { lend } = response.data;
      dispatch(setCurrentLend(lend));
      dispatch(
        setEditLend({
          editLend: lend,
          ld_id,
          term_type: lend.ld_payment_term,
        })
      );

      if (callback) {
        callback(lend);
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

export const getTodayLends =
  (): ThunkAction<void, RootState, unknown, UnknownAction> => async dispatch => {
    try {
      dispatch(setIsLoading(true));
      const response = await lendsApi.getTodayLends();

      const { todayLends } = response.data;

      if (todayLends.length) {
        dispatch(setTodayLends(todayLends));
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(setError(error?.response?.data?.message || 'Something went wrong.'));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };



  export const getAllNotifications =
  (): ThunkAction<void, RootState, unknown, UnknownAction> => async dispatch => {
    try {
      dispatch(setIsLoading(true));
      const response = await lendsApi.getAllNotification();

      const { todayNotifications, olderNotifications } = response.data;

      if (todayNotifications.length) {
        dispatch(setTodayNotifications(todayNotifications));
      }
      if (olderNotifications.length) {
        dispatch(setOlderNotifications(olderNotifications));
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
