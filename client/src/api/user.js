import { PATHS } from "../utils/config";

export class User {
    baseAPI = PATHS.BASE_PATH;
    usersPath = PATHS.API_ROUTES.USERS;

    createUser = async () => {
        try {
            const res = await fetch(`${this.baseAPI}${this.usersPath}`, {
                method: "POST",
                body: formData,
            });
            if (!res.ok) throw new Error(await res.text());
        } catch (error) {
            console.log("Error creating user: ", error);
        }
    };

    getUsers = () => {
        try {
        } catch (error) {}
    };

    getUser = () => {
        try {
        } catch (error) {}
    };

    deleteUser = () => {
        try {
        } catch (error) {}
    };

    updateUser = () => {
        try {
        } catch (error) {}
    };
}
