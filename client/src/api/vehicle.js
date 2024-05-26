import { PATHS } from "../utils/config";

export class Vehicle {
    vehicleAPI = PATHS.BASE_PATH + PATHS.API_ROUTES.VEHICLES;
    get = PATHS.VEHICLE_ROUTES.GET;
    getById = PATHS.VEHICLE_ROUTES.GET_BY_ID;
    create = PATHS.VEHICLE_ROUTES.CREATE;
    update = PATHS.VEHICLE_ROUTES.UPDATE;
    delete = PATHS.VEHICLE_ROUTES.DELETE;
    getImage = PATHS.VEHICLE_ROUTES.GET_IMAGE;

    addVehicle = async (formData) => {
        const URL = `${this.vehicleAPI}${this.create}`;
        console.log(`[VEHICLE API] ${URL}`);
        try {
            console.log(`[VEHICLE API] ${formData}`);
            const params = {
                method: "POST",
                body: formData,
            };
            const res = await fetch(URL, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[VEHICLE API] Error creating vehicle: ", error);
        }
    };

    getVehicles = async () => {
        const URL = `${this.vehicleAPI}${this.get}`;
        console.log(`[VEHICLE API] ${URL}`);
        try {
            const params = {
                method: "GET",
            };
            const res = await fetch(URL, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[VEHICLE API] Error getting vehicle: ", error);
        }
    };

    getVehicle = async (id) => {
        const URL = `${this.vehicleAPI}${this.getById}/${id}`;
        console.log(`[VEHICLE API] ${URL}`);
        try {
            const params = {
                method: "GET",
            };
            const res = await fetch(URL, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[VEHICLE API] Error getting vehicle: ", error);
        }
    };

    deleteVehicle = async (id) => {
        const URL = `${this.vehicleAPI}${this.delete}/${id}`;
        console.log(`[VEHICLE API] ${URL}`);
        try {
            const params = {
                method: "DELETE",
            };
            const res = await fetch(URL, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.text();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[VEHICLE API] Error deleting vehicle: ", error);
        }
    };

    updateVehicle = async (id, formData) => {
        const URL = `${this.vehicleAPI}${this.update}/${id}`;
        console.log(`[VEHICLE API] ${URL}`);
        console.log(formData);
        try {
            const params = {
                method: "PATCH",
                body: formData,
            };
            const res = await fetch(URL, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[VEHICLE API] Error updating vehicle: ", error);
        }
    };

    getImage = async (id) => {
        const URL = `${this.vehicleAPI}${this.getImage}/${id}`;
        console.log(`[VEHICLE API] ${URL}`);
        try {
            const params = {
                method: "GET",
            };
            const res = await fetch(URL, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[VEHICLE API] Error getting vehicle: ", error);
        }
    };
}
