import { PATHS } from "../utils/config";

export class Route {
    routesAPI = PATHS.BASE_PATH + PATHS.API_ROUTES.ROUTES;
    get = PATHS.ROUTE_ROUTES.GET;
    getById = PATHS.ROUTE_ROUTES.GET_BY_ID;
    create = PATHS.ROUTE_ROUTES.CREATE;
    update = PATHS.ROUTE_ROUTES.UPDATE;
    delete = PATHS.ROUTE_ROUTES.DELETE;
    getVehicleRoutes = PATHS.ROUTE_ROUTES.GET_VEHICLE_ROUTES;

    addRoute = async (formData) => {
        const URL = `${this.routesAPI}${this.create}`;
        console.log(`[ROUTE API] ${URL}`);
        try {
            console.log(`[ROUTE API] ${formData}`);
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
            console.log("[ROUTE API] Error creating route: ", error);
        }
    };

    getRoutes = async () => {
        const URL = `${this.routesAPI}${this.get}`;
        console.log(`[ROUTE API] ${URL}`);
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
            console.log("[ROUTE API] Error getting routes: ", error);
        }
    };

    getRoute = async (id) => {
        const URL = `${this.routesAPI}${this.getById}${id}`;
        console.log(`[ROUTE API] ${URL}`);
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
            console.log("[ROUTE API] Error getting route: ", error);
        }
    };

    deleteRoute = async (id) => {
        const URL = `${this.routesAPI}${this.delete}/${id}`;
        console.log(`[ROUTE API] ${URL}`);
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
            console.log("[ROUTE API] Error deleting route: ", error);
        }
    };

    updateRoute = async (id, formData) => {
        const URL = `${this.routesAPI}${this.update}/${id}`;
        console.log(`[ROUTE API] ${URL}`);
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
            console.log("[ROUTE API] Error updating route: ", error);
        }
    };

    getVehicleRoutes = async (vehicleId) => {
        const URL = `${this.routesAPI}${this.getVehicleRoutes}/${vehicleId}`;
        console.log(`[ROUTE API] ${URL}`);
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
            console.log("[ROUTE API] Error getting vehicle routes: ", error);
        }
    };
}
