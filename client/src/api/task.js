import { PATHS } from "../utils/config";

export class Task {
    tasksAPI = PATHS.BASE_PATH + PATHS.API_ROUTES.TASKS;
    get = PATHS.TASK_ROUTES.GET;
    getById = PATHS.TASK_ROUTES.GET_BY_ID;
    create = PATHS.TASK_ROUTES.CREATE;
    update = PATHS.TASK_ROUTES.UPDATE;
    delete = PATHS.TASK_ROUTES.DELETE;

    addTask = async (formData) => {
        const URL = `${this.tasksAPI}${this.create}`;
        console.log(`[TASK API] ${URL}`);
        try {
            console.log(`[TASK API] ${formData}`);
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
            console.log("[TASK API] Error creating task: ", error);
        }
    };

    getTasks = async () => {
        const URL = `${this.tasksAPI}${this.get}`;
        console.log(`[TASK API] ${URL}`);
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
            console.log("[TASK API] Error getting tasks: ", error);
        }
    };

    getTask = async (id) => {
        const URL = `${this.tasksAPI}${this.getById}${id}`;
        console.log(`[TASK API] ${URL}`);
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
            console.log("[TASK API] Error getting task: ", error);
        }
    };

    deleteTask = async (id) => {
        const URL = `${this.tasksAPI}${this.delete}/${id}`;
        console.log(`[TASK API] ${URL}`);
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
            console.log("[TASK API] Error deleting task: ", error);
        }
    };

    updateTask = async (id, formData) => {
        const URL = `${this.tasksAPI}${this.update}/${id}`;
        console.log(`[TASK API] ${URL}`);
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
            console.log("[TASK API] Error updating task: ", error);
        }
    };
}
