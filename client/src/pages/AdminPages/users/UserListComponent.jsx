import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../../../api/user";
import { getUsers, editUser, deleteUser } from "../../../slices/userSlice";
import {
    Table,
    Avatar,
    Space,
    Tooltip,
    Modal,
    Form,
    Input,
    Switch,
    Upload,
    Button,
    Select,
    Badge,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { ThemeContext } from "../../../ThemeContext";
import "tailwindcss/tailwind.css";

const { confirm } = Modal;

export const UserListComponent = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const userApi = new User();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { theme } = useContext(ThemeContext);
    const backgroundColor = theme === "light" ? "#fff" : "#001529";
    const color = theme === "light" ? "#000" : "#fff";
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await userApi.getUsers();
                dispatch(getUsers(usersData));
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };

        fetchUsers();
    }, [dispatch]);

    const handleEdit = (id) => {
        const user = users.find((user) => user.id === id);
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const handleDelete = (id) => {
        confirm({
            title: "Seguro quieres eliminar este usuario?",
            content: "Esta opción no se puede revertir",
            onOk() {
                userApi
                    .deleteUser(id)
                    .then(() => {
                        dispatch(deleteUser(id));
                    })
                    .catch((error) => {
                        console.error("Failed to delete user", error);
                    });
            },
            onCancel() {
                console.log("Cancel delete");
            },
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const handleOk = () => {
        console.log(selectedUser);
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("email", selectedUser.email);
        formDataToSubmit.append("first_name", selectedUser.first_name);
        formDataToSubmit.append("second_name", selectedUser.second_name);
        formDataToSubmit.append("first_lastname", selectedUser.first_lastname);
        formDataToSubmit.append(
            "second_lastname",
            selectedUser.second_lastname
        );
        formDataToSubmit.append("role", selectedUser.role);
        formDataToSubmit.append("avatar", selectedUser.avatar);
        formDataToSubmit.append(
            "current_password",
            selectedUser.current_password
        );
        formDataToSubmit.append("active_user", selectedUser.active_user);
        console.log(formDataToSubmit);
        userApi
            .updateUser(selectedUser.id, formDataToSubmit)
            .then((result) => {
                console.log(result);
                dispatch(
                    editUser({
                        userId: selectedUser.id,
                        updatedUserData: result,
                    })
                );
                setIsModalVisible(false);
                setSelectedUser(null);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Failed to edit user", error);
            });
    };

    const handleChange = (e) => {
        setSelectedUser({
            ...selectedUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleSwitchChange = (checked) => {
        setSelectedUser({
            ...selectedUser,
            active_user: checked,
        });
    };

    const handleAvatarChange = (info) => {
        if (info.file.status !== "uploading") {
            console.log(info.file.name);
            setSelectedUser({ ...selectedUser, avatar: info.file });
        }
    };

    const handleRoleChange = (value) => {
        setSelectedUser({ ...selectedUser, role: value });
    };

    const columns = [
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (text, record) => (
                <Avatar
                    src={`http://localhost:3001/api/users/avatar/${record.avatar}`}
                />
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "First Name",
            dataIndex: "first_name",
            key: "first_name",
        },
        {
            title: "Second Name",
            dataIndex: "second_name",
            key: "second_name",
        },
        {
            title: "First Lastname",
            dataIndex: "first_lastname",
            key: "first_lastname",
        },
        {
            title: "Second Lastname",
            dataIndex: "second_lastname",
            key: "second_lastname",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Active",
            dataIndex: "active_user",
            key: "active_user",
            render: (text, record) => (
                <div className="flex items-center justify-center">
                    <Badge color={record.active_user ? "green" : "gray"} />
                    <span className="ml-2">
                        {record.active_user ? "Yes" : "No"}
                    </span>
                </div>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <EditOutlined
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => handleEdit(record.id)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <DeleteOutlined
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleDelete(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="bg-red-500">
                <h1 className="display-4 text-center text-white text-2xl font-bold p-2">
                    Users List
                </h1>
            </div>

            <div className="d-flex justify-content-center">
                <Table
                    dataSource={users}
                    columns={columns}
                    rowKey="id"
                    className="w-75"
                />
            </div>
            {selectedUser && (
                <Modal
                    title="Edit User"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form>
                        <Form.Item label="Email">
                            <Input
                                name="email"
                                value={selectedUser.email}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="First Name">
                            <Input
                                name="first_name"
                                value={selectedUser.first_name}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Second Name">
                            <Input
                                name="second_name"
                                value={selectedUser.second_name}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="First Lastname">
                            <Input
                                name="first_lastname"
                                value={selectedUser.first_lastname}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Second Lastname">
                            <Input
                                name="second_lastname"
                                value={selectedUser.second_lastname}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Role">
                            <Select
                                name="role"
                                value={selectedUser.role}
                                onChange={handleRoleChange}
                            >
                                <Select.Option value="driver">
                                    Driver
                                </Select.Option>
                                <Select.Option value="admin">
                                    Admin
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Active">
                            <Switch
                                checked={selectedUser.active_user}
                                onChange={handleSwitchChange}
                            />
                        </Form.Item>
                        <Form.Item label="Avatar">
                            <Upload
                                accept="image/*"
                                beforeUpload={(file) => {
                                    return false;
                                }}
                                onChange={(info) => {
                                    handleAvatarChange(info);
                                }}
                                fileList={[]}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Seleccionar archivo
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </>
    );
};
