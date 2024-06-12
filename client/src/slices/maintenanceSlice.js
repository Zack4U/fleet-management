import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    schedule_date: "",
    finish_date: "",
    type: "",
    cost: 0,
    notes: "",
    status: "",
    vehicleId: "",
    maintenances: [],
};

const maintenanceSlice = createSlice({
    name: "maintenance",
    initialState: [],
    reducers: {
        addMaintenance: (state, action) => {
            state.schedule_date = action.payload.schedule_date;
            state.type = action.payload.type;
            state.vehicleId = action.payload.vehicleId;
        },

        getMaintenances: (state, action) => {
            state.Maintenance = action.payload;
        },

        getMaintenance: (state, action) => {
            console.log(
                "getMaintenanceById action triggered with id:",
                action.payload
            );
        },

        updateMaintenance: (state, action) => {
            const { updatedMaintenanceData } = action.payload;
            return {
                ...state,
                ...updatedMaintenanceData,
            };
        },

        deleteMaintenance: (state, action) => {
            state.Maintenance = state.Maintenance.filter(
                (Maintenance) => Maintenance.id !== action.payload
            );
        },
    },
});

export const {
    addMaintenance,
    getMaintenances,
    getMaintenance,
    updateMaintenance,
    deleteMaintenance,
} = maintenanceSlice.actions;

export default maintenanceSlice.reducer;
