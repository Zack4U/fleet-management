import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    setEmail,
    setFirstName,
    setSecondName,
    setFirstLastName,
    setSecondLastName,
    setAvatar,
    setCurrentPassword,
} from "../../slices/userSlice";

const UserCreateComponent = () => {
    const [email, setEmailState] = useState("");
    const [firstName, setFirstNameState] = useState("");
    const [secondName, setSecondNameState] = useState("");
    const [firstLastName, setFirstLastNameState] = useState("");
    const [secondLastName, setSecondLastNameState] = useState("");
    const [avatar, setAvatarState] = useState("");
    const [currentPassword, setCurrentPasswordState] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setEmail(email));
        dispatch(setFirstName(firstName));
        dispatch(setSecondName(secondName));
        dispatch(setFirstLastName(firstLastName));
        dispatch(setSecondLastName(secondLastName));
        dispatch(setAvatar(avatar));
        dispatch(setCurrentPassword(currentPassword));
    };

    return <div>User Create Component</div>;
};

export default UserCreateComponent;
