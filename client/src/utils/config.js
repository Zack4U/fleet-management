const SERVER_IP = "localhost:3001/api";

export const PATHS = {
    BASE_PATH: `http://${SERVER_IP}`,
    API_ROUTES: {
        USERS: "/users",
        VEHICLES: "/vehicles",
        TASKS: "/tasks",
        BATTERIES: "/batteries",
        COOLINGS: "/coolings",
        FUELS: "/fuels",
        LIGHTS: "/lights",
        OILS: "/oils",
        PNEUMATICS: "/pneumatics",
        MAINTENANCES: "/maintenances",
        ROUTES: "/routes",
    },
    GENERAL_ROUTES: {
        LOGIN: "/login",
        LOGOUT: "/logout",
        REGISTER: "/register",
        FORGOT_PASSWORD: "/forgot-password",
        RESET_PASSWORD: "/reset-password",
        UPLOAD_AVATAR: "/upload-avatar",
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
        CHANGE_OIL: "/oil",
        CHANGE_BATTERY: "/battery",
        CHANGE_PNEUMATIC: "/pneumatic",
        CHANGE_COOLING: "/cooling",
        CHANGE_LIGHT: "/light",
        REVIEW_BATTERY: "/battery/review",
        REVIEW_PNEUMATIC: "/pneumatic/review",
        REVIEW_LIGHT: "/light/review",
    },
    TASK_ROUTES: {
        GET: "/",
        GET_BY_ID: "/",
        CREATE: "/new",
        UPDATE: "/edit",
        DELETE: "/delete",
    },
    BATTERY_ROUTES: {
        GET: "/",
        GET_BY_ID: "/",
        CREATE: "/new",
        UPDATE: "/edit",
        DELETE: "/delete",
    },
    COOLING_ROUTES: {
        GET: "/",
        GET_BY_ID: "/",
        CREATE: "/new",
        UPDATE: "/edit",
        DELETE: "/delete",
    },
    FUEL_ROUTES: {
        GET: "/",
        GET_BY_ID: "/",
        CREATE: "/new",
        UPDATE: "/edit",
        DELETE: "/delete",
        GET_REFUELS: "/refuels",
        REFUEL: "/refuels",
        SPEND: "/spend",
    },
    LIGHT_ROUTES: {
        GET: "/",
        GET_BY_ID: "/",
        CREATE: "/new",
        UPDATE: "/edit",
        DELETE: "/delete",
    },
    OIL_ROUTES: {
        GET: "/",
        GET_BY_ID: "/",
        CREATE: "/new",
        UPDATE: "/edit",
        DELETE: "/delete",
    },
    PNEUMATIC_ROUTES: {
        GET: "/",
        GET_BY_ID: "/",
        CREATE: "/new",
        UPDATE: "/edit",
        DELETE: "/delete",
    },
    MAINTENANCE_ROUTES: {
        GET: "/",
        GET_BY_ID: "/",
        CREATE: "/new",
        UPDATE: "/edit",
        DELETE: "/delete",
        GET_VEHICLE_MAINTENANCES: "/vehicle",
    },
    ROUTE_ROUTES: {
        GET: "/",
        GET_BY_ID: "/",
        CREATE: "/new",
        UPDATE: "/edit",
        DELETE: "/delete",
        GET_VEHICLE_ROUTES: "/vehicle",
    },
};
