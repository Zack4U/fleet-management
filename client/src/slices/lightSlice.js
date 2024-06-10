import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brand: "",
    type: "",
    position: " ",
    in_use: false,
    lights: [],
};

const lightSlice = createSlice({
    name: "light",
    initialState: [],
    reducers: {
        addLight: (state, action) => {
            state.brand = action.payload.brand;
            state.type = action.payload.type;
            state.position = action.payload.position;
            state.in_use = action.payload.in_use;
        },

        getLights: (state, action) => {
            state.Light = action.payload;
        },

        getLight: (state, action) => {
            console.log(
                "getLightById action triggered with id:",
                action.payload
            );
        },

        updateLight: (state, action) => {
            const { updatedLightData } = action.payload;
            return {
                ...state,
                ...updatedLightData,
            };
        },

        deleteLight: (state, action) => {
            state.Light = state.Light.filter(
                (Light) => Light.id !== action.payload
            );
        },
    },
});

export const { addLight, getLights, getLight, updateLight, deleteLight } =
    lightSlice.actions;

export default lightSlice.reducer;
