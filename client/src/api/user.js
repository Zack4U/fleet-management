import { PATHS } from "../utils/config";

export class User {
    usersAPI = PATHS.BASE_PATH + PATHS.API_ROUTES.USERS;
    get = PATHS.USER_ROUTES.GET;
    getById = PATHS.USER_ROUTES.GET_BY_ID;
    create = PATHS.USER_ROUTES.CREATE;
    update = PATHS.USER_ROUTES.UPDATE;
    delete = PATHS.USER_ROUTES.DELETE;

    addUser = async (formData) => {
        const URL = `${this.usersAPI}${this.create}`;
        console.log(`[USER API] ${URL}`);
        try {
            console.log(`[USER API] ${formData}`);
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
            console.log("[USER API] Error creating user: ", error);
        }
    };

    getUsers = async () => {
        const URL = `${this.usersAPI}${this.get}`;
        console.log(`[USER API] ${URL}`);
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
            console.log("[USER API] Error getting users: ", error);
        }
    };

    getUser = async (id) => {
        const URL = `${this.usersAPI}${this.getById}/${id}`;
        console.log(`[USER API] ${URL}`);
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
            console.log("[USER API] Error getting user: ", error);
        }
    };

    deleteUser = async (id) => {
        const URL = `${this.usersAPI}${this.delete}/${id}`;
        console.log(`[USER API] ${URL}`);
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
            console.log("[USER API] Error deleting user: ", error);
        }
    };

    updateUser = async (id, formData) => {
        const URL = `${this.usersAPI}${this.update}/${id}`;
        console.log(`[USER API] ${URL}`);
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
            console.log("[USER API] Error updating user: ", error);
        }
    };
}
