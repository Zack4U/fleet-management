import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brand: "",
    type: "",
    liters: 0,
    in_use: false,
    oils: [],
};

const oilSlice = createSlice({
    name: "oil",
    initialState: [],
    reducers: {
        addOil: (state, action) => {
            state.brand = action.payload.brand;
            state.type = action.payload.type;
            state.liters = action.payload.liters;
            state.in_use = action.payload.in_use;
        },

        getOils: (state, action) => {
            state.Oil = action.payload;
        },

        getOil: (state, action) => {
            console.log("getOilById action triggered with id:", action.payload);
        },

        updateOil: (state, action) => {
            const { updatedOilData } = action.payload;
            return {
                ...state,
                ...updatedOilData,
            };
        },

        deleteOil: (state, action) => {
            state.Oil = state.Oil.filter((Oil) => Oil.id !== action.payload);
        },
    },
});

export const { addOil, getOils, getOil, updateOil, deleteOil } =
    oilSlice.actions;

export default oilSlice.reducer;
