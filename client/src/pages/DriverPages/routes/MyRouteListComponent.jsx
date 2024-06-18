import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Table,
    Avatar,
    Space,
    Tooltip,
    Modal,
    Form,
    Input,
    Select,
    Badge,
    List,
    Button,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { ThemeContext } from "../../../ThemeContext";
import { Route } from "../../../api/route";
import {
    deleteRoute,
    getRoutes,
    updateRoute,
} from "../../../slices/routeSlice";
import { Vehicle } from "../../../api/vehicle";
import { User } from "../../../api/user";
import moment from "moment";
import { toast } from "react-toastify";
import { MyRouteViewComponent } from "./MyRouteViewComponent";
import "tailwindcss/tailwind.css";

const { confirm } = Modal;

export const MyRouteListComponent = () => {
    const dispatch = useDispatch();
    const routes = useSelector((state) => state.route.routes);
    const routeApi = new Route();
    const vehicleApi = new Vehicle();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const routes = await routeApi.getMyRoutes();
                console.log("Routes: ", routes);
                dispatch(getRoutes(routes));
            } catch (error) {
                console.log("Error getting routes: ", error);
            }
        };
        fetchRoutes();
    }, [dispatch]);

    const formatDate = (dateString) => {
        if (dateString === null) return "";
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsDetailsModalVisible(false);
        setSelectedRoute(null);
    };

    const handleViewDetails = (id) => {
        const route = routes.find((route) => route.id === id);
        setSelectedRoute(route);
        setIsDetailsModalVisible(true);
    };

    const handleStartRoute = async (id) => {
        console.log("Start Route: ", id);
        try {
            const formData = new FormData();
            formData.append("status", "IN_ROUTE");
            formData.append("startDateTime", new Date());
            const route = await routeApi.updateRoute(id, formData);
            console.log("Route updated: ", route);
            dispatch(
                updateRoute({
                    routeId: id,
                    updatecRouteData: route,
                })
            );
            toast.success("Route started successfully");
            window.location.reload();
        } catch (error) {
            toast.error("Error starting route");
            console.error("Error starting route: ", error);
        }
    };

    const handleEndRoute = async (id) => {
        console.log("End Route: ", id);
        try {
            const formData = new FormData();
            formData.append("status", "FINISHED");
            formData.append("endDateTime", new Date());
            const route = await routeApi.updateRoute(id, formData);
            console.log("Route updated: ", route);
            dispatch(
                updateRoute({
                    routeId: id,
                    updatedRouteData: route,
                })
            );
            toast.success("Route ended successfully");
            window.location.reload();
        } catch (error) {
            toast.error("Error ending route");
            console.log("Error ending route: ", error);
        }
    };

    const columns = [
        {
            title: "Date Scheduled",
            dataIndex: "dateScheduled",
            key: "dateScheduled",
            render: (dateScheduled) =>
                moment(dateScheduled).format("YYYY-MM-DD HH:mm"),
        },
        {
            title: "Start Location",
            dataIndex: "startLocation",
            key: "startLocation",
            render: (startLocation) =>
                startLocation ? startLocation.name : "",
        },
        {
            title: "End Location",
            dataIndex: "endLocation",
            key: "endLocation",
            render: (endLocation) => (endLocation ? endLocation.name : ""),
        },
        {
            title: "Additional Locations",
            dataIndex: "additionalLocations",
            key: "additionalLocations",
            render: (additionalLocations) => (
                <List
                    size="small"
                    dataSource={additionalLocations}
                    renderItem={(location) => (
                        <List.Item>{location.name}</List.Item>
                    )}
                />
            ),
        },
        {
            title: "Start Date/Time",
            dataIndex: "startDateTime",
            key: "startDateTime",
            render: (startDateTime) =>
                startDateTime
                    ? moment(startDateTime).format("YYYY-MM-DD HH:mm")
                    : "",
        },
        {
            title: "End Date/Time",
            dataIndex: "endDateTime",
            key: "endDateTime",
            render: (endDateTime) =>
                endDateTime
                    ? moment(endDateTime).format("YYYY-MM-DD HH:mm")
                    : "",
        },
        {
            title: "Duration",
            dataIndex: "duration",
            key: "duration",
        },
        {
            title: "Distance",
            dataIndex: "distance",
            key: "distance",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text, record) => (
                <div className="flex items-center justify-center">
                    <Badge
                        color={
                            record.status === "PENDING"
                                ? "yellow"
                                : record.status === "IN_ROUTE"
                                ? "blue"
                                : record.status === "FINISHED"
                                ? "green"
                                : record.status === "CANCELED"
                                ? "red"
                                : "gray"
                        }
                    ></Badge>
                    <span className="ml-2">
                        {record.status === "PENDING"
                            ? "Pending"
                            : record.status === "IN_ROUTE"
                            ? "In Route"
                            : record.status === "FINISHED"
                            ? "Finished"
                            : record.status === "CANCELED"
                            ? "Canceled"
                            : "Unknown"}
                    </span>
                </div>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip title="View Details">
                        <EyeOutlined
                            style={{ color: "lightblue", cursor: "pointer" }}
                            onClick={() => handleViewDetails(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
        {
            title: "Start/End",
            key: "startEnd",
            render: (text, record) => (
                <Space size="middle">
                    {record.status === "PENDING" ? (
                        <Button
                            type="primary"
                            className="bg-green-500 font-bold"
                            onClick={() => handleStartRoute(record.id)}
                        >
                            Start
                        </Button>
                    ) : (
                        <></>
                    )}
                    {record.status === "IN_ROUTE" ? (
                        <Button
                            type="primary"
                            className="bg-red-500 font-bold"
                            onClick={() => handleEndRoute(record.id)}
                        >
                            End
                        </Button>
                    ) : (
                        <></>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="bg-red-500">
                <h1 className="display-4 text-center text-white text-2xl font-bold p-2">
                    Routes List
                </h1>
            </div>
            <div className="d-flex justify-content-center">
                <Table
                    dataSource={routes}
                    columns={columns}
                    rowKey="id"
                    className="w-75"
                />
            </div>

            {selectedRoute && isDetailsModalVisible && (
                <Modal
                    title="Details"
                    visible={isDetailsModalVisible}
                    onOk={handleCancel}
                    onCancel={handleCancel}
                    width="70%"
                >
                    <MyRouteViewComponent route={selectedRoute} />
                </Modal>
            )}
        </>
    );
};
