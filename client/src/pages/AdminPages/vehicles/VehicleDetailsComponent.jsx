import React, { useEffect, useState } from "react";
import moment from "moment";
import TruckSVG from "../../../assets/truck.svg";
import {
    Modal,
    Row,
    Col,
    Button,
    Select,
    Divider,
    Form,
    Tabs,
    Input,
    List,
    Table,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Vehicle } from "../../../api/vehicle";
import { Oil } from "../../../api/oil";
import { Cooling } from "../../../api/cooling";
import { Fuel } from "../../../api/fuel";
import { Light } from "../../../api/light";
import { Pneumatic } from "../../../api/pneumatic";
import { Battery } from "../../../api/battery";
import { getVehicle, editVehicle } from "../../../slices/vehicleSlice";
import { addOil, updateOil } from "../../../slices/oilSlice";
import { getRefuels } from "../../../slices/refuelSlice";
import {
    BgColorsOutlined,
    SendOutlined,
    PauseOutlined,
    RedoOutlined,
    CalendarOutlined,
    FileOutlined,
    ArrowRightOutlined,
    RollbackOutlined,
    CheckOutlined,
} from "@ant-design/icons";
import "tailwindcss/tailwind.css";

const { Option } = Select;
const { TabPane } = Tabs;

export default function VehicleDetailsComponent(selected) {
    const dispatch = useDispatch();

    const vehicleApi = new Vehicle();
    const oilApi = new Oil();
    const coolingApi = new Cooling();
    const fuelApi = new Fuel();
    const lightApi = new Light();
    const pneumaticApi = new Pneumatic();
    const batteryApi = new Battery();

    const [useDataLoaded, setUseDataLoaded] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(selected.vehicle);
    const [refuels, setRefuels] = useState([]);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isOilChangeModalVisible, setIsOilChangeModalVisible] =
        useState(false);
    const [isCoolingChangeModalVisible, setIsCoolingChangeModalVisible] =
        useState(false);
    const [isFuelHistoryVisible, setIsFuelHistoryVisible] = useState(false);
    const [isLightsModalVisible, setIsLightsModalVisible] = useState(false);
    const [selectedLight, setSelectedLight] = useState({});

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const id = selectedVehicle.id;
                const res = await vehicleApi.getVehicle(id);
                dispatch(getVehicle(res));
                setSelectedVehicle(res);
                setUseDataLoaded(true);
            } catch (error) {
                console.error("Error fetching vehicle details: ", error);
            }
        };
        const fetchRefuels = async () => {
            try {
                const res = await fuelApi.getRefuels(selectedVehicle.fuelId);
                if (res) {
                    console.log(res);
                    setRefuels(res);
                } else {
                    console.log("No refuels found");
                }
            } catch (error) {
                console.error("Error fetching refuels: ", error);
            }
        };

        fetchRefuels();
        fetchVehicle();
    }, [selectedVehicle.id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const handleChange = (e) => {
        setSelectedVehicle({
            ...selectedVehicle,
            [e.target.name]: e.target.value,
        });
    };

    const handleOilChange = (e) => {
        setSelectedVehicle({
            ...selectedVehicle,
            oil: [
                {
                    ...selectedVehicle.oil[0],
                    [e.target.name]: e.target.value,
                },
            ],
        });
    };

    const handleCoolingChange = (e) => {
        setSelectedVehicle({
            ...selectedVehicle,
            cooling: [
                {
                    ...selectedVehicle.cooling[0],
                    [e.target.name]: e.target.value,
                },
            ],
        });
    };

    const handleLightChange = (e) => {
        setSelectedLight({
            ...selectedLight,
            [e.target.name]: e.target.value,
        });
    };

    const changePeriod = (date, period) => {
        const newDate = new Date(date);
        switch (period) {
            case "DAILY":
                newDate.setDate(newDate.getDate() + 1);
                break;
            case "WEEKLY":
                newDate.setDate(newDate.getDate() + 7);
                break;
            case "MONTHLY":
                newDate.setMonth(newDate.getMonth() + 1);
                break;
            case "QUARTERLY":
                newDate.setMonth(newDate.getMonth() + 3);
                break;
            case "HALF-YEARLY":
                newDate.setMonth(newDate.getMonth() + 6);
                break;
            case "YEARLY":
                newDate.setFullYear(newDate.getFullYear() + 1);
                break;
            default:
                break;
        }
        return formatDate(newDate);
    };

    const fuelPercentRemaining = () => {
        const capacity = selectedVehicle.fuel.liters;
        const fuel = selectedVehicle.fuel.available;
        const fuelPercent = Math.floor((fuel * 100) / capacity);
        return fuelPercent;
    };

    const handleStatusChange = async (value) => {
        try {
            const formData = new FormData();
            formData.append("statusId", value);

            const res = await vehicleApi.updateVehicle(
                selectedVehicle.id,
                formData
            );

            dispatch(
                editVehicle({
                    vehicleId: selectedVehicle.id,
                    updateVehicleData: res,
                })
            );

            setSelectedVehicle({
                ...selectedVehicle,
                statusId: value,
            });

            setIsSelectOpen(false);
        } catch (error) {
            console.error("Error changing status: ", error);
        }
    };

    const lightsInfo = (position) => {
        const lightInfo = selectedVehicle.lights.find(
            (light) => light.position === position
        );
        return lightInfo;
    };

    const handleCardClick = (position) => {
        setSelectedLight(lightsInfo(position));
        setIsLightsModalVisible(true);
    };

    const okOilChange = async () => {
        try {
            console.log("Oil change details: ", selectedVehicle.oil[0]);
            const formDataToSubmit = new FormData();
            formDataToSubmit.append("vehicleId", selectedVehicle.id);
            formDataToSubmit.append("brand", selectedVehicle.oil[0].brand);
            formDataToSubmit.append("type", selectedVehicle.oil[0].type);
            formDataToSubmit.append("liters", selectedVehicle.oil[0].liters);

            const oil = await oilApi.addOil(formDataToSubmit);

            await vehicleApi.changeOil(selectedVehicle.id).then((res) => {
                console.log(res);
                dispatch(
                    editVehicle({
                        vehicleId: selectedVehicle.id,
                        updateVehicleData: res,
                    })
                );
            });

            setIsOilChangeModalVisible(false);
        } catch (error) {
            console.error("Error changing oil: ", error);
        }
    };

    const okCoolingChange = async () => {
        try {
            console.log("Cooling change details: ", selectedVehicle.cooling[0]);
            const formDataToSubmit = new FormData();
            formDataToSubmit.append("vehicleId", selectedVehicle.id);
            formDataToSubmit.append("brand", selectedVehicle.cooling[0].brand);
            formDataToSubmit.append(
                "liters",
                selectedVehicle.cooling[0].liters
            );

            const cooling = await coolingApi.addCooling(formDataToSubmit);

            await vehicleApi.changeCooling(selectedVehicle.id).then((res) => {
                console.log(res);
                dispatch(
                    editVehicle({
                        vehicleId: selectedVehicle.id,
                        updateVehicleData: res,
                    })
                );
            });

            setIsCoolingChangeModalVisible(false);
        } catch (error) {
            console.error("Error changing oil: ", error);
        }
    };

    const okLightChange = async () => {
        try {
            console.log("Light change details: ", selectedLight);
            const formDataToSubmit = new FormData();
            formDataToSubmit.append("vehicleId", selectedVehicle.id);
            formDataToSubmit.append("position", selectedLight.position);
            formDataToSubmit.append("brand", selectedLight.brand);
            formDataToSubmit.append("type", selectedLight.type);

            const light = await lightApi.addLight(formDataToSubmit);

            await vehicleApi.changeLight(selectedVehicle.id).then((res) => {
                console.log(res);
                dispatch(
                    editVehicle({
                        vehicleId: selectedVehicle.id,
                        updateVehicleData: res,
                    })
                );
            });

            setIsLightsModalVisible(false);
        } catch (error) {
            console.error("Error changing oil: ", error);
        }
    };

    const reviewLights = async () => {
        try {
            const formData = new FormData();
            formData.append("vehicleId", selectedVehicle.id);

            const res = await vehicleApi.reviewLight(selectedVehicle.id);
            dispatch(
                editVehicle({
                    vehicleId: selectedVehicle.id,
                    updateVehicleData: res,
                })
            );
        } catch (error) {
            console.error("Error reviewing lights: ", error);
        }
    };

    return (
        <>
            {useDataLoaded && (
                <>
                    <div className="flex">
                        <img
                            className="w/2 h-40 object-cover mb-4"
                            src={`http://localhost:3001/api/vehicles/image/${selectedVehicle.image}`}
                            alt="Vehicle"
                        />
                        <div className="w-full">
                            <Row className="mb-5">
                                <Col span={12}>
                                    <h2 className="text-2xl font-bold">
                                        {selectedVehicle.plate}
                                    </h2>
                                </Col>
                                <Col
                                    span={12}
                                    className="w-1/2 flex items-center"
                                >
                                    <div
                                        className={`h-2 w-2 rounded-full mr-2 ${
                                            selectedVehicle.statusId ===
                                            "AVAILABLE"
                                                ? "bg-green-500"
                                                : selectedVehicle.statusId ===
                                                  "IN_MAINTENANCE"
                                                ? "bg-yellow-500"
                                                : selectedVehicle.statusId ===
                                                  "IN_ROUTE"
                                                ? "bg-blue-500"
                                                : "bg-gray-500"
                                        }`}
                                    />
                                    {isSelectOpen ? (
                                        <Select
                                            value={selectedVehicle.statusId}
                                            style={{ width: 120 }}
                                            onBlur={() =>
                                                setIsSelectOpen(false)
                                            }
                                            onSelect={handleStatusChange}
                                        >
                                            <Option value="AVAILABLE">
                                                AVAILABLE
                                            </Option>
                                            <Option value="UNAVAILABLE">
                                                UNAVAILABLE
                                            </Option>
                                            <Option value="IN_ROUTE">
                                                IN ROUTE
                                            </Option>
                                            <Option value="IN_MAINTENANCE">
                                                IN MAINTENANCE
                                            </Option>
                                        </Select>
                                    ) : (
                                        <p
                                            onClick={() =>
                                                setIsSelectOpen(true)
                                            }
                                        >
                                            {selectedVehicle.statusId}
                                        </p>
                                    )}
                                </Col>
                            </Row>
                            <Row className="mb-5 ">
                                <Col span={6}>
                                    <p className="font-bold">Brand</p>
                                    <p>{selectedVehicle.brand}</p>
                                </Col>
                                <Col span={6}>
                                    <p className="font-bold">Line</p>
                                    <p>{selectedVehicle.line}</p>
                                </Col>
                                <Col span={6}>
                                    <p className="font-bold">Model</p>
                                    <p>{selectedVehicle.model}</p>
                                </Col>
                                <Col span={6}>
                                    <p className="font-bold">Kilometers</p>
                                    <p>{selectedVehicle.kilometers}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Button className="rounded-2xl">
                                        Reporte de Siniestro
                                    </Button>
                                </Col>
                                <Col span={6}>
                                    <Button className="bg-black text-white rounded-2xl">
                                        Reporte de Novedad
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <Divider />
                    <Tabs defaultActiveKey="1" className="w-full">
                        <TabPane
                            tab={
                                <span>
                                    <BgColorsOutlined /> Liquids
                                </span>
                            }
                            key="1"
                        >
                            <Form>
                                <Form.Item>
                                    <Row>
                                        <Col>
                                            <h3 className="text-lg font-bold mr-10">
                                                Engine Oil
                                            </h3>
                                        </Col>
                                        <Col className="flex items-center text-blue-500">
                                            <RollbackOutlined />
                                            <p className="ml-1">History</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={5} className="m-5">
                                            <p clas>Last Change</p>
                                            <Input
                                                type="date"
                                                value={formatDate(
                                                    selectedVehicle.last_oil_change
                                                )}
                                                disabled={!isEditing}
                                            ></Input>
                                        </Col>
                                        <ArrowRightOutlined />
                                        <Col span={5} className="m-5">
                                            <p>Next Change</p>
                                            <Input
                                                type="date"
                                                value={changePeriod(
                                                    selectedVehicle.last_oil_change,
                                                    selectedVehicle.oil_change_period
                                                )}
                                                disabled={!isEditing}
                                            ></Input>
                                        </Col>
                                        <RollbackOutlined />
                                        <Col span={5} className="m-5">
                                            <p>Change Frequency</p>
                                            <Select
                                                type="text"
                                                defaultValue={
                                                    selectedVehicle.oil_change_period
                                                }
                                                disabled={!isEditing}
                                            >
                                                <Option value="daily">
                                                    Daily
                                                </Option>
                                                <Option value="weekly">
                                                    Weekly
                                                </Option>
                                                <Option value="monthly">
                                                    Monthly
                                                </Option>
                                                <Option value="quarterly">
                                                    Quarterly
                                                </Option>
                                                <Option value="half-yearly">
                                                    Half Yearly
                                                </Option>
                                                <Option value="yearly">
                                                    Yearly
                                                </Option>
                                            </Select>
                                        </Col>
                                        <Col
                                            span={5}
                                            className="mt-5 flex items-center"
                                        >
                                            <Button
                                                type="primary"
                                                className="flex items-center"
                                                onClick={() =>
                                                    setIsOilChangeModalVisible(
                                                        true
                                                    )
                                                }
                                            >
                                                <CheckOutlined />
                                                Change checked
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Form>
                            <Form>
                                <Form.Item>
                                    <Row>
                                        <Col>
                                            <h3 className="text-lg font-bold mr-10">
                                                Engine Cooling
                                            </h3>
                                        </Col>
                                        <Col className="flex items-center text-blue-500">
                                            <RollbackOutlined />
                                            <p className="ml-1">History</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={5} className="m-5">
                                            <p clas>Last Change</p>
                                            <Input
                                                type="date"
                                                value={formatDate(
                                                    selectedVehicle.last_cooling_change
                                                )}
                                                disabled={!isEditing}
                                            ></Input>
                                        </Col>
                                        <ArrowRightOutlined />
                                        <Col span={5} className="m-5">
                                            <p>Next Change</p>
                                            <Input
                                                type="date"
                                                value={changePeriod(
                                                    selectedVehicle.last_cooling_change,
                                                    selectedVehicle.cooling_change_period
                                                )}
                                                disabled={!isEditing}
                                            ></Input>
                                        </Col>
                                        <RollbackOutlined />
                                        <Col span={5} className="m-5">
                                            <p>Change Frequency</p>
                                            <Select
                                                type="text"
                                                defaultValue={
                                                    selectedVehicle.cooling_change_period
                                                }
                                                disabled={!isEditing}
                                            >
                                                <Option value="daily">
                                                    Daily
                                                </Option>
                                                <Option value="weekly">
                                                    Weekly
                                                </Option>
                                                <Option value="monthly">
                                                    Monthly
                                                </Option>
                                                <Option value="quarterly">
                                                    Quarterly
                                                </Option>
                                                <Option value="half-yearly">
                                                    Half Yearly
                                                </Option>
                                                <Option value="yearly">
                                                    Yearly
                                                </Option>
                                            </Select>
                                        </Col>
                                        <Col
                                            span={5}
                                            className="mt-5 flex items-center"
                                        >
                                            <Button
                                                type="primary"
                                                className="flex items-center"
                                                onClick={() => {
                                                    setIsCoolingChangeModalVisible(
                                                        true
                                                    );
                                                }}
                                            >
                                                <CheckOutlined />
                                                Change checked
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <SendOutlined /> Fuel
                                </span>
                            }
                            key="2"
                        >
                            <div>
                                <Row gutter={24} className="mb-5">
                                    <Col span={6}>
                                        <p className="font-bold">Capacity</p>
                                        <p>{selectedVehicle.fuel.liters} L</p>
                                    </Col>
                                    <Col span={6}>
                                        <p className="font-bold">Available</p>
                                        <p>
                                            {selectedVehicle.fuel.available} L
                                        </p>
                                    </Col>
                                    <Col span={6}>
                                        <p className="font-bold">Last refuel</p>
                                        <Input
                                            type="date"
                                            value={formatDate(
                                                selectedVehicle.fuel.last_refuel
                                            )}
                                            disabled
                                        ></Input>
                                    </Col>
                                    <Col
                                        span={6}
                                        className="flex items-center justify-center"
                                    >
                                        <a
                                            className="text-blue-500 "
                                            onClick={() =>
                                                setIsFuelHistoryVisible(true)
                                            }
                                        >
                                            <RollbackOutlined /> History
                                        </a>
                                    </Col>
                                </Row>
                                <Row>
                                    <div className="w-full h-10 bg-gray-300 relative">
                                        <div
                                            style={{
                                                height: "100%",
                                                width: `${fuelPercentRemaining()}%`,
                                            }}
                                            className={`w-full ${
                                                fuelPercentRemaining() < 25
                                                    ? "bg-red-500"
                                                    : "bg-blue-500"
                                            }`}
                                        ></div>
                                        <div
                                            style={{
                                                height: "100%",
                                                width: `${fuelPercentRemaining()}%`,
                                            }}
                                            className="flex items-center justify-center w-full top-0 left-0 absolute"
                                        >
                                            <p className="text-lg text-white">
                                                {fuelPercentRemaining()}%
                                            </p>
                                        </div>
                                    </div>
                                </Row>
                            </div>
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <PauseOutlined /> Lights
                                </span>
                            }
                            key="3"
                        >
                            <Row gutter={24}>
                                <Row className="w-full flex justify-center items-center mb-10">
                                    <Col
                                        span={4}
                                        className="h-full flex flex-col justify-center items-center"
                                    >
                                        <p clas>Last Review</p>
                                        <Input
                                            type="date"
                                            value={formatDate(
                                                selectedVehicle.last_review_light
                                            )}
                                            disabled={!isEditing}
                                        ></Input>
                                    </Col>
                                    <Col
                                        span={2}
                                        className="h-full flex flex-col justify-center items-center"
                                    >
                                        <ArrowRightOutlined />
                                    </Col>

                                    <Col
                                        span={4}
                                        className="h-full flex flex-col justify-center items-center"
                                    >
                                        <p>Next Review</p>
                                        <Input
                                            type="date"
                                            value={changePeriod(
                                                selectedVehicle.last_review_light,
                                                selectedVehicle.light_review_period
                                            )}
                                            disabled={!isEditing}
                                        ></Input>
                                    </Col>
                                    <Col
                                        span={2}
                                        className="h-full flex flex-col justify-center items-center"
                                    >
                                        <RollbackOutlined />
                                    </Col>
                                    <Col
                                        span={4}
                                        className="h-full flex flex-col justify-center items-center"
                                    >
                                        <p>Review Frequency</p>
                                        <Select
                                            type="text"
                                            defaultValue={
                                                selectedVehicle.light_review_period
                                            }
                                            disabled={!isEditing}
                                            className="w-full"
                                        >
                                            <Option value="daily">Daily</Option>
                                            <Option value="weekly">
                                                Weekly
                                            </Option>
                                            <Option value="monthly">
                                                Monthly
                                            </Option>
                                            <Option value="quarterly">
                                                Quarterly
                                            </Option>
                                            <Option value="half-yearly">
                                                Half Yearly
                                            </Option>
                                            <Option value="yearly">
                                                Yearly
                                            </Option>
                                        </Select>
                                    </Col>
                                    <Col
                                        span={4}
                                        className="h-full flex flex-col justify-center items-center"
                                    >
                                        <Button
                                            className="flex align-middle items-center bg-blue-500 text-white"
                                            onClick={reviewLights}
                                        >
                                            <CheckOutlined />
                                        </Button>
                                    </Col>
                                </Row>
                            </Row>
                            <Row
                                gutter={24}
                                className="w-full flex justify-center items-center mt-7 mb-5"
                            >
                                <Col
                                    span={6}
                                    className="h-full flex flex-col justify-center items-center"
                                >
                                    <div
                                        className="border p-4 rounded-md mt-5 hover:border-blue-500 transition-colors duration-200 shadow-md cursor-pointer"
                                        onClick={() => handleCardClick("front")}
                                    >
                                        <h2 className="font-bold text-xl mb-2">
                                            Front
                                        </h2>
                                        <p
                                            className={`${
                                                lightsInfo("front").status ===
                                                "GOOD"
                                                    ? "text-green-500"
                                                    : lightsInfo("front")
                                                          .status === "REGULAR"
                                                    ? "text-yellow-500"
                                                    : lightsInfo("front")
                                                          .status === "BAD"
                                                    ? "text-red-500"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {lightsInfo("front").status}
                                        </p>
                                    </div>
                                    <div
                                        className="border p-4 rounded-md mt-5 hover:border-blue-500 transition-colors duration-200 shadow-md cursor-pointer"
                                        onClick={() => handleCardClick("back")}
                                    >
                                        <h2 className="font-bold text-xl mb-2">
                                            Back
                                        </h2>
                                        <p
                                            className={`${
                                                lightsInfo("back").status ===
                                                "GOOD"
                                                    ? "text-green-500"
                                                    : lightsInfo("back")
                                                          .status === "REGULAR"
                                                    ? "text-yellow-500"
                                                    : lightsInfo("back")
                                                          .status === "BAD"
                                                    ? "text-red-500"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {lightsInfo("back").status}
                                        </p>
                                    </div>
                                </Col>
                                <Col
                                    span={10}
                                    className="h-full flex flex-col justify-center items-center"
                                >
                                    <div className="flex justify-center items-center transform rotate-90">
                                        <img
                                            className=" h-full object-cover mb-4"
                                            src={TruckSVG}
                                            alt="truck_plane"
                                        />
                                    </div>
                                </Col>
                                <Col
                                    span={6}
                                    className="h-full flex flex-col justify-center items-center"
                                >
                                    <div
                                        className="border p-4 rounded-md mt-5 hover:border-blue-500 transition-colors duration-200 shadow-md cursor-pointer"
                                        onClick={() => handleCardClick("side")}
                                    >
                                        <h2 className="font-bold text-xl mb-2">
                                            Side
                                        </h2>
                                        <p
                                            className={`${
                                                lightsInfo("side").status ===
                                                "GOOD"
                                                    ? "text-green-500"
                                                    : lightsInfo("side")
                                                          .status === "REGULAR"
                                                    ? "text-yellow-500"
                                                    : lightsInfo("side")
                                                          .status === "BAD"
                                                    ? "text-red-500"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {lightsInfo("side").status}
                                        </p>
                                    </div>
                                    <div
                                        className="border p-4 rounded-md mt-5 hover:border-blue-500 transition-colors duration-200 shadow-md cursor-pointer"
                                        onClick={() =>
                                            handleCardClick("inside")
                                        }
                                    >
                                        <h2 className="font-bold text-xl mb-2">
                                            Inside
                                        </h2>
                                        <p
                                            className={`${
                                                lightsInfo("inside").status ===
                                                "GOOD"
                                                    ? "text-green-500"
                                                    : lightsInfo("inside")
                                                          .status === "REGULAR"
                                                    ? "text-yellow-500"
                                                    : lightsInfo("inside")
                                                          .status === "BAD"
                                                    ? "text-red-500"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {lightsInfo("inside").status}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                            <Row
                                gutter={24}
                                className="flex justify-center align-middle items-center text-center mt-10 "
                            >
                                <div className="w-1/2 mt-5">
                                    <p>Last Change</p>
                                    <Input
                                        type="date"
                                        value={formatDate(
                                            selectedVehicle.last_light_change
                                        )}
                                        disabled={!isEditing}
                                    ></Input>
                                </div>
                            </Row>
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <RedoOutlined /> Tires
                                </span>
                            }
                            key="4"
                        ></TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <RedoOutlined /> Battery
                                </span>
                            }
                            key="5"
                        ></TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <CalendarOutlined /> Maintenance
                                </span>
                            }
                            key="6"
                        ></TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <FileOutlined /> Legals
                                </span>
                            }
                            key="7"
                        ></TabPane>
                    </Tabs>
                    <Modal
                        title="Oil Change"
                        visible={isOilChangeModalVisible}
                        onOk={() => okOilChange()}
                        onCancel={() => setIsOilChangeModalVisible(false)}
                    >
                        <Form>
                            <Form.Item label="Brand">
                                <Input
                                    type="text"
                                    name="brand"
                                    value={selectedVehicle.oil[0].brand}
                                    onChange={handleOilChange}
                                />
                            </Form.Item>

                            <Form.Item label="Type">
                                <Input
                                    type="text"
                                    id="type"
                                    name="type"
                                    value={selectedVehicle.oil[0].type}
                                    onChange={handleOilChange}
                                />
                            </Form.Item>

                            <Form.Item label="Liters">
                                <Input
                                    type="text"
                                    id="liters"
                                    name="liters"
                                    value={selectedVehicle.oil[0].liters}
                                    onChange={handleOilChange}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        title="Cooling Change"
                        visible={isCoolingChangeModalVisible}
                        onOk={() => okCoolingChange()}
                        onCancel={() => setIsCoolingChangeModalVisible(false)}
                    >
                        <Form>
                            <Form.Item label="Brand">
                                <Input
                                    type="text"
                                    name="brand"
                                    value={selectedVehicle.cooling[0].brand}
                                    onChange={handleCoolingChange}
                                />
                            </Form.Item>

                            <Form.Item label="Liters">
                                <Input
                                    type="text"
                                    name="liters"
                                    value={selectedVehicle.cooling[0].liters}
                                    onChange={handleCoolingChange}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        title="Fueling History"
                        visible={isFuelHistoryVisible}
                        onOk={() => setIsFuelHistoryVisible(false)}
                        onCancel={() => setIsFuelHistoryVisible(false)}
                    >
                        <Table dataSource={refuels}>
                            <Table.Column
                                title="Date"
                                dataIndex="createdAt"
                                key="createdAt"
                                render={(date) =>
                                    moment(date).format("YYYY-MM-DD HH:mm")
                                }
                            ></Table.Column>
                            <Table.Column
                                title="Liters"
                                dataIndex="liters"
                            ></Table.Column>
                            <Table.Column
                                title="Type"
                                dataIndex="type"
                            ></Table.Column>
                            <Table.Column
                                title="Cost"
                                dataIndex="cost"
                            ></Table.Column>
                        </Table>
                    </Modal>
                    <Modal
                        title="Light Change"
                        visible={isLightsModalVisible}
                        onOk={() => okLightChange()}
                        onCancel={() => setIsLightsModalVisible(false)}
                    >
                        <Row>
                            <Col span={12}>
                                <p className="font-bold">Position</p>
                                <p>{selectedLight.position}</p>
                            </Col>
                            <Col span={12}>
                                <p className="font-bold">Status</p>
                                <p
                                    className={`${
                                        selectedLight.status === "GOOD"
                                            ? "text-green-500"
                                            : selectedLight.status === "REGULAR"
                                            ? "text-yellow-500"
                                            : selectedLight.status === "BAD"
                                            ? "text-red-500"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {selectedLight.status}
                                </p>
                            </Col>
                        </Row>
                        <Form className="mt-5">
                            <Form.Item label="Brand">
                                <Input
                                    type="text"
                                    name="brand"
                                    value={selectedLight.brand}
                                    onChange={handleLightChange}
                                />
                            </Form.Item>
                            <Form.Item label="Type">
                                <Input
                                    type="text"
                                    name="type"
                                    value={selectedLight.type}
                                    onChange={handleLightChange}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            )}
        </>
    );
}
