import { combineReducers } from "@reduxjs/toolkit";

import { authReducer } from "./auth/authSlice";
import { lendsReducer } from "./lends/lendsSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  lends: lendsReducer,
});

export default rootReducer;