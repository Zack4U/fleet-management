import { PATHS } from "../utils/config";

export class Vehicle {
    vehicleAPI = PATHS.BASE_PATH + PATHS.API_ROUTES.VEHICLES;
    get = PATHS.VEHICLE_ROUTES.GET;
    getById = PATHS.VEHICLE_ROUTES.GET_BY_ID;
    create = PATHS.VEHICLE_ROUTES.CREATE;
    update = PATHS.VEHICLE_ROUTES.UPDATE;
    delete = PATHS.VEHICLE_ROUTES.DELETE;
    getImageURL = PATHS.VEHICLE_ROUTES.GET_IMAGE;
    changeOilURL = PATHS.VEHICLE_ROUTES.CHANGE_OIL;
    changeBatteryURL = PATHS.VEHICLE_ROUTES.CHANGE_BATTERY;
    changePneumaticURL = PATHS.VEHICLE_ROUTES.CHANGE_PNEUMATIC;
    changeLightURL = PATHS.VEHICLE_ROUTES.CHANGE_LIGHT;
    changeCoolingURL = PATHS.VEHICLE_ROUTES.CHANGE_COOLING;
    reviewBatteryURL = PATHS.VEHICLE_ROUTES.REVIEW_BATTERY;
    reviewPneumaticURL = PATHS.VEHICLE_ROUTES.REVIEW_PNEUMATIC;
    reviewLightURL = PATHS.VEHICLE_ROUTES.REVIEW_LIGHT;

    token = localStorage.getItem("token");

    addVehicle = async (formData) => {
        const URL = `${this.vehicleAPI}${this.create}`;
        console.log(`[VEHICLE API] ${URL}`);
        try {
            console.log(`[VEHICLE API] ${formData}`);
            const params = {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
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
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
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
        console.log(id);
        const URL = `${this.vehicleAPI}${this.getById}${id}`;
        console.log(`[VEHICLE API] ${URL}`);
        try {
            const params = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
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
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
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
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
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
        const URL = `${this.vehicleAPI}${this.getImageURL}/${id}`;
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

    changeOil = async (id) => {
        const URL = `${this.vehicleAPI}${this.changeOilURL}/${id}`;
        console.log(`[VEHICLE API] ${URL}`);
        try {
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            };
            const res = await fetch(URL, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[VEHICLE API] Error changing oil: ", error);
        }
    };

    changeBattery = async (id) => {
        const URL = `${this.vehicleAPI}${this.changeBatteryURL}/${id}`;
        console.log(`[VEHICLE API] ${URL}`);
        try {
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            };
            const res = await fetch(URL, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[VEHICLE API] Error changing battery: ", error);
        }
    };

    changePneumatic = async (id) => {
        const URL = `${this.vehicleAPI}${this.changePneumaticURL}/${id}`;
        console.log(`[VEHICLE API] ${URL}`);
        try {
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            };
            const res = await fetch(URL, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[VEHICLE API] Error changing pneumatic: ", error);
        }
    };

    changeCooling = async (id) => {
        const URL = `${this.vehicleAPI}${this.changeCoolingURL}/${id}`;
        console.log(`[VEHICLE API] ${URL}`);
        try {
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            };
            const res = await fetch(URL, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[VEHICLE API] Error changing cooling: ", error);
        }
    };

    changeLight = async (id) => {
        const URL = `${this.vehicleAPI}${this.changeLightURL}/${id}`;
        console.log(`[VEHICLE API] ${URL}`);
        try {
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            };
            const res = await fetch(URL, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[VEHICLE API] Error changing light: ", error);
        }
    };

    reviewBattery = async (id) => {
        const URL = `${this.vehicleAPI}${this.reviewBatteryURL}/${id}`;
        console.log(`[VEHICLE API] ${URL}`);
        try {
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            };
            const res = await fetch(URL, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[VEHICLE API] Error reviewing battery: ", error);
        }
    };

    reviewPneumatic = async (id) => {
        const URL = `${this.vehicleAPI}${this.reviewPneumaticURL}/${id}`;
        console.log(`[VEHICLE API] ${URL}`);
        try {
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            };
            const res = await fetch(URL, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[VEHICLE API] Error reviewing pneumatic: ", error);
        }
    };

    reviewLight = async (id) => {
        const URL = `${this.vehicleAPI}${this.reviewLightURL}/${id}`;
        console.log(`[VEHICLE API] ${URL}`);
        try {
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            };
            const res = await fetch(URL, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[VEHICLE API] Error reviewing light: ", error);
        }
    };
}
