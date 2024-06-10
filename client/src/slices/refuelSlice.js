import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    liters: 0,
    type: "",
    cost: 0,
    refuels: [],
};

const refuelSlice = createSlice({
    name: "refuel",
    initialState: [],
    reducers: {
        addRefuel: (state, action) => {
            state.liters = action.payload.liters;
            state.type = action.payload.type;
            state.cost = action.payload.cost;
        },

        getRefuels: (state, action) => {
            state.refuel = action.payload;
        },

        getRefuel: (state, action) => {
            console.log(
                "getRefuelById action triggered with id:",
                action.payload
            );
        },

        updateRefuel: (state, action) => {
            const { updatedRefuelData } = action.payload;
            return {
                ...state,
                ...updatedRefuelData,
            };
        },

        deleteRefuel: (state, action) => {
            state.refuel = state.refuel.filter(
                (refuel) => refuel.id !== action.payload
            );
        },
    },
});

export const { addReuel, getRefuels, getRefuel, updateRefuel, deleteRefuel } =
    refuelSlice.actions;

export default refuelSlice.reducer;
