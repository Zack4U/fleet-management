const SERVER_IP = "localhost:3001/api";

export const PATHS = {
    BASE_PATH: `http://${SERVER_IP}`,
    API_ROUTES: {
        USERS: "/users",
    },
    USER_ROUTES: {
        GET: "/",
        GET_BY_ID: "/",
        CREATE: "/new",
        UPDATE: "/edit",
        DELETE: "/delete",
    },
};
