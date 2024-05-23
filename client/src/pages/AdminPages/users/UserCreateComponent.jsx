import React, { useState } from "react";
import { addUser } from "../../../slices/userSlice";
import { useDispatch } from "react-redux";
import { User } from "../../../api/user";
import { Form, Input, Button, Upload, Modal, Row, Breadcrumb } from "antd";
import { UploadOutlined } from "@ant-design/icons";

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
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const handleAvatarChange = (info) => {
        setFormData({ ...formData, avatar: info.file.originFileObj });
    };

    const handleCreateUser = async (values) => {
        try {
            console.log(values);

            const formData = new FormData();

            for (const key in values) {
                formData.append(key, values[key]);
            }
            if (values.avatar) {
                formData.append("avatar", values.avatar.file.originFileObj);
            }
            const newUser = await user.addUser(formData);
            dispatch(addUser(newUser));

            if (newUser) {
                form.resetFields();
                setModalVisible(true);
            }
        } catch (error) {
            form.resetFields();
            console.log(error);
        }
    };

    return (
        <>
            <div className="bg-red-500">
                <h1 className="display-4 text-center text-white text-2xl font-bold p-2">
                    Users Create
                </h1>
            </div>
            <Form
                onFinish={handleCreateUser}
                encType="multipart/form-data"
                layout="vertical"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Item>

                <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your first name!",
                        },
                    ]}
                >
                    <Input
                        type="text"
                        id="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Item>
                <Form.Item label="Second Name" name="second_name">
                    <Input
                        type="text"
                        id="second_name"
                        value={formData.second_name}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item
                    label="First Lastname"
                    name="first_lastname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your first lastname!",
                        },
                    ]}
                >
                    <Input
                        type="text"
                        id="first_lastname"
                        value={formData.first_lastname}
                        onChange={handleChange}
                        required
                    />
                </Form.Item>
                <Form.Item label="Second Lastname" name="second_lastname">
                    <Input
                        type="text"
                        id="second_lastname"
                        value={formData.second_lastname}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Choose File" name="avatar">
                    <Upload
                        beforeUpload={() => false}
                        onChange={handleAvatarChange}
                    >
                        <Button icon={<UploadOutlined />}>Choose File</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="current_password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password
                        id="current_password"
                        value={formData.current_password}
                        onChange={handleChange}
                        required
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title="Success"
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
            >
                <Row justify="center">
                    <p>User created successfully!</p>
                </Row>
            </Modal>
        </>
    );
};
