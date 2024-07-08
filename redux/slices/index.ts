import { combineReducers } from "@reduxjs/toolkit";

import { authReducer } from "./auth/authSlice";
import { borrowerReducer } from "./borrowers/borrowersSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  borrower: borrowerReducer,

});

export default rootReducer;