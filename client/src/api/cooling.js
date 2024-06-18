import { PATHS } from "../utils/config";

export class Cooling {
    coolingAPI = PATHS.BASE_PATH + PATHS.API_ROUTES.COOLINGS;
    get = PATHS.COOLING_ROUTES.GET;
    getById = PATHS.COOLING_ROUTES.GET_BY_ID;
    create = PATHS.COOLING_ROUTES.CREATE;
    update = PATHS.COOLING_ROUTES.UPDATE;
    delete = PATHS.COOLING_ROUTES.DELETE;
    getVehicle = PATHS.COOLING_ROUTES.GET_VEHICLE_COOLINGS;

    token = localStorage.getItem("token");

    addCooling = async (formData) => {
        const URL = `${this.coolingAPI}${this.create}`;
        console.log(`[COOLING API] ${URL}`);
        try {
            console.log(`[COOLING API] ${formData}`);
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
            console.log("[COOLING API] Error creating cooling: ", error);
        }
    };

    getCoolings = async () => {
        const URL = `${this.coolingAPI}${this.get}`;
        console.log(`[COOLING API] ${URL}`);
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
            console.log("[COOLING API] Error getting cooling: ", error);
        }
    };

    getCooling = async (id) => {
        console.log(id);
        const URL = `${this.coolingAPI}${this.getById}${id}`;
        console.log(`[COOLING API] ${URL}`);
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
            console.log("[COOLING API] Error getting cooling: ", error);
        }
    };

    deleteCooling = async (id) => {
        const URL = `${this.coolingAPI}${this.delete}/${id}`;
        console.log(`[COOLING API] ${URL}`);
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
            console.log("[COOLING API] Error deleting cooling: ", error);
        }
    };

    updateCooling = async (id, formData) => {
        const URL = `${this.coolingAPI}${this.update}/${id}`;
        console.log(`[COOLING API] ${URL}`);
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
            console.log("[COOLING API] Error updating cooling: ", error);
        }
    };

    getVehicleCoolings = async (id) => {
        const URL = `${this.coolingAPI}${this.getVehicle}/${id}`;
        console.log(`[COOLING API] ${URL}`);
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
            console.log(
                "[COOLING API] Error getting vehicle coolings: ",
                error
            );
        }
    };
}
