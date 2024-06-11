import { PATHS } from "../utils/config";

export class Fuel {
    fuelAPI = PATHS.BASE_PATH + PATHS.API_ROUTES.FUELS;
    get = PATHS.FUEL_ROUTES.GET;
    getById = PATHS.FUEL_ROUTES.GET_BY_ID;
    create = PATHS.FUEL_ROUTES.CREATE;
    update = PATHS.FUEL_ROUTES.UPDATE;
    delete = PATHS.FUEL_ROUTES.DELETE;
    getRefuelsURL = PATHS.FUEL_ROUTES.GET_REFUELS;
    refuelURL = PATHS.FUEL_ROUTES.REFUEL;
    spend = PATHS.FUEL_ROUTES.SPEND;

    token = localStorage.getItem("token");

    addFuel = async (formData) => {
        const URL = `${this.fuelAPI}${this.create}`;
        console.log(`[FUEL API] ${URL}`);
        try {
            console.log(`[FUEL API] ${formData}`);
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
            console.log("[FUEL API] Error creating fuel: ", error);
        }
    };

    getFuels = async () => {
        const URL = `${this.fuelAPI}${this.get}`;
        console.log(`[FUEL API] ${URL}`);
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
            console.log("[FUEL API] Error getting fuel: ", error);
        }
    };

    getFuel = async (id) => {
        console.log(id);
        const URL = `${this.fuelAPI}${this.getById}${id}`;
        console.log(`[FUEL API] ${URL}`);
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
            console.log("[FUEL API] Error getting fuel: ", error);
        }
    };

    deleteFuel = async (id) => {
        const URL = `${this.fuelAPI}${this.delete}/${id}`;
        console.log(`[FUEL API] ${URL}`);
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
            console.log("[FUEL API] Error deleting fuel: ", error);
        }
    };

    updateFuel = async (id, formData) => {
        const URL = `${this.fuelAPI}${this.update}/${id}`;
        console.log(`[FUEL API] ${URL}`);
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
            console.log("[FUEL API] Error updating fuel: ", error);
        }
    };

    getRefuels = async (id) => {
        const URL = `${this.fuelAPI}${this.getRefuelsURL}/${id}`;
        console.log(`[FUEL API] ${URL}`);
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
            console.log("[FUEL API] Error getting refuels: ", error);
        }
    };

    refuel = async (id, formData) => {
        const URL = `${this.fuelAPI}${this.refuelURL}/${id}`;
        console.log(`[FUEL API] ${URL}`);
        try {
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
            console.log("[FUEL API] Error refueling: ", error);
        }
    };

    spendFuel = async (id, formData) => {
        const URL = `${this.fuelAPI}${this.spend}/${id}`;
        console.log(`[FUEL API] ${URL}`);
        try {
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
            console.log("[FUEL API] Error spending fuel: ", error);
        }
    };
}
