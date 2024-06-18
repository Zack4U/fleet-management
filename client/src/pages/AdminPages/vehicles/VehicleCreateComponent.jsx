import React, { useState } from "react";
import { addVehicle } from "../../../slices/vehicleSlice";
import { useDispatch } from "react-redux";
import { Vehicle } from "../../../api/vehicle";
import { Form, Input, Button, Upload, Modal, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

export const VehicleCreateComponent = () => {
    const dispatch = useDispatch();
    const vehicle = new Vehicle();
    const [formData, setFormData] = useState({
        plate: "",
        brand: "",
        line: "",
        model: "",
        type: "",
        capacity: 0,
        kilometers: 0,
        front_right_tires: 0,
        front_left_tires: 0,
        back_right_tires: 0,
        back_left_tires: 0,
        capacity_fuel: 0,
        capacity_oil: 0,
        capacity_cooling: 0,
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const handleImageChange = (info) => {
        setFormData({ ...formData, image: info.file.originFileObj });
    };

    const handleCreateVehicle = async (values) => {
        try {
            console.log(values);

            const formData = new FormData();

            for (const key in values) {
                formData.append(key, values[key]);
            }
            if (values.avatar) {
                formData.append("image", values.avatar.file.originFileObj);
            }

            console.log(formData);
            const newVehicle = await vehicle.addVehicle(formData);
            dispatch(addVehicle(newVehicle));

            if (newVehicle) {
                form.resetFields();
                setModalVisible(true);
            }
            toast.success("Vehicle created successfully!");
        } catch (error) {
            form.resetFields();
            console.log(error);
        }
    };

    return (
        <>
            <div className="bg-red-500">
                <h1 className="display-4 text-center text-white text-2xl font-bold p-2">
                    Vehicles Create
                </h1>
            </div>
            <Form
                onFinish={handleCreateVehicle}
                encType="multipart/form-data"
                layout="vertical"
            >
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item
                            label="Plate"
                            name="plate"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the plate!",
                                },
                            ]}
                        >
                            <Input
                                type="text"
                                id="plate"
                                value={formData.plate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Brand"
                            name="brand"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the brand!",
                                },
                            ]}
                        >
                            <Input
                                type="text"
                                id="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Line"
                            name="line"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the line!",
                                },
                            ]}
                        >
                            <Input
                                type="text"
                                id="line"
                                value={formData.line}
                                onChange={handleChange}
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Model"
                            name="model"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the model!",
                                },
                            ]}
                        >
                            <Input
                                type="text"
                                id="model"
                                value={formData.model}
                                onChange={handleChange}
                                required
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the type!",
                                },
                            ]}
                        >
                            <Input
                                type="text"
                                id="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Capacity"
                            name="capacity"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the capacity!",
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                id="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Kilometers"
                            name="kilometers"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the kilometers!",
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                id="kilometers"
                                value={formData.kilometers}
                                onChange={handleChange}
                                required
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item
                            label="Number of Front Right Tires"
                            name="front_right_tires"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input the number of tires!",
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                id="front_right_tires"
                                value={formData.front_right_tires}
                                onChange={handleChange}
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Number of Front Left Tires"
                            name="front_left_tires"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input the number of tires!",
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                id="front_left_tires"
                                value={formData.front_left_tires}
                                onChange={handleChange}
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Number of Back Right Tires"
                            name="back_right_tires"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input the number of tires!",
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                id="back_right_tires"
                                value={formData.back_right_tires}
                                onChange={handleChange}
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Number of Back Left Tires"
                            name="back_left_tires"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input the number of tires!",
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                id="back_left_tires"
                                value={formData.back_left_tires}
                                onChange={handleChange}
                                required
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            label="Fuel Capacity"
                            name="capacity_fuel"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the fuel capacity!",
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                id="capacity_fuel"
                                value={formData.capacity_fuel}
                                onChange={handleChange}
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Oil Capacity"
                            name="capacity_oil"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the oil capacity!",
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                id="capacity_oil"
                                value={formData.capacity_oil}
                                onChange={handleChange}
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Cooling Capacity"
                            name="capacity_cooling"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input the cooling capacity!",
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                id="capacity_cooling"
                                value={formData.capacity_cooling}
                                onChange={handleChange}
                                required
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Choose File" name="image">
                    <Upload
                        beforeUpload={() => false}
                        onChange={handleImageChange}
                    >
                        <Button icon={<UploadOutlined />}>Choose File</Button>
                    </Upload>
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
                    <p>Vehicle created successfully!</p>
                </Row>
            </Modal>
        </>
    );
};
