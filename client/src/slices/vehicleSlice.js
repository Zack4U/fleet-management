import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    plate: "",
    brand: "",
    line: "",
    model: "",
    type: "",
    capacity: 0,
    kilometers: 0,
    legals: "",
    statusId: "",
    fuelId: "",
    pneumatics: [],
    oil: [],
    cooling: [],
    lights: [],
    battery: [],
    maintenance: [],
    image: "",
    last_maintenance: "",
    last_oil_change: "",
    last_cooling_change: "",
    last_battery_change: "",
    last_light_change: "",
    last_pneumatic_change: "",
    cooling_change_period: "",
    oil_change_period: "",
    battery_review_period: "",
    pneumatic_review_period: "",
    light_review_period: "",
    vehicles: [],
};

const vehicleSlice = createSlice({
    name: "vehicle",
    initialState,
    reducers: {
        addVehicle: (state, action) => {
            state.plate = action.payload.plate;
            state.brand = action.payload.brand;
            state.line = action.payload.line;
            state.model = action.payload.model;
            state.type = action.payload.type;
            state.capacity = action.payload.capacity;
            state.kilometers = action.payload.kilometers;
            state.legals = action.payload.legals;
            state.statusId = action.payload.statusId;
            state.fuelId = action.payload.fuelId;
            state.pneumatics = action.payload.pneumatics;
            state.oil = action.payload.oil;
            state.cooling = action.payload.cooling;
            state.lights = action.payload.lights;
            state.battery = action.payload.battery;
            state.maintenance = action.payload.maintenance;
            state.image = action.payload.image;
            state.last_maintenance = action.payload.last_maintenance;
            state.last_oil_change = action.payload.last_oil_change;
            state.last_cooling_change = action.payload.last_cooling_change;
            state.last_battery_change = action.payload.last_battery_change;
            state.last_light_change = action.payload.last_light_change;
            state.last_pneumatic_change = action.payload.last_pneumatic_change;
            state.cooling_change_period = action.payload.cooling_change_period;
            state.oil_change_period = action.payload.oil_change_period;
            state.battery_review_period = action.payload.battery_review_period;
            state.pneumatic_review_period =
                action.payload.pneumatic_review_period;
            state.light_review_period = action.payload.light_review_period;
            state.vehicles = action.payload.vehicles;
        },

        getVehicles: (state, action) => {
            state.vehicles = action.payload;
        },

        getVehicle: (state, action) => {
            console.log(
                "getVehicleById action triggered with id:",
                action.payload
            );
        },

        editVehicle: (state, action) => {
            const { updatedVehicleData } = action.payload;
            return {
                ...state,
                ...updatedVehicleData,
            };
        },

        deleteVehicle: (state, action) => {
            state.vehicles = state.vehicles.filter(
                (vehicle) => vehicle.id !== action.payload
            );
        },
    },
});

export const {
    addVehicle,
    getVehicles,
    getVehicle,
    editVehicle,
    deleteVehicle,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;
