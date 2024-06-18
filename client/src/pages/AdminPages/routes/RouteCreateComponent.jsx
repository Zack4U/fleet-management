import React, { useState, useEffect } from "react";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from "@react-google-maps/api";
import { Row, Col, Input, Button, List, Modal, Form, Select } from "antd";
import { DownOutlined, DeleteOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { User } from "../../../api/user";
import { Vehicle } from "../../../api/vehicle";
import { Route } from "../../../api/route";

import "tailwindcss/tailwind.css";

const containerStyle = {
    width: "100%",
    height: "100%",
};

export const RouteCreateComponent = () => {
    const userApi = new User();
    const vehicleApi = new Vehicle();
    const routeApi = new Route();
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [originLocation, setOriginLocation] = useState(null);
    const [destinationLocation, setDestinationLocation] = useState(null);
    const [additionalLocations, setAdditionalLocations] = useState([]);
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [autocomplete, setAutocomplete] = useState(null);
    const [originAutocomplete, setOriginAutocomplete] = useState(null);
    const [destinationAutocomplete, setDestinationAutocomplete] =
        useState(null);
    const [additionalAutocomplete, setAdditionalAutocomplete] = useState(null);
    const [route, setRoute] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [isRouteModalVisible, setIsRouteModalVisible] = useState(false);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [additional, setAdditional] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [vehicleId, setVehicleId] = useState("");
    const [driverId, setDriverId] = useState("");
    const [dateScheduled, setDateScheduled] = useState("");

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setCenter(currentLocation);
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

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
    }, [isRouteModalVisible]);

    const onLoadOrigin = (autocomplete) => {
        console.log("Origin Autocomplete loaded: ", autocomplete);
        setOriginAutocomplete(autocomplete);
    };

    const onLoadDestination = (autocomplete) => {
        console.log("Destination Autocomplete loaded: ", autocomplete);
        setDestinationAutocomplete(autocomplete);
    };

    const onLoadAdditional = (autocomplete) => {
        console.log("Additional Autocomplete loaded: ", autocomplete);
        setAdditionalAutocomplete(autocomplete);
    };

    const onPlaceChangedOrigin = () => {
        if (originAutocomplete !== null) {
            const place = originAutocomplete.getPlace();
            if (place && place.geometry) {
                handlePlaceChange(place, "origin");
                setOrigin(place.formatted_address);
            } else {
                console.log("No place or geometry data available.");
            }
        } else {
            console.log("Autocomplete is not loaded yet!");
        }
    };

    const onPlaceChangedDestination = () => {
        if (destinationAutocomplete !== null) {
            const place = destinationAutocomplete.getPlace();
            if (place && place.geometry) {
                handlePlaceChange(place, "destination");
                setDestination(place.formatted_address);
            } else {
                console.log("No place or geometry data available.");
            }
        } else {
            console.log("Autocomplete is not loaded yet!");
        }
    };

    const onPlaceAdded = () => {
        if (additionalAutocomplete !== null) {
            const place = additionalAutocomplete.getPlace();
            if (place && place.geometry) {
                handleAddLocation(place, "additional");
                setAdditional("");
            } else {
                console.log("No place or geometry data available.");
            }
        } else {
            console.log("Autocomplete is not loaded yet!");
        }
    };

    const handlePlaceChange = (place, type) => {
        const newMarker = {
            name: place.formatted_address,
            position: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            },
            type,
        };
        console.log(newMarker);
        if (type === "origin") {
            setOriginLocation(newMarker);
        } else if (type === "destination") {
            setDestinationLocation(newMarker);
        }
    };

    const handleAddLocation = (place) => {
        const newMarker = {
            name: place.formatted_address,
            position: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            },
        };
        console.log(newMarker);
        setAdditionalLocations([...additionalLocations, newMarker]);
    };

    const handleDeleteLocation = (index) => {
        const newLocations = additionalLocations.filter(
            (location, i) => i !== index
        );
        setAdditionalLocations(newLocations);
    };

    const handleCalculateRoute = () => {
        if (originLocation == undefined || destinationLocation == undefined) {
            toast.error("Please enter origin and destination locations!");
            return;
        }

        if (route) {
            handleDeleteRoute();
        }

        const directionsService = new window.google.maps.DirectionsService();

        console.log(additionalLocations);
        const waypoints = additionalLocations.map((location) => ({
            location: location.position,
            stopover: true,
        }));

        console.log(waypoints);

        const req = {
            origin: originLocation.position,
            destination: destinationLocation.position,
            waypoints,
            optimizeWaypoints: true,
            travelMode: window.google.maps.TravelMode.DRIVING,
        };

        directionsService.route(req, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                const renderer = new window.google.maps.DirectionsRenderer();
                setDirectionsRenderer(renderer);
                renderer.setMap(map);
                renderer.setDirections(result);
                setRoute(result);
                console.log(result);
            } else {
                toast.error("Error fetching directions!");
            }
        });
    };

    const handleSaveRoute = () => {
        if (
            route.driverId === undefined ||
            route.vehicleId === undefined ||
            route.dateScheduled === undefined ||
            route.dateScheduled === ""
        ) {
            toast.error("Please fill all the fields to save the route!");
            return;
        }
        if (route) {
            console.log(route);
            try {
                const FormDataToSend = new FormData();
                FormDataToSend.append("vehicleId", route.vehicleId);
                FormDataToSend.append("driverId", route.driverId);
                FormDataToSend.append("dateScheduled", route.dateScheduled);
                FormDataToSend.append(
                    "startLocation",
                    JSON.stringify(originLocation)
                );
                FormDataToSend.append(
                    "endLocation",
                    JSON.stringify(destinationLocation)
                );
                if (additionalLocations.length > 0) {
                    FormDataToSend.append(
                        "additionalLocations",
                        JSON.stringify(additionalLocations)
                    );
                }

                FormDataToSend.append(
                    "duration",
                    route.routes[0].legs[0].duration.text
                );
                FormDataToSend.append(
                    "distance",
                    route.routes[0].legs[0].distance.text
                );
                console.log(FormDataToSend);
                routeApi.addRoute(FormDataToSend).then((response) => {
                    console.log(response);
                });
                toast.success("Route saved successfully!");
                setIsRouteModalVisible(false);
            } catch (error) {
                console.error("Failed to save route", error);
                toast.error("Failed to save route!");
            }
        } else {
            toast.error("No route to save!");
        }
    };

    const handleDeleteRoute = () => {
        if (directionsRenderer) {
            directionsRenderer.setMap(null);
        }
        setDirectionsRenderer(null);
        setRoute(null);
    };

    const handleCancel = () => {
        setIsRouteModalVisible(false);
    };

    const handleChange = (name) => (value) => {
        if (name === "dateScheduled") {
            value = value.target.value;
        }
        console.log(name);
        console.log(value);
        setRoute((prevRoute) => ({
            ...prevRoute,
            [name]: value,
        }));
    };

    return (
        <div className="h-screen">
            <div className="bg-red-500">
                <h1 className="display-4 text-center text-white text-2xl font-bold p-2">
                    Routes Create
                </h1>
            </div>

            <div className="h-full">
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                        onLoad={(map) => setMap(map)}
                    >
                        <Marker position={center} />
                        {originLocation && (
                            <Marker position={originLocation.position} />
                        )}
                        {destinationLocation && (
                            <Marker position={destinationLocation.position} />
                        )}
                        {additionalLocations.map((location, index) => (
                            <Marker
                                key={index}
                                position={{
                                    lat: location.position.lat,
                                    lng: location.position.lng,
                                }}
                            />
                        ))}
                    </GoogleMap>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            {isLoaded && (
                <div className="absolute right-2 top-10 m-4 p-2 bg-white rounded-lg shadow-lg flex flex-col items-center align-middle justify-center">
                    <h1 className="flex text-xl font-bold justify-center mb-5">
                        Routes
                    </h1>
                    <Row>
                        <Autocomplete
                            onLoad={onLoadOrigin}
                            onPlaceChanged={onPlaceChangedOrigin}
                        >
                            <Input
                                type="text"
                                placeholder="Enter origin"
                                className="border border-transparent  h-8 px-3 rounded shadow-lg text-sm mb-5"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                            />
                        </Autocomplete>
                    </Row>

                    <DownOutlined className="mb-5" />
                    <Row>
                        <Autocomplete
                            onLoad={onLoadDestination}
                            onPlaceChanged={onPlaceChangedDestination}
                        >
                            <Input
                                type="text"
                                placeholder="Enter destination"
                                className="border border-transparent h-8 px-3 rounded shadow-lg text-sm mb-5"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </Autocomplete>
                    </Row>

                    <Row gutter={24}>
                        <Autocomplete
                            onLoad={onLoadAdditional}
                            onPlaceChanged={onPlaceAdded}
                        >
                            <Input
                                type="text"
                                placeholder="Enter additional locations"
                                className="border border-transparent h-8 rounded shadow-lg text-sm mb-5"
                                value={additional}
                                onChange={(e) => setAdditional(e.target.value)}
                            />
                        </Autocomplete>
                    </Row>

                    <Row>
                        <Button
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center align-middle justify-center mb-5"
                            onClick={handleCalculateRoute}
                        >
                            Calculate Route
                        </Button>
                    </Row>
                    <Row className="flex flex-col ">
                        {route && (
                            <>
                                <Button
                                    className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold px-4 rounded flex items-center align-middle justify-center"
                                    onClick={() => setIsRouteModalVisible(true)}
                                >
                                    Save Route
                                </Button>

                                <Button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold  px-4 rounded flex items-center align-middle justify-center mb-5"
                                    onClick={handleDeleteRoute}
                                >
                                    Delete Route
                                </Button>
                            </>
                        )}
                    </Row>

                    {additionalLocations.length > 0 && (
                        <div>
                            <Row className="flex justify-center items-center">
                                <h2 className="font-bold">
                                    Additional Locations
                                </h2>
                            </Row>
                            <Row>
                                <List
                                    dataSource={additionalLocations}
                                    renderItem={(location, index) => (
                                        <List.Item
                                            actions={[
                                                <DeleteOutlined
                                                    onClick={() =>
                                                        handleDeleteLocation(
                                                            index
                                                        )
                                                    }
                                                    className="text-red-500"
                                                />,
                                            ]}
                                        >
                                            {location.name}
                                        </List.Item>
                                    )}
                                />
                            </Row>
                        </div>
                    )}
                </div>
            )}
            {route && (
                <Modal
                    title="Assign route"
                    visible={isRouteModalVisible}
                    onOk={handleSaveRoute}
                    onCancel={handleCancel}
                >
                    <Form>
                        <Form.Item>
                            <p>Vehicle</p>
                            <Select
                                placeholder="Select vehicle"
                                name="vehicleId"
                                value={route.vehicleId}
                                onChange={handleChange("vehicleId")}
                                options={vehicles.map((vehicle) => ({
                                    label: vehicle.plate,
                                    value: vehicle.id,
                                }))}
                            ></Select>
                        </Form.Item>
                        <Form.Item>
                            <p>Driver</p>
                            <Select
                                placeholder="Select driver"
                                name="driverId"
                                value={route.driverId}
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
                            ></Select>
                        </Form.Item>
                        <Form.Item>
                            <p>Date scheduled</p>
                            <Input
                                placeholder="Select date scheduled"
                                type="datetime-local"
                                name="dateScheduled"
                                value={route.dateScheduled}
                                onChange={handleChange("dateScheduled")}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
};
