import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    liters: 0,
    available: 0,
    fuels: [],
};

const fuelSlice = createSlice({
    name: "fuel",
    initialState: [],
    reducers: {
        addFuel: (state, action) => {
            state.liters = action.payload.liters;
            state.available = action.payload.available;
        },

        getFuels: (state, action) => {
            state.fuel = action.payload;
        },

        getFuel: (state, action) => {
            console.log(
                "getFuelById action triggered with id:",
                action.payload
            );
        },

        updateFuel: (state, action) => {
            const { updatedFuelData } = action.payload;
            return {
                ...state,
                ...updatedFuelData,
            };
        },

        deleteFuel: (state, action) => {
            state.fuel = state.fuel.filter(
                (fuel) => fuel.id !== action.payload
            );
        },
    },
});

export const { addFuel, getFuels, getFuel, updateFuel, deleteFuel } =
    fuelSlice.actions;

export default fuelSlice.reducer;
