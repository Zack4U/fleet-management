import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brand: "",
    type: "",
    voltage: 0,
    amperage: 0,
    in_use: false,
    batteries: [],
};

const batterySlice = createSlice({
    name: "battery",
    initialState: [],
    reducers: {
        addBattery: (state, action) => {
            state.brand = action.payload.brand;
            state.type = action.payload.type;
            state.voltage = action.payload.voltage;
            state.amperage = action.payload.amperage;
            state.in_use = action.payload.in_use;
        },

        getBatteriess: (state, action) => {
            state.Battery = action.payload;
        },

        getBattery: (state, action) => {
            console.log(
                "getBatteryById action triggered with id:",
                action.payload
            );
        },

        updateBattery: (state, action) => {
            const { updatedBatteryData } = action.payload;
            return {
                ...state,
                ...updatedBatteryData,
            };
        },

        deleteBattery: (state, action) => {
            state.Battery = state.Battery.filter(
                (Battery) => Battery.id !== action.payload
            );
        },
    },
});

export const {
    addBattery,
    getBatteriess,
    getBattery,
    updateBattery,
    deleteBattery,
} = batterySlice.actions;

export default batterySlice.reducer;
