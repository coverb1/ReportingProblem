"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icon problem
const userIcon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function LocationMap() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [error, setError] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Your browser does not support location.");
      return;
    }

    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({
          latitude,
          longitude,
        });

        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
      },
      (error) => {
        console.log(error);

        setError(
          "Location permission was denied or location could not be found."
        );
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

  const defaultPosition: [number, number] = [
    -1.9441,
    30.0619,
  ];

  const mapPosition: [number, number] = location
    ? [location.latitude, location.longitude]
    : defaultPosition;

  return (
    <div className="w-full">
      <button
        onClick={getLocation}
        className="mb-4 rounded-lg bg-[#08aeea] px-5 py-3 font-semibold text-white hover:bg-[#0798cc]"
      >
        📍 Use My Location
      </button>

      {error && (
        <p className="mb-4 rounded-lg bg-red-500/10 p-3 text-red-400">
          {error}
        </p>
      )}

      {location && (
        <div className="mb-4 rounded-lg bg-[#0c1a2a] p-4 text-white">
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}

      <div className="h-[500px] w-full overflow-hidden rounded-xl">
        <MapContainer
          center={mapPosition}
          zoom={15}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {location && (
            <Marker
              position={[
                location.latitude,
                location.longitude,
              ]}
              icon={userIcon}
            >
              <Popup>
                <strong>You are here 📍</strong>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}