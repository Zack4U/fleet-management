import React, { useEffect, useState } from "react";
import moment from "moment";
import TruckSVG from "../../../assets/truck.svg";
import BatterySVG from "../../../assets/battery.svg";
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
import { Maintenance } from "../../../api/maintenance";
import { getVehicle, editVehicle } from "../../../slices/vehicleSlice";
import { addOil, updateOil } from "../../../slices/oilSlice";
import { addRefuel, getRefuels } from "../../../slices/refuelSlice";
import { addCooling, updateCooling } from "../../../slices/coolingSlice";
import { addLight, updateLight } from "../../../slices/lightSlice";
import { addPneumatic, updatePneumatic } from "../../../slices/pneumaticSlice";
import { addBattery, updateBattery } from "../../../slices/batterySlice";
import { addMaintenance } from "../../../slices/maintenanceSlice";
import { updateFuel } from "../../../slices/fuelSlice";
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
    EditOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
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
    const maintenanceApi = new Maintenance();

    const [useDataLoaded, setUseDataLoaded] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(selected.vehicle);

    const [selectedMaintenance, setSelectedMaintenance] = useState({
        schedule_date: "",
        type: "",
        vehicleId: "",
    });
    const [refuels, setRefuels] = useState([]);
    const [oilHistory, setOilHistory] = useState([]);
    const [coolingHistory, setCoolingHistory] = useState([]);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isOilChangeModalVisible, setIsOilChangeModalVisible] =
        useState(false);
    const [isCoolingChangeModalVisible, setIsCoolingChangeModalVisible] =
        useState(false);
    const [isFuelHistoryVisible, setIsFuelHistoryVisible] = useState(false);
    const [isLightsModalVisible, setIsLightsModalVisible] = useState(false);
    const [isPneumaticChangeModalVisible, setIsPneumaticChangeModalVisible] =
        useState(false);
    const [isRefuelModalVisible, setIsRefuelModalVisible] = useState(false);
    const [isSpendModalVisible, setIsSpendModalVisible] = useState(false);
    const [isBatteryModalVisible, setIsBatteryModalVisible] = useState(false);
    const [isMaintenanceModalVisible, setIsMaintenanceModalVisible] =
        useState(false);
    const [isOilHistoryModalVisible, setIsOilHistoryModalVisible] =
        useState(false);
    const [isCoolingHistoryModalVisible, setIsCoolingHistoryModalVisible] =
        useState(false);
    const [selectedLight, setSelectedLight] = useState({});
    const [selectedPneumatic, setSelectedPneumatic] = useState({});
    const [selectedBattery, setSelectedBattery] = useState({});
    const [refuel, setRefuel] = useState({});
    const [batteryColor, setBatteryColor] = useState("white");
    const [maintenances, setMaintenances] = useState([{}]);

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

        fetchVehicle();
    }, [selectedVehicle.id]);

    useEffect(() => {
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
    }, [isRefuelModalVisible]);

    useEffect(() => {
        const fetchOils = async () => {
            try {
                const res = await oilApi.getVehicleOils(selectedVehicle.id);
                if (res) {
                    console.log(res);
                    setOilHistory(res);
                } else {
                    console.log("No oils found");
                }
            } catch (error) {
                console.error("Error fetching oils: ", error);
            }
        };

        fetchOils();
    }, [isOilHistoryModalVisible]);

    useEffect(() => {
        const fetchCooling = async () => {
            try {
                const res = await coolingApi.getVehicleCoolings(
                    selectedVehicle.id
                );
                if (res) {
                    console.log(res);
                    setCoolingHistory(res);
                } else {
                    console.log("No oils found");
                }
            } catch (error) {
                console.error("Error fetching oils: ", error);
            }
        };

        fetchCooling();
    }, [isOilHistoryModalVisible]);

    useEffect(() => {
        const fetchBattery = async () => {
            if (selectedVehicle.battery && selectedVehicle.battery[0]) {
                if (selectedVehicle.battery[0].status === "GOOD") {
                    setBatteryColor("green");
                } else if (selectedVehicle.battery[0].status === "REGULAR") {
                    setBatteryColor("yellow");
                } else if (selectedVehicle.battery[0].status === "BAD") {
                    setBatteryColor("red");
                } else {
                    setBatteryColor("white");
                }
            }
        };

        fetchBattery();
    }, [selectedVehicle]);

    useEffect(() => {
        const fetchMaintenances = async () => {
            try {
                const res = await maintenanceApi.getVehicleMaintenances(
                    selectedVehicle.id
                );
                if (res) {
                    setMaintenances(res);
                } else {
                    console.log("No maintenances found");
                }
            } catch (error) {
                console.error("Error fetching maintenances: ", error);
            }
        };

        fetchMaintenances();
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

    const handleRefuelChange = (e) => {
        setRefuel({
            ...refuel,
            [e.target.name]: e.target.value,
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

    const handlePneumaticChange = (e) => {
        setSelectedPneumatic({
            ...selectedPneumatic,
            [e.target.name]: e.target.value,
        });
    };

    const handleBatteryChange = (e) => {
        setSelectedBattery({
            ...selectedBattery,
            [e.target.name]: e.target.value,
        });
    };

    const handleMaintenanceChange = (e) => {
        console.log(e.target.name, e.target.value);
        setSelectedMaintenance({
            ...selectedMaintenance,
            [e.target.name]: e.target.value,
        });
    };

    const handleMaintenanceSelect = (value) => {
        setSelectedMaintenance({
            ...selectedMaintenance,
            type: value,
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
            toast.success("Status changed successfully");
            setIsSelectOpen(false);
        } catch (error) {
            toast.error("Error changing status");
            console.error("Error changing status: ", error);
        }
    };

    const lightsInfo = (position) => {
        const lightInfo = selectedVehicle.lights.find(
            (light) => light.position === position
        );
        return lightInfo;
    };

    const pneumaticsGroup = (position) => {
        const pneumaticGroup = selectedVehicle.pneumatics.filter(
            (pneumatic) => pneumatic.position === position
        );
        return pneumaticGroup;
    };

    const handleCardClick = (position) => {
        setSelectedLight(lightsInfo(position));
        setIsLightsModalVisible(true);
    };

    const handlePneumaticClick = (pneumatic_id) => {
        setSelectedPneumatic(
            selectedVehicle.pneumatics.find(
                (pneumatic) => pneumatic.id === pneumatic_id
            )
        );
        setIsPneumaticChangeModalVisible(true);
    };

    const handleBatteryClick = () => {
        setSelectedBattery(selectedVehicle.battery[0]);
        setIsBatteryModalVisible(true);
    };

    const addRefuel = async () => {
        try {
            const formData = new FormData();
            const id = selectedVehicle.fuel.id;
            const cost = refuel.liters * refuel.cost;
            formData.append("liters", refuel.liters);
            formData.append("cost", cost);
            formData.append("type", refuel.type);

            const res = await fuelApi.refuel(id, formData);
            dispatch(updateFuel(res));
            setSelectedVehicle({
                ...selectedVehicle,
                fuel: res,
            });
            toast.success("Refuel successful");
            setIsRefuelModalVisible(false);
        } catch (error) {
            toast.error("Error refueling");
            console.error("Error refueling: ", error);
        }
    };

    const spendFuel = async () => {
        try {
            const formData = new FormData();
            const id = selectedVehicle.fuel.id;
            formData.append("liters", refuel.liters);

            const res = await fuelApi.spendFuel(id, formData);
            dispatch(updateFuel(res));
            setSelectedVehicle({
                ...selectedVehicle,
                fuel: res,
            });
            toast.success("Fuel spent successfully");
            setIsSpendModalVisible(false);
        } catch (error) {
            toast.error("Error spending fuel");
            console.error("Error spending fuel: ", error);
        }
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
            toast.success("Oil changed successfully");
            setIsOilChangeModalVisible(false);
        } catch (error) {
            toast.error("Error changing oil");
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
            toast.success("Cooling changed successfully");
            setIsCoolingChangeModalVisible(false);
        } catch (error) {
            toast.error("Error changing cooling");
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
            toast.success("Light changed successfully");
            setIsLightsModalVisible(false);
        } catch (error) {
            toast.error("Error changing light");
            console.error("Error changing oil: ", error);
        }
    };

    const okPneumaticChange = async () => {
        try {
            console.log("Pneumatic change details: ", selectedLight);
            const formDataToSubmit = new FormData();
            formDataToSubmit.append("vehicleId", selectedVehicle.id);
            formDataToSubmit.append("pneumaticId", selectedPneumatic.id);
            formDataToSubmit.append("brand", selectedPneumatic.brand);
            formDataToSubmit.append("model", selectedPneumatic.model);
            formDataToSubmit.append("size", selectedPneumatic.size);
            formDataToSubmit.append("type", selectedPneumatic.type);
            formDataToSubmit.append("pressure", selectedPneumatic.pressure);
            formDataToSubmit.append("diameter", selectedPneumatic.diameter);
            formDataToSubmit.append("width", selectedPneumatic.width);
            formDataToSubmit.append("height", selectedPneumatic.height);
            formDataToSubmit.append("position", selectedPneumatic.position);

            const pneumatic = await pneumaticApi.addPneumatic(formDataToSubmit);

            await vehicleApi.changePneumatic(selectedVehicle.id).then((res) => {
                console.log(res);
                dispatch(
                    editVehicle({
                        vehicleId: selectedVehicle.id,
                        updateVehicleData: res,
                    })
                );
            });
            toast.success("Pneumatic changed successfully");
            setIsPneumaticChangeModalVisible(false);
        } catch (error) {
            toast.error("Error changing pneumatic");
            console.error("Error changing pneumatic: ", error);
        }
    };

    const okBatteryChange = async () => {
        try {
            console.log("Battery change details: ", selectedBattery);
            const formDataToSubmit = new FormData();
            formDataToSubmit.append("vehicleId", selectedVehicle.id);
            formDataToSubmit.append("brand", selectedBattery.brand);
            formDataToSubmit.append("type", selectedBattery.type);
            formDataToSubmit.append("amperage", selectedBattery.amperage);
            formDataToSubmit.append("voltage", selectedBattery.voltage);

            const battery = await batteryApi.addBattery(formDataToSubmit);

            await vehicleApi.changeBattery(selectedVehicle.id).then((res) => {
                console.log(res);
                dispatch(
                    editVehicle({
                        vehicleId: selectedVehicle.id,
                        updateVehicleData: res,
                    })
                );
            });
            toast.success("Battery changed successfully");
            setIsBatteryModalVisible(false);
        } catch (error) {
            toast.error("Error changing battery");
            console.error("Error changing battery: ", error);
        }
    };

    const okMaintenanceCreate = async () => {
        try {
            const formData = new FormData();
            formData.append("schedule_date", selectedMaintenance.schedule_date);
            formData.append("finish_date", selectedMaintenance.finish_date);
            formData.append("type", selectedMaintenance.type);
            formData.append("cost", selectedMaintenance.cost);
            formData.append("notes", selectedMaintenance.notes);
            formData.append("status", selectedMaintenance.status);
            formData.append("vehicleId", selectedVehicle.id);

            const res = await maintenanceApi.addMaintenance(formData);
            console.log(res);
            setMaintenances([...maintenances, res]);

            toast.success("Maintenance created successfully");
            setIsMaintenanceModalVisible(false);
        } catch (error) {
            toast.error("Error creating maintenance");
            console.error("Error creating maintenance: ", error);
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
            toast.success("Lights reviewed successfully");
        } catch (error) {
            console.error("Error reviewing lights: ", error);
        }
    };

    const reviewPneumatics = async () => {
        try {
            const formData = new FormData();
            formData.append("vehicleId", selectedVehicle.id);

            const res = await vehicleApi.reviewPneumatic(selectedVehicle.id);
            dispatch(
                editVehicle({
                    vehicleId: selectedVehicle.id,
                    updateVehicleData: res,
                })
            );
            toast.success("Pneumatics reviewed successfully");
        } catch (error) {
            console.error("Error reviewing pneumatics: ", error);
        }
    };

    const reviewBattery = async () => {
        try {
            const formData = new FormData();
            formData.append("vehicleId", selectedVehicle.id);

            const res = await vehicleApi.reviewBattery(selectedVehicle.id);
            dispatch(
                editVehicle({
                    vehicleId: selectedVehicle.id,
                    updateVehicleData: res,
                })
            );
            toast.success("Battery reviewed successfully");
        } catch (error) {
            console.error("Error reviewing battery: ", error);
        }
    };

    const saveFrequencys = async () => {
        try {
            const formData = new FormData();
            formData.append("vehicleId", selectedVehicle.id);
            formData.append(
                "oil_change_period",
                selectedVehicle.oil_change_period
            );
            formData.append(
                "cooling_change_period",
                selectedVehicle.cooling_change_period
            );

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
            toast.success("Frequencys saved successfully");
        } catch (error) {
            console.error("Error saving frequencys: ", error);
        }
    };

    const handleChangeFrequency = async (e) => {
        const type = e.type;
        const value = e.value.toUpperCase();
        setSelectedVehicle({
            ...selectedVehicle,
            [type]: value,
        });

        try {
            const formData = new FormData();
            const id = selectedVehicle.id;
            formData.append(type, value);

            await vehicleApi.updateVehicle(id, formData).then((res) => {
                console.log(res);
                dispatch(
                    editVehicle({
                        vehicleId: id,
                        updateVehicleData: res,
                    })
                );
            });
            toast.success("Frequency changed successfully");
        } catch (error) {
            toast.error("Error changing frequency");
            console.log(error);
        }
    };

    return (
        <>
            {useDataLoaded && (
                <>
                    <div className="flex">
                        <img
                            className="w/2 h-40 object-cover mb-4"
                            src={`http://localhost:3001/api/image/${selectedVehicle.image}`}
                            alt="Vehicle"
                        />
                        <div className="w-full">
                            <Row className="mb-5">
                                <Col span={8}>
                                    <h2 className="text-2xl font-bold">
                                        {selectedVehicle.plate}
                                    </h2>
                                </Col>
                                <Col
                                    span={8}
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
                                <Col
                                    span="8"
                                    className="flex items-center justify-center"
                                >
                                    <EditOutlined
                                        className="text-blue-500 cursor-pointer"
                                        onClick={() => {
                                            setIsEditing(!isEditing);
                                        }}
                                    />
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
                                            <div
                                                className="flex items-center cursor-pointer"
                                                onClick={() =>
                                                    setIsOilHistoryModalVisible(
                                                        true
                                                    )
                                                }
                                            >
                                                <RollbackOutlined />
                                                <p className="ml-1">History</p>
                                            </div>
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
                                                name="oil_change_period"
                                                defaultValue={
                                                    selectedVehicle.oil_change_period
                                                }
                                                disabled={!isEditing}
                                                value={
                                                    selectedVehicle.oil_change_period
                                                }
                                                onChange={(e) =>
                                                    handleChangeFrequency({
                                                        type: "oil_change_period",
                                                        value: e,
                                                    })
                                                }
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
                                            <div
                                                className="flex items-center cursor-pointer"
                                                onClick={() =>
                                                    setIsCoolingHistoryModalVisible(
                                                        true
                                                    )
                                                }
                                            >
                                                <RollbackOutlined />
                                                <p className="ml-1">History</p>
                                            </div>
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
                                                value={
                                                    selectedVehicle.cooling_change_period
                                                }
                                                onChange={(e) =>
                                                    handleChangeFrequency({
                                                        type: "cooling_change_period",
                                                        value: e,
                                                    })
                                                }
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
                                <Row
                                    gutter={24}
                                    className="mb-5 flex items-center justify-center"
                                >
                                    <Col span={12}>
                                        <Button
                                            className="flex bg-blue-500 text-white text-xl p-3 align-middle justify-center items-center w-full"
                                            onClick={() =>
                                                setIsRefuelModalVisible(true)
                                            }
                                        >
                                            Refuel
                                        </Button>
                                    </Col>
                                    <Col span={12}>
                                        <Button
                                            className="flex bg-red-500 text-white text-xl p-3 align-middle justify-center items-center w-full"
                                            onClick={() =>
                                                setIsSpendModalVisible(true)
                                            }
                                        >
                                            Spend
                                        </Button>
                                    </Col>
                                </Row>
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
                                            value={
                                                selectedVehicle.light_review_period
                                            }
                                            disabled={!isEditing}
                                            className="w-full"
                                            onChange={(e) =>
                                                handleChangeFrequency({
                                                    type: "light_review_period",
                                                    value: e,
                                                })
                                            }
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
                                    <RedoOutlined /> Pneumatics
                                </span>
                            }
                            key="4"
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
                                                selectedVehicle.last_review_pneumatic
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
                                                selectedVehicle.last_review_pneumatic,
                                                selectedVehicle.pneumatic_review_period
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
                                                selectedVehicle.pneumatic_review_period
                                            }
                                            value={
                                                selectedVehicle.pneumatic_review_period
                                            }
                                            disabled={!isEditing}
                                            className="w-full"
                                            onChange={(e) =>
                                                handleChangeFrequency({
                                                    type: "pneumatic_review_period",
                                                    value: e,
                                                })
                                            }
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
                                            onClick={reviewPneumatics}
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
                                    <Row justify="center">
                                        {pneumaticsGroup("Front Left").map(
                                            (pneumatic, index) => (
                                                <Col
                                                    span={
                                                        24 /
                                                        pneumaticsGroup(
                                                            "Front Left"
                                                        ).length
                                                    }
                                                    key={index}
                                                >
                                                    <div
                                                        className="border p-4 rounded-md m-1 hover:border-blue-500 transition-colors duration-200 shadow-md cursor-pointer"
                                                        onClick={() =>
                                                            handlePneumaticClick(
                                                                pneumatic.id
                                                            )
                                                        }
                                                    >
                                                        <h2 className="font-bold text-xl mb-2">
                                                            Front Left
                                                        </h2>
                                                        <p
                                                            className={`${
                                                                pneumatic.wear <
                                                                25
                                                                    ? "text-green-500"
                                                                    : pneumatic.wear >
                                                                          25 &&
                                                                      pneumatic.wear <=
                                                                          50
                                                                    ? "text-yellow-500"
                                                                    : pneumatic.wear >
                                                                          50 &&
                                                                      pneumatic.wear <=
                                                                          75
                                                                    ? "text-red-500"
                                                                    : "text-gray-500"
                                                            }`}
                                                        >
                                                            {pneumatic.wear}%
                                                        </p>
                                                    </div>
                                                </Col>
                                            )
                                        )}
                                    </Row>
                                    <Row justify="center">
                                        {pneumaticsGroup("Back Left").map(
                                            (pneumatic, index) => (
                                                <Col
                                                    span={
                                                        24 /
                                                        pneumaticsGroup(
                                                            "Back Left"
                                                        ).length
                                                    }
                                                    key={index}
                                                >
                                                    <div
                                                        className="border p-4 rounded-md m-1 hover:border-blue-500 transition-colors duration-200 shadow-md cursor-pointer"
                                                        onClick={() =>
                                                            handlePneumaticClick(
                                                                pneumatic.id
                                                            )
                                                        }
                                                    >
                                                        <h2 className="font-bold text-xl mb-2">
                                                            Back Left
                                                        </h2>
                                                        <p
                                                            className={`${
                                                                pneumatic.wear <
                                                                25
                                                                    ? "text-green-500"
                                                                    : pneumatic.wear >
                                                                          25 &&
                                                                      pneumatic.wear <=
                                                                          50
                                                                    ? "text-yellow-500"
                                                                    : pneumatic.wear >
                                                                          50 &&
                                                                      pneumatic.wear <=
                                                                          75
                                                                    ? "text-red-500"
                                                                    : "text-gray-500"
                                                            }`}
                                                        >
                                                            {pneumatic.wear}%
                                                        </p>
                                                    </div>
                                                </Col>
                                            )
                                        )}
                                    </Row>
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
                                    <Row justify="center">
                                        {pneumaticsGroup("Front Right").map(
                                            (pneumatic, index) => (
                                                <Col
                                                    span={
                                                        24 /
                                                        pneumaticsGroup(
                                                            "Front Right"
                                                        ).length
                                                    }
                                                    key={index}
                                                >
                                                    <div
                                                        className="border p-4 rounded-md m-1 hover:border-blue-500 transition-colors duration-200 shadow-md cursor-pointer"
                                                        onClick={() =>
                                                            handlePneumaticClick(
                                                                pneumatic.id
                                                            )
                                                        }
                                                    >
                                                        <h2 className="font-bold text-xl mb-2">
                                                            Front Right
                                                        </h2>
                                                        <p
                                                            className={`${
                                                                pneumatic.wear <
                                                                25
                                                                    ? "text-green-500"
                                                                    : pneumatic.wear >
                                                                          25 &&
                                                                      pneumatic.wear <=
                                                                          50
                                                                    ? "text-yellow-500"
                                                                    : pneumatic.wear >
                                                                          50 &&
                                                                      pneumatic.wear <=
                                                                          75
                                                                    ? "text-red-500"
                                                                    : "text-gray-500"
                                                            }`}
                                                        >
                                                            {pneumatic.wear}%
                                                        </p>
                                                    </div>
                                                </Col>
                                            )
                                        )}
                                    </Row>
                                    <Row justify="center">
                                        {pneumaticsGroup("Back Right").map(
                                            (pneumatic, index) => (
                                                <Col
                                                    span={
                                                        24 /
                                                        pneumaticsGroup(
                                                            "Back Right"
                                                        ).length
                                                    }
                                                    key={index}
                                                >
                                                    <div
                                                        className="border p-4 rounded-md m-1 hover:border-blue-500 transition-colors duration-200 shadow-md cursor-pointer"
                                                        onClick={() =>
                                                            handlePneumaticClick(
                                                                pneumatic.id
                                                            )
                                                        }
                                                    >
                                                        <h2 className="font-bold text-xl mb-2">
                                                            Back Right
                                                        </h2>
                                                        <p
                                                            className={`${
                                                                pneumatic.wear <
                                                                25
                                                                    ? "text-green-500"
                                                                    : pneumatic.wear >
                                                                          25 &&
                                                                      pneumatic.wear <=
                                                                          50
                                                                    ? "text-yellow-500"
                                                                    : pneumatic.wear >
                                                                          50 &&
                                                                      pneumatic.wear <=
                                                                          75
                                                                    ? "text-red-500"
                                                                    : "text-gray-500"
                                                            }`}
                                                        >
                                                            {pneumatic.wear}%
                                                        </p>
                                                    </div>
                                                </Col>
                                            )
                                        )}
                                    </Row>
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
                                    <RedoOutlined /> Battery
                                </span>
                            }
                            key="5"
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
                                                selectedVehicle.last_review_battery
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
                                                selectedVehicle.last_review_battery,
                                                selectedVehicle.battery_review_period
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
                                                selectedVehicle.battery_review_period
                                            }
                                            value={
                                                selectedVehicle.battery_review_period
                                            }
                                            disabled={!isEditing}
                                            className="w-full"
                                            onChange={(e) =>
                                                handleChangeFrequency({
                                                    type: "battery_review_period",
                                                    value: e,
                                                })
                                            }
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
                                            onClick={reviewBattery}
                                        >
                                            <CheckOutlined />
                                        </Button>
                                    </Col>
                                </Row>
                            </Row>
                            <Row gutter={24}>
                                <Col
                                    span={10}
                                    className="flex items-center align-middle justify-center"
                                >
                                    <svg
                                        width="200"
                                        height="200"
                                        viewBox="0 0 200 200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        color={batteryColor}
                                        onClick={handleBatteryClick}
                                    >
                                        <rect
                                            x="20"
                                            y="60"
                                            width="160"
                                            height="100"
                                            fill="grey"
                                            stroke="black"
                                            stroke-width="2"
                                        />

                                        <rect
                                            x="20"
                                            y="40"
                                            width="160"
                                            height="20"
                                            fill="currentColor"
                                            stroke="black"
                                            stroke-width="2"
                                        />

                                        <circle
                                            cx="50"
                                            cy="40"
                                            r="10"
                                            fill="currentColor"
                                            stroke="black"
                                            stroke-width="2"
                                        />

                                        <circle
                                            cx="150"
                                            cy="40"
                                            r="10"
                                            fill="currentColor"
                                            stroke="black"
                                            stroke-width="2"
                                        />
                                        <text
                                            x="50%"
                                            y="50%"
                                            dominant-baseline="middle"
                                            text-anchor="middle"
                                            fill="white"
                                            font-size="20"
                                        >
                                            {selectedVehicle.battery[0].status}
                                        </text>
                                    </svg>
                                </Col>
                                <Col span={14}>
                                    <Row
                                        gutter={24}
                                        className="flex items-center align-middle justify-center mt-5"
                                    >
                                        <Col span={12}>
                                            <p className="font-bold">Brand</p>
                                            <p>
                                                {
                                                    selectedVehicle.battery[0]
                                                        .brand
                                                }
                                            </p>
                                        </Col>
                                        <Col span={12}>
                                            <p className="font-bold">Type</p>
                                            <p>
                                                {
                                                    selectedVehicle.battery[0]
                                                        .type
                                                }
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row
                                        gutter={24}
                                        className="flex items-center align-middle justify-center mt-5"
                                    >
                                        <Col span={12}>
                                            <p className="font-bold">Voltage</p>
                                            <p>
                                                {
                                                    selectedVehicle.battery[0]
                                                        .voltage
                                                }{" "}
                                                V
                                            </p>
                                        </Col>
                                        <Col span={12}>
                                            <p className="font-bold">
                                                Amperage
                                            </p>
                                            <p>
                                                {
                                                    selectedVehicle.battery[0]
                                                        .amperage
                                                }{" "}
                                                A
                                            </p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row
                                gutter={24}
                                className="flex justify-center align-middle items-center text-center "
                            >
                                <div className="w-1/2 mt-5">
                                    <p>Last Change</p>
                                    <Input
                                        type="date"
                                        value={formatDate(
                                            selectedVehicle.last_battery_change
                                        )}
                                        disabled={!isEditing}
                                    ></Input>
                                </div>
                            </Row>
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <CalendarOutlined /> Maintenance
                                </span>
                            }
                            key="6"
                        >
                            <Row
                                gutter={24}
                                className="flex align-middle justify-center items-center"
                            >
                                <Button
                                    className="text-lg bg-blue-500 text-white flex items-center"
                                    onClick={setIsMaintenanceModalVisible}
                                >
                                    Schedule Maintenance
                                </Button>
                            </Row>
                            <Row>
                                <p className="text-lg">Next Maintenances</p>
                            </Row>
                            <Row className="flex align-middle items-center justify-center">
                                <Table dataSource={maintenances}>
                                    <Table.Column
                                        title="Scheduled Date"
                                        dataIndex="schedule_date"
                                        key="schedule_date"
                                        render={(schedule_date) =>
                                            moment(schedule_date).format(
                                                "YYYY-MM-DD HH:mm"
                                            )
                                        }
                                    />

                                    <Table.Column
                                        title="Type"
                                        dataIndex="type"
                                        key="type"
                                    />

                                    <Table.Column
                                        title="Notes"
                                        dataIndex="notes"
                                        key="notes"
                                    />
                                    <Table.Column
                                        title="Status"
                                        dataIndex="status"
                                        key="status"
                                    />
                                </Table>
                            </Row>
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <FileOutlined /> Legals
                                </span>
                            }
                            key="7"
                        >
                            <div className="flex flex-col items-center justify-center h-full">
                                {selectedVehicle.legals.toUpperCase() ===
                                "UP TO DATE" ? (
                                    <>
                                        <svg
                                            className="w-20 h-20 text-green-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <p className="mt-5 text-xl font-bold">
                                            Up to date
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            className="w-20 h-20 text-red-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                        <p className="mt-5 text-xl font-bold">
                                            {selectedVehicle.legals}
                                        </p>
                                    </>
                                )}
                            </div>
                        </TabPane>
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
                        title="Refuel tank"
                        visible={isRefuelModalVisible}
                        onOk={() => addRefuel()}
                        onCancel={() => setIsRefuelModalVisible(false)}
                    >
                        <Form>
                            <Form.Item label="Liters">
                                <Input
                                    type="text"
                                    name="liters"
                                    value={refuel.liters}
                                    onChange={handleRefuelChange}
                                />
                            </Form.Item>

                            <Form.Item label="Type">
                                <Input
                                    type="text"
                                    id="type"
                                    name="type"
                                    value={refuel.type}
                                    onChange={handleRefuelChange}
                                />
                            </Form.Item>

                            <Form.Item label="Cost per Liter">
                                <Input
                                    type="number"
                                    id="cost"
                                    name="cost"
                                    value={refuel.cost}
                                    onChange={handleRefuelChange}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        title="Spend fuel"
                        visible={isSpendModalVisible}
                        onOk={() => spendFuel()}
                        onCancel={() => setIsSpendModalVisible(false)}
                    >
                        <Form>
                            <Form.Item label="Liters">
                                <Input
                                    type="text"
                                    name="liters"
                                    value={refuel.liters}
                                    onChange={handleRefuelChange}
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
                    <Modal
                        title="Pneumatic Change"
                        visible={isPneumaticChangeModalVisible}
                        onOk={() => okPneumaticChange()}
                        onCancel={() => setIsPneumaticChangeModalVisible(false)}
                    >
                        <Row>
                            <Col span={12}>
                                <p className="font-bold">Position</p>
                                <p>{selectedPneumatic.position}</p>
                            </Col>
                            <Col span={12}>
                                <p className="font-bold">Status</p>
                                <p
                                    className={`${
                                        selectedPneumatic.wear < 25
                                            ? "text-green-500"
                                            : selectedPneumatic.wear > 25 &&
                                              selectedPneumatic.wear <= 50
                                            ? "text-yellow-500"
                                            : selectedPneumatic.wear > 50 &&
                                              selectedPneumatic.wear <= 75
                                            ? "text-red-500"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {selectedPneumatic.wear}
                                </p>
                            </Col>
                        </Row>
                        <Form className="mt-5">
                            <Form.Item label="Brand">
                                <Input
                                    type="text"
                                    name="brand"
                                    value={selectedPneumatic.brand}
                                    onChange={handlePneumaticChange}
                                />
                            </Form.Item>
                            <Form.Item label="Model">
                                <Input
                                    type="text"
                                    name="model"
                                    value={selectedPneumatic.model}
                                    onChange={handlePneumaticChange}
                                />
                            </Form.Item>
                            <Form.Item label="Size">
                                <Input
                                    type="text"
                                    name="size"
                                    value={selectedPneumatic.size}
                                    onChange={handlePneumaticChange}
                                />
                            </Form.Item>
                            <Form.Item label="Type">
                                <Input
                                    type="text"
                                    name="type"
                                    value={selectedPneumatic.type}
                                    onChange={handlePneumaticChange}
                                />
                            </Form.Item>
                            <Form.Item label="Pressure">
                                <Input
                                    type="text"
                                    name="pressure"
                                    value={selectedPneumatic.pressure}
                                    onChange={handlePneumaticChange}
                                />
                            </Form.Item>
                            <Form.Item label="Diameter">
                                <Input
                                    type="text"
                                    name="diameter"
                                    value={selectedPneumatic.diameter}
                                    onChange={handlePneumaticChange}
                                />
                            </Form.Item>
                            <Form.Item label="Width">
                                <Input
                                    type="text"
                                    name="width"
                                    value={selectedPneumatic.width}
                                    onChange={handlePneumaticChange}
                                />
                            </Form.Item>
                            <Form.Item label="Height">
                                <Input
                                    type="text"
                                    name="height"
                                    value={selectedPneumatic.height}
                                    onChange={handlePneumaticChange}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        title="Battery Change"
                        visible={isBatteryModalVisible}
                        onOk={() => okBatteryChange()}
                        onCancel={() => setIsBatteryModalVisible(false)}
                    >
                        <Row>
                            <Col span={24}>
                                <p className="font-bold">Status</p>
                                <p
                                    className={`${
                                        selectedBattery.status === "GOOD"
                                            ? "text-green-500"
                                            : selectedBattery.status ===
                                              "REGULAR"
                                            ? "text-yellow-500"
                                            : selectedBattery.status === "BAD"
                                            ? "text-red-500"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {selectedBattery.status}
                                </p>
                            </Col>
                        </Row>
                        <Form className="mt-5">
                            <Form.Item label="Brand">
                                <Input
                                    type="text"
                                    name="brand"
                                    value={selectedBattery.brand}
                                    onChange={handleBatteryChange}
                                />
                            </Form.Item>
                            <Form.Item label="Type">
                                <Input
                                    type="text"
                                    name="type"
                                    value={selectedBattery.type}
                                    onChange={handleBatteryChange}
                                />
                            </Form.Item>
                            <Form.Item label="Voltage">
                                <Input
                                    type="number"
                                    name="voltage"
                                    value={selectedBattery.voltage}
                                    onChange={handleBatteryChange}
                                />
                            </Form.Item>
                            <Form.Item label="Amperage">
                                <Input
                                    type="number"
                                    name="amperage"
                                    value={selectedBattery.amperage}
                                    onChange={handleBatteryChange}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        title="Maintenance Schedule"
                        visible={isMaintenanceModalVisible}
                        onOk={() => okMaintenanceCreate()}
                        onCancel={() => setIsMaintenanceModalVisible(false)}
                    >
                        <Form>
                            <Form.Item label="Scheduled Date" required>
                                <Input
                                    type="date"
                                    name="schedule_date"
                                    value={selectedMaintenance.schedule_date}
                                    onChange={handleMaintenanceChange}
                                />
                            </Form.Item>
                            <Form.Item label="Type" required>
                                <Select
                                    type="text"
                                    name="type"
                                    value={selectedMaintenance.type}
                                    onChange={handleMaintenanceSelect}
                                >
                                    <Option value="PREVENTIVE">
                                        Preventive
                                    </Option>
                                    <Option value="CORRECTIVE">
                                        Corrective
                                    </Option>
                                    <Option value="REGULAR">Regular</Option>
                                    <Option value="EMERGENCY">Emergency</Option>
                                    <Option value="REPAIR">Repair</Option>
                                    <Option value="OIL_CHANGE">
                                        Oil Change
                                    </Option>
                                    <Option value="COOLING_CHANGE">
                                        Cooling Change
                                    </Option>
                                    <Option value="LIGHT_REVIEW">
                                        Light Review
                                    </Option>
                                    <Option value="LIGHT_CHANGE">
                                        Light Change
                                    </Option>
                                    <Option value="PNEUMATIC_REVIEW">
                                        Pneumatic Review
                                    </Option>
                                    <Option value="PNEUMATIC_CHANGE">
                                        Pneumatic Change
                                    </Option>
                                    <Option value="BATTERY_REVIEW">
                                        Battery Review
                                    </Option>
                                    <Option value="BATTERY_CHANGE">
                                        Battery Change
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Notes" required>
                                <Input
                                    type="text"
                                    name="notes"
                                    value={selectedMaintenance.notes}
                                    onChange={handleMaintenanceChange}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        title="Oil Change History"
                        visible={isOilHistoryModalVisible}
                        onOk={() => setIsOilHistoryModalVisible(false)}
                        onCancel={() => setIsOilHistoryModalVisible(false)}
                    >
                        <Table dataSource={oilHistory}>
                            <Table.Column
                                title="Date"
                                dataIndex="createdAt"
                                key="createdAt"
                                render={(date) =>
                                    moment(date).format("YYYY-MM-DD HH:mm")
                                }
                            ></Table.Column>
                            <Table.Column
                                title="Brand"
                                dataIndex="brand"
                            ></Table.Column>
                            <Table.Column
                                title="Type"
                                dataIndex="type"
                            ></Table.Column>
                            <Table.Column
                                title="Liters"
                                dataIndex="liters"
                            ></Table.Column>
                        </Table>
                    </Modal>

                    <Modal
                        title="Cooling Change History"
                        visible={isCoolingHistoryModalVisible}
                        onOk={() => setIsCoolingHistoryModalVisible(false)}
                        onCancel={() => setIsCoolingHistoryModalVisible(false)}
                    >
                        <Table dataSource={coolingHistory}>
                            <Table.Column
                                title="Date"
                                dataIndex="createdAt"
                                key="createdAt"
                                render={(date) =>
                                    moment(date).format("YYYY-MM-DD HH:mm")
                                }
                            ></Table.Column>
                            <Table.Column
                                title="Brand"
                                dataIndex="brand"
                            ></Table.Column>
                            <Table.Column
                                title="Liters"
                                dataIndex="liters"
                            ></Table.Column>
                        </Table>
                    </Modal>
                </>
            )}
        </>
    );
}
