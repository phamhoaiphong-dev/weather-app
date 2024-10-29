"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from "@/app/context/globalContext";

// Import dynamically for SSR compatibility
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });

function Mapbox() {
  const { forecast } = useGlobalContext(); // Your coordinates
  const activeCityCords = forecast?.coord;
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && activeCityCords) {
      const zoomLev = 13;
      map.setView([activeCityCords.lat, activeCityCords.lon], zoomLev);
    }
  }, [activeCityCords, map]);

  if (!forecast || !forecast.coord || !activeCityCords) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className="flex-1 basis-[50%] border rounded-lg">
      <MapContainer
        center={[activeCityCords.lat, activeCityCords.lon]}
        zoom={13}
        scrollWheelZoom={false}
        className="rounded-lg m-4"
        style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}
        whenCreated={setMap} // Set map instance on creation
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}

export default Mapbox;
