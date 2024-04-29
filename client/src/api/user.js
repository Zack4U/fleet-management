import { PATHS } from "../utils/config";

export class User {
    usersAPI = PATHS.BASE_PATH + PATHS.API_ROUTES.USERS;

    createUser = async (req) => {
        try {
            const params = {
                method: "POST",
                body: formData,
            };
            const res = await fetch(this.usersAPI, params);
            if (!res.ok) throw new Error(await res.text());
            console.log(res);
        } catch (error) {
            console.log("Error creating user: ", error);
        }
    };

    getUsers = async () => {
        try {
            const res = await fetch(this.usersAPI, {
                method: "GET",
                body: formData,
            });
            if (!res.ok) throw new Error(await res.text());
        } catch (error) {
            console.log("Error creating user: ", error);
        }
    };

    getUser = async () => {
        try {
            const res = await fetch(this.usersAPI, {
                method: "GET",
                body: formData,
            });
            if (!res.ok) throw new Error(await res.text());
        } catch (error) {
            console.log("Error creating user: ", error);
        }
    };

    deleteUser = async () => {
        try {
            const res = await fetch(this.usersAPI, {
                method: "DELETE",
                body: formData,
            });
            if (!res.ok) throw new Error(await res.text());
        } catch (error) {
            console.log("Error creating user: ", error);
        }
    };

    updateUser = async () => {
        try {
            const res = await fetch(this.usersAPI, {
                method: "PATCH",
                body: formData,
            });
            if (!res.ok) throw new Error(await res.text());
        } catch (error) {
            console.log("Error creating user: ", error);
        }
    };
}
