"use client";

import React from "react";
import dynamic from "next/dynamic";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  GeoJSON,
} from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

interface SelectedLocationMapProps {
  coordinates: [number, number];
  zoom?: number;
  height?: string;
  width?: string;
  boundary: [number, number][];
}

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const SelectedLocationMap: React.FC<SelectedLocationMapProps> = ({
  coordinates,
  zoom = 17,
  height = "400px",
  width = "100%",
  boundary,
}) => {
  const internalFacilities: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        value: 1,
        label: "Monkey Sanctuary",
        longitude: 74.32546921639374,
        latitude: 31.5572786835129,
      },
      {
        value: 2,
        label: "Tiger In The House",
        longitude: 74.32584338457282,
        latitude: 31.556155325486166,
      },
      {
        value: 3,
        label: "Birds",
        longitude: 74.32634787940268,
        latitude: 31.55606468096269,
      },
      {
        value: 4,
        label: "Camel Ride",
        longitude: 74.3266816874634,
        latitude: 31.555885940210754,
      },
      {
        value: 5,
        label: "Reptile House",
        longitude: 74.32689595614303,
        latitude: 31.555983959369627,
      },
      {
        value: 6,
        label: "Peacock House",
        longitude: 74.32641779865259,
        latitude: 31.55624726522889,
      },
      {
        value: 7,
        label: "Fish Aquarium World",
        longitude: 74.3268079932071,
        latitude: 31.556450990423535,
      },
      {
        value: 8,
        label: "Rhinoceros House",
        longitude: 74.32491566234476,
        latitude: 31.556589369547982,
      },
      {
        value: 9,
        label: "Jungle Cafeteria",
        longitude: 74.32634717635591,
        latitude: 31.555398044924946,
      },
      {
        value: 10,
        label: "Masjid Of Zoo",
        longitude: 74.32603141197542,
        latitude: 31.555198161353267,
      },
    ].map((item) => ({
      type: "Feature",
      properties: {
        name: item.label,
        iconUrl:
          "https://tse2.mm.bing.net/th/id/OIP.j11pt13ZectNBnErbzz1JAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      geometry: {
        type: "Point",
        coordinates: [item.longitude, item.latitude],
      },
    })),
  };

  const polygonPoints: LatLngExpression[] = boundary.map(([lat, lng]) => [
    lat,
    lng,
  ]);

  return (
    <div className="mt-6">
      <MapContainer
        center={coordinates}
        zoom={zoom}
        scrollWheelZoom
        style={{ height, width }}
      >
        <TileLayer
          attribution="Tiles © Esri — Source: USGS, Esri, TANA, DeLorme, NAVTEQ"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
        />
        <Polygon
          pathOptions={{ color: "#1b76c8", fillOpacity: 0.2 }}
          positions={polygonPoints}
        />
        <GeoJSON
          data={internalFacilities}
          pointToLayer={(feature, latlng) => {
            const html = `
                          <div style="display: flex; flex-direction: column; align-items: center;">
                            <img src="${feature.properties.iconUrl}" style="width: 28px; height: 28px;" />
                            <span className="font-montserrat" style="font-size: 10px;font-weight:600;color:#38bdf8; margin-top: 2px;">${feature.properties.name}</span>
                          </div>`;
            return L.marker(latlng, {
              icon: L.divIcon({
                className: "",
                html,
                iconAnchor: [14, 28],
              }),
            });
          }}
        />
        <Marker position={coordinates} icon={markerIcon} />
      </MapContainer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(SelectedLocationMap), {
  ssr: false,
});
