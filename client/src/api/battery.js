import { PATHS } from "../utils/config";

export class Battery {
    batteryAPI = PATHS.BASE_PATH + PATHS.API_ROUTES.BATTERIES;
    get = PATHS.BATTERY_ROUTES.GET;
    getById = PATHS.BATTERY_ROUTES.GET_BY_ID;
    create = PATHS.BATTERY_ROUTES.CREATE;
    update = PATHS.BATTERY_ROUTES.UPDATE;
    delete = PATHS.BATTERY_ROUTES.DELETE;

    token = localStorage.getItem("token");

    addBattery = async (formData) => {
        const URL = `${this.batteryAPI}${this.create}`;
        console.log(`[BATTERY API] ${URL}`);
        try {
            console.log(`[BATTERY API] ${formData}`);
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
            console.log("[BATTERY API] Error creating battery: ", error);
        }
    };

    getBatteries = async () => {
        const URL = `${this.batteryAPI}${this.get}`;
        console.log(`[BATTERY API] ${URL}`);
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
            console.log("[BATTERY API] Error getting batteries: ", error);
        }
    };

    getBattery = async (id) => {
        console.log(id);
        const URL = `${this.batteryAPI}${this.getById}${id}`;
        console.log(`[BATTERY API] ${URL}`);
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
            console.log("[BATTERY API] Error getting battery: ", error);
        }
    };

    deleteBattery = async (id) => {
        const URL = `${this.batteryAPI}${this.delete}/${id}`;
        console.log(`[BATTERY API] ${URL}`);
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
            console.log("[BATTERY API] Error deleting battery: ", error);
        }
    };

    updateBattery = async (id, formData) => {
        const URL = `${this.batteryAPI}${this.update}/${id}`;
        console.log(`[BATTERY API] ${URL}`);
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
            console.log("[BATTERY API] Error updating battery: ", error);
        }
    };
}
