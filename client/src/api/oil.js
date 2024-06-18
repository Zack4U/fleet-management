import { PATHS } from "../utils/config";

export class Oil {
    oilAPI = PATHS.BASE_PATH + PATHS.API_ROUTES.OILS;
    get = PATHS.OIL_ROUTES.GET;
    getById = PATHS.OIL_ROUTES.GET_BY_ID;
    create = PATHS.OIL_ROUTES.CREATE;
    update = PATHS.OIL_ROUTES.UPDATE;
    delete = PATHS.OIL_ROUTES.DELETE;
    getVehicle = PATHS.OIL_ROUTES.GET_VEHICLE_OILS;

    token = localStorage.getItem("token");

    addOil = async (formData) => {
        const URL = `${this.oilAPI}${this.create}`;
        console.log(`[OIL API] ${URL}`);
        try {
            console.log(`[OIL API] ${formData}`);
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
            console.log("[OIL API] Error creating oil: ", error);
        }
    };

    getOils = async () => {
        const URL = `${this.oilAPI}${this.get}`;
        console.log(`[OIL API] ${URL}`);
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
            console.log("[OIL API] Error getting oil: ", error);
        }
    };

    getOil = async (id) => {
        console.log(id);
        const URL = `${this.oilAPI}${this.getById}${id}`;
        console.log(`[OIL API] ${URL}`);
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
            console.log("[OIL API] Error getting oil: ", error);
        }
    };

    deleteOil = async (id) => {
        const URL = `${this.oilAPI}${this.delete}/${id}`;
        console.log(`[OIL API] ${URL}`);
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
            console.log("[OIL API] Error deleting oil: ", error);
        }
    };

    updateOil = async (id, formData) => {
        const URL = `${this.oilAPI}${this.update}/${id}`;
        console.log(`[OIL API] ${URL}`);
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
            console.log("[OIL API] Error updating oil: ", error);
        }
    };

    getVehicleOils = async (id) => {
        const URL = `${this.oilAPI}${this.getVehicle}/${id}`;
        console.log(`[OIL API] ${URL}`);
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
            console.log("[OIL API] Error getting vehicle oils: ", error);
        }
    };
}
