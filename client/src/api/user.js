import { PATHS } from "../utils/config";

export class User {
    usersAPI = PATHS.BASE_PATH + PATHS.API_ROUTES.USERS;
    get = PATHS.USER_ROUTES.GET;
    getById = PATHS.USER_ROUTES.GET_BY_ID;
    create = PATHS.USER_ROUTES.CREATE;
    update = PATHS.USER_ROUTES.UPDATE;
    delete = PATHS.USER_ROUTES.DELETE;

    createUser = async (formData) => {
        console.log(`[USER API] ${this.usersAPI}${this.create}`);
        try {
            console.log(`[USER API] ${formData}`);
            const params = {
                method: "POST",
                body: formData,
            };
            const res = await fetch(`${this.usersAPI}${this.create}`, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[USER API] Error creating user: ", error);
        }
    };

    getUsers = async () => {
        console.log(`[USER API] ${this.usersAPI}${this.get}`);
        try {
            const params = {
                method: "GET",
            };
            const res = await fetch(`${this.usersAPI}${this.get}`, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[USER API] Error creating user: ", error);
        }
    };

    getUser = async (id) => {
        console.log(`[USER API] ${this.usersAPI}${this.getById}/${id}`);
        try {
            const params = {
                method: "GET",
            };
            const res = await fetch(
                `${this.usersAPI}${this.getById}/${id}`,
                params
            );
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[USER API] Error creating user: ", error);
        }
    };

    deleteUser = async (id) => {
        console.log(`[USER API] ${this.usersAPI}${this.delete}/${id}`);
        try {
            const params = {
                method: "DELETE",
            };
            const res = await fetch(
                `${this.usersAPI}${this.delete}/${id}`,
                params
            );
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[USER API] Error creating user: ", error);
        }
    };

    updateUser = async (id, formData) => {
        console.log(`[USER API] ${this.usersAPI}${this.update}/${id}`);
        try {
            const params = {
                method: "PATCH",
                body: formData,
            };
            const res = await fetch(
                `${this.usersAPI}${this.update}/${id}`,
                params
            );
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[USER API] Error creating user: ", error);
        }
    };
}
