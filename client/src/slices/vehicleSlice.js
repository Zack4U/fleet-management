import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    plate: "",
    brand: "",
    model: "",
    type: "",
    kilometers: 0,
    capacity: 0,
    legals: "",
    statusId: "",
    fuelId: "",
    Pneumatics: [],
    OilId: "",
    CoolingId: "",
    Lights: [],
    BatteryId: "",
    maintenance: [],
    image: "",
    vehicles: [],
};

const vehicleSlice = createSlice({
    name: "vehicle",
    initialState,
    reducers: {
        addVehicle: (state, action) => {
            state.plate = action.payload.plate;
            state.brand = action.payload.brand;
            state.model = action.payload.model;
            state.type = action.payload.type;
            state.capacity = action.payload.capacity;
            state.kilometers = action.payload.kilometers;
            state.legals = action.payload.legals;
            state.statusId = action.payload.statusId;
            state.fuelId = action.payload.fuelId;
            state.Pneumatics = action.payload.Pneumatics;
            state.OilId = action.payload.OilId;
            state.CoolingId = action.payload.CoolingId;
            state.Lights = action.payload.Lights;
            state.BatteryId = action.payload.BatteryId;
            state.maintenance = action.payload.maintenance;
            state.image = action.payload.image;
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
