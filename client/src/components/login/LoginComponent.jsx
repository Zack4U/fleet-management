import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import imageLogin from "../../assets/login-coca_cola.jpg";
import logoLogin from "../../assets/logo-coca_cola.svg";
import { User } from "../../api/user";
import { useDispatch } from "react-redux";
import { login } from "../../slices/userSlice";
import UserContext from "../../utils/userContext";

const LoginComponent = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const userApi = new User();
    const { setRole } = useContext(UserContext);

    const validateInput = (values) => {
        const usernameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        //const passwordRegex =
        //    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (
            !usernameRegex.test(values.username)
            // || !passwordRegex.test(values.password)
        ) {
            return false;
        }

        return true;
    };

    const onFinish = async (values) => {
        console.log(values);
        if (!validateInput(values)) {
            console.log("Invalid input!");
            return;
        }
        setLoading(true);
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("email", values.username);
        formDataToSubmit.append("password", values.password);
        try {
            userApi
                .loginUser(formDataToSubmit)
                .then(async (res) => {
                    if (res == undefined) {
                        setError({ message: "Invalid credentials" });
                        setLoading(false);
                        return;
                    }
                    dispatch(login(res));
                    setRole(res.role);
                    if (res.role === "DRIVER") {
                        navigate("/driver/dashboard");
                    } else if (res.role === "ADMIN") {
                        navigate("/admin/dashboard");
                    } else {
                        navigate("/login");
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className="flex">
            <div className="w-full">
                <img src={imageLogin} alt="Screen Image" className="h-screen" />
                <div className="absolute top-0 right-0 w-[55%] h-full flex flex-col items-center justify-center bg-slate-100">
                    <div className="w-[55%] bg-black text-white flex items-center justify-center fixed top-0">
                        <img src={logoLogin} alt="Logo" className="h-20" />
                    </div>
                    <div className="bg-white p-8 rounded-2xl justify-center text-center overflow-auto max-w-[50%]">
                        <h2 className="text-2xl font-bold">Welcome to</h2>
                        <h3 className="text-m mb-4">Fleet Management</h3>

                        <div className="w-16 h-px bg-gray-600 mx-auto my-6"></div>
                        <p className="my-5">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit, set diam nonumy eirmod.
                        </p>

                        <Form
                            className="text-left"
                            name="loginForm"
                            onFinish={onFinish}
                        >
                            {error && (
                                <Alert
                                    message={error.message}
                                    type="error"
                                    showIcon
                                />
                            )}
                            <label htmlFor="username">Username</label>
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please enter a valid email address",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="example@example.com"
                                />
                            </Form.Item>

                            <label htmlFor="password">Password</label>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your password",
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    block
                                    style={{
                                        backgroundColor: "black",
                                        borderColor: "black",
                                    }}
                                >
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
