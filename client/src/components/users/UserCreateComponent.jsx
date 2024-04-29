import React from "react";
import { useEffect } from "react";
import { addUser } from "../../slices/userSlice";
import { useDispatch } from "react-redux";

const UserCreateComponent = () => {
    const dispatch = useDispatch();
    useEffect(async () => {
        await dispatch(addUser());
    });

    return <div>User Create Component</div>;
};

export default UserCreateComponent;
