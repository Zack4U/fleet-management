import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Vehicle } from "../../../api/vehicle";
import {
    getVehicles,
    editVehicle,
    deleteVehicle,
} from "../../../slices/vehicleSlice";
import {
    Table,
    Space,
    Tooltip,
    Modal,
    Form,
    Input,
    Upload,
    Button,
    Row,
    Col,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { ThemeContext } from "../../../ThemeContext";
import "tailwindcss/tailwind.css";
import { MyVehicleDetailsComponent } from "./MyVehicleDetailsComponent";
import { toast } from "react-toastify";

const { confirm } = Modal;

export const MyVehicleListComponent = () => {
    const dispatch = useDispatch();
    const vehicles = useSelector((state) => state.vehicle.vehicles);
    const vehicleAPI = new Vehicle();
    const token = localStorage.getItem("token");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const vehiclesData = await vehicleAPI.getMyVehicles();
                dispatch(getVehicles(vehiclesData));
            } catch (error) {
                console.error("Failed to fetch vehicles", error);
            }
        };

        fetchVehicles();
    }, [dispatch]);

    const handleViewDetails = (id) => {
        const vehicle = vehicles.find((vehicle) => vehicle.id === id);
        setSelectedVehicle(vehicle);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModalVisible2(false);
        setSelectedVehicle(null);
    };

    const columns = [
        {
            title: "Plate",
            dataIndex: "plate",
            key: "plate",
            sorter: (a, b) => a.plate.localeCompare(b.plate),
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
            sorter: (a, b) => a.brand.localeCompare(b.brand),
        },
        {
            title: "Line",
            dataIndex: "line",
            key: "line",
            sorter: (a, b) => a.line.localeCompare(b.line),
        },
        {
            title: "Model",
            dataIndex: "model",
            key: "model",
            sorter: (a, b) => a.model.localeCompare(b.model),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            sorter: (a, b) => a.type.localeCompare(b.type),
        },
        {
            title: "Kilometers",
            dataIndex: "kilometers",
            key: "kilometers",
            sorter: (a, b) => a.kilometers - b.kilometers,
        },
        {
            title: "Capacity",
            dataIndex: "capacity",
            key: "capacity",
            sorter: (a, b) => a.capacity - b.capacity,
        },
        {
            title: "Legals",
            dataIndex: "legals",
            key: "legals",
        },
        {
            title: "Status",
            dataIndex: "statusId",
            key: "statusId",
            render: (statusId) => {
                let color;
                switch (statusId) {
                    case "AVAILABLE":
                        color = "green";
                        break;
                    case "UNAVAILABLE":
                        color = "gray";
                        break;
                    case "IN_ROUTE":
                        color = "blue";
                        break;
                    case "IN_MAINTENANCE":
                        color = "yellow";
                        break;
                    default:
                        color = "black";
                }

                return <span style={{ color: color }}>{statusId}</span>;
            },
        },

        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip title="View Details">
                        <EyeOutlined
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => handleViewDetails(record.id)}
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
                    Vehicles List
                </h1>
            </div>

            <div className="d-flex justify-content-center">
                <Table
                    dataSource={vehicles}
                    columns={columns}
                    rowKey="id"
                    className="w-75"
                />
            </div>
            {selectedVehicle && (
                <Modal
                    title="Details"
                    visible={isModalVisible}
                    onOk={handleCancel}
                    onCancel={handleCancel}
                    width="50%"
                >
                    <MyVehicleDetailsComponent
                        vehicle={selectedVehicle}
                        className="w-full h-full"
                    />
                </Modal>
            )}
        </>
    );
};
