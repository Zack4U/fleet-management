import React, { useState } from "react";
import { addUser } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import { User } from "../../api/user";

const UserCreateComponent = () => {
    const dispatch = useDispatch();
    const user = new User();
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        second_name: "",
        first_lastname: "",
        second_lastname: "",
        avatar: "",
        current_password: "",
        active_user: false,
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const handleAvatarChange = (event) => {
        setFormData({ ...formData, avatar: event.target.files[0] });
    };

    const handleCreateUser = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("email", formData.email);
            formData.append("first_name", formData.first_name);
            formData.append("second_name", formData.second_name);
            formData.append("first_lastname", formData.first_lastname);
            formData.append("second_lastname", formData.second_lastname);
            formData.append("avatar", formData.avatar);
            formData.append("current_password", formData.current_password);
            formData.append("active_user", formData.active_user);

            console.log(formData);

            await user.createUser(formData);
            dispatch(addUser(formData));
            setFormData({
                email: "",
                first_name: "",
                second_name: "",
                first_lastname: "",
                second_lastname: "",
                avatar: "",
                current_password: "",
                active_user: false,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleCreateUser} encType="multipart/form-data">
                <h2>Create User</h2>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        defaultValue={"test@test.co"}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="first_name">First Name: </label>
                    <input
                        type="text"
                        id="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        defaultValue={"Test"}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="second_name">Second Name: </label>
                    <input
                        type="text"
                        id="second_name"
                        value={formData.second_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="first_lastname">First Lastname: </label>
                    <input
                        type="text"
                        id="first_lastname"
                        value={formData.first_lastname}
                        onChange={handleChange}
                        defaultValue={"Test"}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="second_lastname">Second Lastname: </label>
                    <input
                        type="text"
                        id="second_lastname"
                        value={formData.second_lastname}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="avatar">Avatar: </label>
                    <input
                        type="file"
                        id="avatar"
                        onChange={handleAvatarChange}
                    />
                </div>
                <div>
                    <label htmlFor="current_password">Password: </label>
                    <input
                        type="password"
                        id="current_password"
                        value={formData.current_password}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </>
    );
};

export default UserCreateComponent;
