import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import contactReducer from "./contact-slice";
import usersReducer from "./user-slice";
import carReducer from "./car-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
    cars: carReducer,
    users: usersReducer,
  },
});

export default store;
