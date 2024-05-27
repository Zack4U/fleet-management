import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import vehicleReducer from "./vehicleSlice";
import taskReducer from "./taskSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        vehicle: vehicleReducer,
        task: taskReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
