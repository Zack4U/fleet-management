import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brand: "",
    model: "",
    size: "",
    type: "",
    wear: 0,
    pressure: 0,
    diameter: 0,
    width: 0,
    height: 0,
    position: "",
    in_use: true,
    pneumatics: [],
};

const pneumaticSlice = createSlice({
    name: "pneumatic",
    initialState: [],
    reducers: {
        addPneumatic: (state, action) => {
            state.brand = action.payload.brand;
            state.model = action.payload.model;
            state.size = action.payload.size;
            state.type = action.payload.type;
            state.wear = action.payload.wear;
            state.pressure = action.payload.pressure;
            state.diameter = action.payload.diameter;
            state.width = action.payload.width;
            state.height = action.payload.height;
            state.position = action.payload.position;
            state.in_use = action.payload.in_use;
        },

        getPneumatic: (state, action) => {
            state.Pneumatic = action.payload;
        },

        getPneumatic: (state, action) => {
            console.log(
                "getPneumaticById action triggered with id:",
                action.payload
            );
        },

        updatePneumatic: (state, action) => {
            const { updatedPneumaticData } = action.payload;
            return {
                ...state,
                ...updatedPneumaticData,
            };
        },

        deletePneumatic: (state, action) => {
            state.Pneumatic = state.Pneumatic.filter(
                (Pneumatic) => Pneumatic.id !== action.payload
            );
        },
    },
});

export const {
    addPneumatic,
    getPneumatic,
    getPneumatics,
    updatePneumatic,
    deletePneumatic,
} = pneumaticSlice.actions;

export default pneumaticSlice.reducer;
