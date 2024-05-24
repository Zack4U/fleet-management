import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import vehicleReducer from "./vehicleSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        vehicle: vehicleReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
