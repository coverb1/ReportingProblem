"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import {
  MapPin,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

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

// Move the map when the user's location changes
function MapLocationUpdater({
  location,
}: {
  location: {
    latitude: number;
    longitude: number;
  } | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(
        [location.latitude, location.longitude],
        16,
        {
          duration: 1.5,
        }
      );
    }
  }, [location, map]);

  return null;
}

export default function LocationMapContent() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Your browser does not support location.");
      return;
    }

    setError("");
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({
          latitude,
          longitude,
        });

        setLoading(false);

        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
      },

      (error) => {
        console.log(error);

        setLoading(false);

        setError(
          "Location permission was denied or location could not be found."
        );
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Default location: Kigali
  const defaultPosition: [number, number] = [
    -1.9441,
    30.0619,
  ];

  const mapPosition: [number, number] = location
    ? [location.latitude, location.longitude]
    : defaultPosition;

  return (
    <div className="relative w-full">
      <div className="relative h-[500px] w-full overflow-hidden rounded-xl border border-[var(--border)] shadow-[var(--shadow-sm)]">

        <MapContainer
          center={mapPosition}
          zoom={13}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapLocationUpdater location={location} />

          {location && (
            <Marker
              position={[
                location.latitude,
                location.longitude,
              ]}
              icon={userIcon}
            >
              <Popup>
                <div className="text-center">
                  <strong className="text-[var(--text-primary)]">
                    You are here 📍
                  </strong>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Use My Location Button */}
        <button
          onClick={getLocation}
          disabled={loading}
          className="
            absolute
            left-14
            top-4
            z-[1000]
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-[var(--border)]
            bg-white
            px-4
            py-2.5
            text-sm
            font-semibold
            text-[var(--text-primary)]
            shadow-[var(--shadow-md)]
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-[var(--primary)]
            hover:text-[var(--primary)]
            hover:shadow-[var(--shadow-lg)]
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >
          {loading ? (
            <>
              <Loader2
                size={17}
                className="animate-spin text-[var(--primary)]"
              />

              Getting Location...
            </>
          ) : location ? (
            <>
              <CheckCircle2
                size={17}
                className="text-[var(--success)]"
              />

              Location Found
            </>
          ) : (
            <>
              <MapPin
                size={17}
                className="text-[var(--primary)]"
              />

              Use My Location
            </>
          )}
        </button>

        {/* Error message */}
        {error && (
          <div
            className="
              absolute
              left-4
              top-16
              z-[1000]
              flex
              max-w-[360px]
              items-start
              gap-2
              rounded-lg
              border
              border-red-200
              bg-white
              px-3
              py-2.5
              text-sm
              text-[var(--danger)]
              shadow-[var(--shadow-md)]
            "
          >
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0 text-[var(--danger)]"
            />

            <span>{error}</span>
          </div>
        )}

        {/* Location information */}
        {location && (
          <div
            className="
              absolute
              bottom-4
              left-4
              z-[1000]
              rounded-lg
              border
              border-[var(--border)]
              bg-white
              px-4
              py-3
              shadow-[var(--shadow-md)]
            "
          >
            <div className="mb-1 flex items-center gap-2">
              <MapPin
                size={16}
                className="text-[var(--primary)]"
              />

              <span className="text-sm font-semibold text-[var(--text-primary)]">
                Your Location
              </span>
            </div>

            <div className="text-xs text-[var(--text-secondary)]">
              <p>
                Latitude:{" "}
                {location.latitude.toFixed(6)}
              </p>

              <p>
                Longitude:{" "}
                {location.longitude.toFixed(6)}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}