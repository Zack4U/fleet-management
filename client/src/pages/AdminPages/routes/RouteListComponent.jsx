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
import RouteViewComponent from "./RouteViewComponent";
import "tailwindcss/tailwind.css";

const { confirm } = Modal;

export default function RouteListComponent() {
    const dispatch = useDispatch();
    const routes = useSelector((state) => state.route.routes);
    const routeApi = new Route();
    const vehicleApi = new Vehicle();
    const userApi = new User();
    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const routes = await routeApi.getRoutes();
                console.log("Routes: ", routes);
                dispatch(getRoutes(routes));
            } catch (error) {
                console.log("Error getting routes: ", error);
            }
        };
        fetchRoutes();
    }, [dispatch]);

    useEffect(() => {
        const fetchVehicles = () => {
            vehicleApi
                .getVehicles()
                .then((vehicles) => {
                    console.log(vehicles);
                    setVehicles(vehicles);
                })
                .catch((error) => {
                    console.error("Failed to fetch vehicles", error);
                });
        };

        const fetchDrivers = () => {
            userApi
                .getDrivers()
                .then((drivers) => {
                    console.log(drivers);
                    setDrivers(drivers);
                })
                .catch((error) => {
                    console.error("Failed to fetch drivers", error);
                });
        };

        console.log("Obteniendo datos...");
        fetchDrivers();
        fetchVehicles();
    }, [isModalVisible]);

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

    const handleEdit = (id) => {
        const route = routes.find((user) => user.id === id);
        setSelectedRoute(route);
        setIsModalVisible(true);
    };

    const handleChange = (name) => (value) => {
        if (
            name === "dateScheduled" ||
            name === "startDateTime" ||
            name === "endDateTime"
        ) {
            value = value.target.value;
        }
        setSelectedRoute({
            ...selectedRoute,
            [name]: value,
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsDetailsModalVisible(false);
        setSelectedRoute(null);
    };

    const handleDelete = (id) => {
        confirm({
            title: "Seguro quieres eliminar este usuario?",
            content: "Esta opción no se puede revertir",
            onOk() {
                routeApi
                    .deleteRoute(id)
                    .then(() => {
                        dispatch(deleteRoute(id));
                    })
                    .catch((error) => {
                        console.error("Failed to delete route", error);
                    });
            },
            onCancel() {
                console.log("Cancel delete");
            },
        });
    };

    const handleOk = () => {
        if (
            selectedRoute.vehicleId === null ||
            selectedRoute.driverId === null ||
            selectedRoute.dateScheduled === null ||
            selectedRoute.status === null
        ) {
            toast.error("All fields are required");
            return;
        }
        if (
            selectedRoute.startDateTime < selectedRoute.dateScheduled ||
            selectedRoute.endDateTime < selectedRoute.startDateTime
        ) {
            toast.error("Invalid dates");
            return;
        }
        try {
            console.log(selectedRoute);
            const FormDataToSubmit = new FormData();
            FormDataToSubmit.append("vehicleId", selectedRoute.vehicleId);
            FormDataToSubmit.append("driverId", selectedRoute.driverId);
            FormDataToSubmit.append(
                "dateScheduled",
                selectedRoute.dateScheduled
            );
            if (
                selectedRoute.startDateTime !== null &&
                selectedRoute.startDateTime !== undefined
            ) {
                FormDataToSubmit.append(
                    "startDateTime",
                    selectedRoute.startDateTime
                );
            }
            if (
                selectedRoute.endDateTime !== null &&
                selectedRoute.endDateTime !== undefined
            ) {
                FormDataToSubmit.append(
                    "endDateTime",
                    selectedRoute.endDateTime
                );
            }
            FormDataToSubmit.append("status", selectedRoute.status);
            routeApi
                .updateRoute(selectedRoute.id, FormDataToSubmit)
                .then((res) => {
                    dispatch(
                        updateRoute({
                            routeId: selectedRoute.id,
                            updatecRouteData: res,
                        })
                    );
                    toast.success("Route updated successfully");
                    setIsModalVisible(false);
                    setSelectedRoute(null);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Failed to update route", error);
                    toast.error("Failed to update route");
                });
        } catch (error) {
            console.error("Failed to update route", error);
            toast.error("Failed to update route");
        }
    };

    const handleViewDetails = (id) => {
        const route = routes.find((route) => route.id === id);
        setSelectedRoute(route);
        setIsDetailsModalVisible(true);
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
            {selectedRoute && isModalVisible && (
                <Modal
                    title="Edit Route"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form>
                        <Form.Item label="Vehicle">
                            <Select
                                type="text"
                                placeholder="Select a vehicle"
                                name="vehicleId"
                                value={selectedRoute.vehicleId}
                                onChange={handleChange("vehicleId")}
                                options={vehicles.map((vehicle) => ({
                                    label: vehicle.plate,
                                    value: vehicle.id,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item label="Driver">
                            <Select
                                type="text"
                                placeholder="Select a driver"
                                name="driverId"
                                value={selectedRoute.driverId}
                                onChange={handleChange("driverId")}
                                options={drivers.map((driver) => ({
                                    label:
                                        driver.first_name +
                                        " " +
                                        (driver.second_name || "") +
                                        " " +
                                        driver.first_lastname +
                                        " " +
                                        (driver.second_lastname || ""),
                                    value: driver.id,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item label="Date Scheduled">
                            <Input
                                type="datetime-local"
                                name="dateScheduled"
                                value={formatDate(selectedRoute.dateScheduled)}
                                onChange={handleChange("dateScheduled")}
                            />
                        </Form.Item>
                        <Form.Item label="Start Date/Time">
                            <Input
                                type="datetime-local"
                                name="startDateTime"
                                value={formatDate(selectedRoute.startDateTime)}
                                onChange={handleChange("startDateTime")}
                            />
                        </Form.Item>
                        <Form.Item label="End Date/Time">
                            <Input
                                type="datetime-local"
                                name="endDateTime"
                                value={formatDate(selectedRoute.endDateTime)}
                                onChange={handleChange("endDateTime")}
                            />
                        </Form.Item>
                        <Form.Item label="Status">
                            <Select
                                type="text"
                                placeholder="Select a status"
                                name="status"
                                value={selectedRoute.status}
                                onChange={handleChange("status")}
                            >
                                <Select.Option value="PENDING">
                                    PENDING
                                </Select.Option>
                                <Select.Option value="IN_ROUTE">
                                    IN_ROUTE
                                </Select.Option>
                                <Select.Option value="FINISHED">
                                    FINISHED
                                </Select.Option>
                                <Select.Option value="CANCELED">
                                    CANCELED
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            )}
            {selectedRoute && isDetailsModalVisible && (
                <Modal
                    title="Details"
                    visible={isDetailsModalVisible}
                    onOk={handleCancel}
                    onCancel={handleCancel}
                    width="70%"
                >
                    <RouteViewComponent route={selectedRoute} />
                </Modal>
            )}
        </>
    );
}
