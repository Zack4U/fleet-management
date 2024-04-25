import React, { useEffect } from "react";

export const UserCreateComponent = () => {
    useEffect(() => {
        console.log("Hello");
        document.title = "User Create";
    }, {});
    return <div>CreateUserComponent</div>;
};
