import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    startLocation: "",
    endLocation: "",
    additionalLocations: [],
    startDateTime: "",
    endDateTime: "",
    duration: 0,
    distance: 0,
    dateScheduled: "",
    status: "",
    routes: [],
};

const routeSlice = createSlice({
    name: "route",
    initialState,
    reducers: {
        addRoute: (state, action) => {
            state.startLocation = action.payload.startLocation;
            state.endLocation = action.payload.endLocation;
            state.additionalLocations = action.payload.additionalLocations;
            state.startDateTime = action.payload.startDateTime;
            state.endDateTime = action.payload.endDateTime;
            state.duration = action.payload.duration;
            state.distance = action.payload.distance;
            state.dateScheduled = action.payload.dateScheduled;
            state.status = action.payload.status;
        },

        getRoutes: (state, action) => {
            state.routes = action.payload;
        },

        getRoute: (state, action) => {
            console.log(
                "getRouteById action triggered with id:",
                action.payload
            );
        },

        updateRoute: (state, action) => {
            const { updatedRouteData } = action.payload;
            return {
                ...state,
                ...updatedRouteData,
            };
        },

        deleteRoute: (state, action) => {
            state.routes = state.routes.filter(
                (route) => route.id !== action.payload
            );
        },
    },
});

export const { addRoute, getRoutes, getRoute, updateRoute, deleteRoute } =
    routeSlice.actions;

export default routeSlice.reducer;
