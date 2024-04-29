import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    first_name: "",
    second_name: "",
    first_lastname: "",
    second_lastname: "",
    avatar: "",
    current_password: "",
    active_user: false,
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
            state.avatar = action.payload.avatar;
            state.current_password = action.payload.current_password;
            console.log(state);
        },
        getUser: (state, action) => {},
        getUserById: (state, action) => {},
        updateUser: (state, action) => {},
        deleteUser: (state, action) => {},
    },
});

export const { addUser, getUser, getUserById, updateUser, deleteUser } =
    userSlice.actions;
export default userSlice.reducer;
