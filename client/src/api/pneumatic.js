import { PATHS } from "../utils/config";

export class Pneumatic {
    pneumaticAPI = PATHS.BASE_PATH + PATHS.API_ROUTES.PNEUMATICS;
    get = PATHS.PNEUMATIC_ROUTES.GET;
    getById = PATHS.PNEUMATIC_ROUTES.GET_BY_ID;
    create = PATHS.PNEUMATIC_ROUTES.CREATE;
    update = PATHS.PNEUMATIC_ROUTES.UPDATE;
    delete = PATHS.PNEUMATIC_ROUTES.DELETE;

    token = localStorage.getItem("token");

    addPneumatic = async (formData) => {
        const URL = `${this.pneumaticAPI}${this.create}`;
        console.log(`[PNEUMATIC API] ${URL}`);
        try {
            console.log(`[PNEUMATIC API] ${formData}`);
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
            console.log("[PNEUMATIC API] Error creating pneumatic: ", error);
        }
    };

    getPneumatics = async () => {
        const URL = `${this.pneumaticAPI}${this.get}`;
        console.log(`[PNEUMATIC API] ${URL}`);
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
            console.log("[PNEUMATIC API] Error getting pneumatic: ", error);
        }
    };

    getPneumatic = async (id) => {
        console.log(id);
        const URL = `${this.pneumaticAPI}${this.getById}${id}`;
        console.log(`[PNEUMATIC API] ${URL}`);
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
            console.log("[PNEUMATIC API] Error getting pneumatic: ", error);
        }
    };

    deletePneumatic = async (id) => {
        const URL = `${this.pneumaticAPI}${this.delete}/${id}`;
        console.log(`[PNEUMATIC API] ${URL}`);
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
            console.log("[PNEUMATIC API] Error deleting pneumatic: ", error);
        }
    };

    updatePneumatic = async (id, formData) => {
        const URL = `${this.pneumaticAPI}${this.update}/${id}`;
        console.log(`[PNEUMATIC API] ${URL}`);
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
            console.log("[PNEUMATIC API] Error updating pneumatic: ", error);
        }
    };
}
