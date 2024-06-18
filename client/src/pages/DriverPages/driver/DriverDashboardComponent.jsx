import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
import { Vehicle } from "../../../api/vehicle";
import { Route } from "../../../api/route";

export const DriverDashboardComponent = () => {
    const vehicleApi = new Vehicle();
    const routeApi = new Route();
    const [users, setUsers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            const vehicles = await vehicleApi.getMyVehicles();
            console.log(vehicles);
            setVehicles(vehicles);
        };

        const fetchRoutes = async () => {
            const routes = await routeApi.getMyRoutes();
            console.log(routes);
            setRoutes(routes);
        };

        fetchVehicles();
        fetchRoutes();
    }, []);
    return (
        <>
            <div className="bg-red-500">
                <h1 className="display-4 text-center text-white text-2xl font-bold p-2 mb-10">
                    Dashboard
                </h1>
            </div>
            <div className="flex flex-col container mx-auto justify-center align-middle items-center">
                <h2 className="text-2xl font-bold m-5 justify-center mt-10">
                    My Vehicles
                </h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-500 p-4 text-white text-center">
                        <h1 className="text-2xl font-bold">Vehicles</h1>
                        <p className="text-xl">{vehicles.length}</p>
                    </div>
                    <div className="bg-green-500 p-4 text-white text-center">
                        <h1 className="text-2xl font-bold">
                            Vehicles Availables
                        </h1>
                        <p className="text-xl">
                            {
                                vehicles.filter(
                                    (vehicle) =>
                                        vehicle.statusId === "AVAILABLE"
                                ).length
                            }
                        </p>
                    </div>
                    <div className="bg-blue-400 p-4 text-white text-center">
                        <h1 className="text-2xl font-bold">
                            Vehicles In Route
                        </h1>
                        <p className="text-xl">
                            {
                                vehicles.filter(
                                    (vehicle) => vehicle.statusId === "IN_ROUTE"
                                ).length
                            }
                        </p>
                    </div>
                    <div className="bg-orange-500 p-4 text-white text-center">
                        <h1 className="text-2xl font-bold">
                            Vehicles In Maintenance
                        </h1>
                        <p className="text-xl">
                            {
                                vehicles.filter(
                                    (vehicle) =>
                                        vehicle.statusId === "IN_MAINTENANCE"
                                ).length
                            }
                        </p>
                    </div>
                    <div className="bg-gray-500 p-4 text-white text-center">
                        <h1 className="text-2xl font-bold">
                            Vehicles Unavalaible
                        </h1>
                        <p className="text-xl">
                            {
                                vehicles.filter(
                                    (vehicle) =>
                                        vehicle.statusId === "UNAVAILABLE"
                                ).length
                            }
                        </p>
                    </div>
                </div>
                <h2 className="text-2xl font-bold m-5 justify-center mt-10">
                    My Routes
                </h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-500 p-4 text-white text-center">
                        <h1 className="text-2xl font-bold">Routes</h1>
                        <p className="text-xl">{routes.length}</p>
                    </div>
                    <div className="bg-green-500 p-4 text-white text-center">
                        <h1 className="text-2xl font-bold">Routes Pending</h1>
                        <p className="text-xl">
                            {
                                routes.filter(
                                    (route) => route.status === "PENDING"
                                ).length
                            }
                        </p>
                    </div>
                    <div className="bg-blue-400 p-4 text-white text-center">
                        <h1 className="text-2xl font-bold">
                            Routes In Progress
                        </h1>
                        <p className="text-xl">
                            {
                                routes.filter(
                                    (route) => route.status === "IN_ROUTE"
                                ).length
                            }
                        </p>
                    </div>
                    <div className="bg-orange-500 p-4 text-white text-center">
                        <h1 className="text-2xl font-bold">Routes Finished</h1>
                        <p className="text-xl">
                            {
                                routes.filter(
                                    (route) => route.status === "FINISHED"
                                ).length
                            }
                        </p>
                    </div>
                    <div className="bg-gray-500 p-4 text-white text-center">
                        <h1 className="text-2xl font-bold">Routes Canceled</h1>
                        <p className="text-xl">
                            {
                                routes.filter(
                                    (route) => route.status === "CANCELED"
                                ).length
                            }
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
