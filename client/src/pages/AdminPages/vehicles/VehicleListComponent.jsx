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
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { ThemeContext } from "../../../ThemeContext";
import "tailwindcss/tailwind.css";

const { confirm } = Modal;

export const VehicleListComponent = () => {
    const dispatch = useDispatch();
    const vehicles = useSelector((state) => state.vehicle.vehicles);
    const vehicleAPI = new Vehicle();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const vehiclesData = await vehicleAPI.getVehicles();
                dispatch(getVehicles(vehiclesData));
            } catch (error) {
                console.error("Failed to fetch vehicles", error);
            }
        };

        fetchVehicles();
    }, [dispatch]);

    const handleViewDetails = (id) => {
        const vehicle = vehicles.find((user) => user.id === id);
        setSelectedVehicle(vehicle);
        setIsModalVisible(true);
    };

    const handleDelete = (id) => {
        confirm({
            title: "Seguro quieres eliminar este vehiculo?",
            content: "Esta opción no se puede revertir",
            onOk() {
                vehicleAPI
                    .deleteVehicle(id)
                    .then(() => {
                        dispatch(deleteVehicle(id));
                    })
                    .catch((error) => {
                        console.error("Failed to delete vehicle", error);
                    });
            },
            onCancel() {
                console.log("Cancel delete");
            },
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedVehicle(null);
    };

    const handleOk = () => {
        console.log(selectedVehicle);
        const formDataToSubmit = new FormData();
        console.log(formDataToSubmit);
        vehicleAPI
            .updateUser(selectedVehicle.id, formDataToSubmit)
            .then((result) => {
                console.log(result);
                dispatch(
                    editVehicle({
                        vehicleId: selectedVehicle.id,
                        updatedUserData: result,
                    })
                );
                setIsModalVisible(false);
                setSelectedVehicle(null);
                // window.location.reload();
            })
            .catch((error) => {
                console.error("Failed to edit vehicle", error);
            });
    };

    const handleChange = (e) => {
        setSelectedVehicle({
            ...selectedVehicle,
            [e.target.name]: e.target.value,
        });
    };

    const handleSwitchChange = (checked) => {
        setSelectedVehicle({
            ...selectedVehicle,
            active_user: checked,
        });
    };

    const handleAvatarChange = (info) => {
        if (info.file.status !== "uploading") {
            console.log(info.file.name);
            setSelectedVehicle({ ...selectedVehicle, avatar: info.file });
        }
    };

    const handleRoleChange = (value) => {
        setSelectedVehicle({ ...selectedVehicle, role: value });
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
                    dataSource={vehicles}
                    columns={columns}
                    rowKey="id"
                    className="w-75"
                />
            </div>
            {selectedVehicle && (
                <Modal
                    title="Edit User"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                ></Modal>
            )}
        </>
    );
};
