import { PATHS } from "../utils/config";

export class Light {
    lightAPI = PATHS.BASE_PATH + PATHS.API_ROUTES.LIGHTS;
    get = PATHS.LIGHT_ROUTES.GET;
    getById = PATHS.LIGHT_ROUTES.GET_BY_ID;
    create = PATHS.LIGHT_ROUTES.CREATE;
    update = PATHS.LIGHT_ROUTES.UPDATE;
    delete = PATHS.LIGHT_ROUTES.DELETE;

    token = localStorage.getItem("token");

    addLight = async (formData) => {
        const URL = `${this.lightAPI}${this.create}`;
        console.log(`[LIGHT API] ${URL}`);
        try {
            console.log(`[LIGHT API] ${formData}`);
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
            console.log("[LIGHT API] Error creating light: ", error);
        }
    };

    getLights = async () => {
        const URL = `${this.lightAPI}${this.get}`;
        console.log(`[LIGHT API] ${URL}`);
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
            console.log("[LIGHT API] Error getting light: ", error);
        }
    };

    getLight = async (id) => {
        console.log(id);
        const URL = `${this.lightAPI}${this.getById}${id}`;
        console.log(`[LIGHT API] ${URL}`);
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
            console.log("[LIGHT API] Error getting light: ", error);
        }
    };

    deleteLight = async (id) => {
        const URL = `${this.lightAPI}${this.delete}/${id}`;
        console.log(`[LIGHT API] ${URL}`);
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
            console.log("[LIGHT API] Error deleting light: ", error);
        }
    };

    updateLight = async (id, formData) => {
        const URL = `${this.lightAPI}${this.update}/${id}`;
        console.log(`[LIGHT API] ${URL}`);
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
            console.log("[LIGHT API] Error updating light: ", error);
        }
    };
}
