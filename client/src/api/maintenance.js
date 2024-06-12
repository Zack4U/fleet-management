import { PATHS } from "../utils/config";

export class Maintenance {
    maintenanceAPI = PATHS.BASE_PATH + PATHS.API_ROUTES.MAINTENANCES;
    get = PATHS.MAINTENANCE_ROUTES.GET;
    getById = PATHS.MAINTENANCE_ROUTES.GET_BY_ID;
    create = PATHS.MAINTENANCE_ROUTES.CREATE;
    update = PATHS.MAINTENANCE_ROUTES.UPDATE;
    delete = PATHS.MAINTENANCE_ROUTES.DELETE;
    getByVehicleId = PATHS.MAINTENANCE_ROUTES.GET_VEHICLE_MAINTENANCES;

    token = localStorage.getItem("token");

    addMaintenance = async (formData) => {
        const URL = `${this.maintenanceAPI}${this.create}`;
        console.log(`[MAINTENANCE API] ${URL}`);
        try {
            console.log(`[MAINTENANCE API] ${formData}`);
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
            console.log(
                "[MAINTENANCE API] Error creating maintenance: ",
                error
            );
        }
    };

    getMaintenances = async () => {
        const URL = `${this.maintenanceAPI}${this.get}`;
        console.log(`[MAINTENANCE API] ${URL}`);
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
            console.log("[MAINTENANCE API] Error getting maintenance: ", error);
        }
    };

    getMaintenance = async (id) => {
        console.log(id);
        const URL = `${this.maintenanceAPI}${this.getById}${id}`;
        console.log(`[MAINTENANCE API] ${URL}`);
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
            console.log("[MAINTENANCE API] Error getting maintenance: ", error);
        }
    };

    deleteMaintenance = async (id) => {
        const URL = `${this.maintenanceAPI}${this.delete}/${id}`;
        console.log(`[MAINTENANCE API] ${URL}`);
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
            console.log(
                "[MAINTENANCE API] Error deleting maintenance: ",
                error
            );
        }
    };

    updateMaintenance = async (id, formData) => {
        const URL = `${this.maintenanceAPI}${this.update}/${id}`;
        console.log(`[MAINTENANCE API] ${URL}`);
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
            console.log(
                "[MAINTENANCE API] Error updating maintenance: ",
                error
            );
        }
    };

    getVehicleMaintenances = async (id) => {
        const URL = `${this.maintenanceAPI}${this.getByVehicleId}/${id}`;
        console.log(`[MAINTENANCE API] ${URL}`);
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
                "[MAINTENANCE API] Error getting vehicle maintenance: ",
                error
            );
        }
    };
}
