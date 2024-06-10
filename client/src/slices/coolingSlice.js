import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brand: "",
    liters: 0,
    in_use: false,
    coolings: [],
};

const coolingSlice = createSlice({
    name: "cooling",
    initialState: [],
    reducers: {
        addCooling: (state, action) => {
            state.brand = action.payload.brand;
            state.liters = action.payload.liters;
            state.in_use = action.payload.in_use;
        },

        getCoolings: (state, action) => {
            state.cooling = action.payload;
        },

        getCooling: (state, action) => {
            console.log(
                "getcoolingById action triggered with id:",
                action.payload
            );
        },

        updateCooling: (state, action) => {
            const { updatedCoolingData } = action.payload;
            return {
                ...state,
                ...updatedCoolingData,
            };
        },

        deleteCooling: (state, action) => {
            state.cooling = state.cooling.filter(
                (cooling) => cooling.id !== action.payload
            );
        },
    },
});

export const {
    addCooling,
    getCoolings,
    getCooling,
    updateCooling,
    deleteCooling,
} = coolingSlice.actions;

export default coolingSlice.reducer;
