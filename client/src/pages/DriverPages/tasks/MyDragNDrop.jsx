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

import "./MyDragNDrop.css";
import { toast } from "react-toastify";

const { confirm } = Modal;

export const MyDragNDrop = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.tasks);
    const taskApi = new Task();

    const getUserName = (userId) => {
        const user = user.find((user) => user.id === userId);
        return user
            ? `${user.first_name} ${user.second_name || ""} ${
                  user.first_lastname
              } ${user.second_lastname || ""}`
            : "Unknown user";
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksData = await taskApi.getMyTasks();
                dispatch(getTasks(tasksData));
            } catch (error) {
                console.error("Failed to fetch tasks", error);
            }
        };

        fetchTasks();
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
                                <p className="body">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
