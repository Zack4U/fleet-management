import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import vehicleReducer from "./vehicleSlice";
import taskReducer from "./taskSlice";
import batteryReducer from "./batterySlice";
import oilReducer from "./oilSlice";
import lightReducer from "./lightSlice";
import coolingReducer from "./coolingSlice";
import fuelReducer from "./fuelSlice";
import pneumaticReducer from "./pneumaticSlice";
import refuelReducer from "./refuelSlice";
import maintenanceReducer from "./maintenanceSlice";
import routeReducer from "./routeSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        vehicle: vehicleReducer,
        task: taskReducer,
        battery: batteryReducer,
        oil: oilReducer,
        light: lightReducer,
        cooling: coolingReducer,
        fuel: fuelReducer,
        pneumatic: pneumaticReducer,
        refuel: refuelReducer,
        maintenance: maintenanceReducer,
        route: routeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
