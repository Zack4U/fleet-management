import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    first_name: "",
    second_name: "",
    first_lastname: "",
    second_lastname: "",
    avatar: "",
    current_password: "",
    active_user: "false",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setFirstName: (state, action) => {
            state.first_name = action.payload;
        },
        setSecondName: (state, action) => {
            state.second_name = action.payload;
        },
        setFirstLastName: (state, action) => {
            state.first_lastname = action.payload;
        },
        setSecondLastName: (state, action) => {
            state.second_lastname = action.payload;
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        setCurrentPassword: (state, action) => {
            state.current_password = action.payload;
        },
        setActiveUser: (state, action) => {
            state.active_user = action.payload;
        },
    },
});

export const {
    setEmail,
    setFirstName,
    setSecondName,
    setFirstLastName,
    setSecondLastName,
    setAvatar,
    setCurrentPassword,
} = userSlice.actions;

export default userSlice.reducer;
