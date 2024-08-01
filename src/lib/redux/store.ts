import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";

const rootReducer = {
  auth: authSlice,
  user: userSlice
};

const store = configureStore({
  reducer: rootReducer,
});


export default store;