import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from "@react-google-maps/api";
import { User } from "../../../api/user";
import { Vehicle } from "../../../api/vehicle";
import { Route } from "../../../api/route";
import { toast } from "react-toastify";
import TruckIcon from "../../../assets/truck.png";

const containerStyle = {
    width: "100%",
    height: "100%",
};

export const MyRouteViewComponent = (selected) => {
    const dispatch = useDispatch();
    const vehicleApi = new Vehicle();
    const userApi = new User();
    const routeApi = new Route();

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [route, setRoute] = useState(selected.route);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [vehicle, setVehicle] = useState({});
    const [driver, setDriver] = useState({});

    useEffect(() => {
        const fetchVehicles = () => {
            vehicleApi
                .getVehicle(route.vehicleId)
                .then((vehicles) => {
                    console.log(vehicles);
                    setVehicle(vehicles);
                    setCenter(vehicles.position);
                    setDataIsLoaded(true);
                })
                .catch((error) => {
                    console.error("Failed to fetch vehicle", error);
                });
        };

        const fetchDrivers = () => {
            userApi
                .getUser(route.driverId)
                .then((drivers) => {
                    console.log(drivers);
                    setDriver(drivers);
                })
                .catch((error) => {
                    console.error("Failed to fetch driver", error);
                });
        };

        console.log("Obteniendo datos...");
        fetchDrivers();
        fetchVehicles();
    }, [dispatch]);

    const handleCalculateRoute = (map) => {
        const directionsService = new window.google.maps.DirectionsService();

        const waypoints = route.additionalLocations.map((location) => ({
            location: location.position,
            stopover: true,
        }));

        console.log(waypoints);

        const req = {
            origin: route.startLocation.position,
            destination: route.endLocation.position,
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
                console.log(result);
            } else {
                toast.error("Error fetching directions!");
            }
        });
    };

    const getBackgroundColor = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-500";
            case "IN_ROUTE":
                return "bg-blue-500";
            case "FINISHED":
                return "bg-green-500";
            case "CANCELLED":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <div className="h-screen">
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
                        onLoad={(map) => handleCalculateRoute(map)}
                    >
                        <Marker
                            position={center}
                            icon={{
                                url: TruckIcon,
                                scaledSize: new window.google.maps.Size(60, 50),
                            }}
                        />
                        {route.startLocation && (
                            <Marker position={route.startLocation.position} />
                        )}
                        {route.endLocation && (
                            <Marker position={route.endLocation.position} />
                        )}
                        {route.additionalLocations.map((location, index) => (
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
                <>
                    <div className="absolute right-100 top-12 m-4 p-2 bg-white rounded-lg shadow-lg flex flex-col items-center align-middle justify-center">
                        <div>
                            <h1 className="flex text-xl font-bold justify-center ">
                                Duration
                            </h1>
                            <p>{route.duration}</p>
                        </div>
                        <div>
                            <h1 className="flex text-xl font-bold justify-center ">
                                Distance
                            </h1>
                            <p>{route.distance}</p>
                        </div>
                        {route.startDateTime && (
                            <div>
                                <h1 className="flex text-xl font-bold justify-center ">
                                    Start Date/Time
                                </h1>
                                <p>{route.startDateTime}</p>
                            </div>
                        )}
                        {route.startDateTime && (
                            <div>
                                <h1 className="flex text-xl font-bold justify-center ">
                                    End Date/Time
                                </h1>
                                <p>{route.endDateTime}</p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`absolute right-6 top-12 m-4 p-2 rounded-lg shadow-lg flex flex-col items-center align-middle justify-center ${getBackgroundColor(
                            route.status
                        )}`}
                    >
                        <div>
                            <p className="text-xl font-bold justify-center">
                                {route.status === "PENDING"
                                    ? "Pending"
                                    : route.status === "IN_ROUTE"
                                    ? "In Route"
                                    : route.status === "FINISHED"
                                    ? "Finished"
                                    : route.status === "CANCELED"
                                    ? "Canceled"
                                    : "Unknown"}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
