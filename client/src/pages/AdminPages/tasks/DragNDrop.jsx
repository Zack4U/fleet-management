import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../../../api/task";
import { User } from "../../../api/user";
import {
    addTask,
    deleteTask,
    editTask,
    getTasks,
} from "../../../slices/taskSlice";
import { getUser, getUsers } from "../../../slices/userSlice";

import "./DragNDrop.css";
import { toast } from "react-toastify";

const { confirm } = Modal;

export const DragNDrop = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.tasks);
    const users = useSelector((state) => state.user.users);
    const taskApi = new Task();
    const userApi = new User();
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        list: 1,
        userId: "",
    });

    const getUserName = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user
            ? `${user.first_name} ${user.second_name || ""} ${
                  user.first_lastname
              } ${user.second_lastname || ""}`
            : "Unknown user";
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksData = await taskApi.getTasks();
                dispatch(getTasks(tasksData));
            } catch (error) {
                console.error("Failed to fetch tasks", error);
            }
        };

        const fetchUsers = async () => {
            try {
                const usersData = await userApi.getUsers();
                dispatch(getUsers(usersData));
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };

        fetchTasks();
        fetchUsers();
    }, [dispatch]);

    const getList = useCallback(
        (list) => {
            if (!tasks) {
                return [];
            }

            return tasks.filter((item) => item.list === list);
        },
        [tasks]
    );

    const startDrag = (evt, item) => {
        evt.dataTransfer.setData("itemID", item.id);
        console.log(item);
    };

    const draggingOver = (evt) => {
        evt.preventDefault();
    };

    const onDrop = (evt, list) => {
        const itemID = evt.dataTransfer.getData("itemID");
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("list", list);
        taskApi
            .updateTask(itemID, formDataToSubmit)
            .then((result) => {
                console.log(result);
                dispatch(
                    editTask({
                        taskId: itemID,
                        updatedUserData: { list: list },
                    })
                );

                window.location.reload();
            })
            .catch((error) => {
                console.error("Failed to edit task", error);
            });
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setSelectedTask(null);
        setIsModalVisible(false);
    };

    const handleDelete = (id) => {
        confirm({
            title: "Seguro quieres eliminar esta tarea?",
            content: "Esta opción no se puede revertir",
            onOk() {
                taskApi
                    .deleteTask(id)
                    .then(() => {
                        dispatch(deleteTask(id));
                    })
                    .catch((error) => {
                        console.error("Failed to delete task", error);
                    });
                toast.success("Task deleted successfully!");
            },
            onCancel() {
                console.log("Cancel delete");
            },
        });
    };

    const handleCreateTask = async (values) => {
        try {
            console.log(values);

            const formData = new FormData();

            for (const key in values) {
                formData.append(key, values[key]);
            }

            formData.append("list", 1);

            console.log(formData);

            const newTask = await taskApi.addTask(formData);
            dispatch(addTask(newTask));

            if (newTask) {
                setIsModalVisible(false);
            }

            toast.success("Task created successfully!");
        } catch (error) {
            toast.error("Error creating task!");
            console.log(error);
        }
    };

    const handleEdit = (id) => {
        const task = tasks.find((task) => task.id === id);
        console.log(task);
        setSelectedTask(task);
        setIsModalVisible2(true);
    };

    const handleOk = () => {
        console.log(selectedTask);
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("title", selectedTask.title);
        formDataToSubmit.append("body", selectedTask.body);
        formDataToSubmit.append("list", selectedTask.list);
        formDataToSubmit.append("userId", selectedTask.userId);
        console.log(formDataToSubmit);
        taskApi
            .updateTask(selectedTask.id, formDataToSubmit)
            .then((result) => {
                console.log(result);
                dispatch(
                    editTask({
                        taskId: selectedTask.id,
                        updateTaskData: result,
                    })
                );
                setIsModalVisible(false);
                setSelectedTask(null);
                toast.success("Task edited successfully!");
                window.location.reload();
            })
            .catch((error) => {
                toast.error("Error editing task!");
                console.error("Failed to edit vehicle", error);
            });
    };

    const handleChange = (e) => {
        setSelectedTask({
            ...selectedTask,
            [e.target.name]: e.target.value,
        });
    };

    const handleUserChange = (value) => {
        setSelectedTask({ ...selectedTask, userId: value });
        console.log(selectedTask);
    };

    return (
        <>
            <div className="bg-red-500">
                <h1 className="display-4 text-center text-white text-2xl font-bold p-2">
                    Tasks Schedule
                </h1>
            </div>
            <br />

            <div className="drag-and-drop flex justify-center ">
                <div className="column column--1">
                    <h3>
                        <strong>To Do</strong>
                        <Button
                            className="button-right"
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={showModal}
                        />
                    </h3>
                    <div
                        className="dd-zone"
                        droppable="true"
                        onDragOver={(evt) => draggingOver(evt)}
                        onDrop={(evt) => onDrop(evt, 1)}
                    >
                        {getList(1).map((item) => (
                            <div
                                className="dd-element"
                                key={item.id}
                                draggable
                                onDragStart={(evt) => startDrag(evt, item)}
                            >
                                <strong className="title">{item.title}</strong>

                                <DeleteOutlined
                                    className="button-right"
                                    style={{
                                        color: "red",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleDelete(item.id)}
                                />
                                <EditOutlined
                                    className="button-right"
                                    style={{
                                        color: "blue",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleEdit(item.id)}
                                />
                                <p className="user">
                                    {getUserName(item.userId)}
                                </p>
                                <p className="body">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="column column--2">
                    <h3>
                        <strong>In progress</strong>
                    </h3>
                    <div
                        className="dd-zone"
                        droppable="true"
                        onDragOver={(evt) => draggingOver(evt)}
                        onDrop={(evt) => onDrop(evt, 2)}
                    >
                        {getList(2).map((item) => (
                            <div
                                className="dd-element"
                                key={item.id}
                                draggable
                                onDragStart={(evt) => startDrag(evt, item)}
                            >
                                <strong className="title">{item.title}</strong>
                                <DeleteOutlined
                                    className="button-right"
                                    style={{
                                        color: "red",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleDelete(item.id)}
                                />
                                <EditOutlined
                                    className="button-right"
                                    style={{
                                        color: "blue",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleEdit(item.id)}
                                />
                                <p className="user">
                                    {getUserName(item.userId)}
                                </p>
                                <p className="body">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="column column--3">
                    <h3>
                        <strong>Finish</strong>
                    </h3>
                    <div
                        className="dd-zone"
                        droppable="true"
                        onDragOver={(evt) => draggingOver(evt)}
                        onDrop={(evt) => onDrop(evt, 3)}
                    >
                        {getList(3).map((item) => (
                            <div
                                className="dd-element"
                                key={item.id}
                                draggable
                                onDragStart={(evt) => startDrag(evt, item)}
                            >
                                <strong className="title">{item.title}</strong>
                                <DeleteOutlined
                                    className="button-right"
                                    style={{
                                        color: "red",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleDelete(item.id)}
                                />
                                <EditOutlined
                                    className="button-right"
                                    style={{
                                        color: "blue",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleEdit(item.id)}
                                />
                                <p className="user">
                                    {getUserName(item.userId)}
                                </p>
                                <p className="body">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal
                title="Create Task"
                visible={isModalVisible}
                onOk={() => form.submit()}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    onFinish={handleCreateTask}
                    encType="multipart/form-data"
                    layout="vertical"
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "Please input your tile!",
                            },
                        ]}
                    >
                        <Input
                            type="text"
                            id="tytle"
                            value={formData.title}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        label="Content"
                        name="body"
                        rules={[
                            {
                                required: true,
                                message: "Please input your body!",
                            },
                        ]}
                    >
                        <Input
                            type="text"
                            id="body"
                            value={formData.body}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        label="User"
                        name="user"
                        rules={[
                            {
                                required: true,
                                message: "Please select a user!",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a user"
                            options={users.map((user) => ({
                                value: user.id,
                                label:
                                    user.first_name +
                                    " " +
                                    (user.second_name || "") +
                                    " " +
                                    user.first_lastname +
                                    " " +
                                    (user.second_lastname || ""),
                            }))}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            {selectedTask && (
                <Modal
                    title="Edit Task"
                    visible={isModalVisible2}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form>
                        <Form.Item label="Title">
                            <Input
                                type="text"
                                name="title"
                                value={selectedTask.title}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Content">
                            <Input
                                type="text"
                                name="body"
                                value={selectedTask.body}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="User">
                            <Select
                                placeholder="Select a user"
                                value={selectedTask.userId}
                                name="userId"
                                onChange={handleUserChange}
                                options={users.map((user) => ({
                                    value: user.id,
                                    label:
                                        user.first_name +
                                        " " +
                                        (user.second_name || "") +
                                        " " +
                                        user.first_lastname +
                                        " " +
                                        (user.second_lastname || ""),
                                }))}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </>
    );
};
