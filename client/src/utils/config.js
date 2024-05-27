const SERVER_IP = "localhost:3001/api";

export const PATHS = {
    BASE_PATH: `http://${SERVER_IP}`,
    API_ROUTES: {
        USERS: "/users",
        VEHICLES: "/vehicles",
        TASKS: "/tasks",
    },
    USER_ROUTES: {
        GET: "/",
        GET_BY_ID: "/",
        CREATE: "/new",
        UPDATE: "/edit",
        DELETE: "/delete",
        GET_AVATAR: "/avatar",
    },
    VEHICLE_ROUTES: {
        GET: "/",
        GET_BY_ID: "/",
        CREATE: "/new",
        UPDATE: "/edit",
        DELETE: "/delete",
        GET_AVATAR: "/image",
    },
    TASK_ROUTES: {
        GET: "/",
        GET_BY_ID: "/",
        CREATE: "/new",
        UPDATE: "/edit",
        DELETE: "/delete",
    },
};
