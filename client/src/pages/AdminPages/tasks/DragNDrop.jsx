import React, { useEffect, useState } from "react";
import { Button, Modal, Tooltip, Form, Input } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../../../api/task";
import {
    addTask,
    deleteTask,
    editTask,
    getTasks,
} from "../../../slices/taskSlice";

import "./DragNDrop.css";

const { confirm } = Modal;

export const DragNDrop = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.tasks);
    const taskApi = new Task();
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        list: 1,
    });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksData = await taskApi.getTasks();
                dispatch(getTasks(tasksData));
            } catch (error) {
                console.error("Failed to fetch tasks", error);
            }
        };

        fetchTasks();
    }, [dispatch]);

    const getList = (list) => {
        if (!tasks) {
            return [];
        }

        return tasks.filter((item) => item.list === list);
    };

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
            const newTask = await taskApi.addTask(formData);
            dispatch(addTask(newTask));

            if (newTask) {
                setIsModalVisible(false);
            }
        } catch (error) {
            console.log(error);
        }
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
                </Form>
            </Modal>
        </>
    );
};
