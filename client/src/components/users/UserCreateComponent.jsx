import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export const UserCreateComponent = () => {
    const dispatch = useDispatch();
    useEffect(async () => {
        document.title = "User Create";
        await dispatch();
        console.log("User Create Component loaded!");
    }, []);
    return <div> UserCreateComponent </div>;
};
