import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    first_name: "",
    second_name: "",
    first_lastname: "",
    second_lastname: "",
    role: "",
    avatar: "",
    current_password: "",
    active_user: false,
    users: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.email = action.payload.email;
            state.first_name = action.payload.first_name;
            state.second_name = action.payload.second_name;
            state.first_lastname = action.payload.first_lastname;
            state.second_lastname = action.payload.second_lastname;
            state.role = action.payload.role;
            state.avatar = action.payload.avatar;
            state.current_password = action.payload.current_password;
            console.log(state);
        },

        getUsers: (state, action) => {
            state.users = action.payload;
        },

        getUser: (state, action) => {
            console.log(
                "getUserById action triggered with id:",
                action.payload
            );
        },

        editUser: (state, action) => {
            const { updatedUserData } = action.payload;
            return {
                ...state,
                ...updatedUserData,
            };
        },

        deleteUser: (state, action) => {
            state.users = state.users.filter(
                (user) => user.id !== action.payload
            );
        },
    },
});

export const { addUser, getUsers, getUser, editUser, deleteUser } =
    userSlice.actions;
export default userSlice.reducer;
