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
import VehicleDetailsComponent from "./VehicleDetailsComponent";

const { confirm } = Modal;

export const VehicleListComponent = () => {
    const dispatch = useDispatch();
    const vehicles = useSelector((state) => state.vehicle.vehicles);
    const vehicleAPI = new Vehicle();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
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
        const vehicle = vehicles.find((vehicle) => vehicle.id === id);
        setSelectedVehicle(vehicle);
        setIsModalVisible(true);
    };

    const handleEdit = (id) => {
        const vehicle = vehicles.find((vehicle) => vehicle.id === id);
        setSelectedVehicle(vehicle);
        setIsModalVisible2(true);
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
        setIsModalVisible2(false);
        setSelectedVehicle(null);
    };

    const handleOk = () => {
        console.log(selectedVehicle);
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("plate", selectedVehicle.plate);
        formDataToSubmit.append("brand", selectedVehicle.brand);
        formDataToSubmit.append("model", selectedVehicle.model);
        formDataToSubmit.append("type", selectedVehicle.type);
        formDataToSubmit.append("capacity", selectedVehicle.capacity);
        formDataToSubmit.append("kilometers", selectedVehicle.kilometers);
        formDataToSubmit.append("image", selectedVehicle.image);
        console.log(formDataToSubmit);
        vehicleAPI
            .updateVehicle(selectedVehicle.id, formDataToSubmit)
            .then((result) => {
                console.log(result);
                dispatch(
                    editVehicle({
                        vehicleId: selectedVehicle.id,
                        updateVehicleData: result,
                    })
                );
                setIsModalVisible(false);
                setSelectedVehicle(null);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Failed to edit vehicle", error);
            });
    };

    const handleImageChange = (info) => {
        if (info.file.status !== "uploading") {
            console.log(info.file.name);
            setSelectedVehicle({ ...selectedVehicle, image: info.file });
        }
    };

    const handleChange = (e) => {
        setSelectedVehicle({
            ...selectedVehicle,
            [e.target.name]: e.target.value,
        });
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
                    title="Edit Vehicle"
                    visible={isModalVisible2}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <img
                        className="w-full h-32 object-cover mb-4"
                        src={`http://localhost:3001/api/vehicles/image/${selectedVehicle.image}`}
                        alt="Vehicle"
                    />
                    <Form>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label="Plate">
                                    <Input
                                        type="text"
                                        name="plate"
                                        value={selectedVehicle.plate}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Brand">
                                    <Input
                                        type="text"
                                        id="brand"
                                        name="brand"
                                        value={selectedVehicle.brand}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Model">
                                    <Input
                                        type="text"
                                        id="model"
                                        name="model"
                                        value={selectedVehicle.model}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label="Type">
                                    <Input
                                        type="text"
                                        id="type"
                                        name="type"
                                        value={selectedVehicle.type}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Capacity">
                                    <Input
                                        type="number"
                                        id="capacity"
                                        name="capacity"
                                        value={selectedVehicle.capacity}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Kilometers">
                                    <Input
                                        type="number"
                                        id="kilometers"
                                        name="kilometers"
                                        value={selectedVehicle.kilometers}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Image">
                            <Upload
                                accept="image/*"
                                beforeUpload={(file) => {
                                    return false;
                                }}
                                onChange={(info) => {
                                    handleImageChange(info);
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
            {selectedVehicle && (
                <Modal
                    title="Details"
                    visible={isModalVisible}
                    onOk={handleCancel}
                    onCancel={handleCancel}
                    width="50%"
                >
                    <VehicleDetailsComponent
                        vehicle={selectedVehicle}
                        className="w-full h-full"
                    />
                </Modal>
            )}
        </>
    );
};
