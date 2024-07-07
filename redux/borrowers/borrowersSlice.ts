import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Borrower {
  name: string;
  amount: string;
  type: string;
  id: number;
}

interface BorrowerState {
  log: Borrower[];
}

const initialState: BorrowerState = {
  log: [],
};

export const BorrowersSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    addBorrower: (
      state,
      action: PayloadAction<{ name: string; amount: string, type: string }>
    ) => {
      state.log.push({
        id: Math.floor(Math.random() * 9999),
        name: action.payload.name,
        amount: action.payload.amount,
        type: action.payload.type,
      });
    },
    editBorrower: (
      state,
      action: PayloadAction<{ id: number; name: string; amount: string, type:string }>
    ) => {
      state.log.map(
        (data: { amount: string; name: string; type: string, id: number }) => {
          if (data.id === action.payload.id) {
            data.name = action.payload.name;
            data.amount = action.payload.amount;
            data.amount = action.payload.type;
          } else {
            return data;
          }
        }
      );
    },
    deleteBorrower: (state, action: PayloadAction<{ id: number }>) => {
      state.log = state.log.filter(
        (log) => log.id !== action.payload.id
      );
    },
  },
});

export default BorrowersSlice.reducer;
export const { addBorrower, editBorrower, deleteBorrower } = BorrowersSlice.actions;