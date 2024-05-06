import { PATHS } from "../utils/config";

export class User {
    usersAPI = PATHS.BASE_PATH + PATHS.API_ROUTES.USERS;

    createUser = async (formData) => {
        try {
            console.log(`[USER API] ${formData}`);
            const params = {
                method: "POST",
                body: formData,
            };
            const res = await fetch(this.usersAPI, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[USER API] Error creating user: ", error);
        }
    };

    getUsers = async () => {
        try {
            const params = {
                method: "GET",
            };
            const res = await fetch(this.usersAPI, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[USER API] Error creating user: ", error);
        }
    };

    getUser = async (id) => {
        try {
            const params = {
                method: "GET",
            };
            const res = await fetch(`${this.usersAPI}/${id}`, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[USER API] Error creating user: ", error);
        }
    };

    deleteUser = async (id) => {
        try {
            const params = {
                method: "DELETE",
            };
            const res = await fetch(`${this.usersAPI}/${id}`, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[USER API] Error creating user: ", error);
        }
    };

    updateUser = async (id, formData) => {
        try {
            const params = {
                method: "PATCH",
                body: formData,
            };
            const res = await fetch(`${this.usersAPI}/${id}`, params);
            if (!res.ok) throw new Error(await res.text());
            const data = res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("[USER API] Error creating user: ", error);
        }
    };
}
