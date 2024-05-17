import React, { useState } from "react";
import { addUser } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import { User } from "../../api/user";

export const UserCreateComponent = () => {
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
    const [fileName, setFileName] = useState("");

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const handleAvatarChange = (event) => {
        setFileName(event.target.files[0].name);
        setFormData({ ...formData, avatar: event.target.files[0] });
    };

    const handleCreateUser = async (event) => {
        event.preventDefault();
        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append("email", formData.email);
            formDataToSubmit.append("first_name", formData.first_name);
            formDataToSubmit.append("second_name", formData.second_name);
            formDataToSubmit.append("first_lastname", formData.first_lastname);
            formDataToSubmit.append(
                "second_lastname",
                formData.second_lastname
            );
            formDataToSubmit.append("avatar", formData.avatar);
            formDataToSubmit.append(
                "current_password",
                formData.current_password
            );
            formDataToSubmit.append("active_user", formData.active_user);

            console.log(formDataToSubmit);

            await user.createUser(formDataToSubmit).then(() => {
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
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex justify-center bg-slate-200">
                <div className="w-1/2 bg-white shadow-md rounded-lg p-6">
                    <form
                        onSubmit={handleCreateUser}
                        encType="multipart/form-data"
                    >
                        <h2 className="text-center text-gray-800 text-2xl font-bold mb-6">
                            Create User
                        </h2>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700"
                            >
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="first_name"
                                className="block text-gray-700"
                            >
                                First Name:
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="second_name"
                                className="block text-gray-700"
                            >
                                Second Name:
                            </label>
                            <input
                                type="text"
                                id="second_name"
                                value={formData.second_name}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="first_lastname"
                                className="block text-gray-700"
                            >
                                First Lastname:
                            </label>
                            <input
                                type="text"
                                id="first_lastname"
                                value={formData.first_lastname}
                                onChange={handleChange}
                                required
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="second_lastname"
                                className="block text-gray-700"
                            >
                                Second Lastname:
                            </label>
                            <input
                                type="text"
                                id="second_lastname"
                                value={formData.second_lastname}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="avatar"
                                className="block text-gray-700"
                            >
                                Avatar:
                            </label>
                            <input
                                type="file"
                                id="avatar"
                                onChange={handleAvatarChange}
                                required
                                className="hidden"
                            />
                            <label
                                htmlFor="avatar"
                                className="cursor-pointer bg-indigo-500 text-white py-1 px-4 rounded-md"
                            >
                                Choose File
                            </label>
                            {fileName && (
                                <span className="ml-4">{fileName}</span>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="current_password"
                                className="block text-gray-700"
                            >
                                Password:
                            </label>
                            <input
                                type="password"
                                id="current_password"
                                value={formData.current_password}
                                onChange={handleChange}
                                required
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
