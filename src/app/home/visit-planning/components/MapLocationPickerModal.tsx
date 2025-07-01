"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  useMapEvents,
  useMap,
  GeoJSON,
  Tooltip,
} from "react-leaflet";
import L, { LatLngExpression, Icon } from "leaflet";
import * as turf from "@turf/turf";
import "leaflet/dist/leaflet.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LocateIcon, SaveIcon } from "lucide-react";
import ButtonComp from "@/components/utils/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lat: number, lng: number) => void;
  center: [number, number];
  boundary: [number, number][];
}

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const PointInPolygonChecker: React.FC<{
  boundary: [number, number][];
  onMapClick: (lat: number, lng: number) => void;
}> = ({ boundary, onMapClick }) => {
  useMapEvents({
    click(e) {
      const point = turf.point([e.latlng.lng, e.latlng.lat]);
      const boundaryGeoJson = boundary.map(([lat, lng]) => [lng, lat]);
      const polygon = turf.polygon([[...boundaryGeoJson, boundaryGeoJson[0]]]);
      if (turf.booleanPointInPolygon(point, polygon)) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      } else {
        alert("Location is outside the permitted area.");
      }
    },
  });
  return null;
};

const LocateButton: React.FC<{
  boundary: [number, number][];
  onLocate: (lat: number, lng: number) => void;
}> = ({ boundary, onLocate }) => {
  const map = useMap();

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const point = turf.point([lng, lat]);
        const boundaryGeoJson = boundary.map(([lat, lng]) => [lng, lat]);
        const polygon = turf.polygon([
          [...boundaryGeoJson, boundaryGeoJson[0]],
        ]);

        if (turf.booleanPointInPolygon(point, polygon)) {
          map.setView([lat, lng], 17);
          onLocate(lat, lng);
        } else {
          alert("Your current location is outside the permitted area.");
        }
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  };

  return (
    <div className="leaflet-top leaflet-right z-[9999]">
      <button
        onClick={handleLocate}
        className="m-2 px-3 py-1 bg-white text-sky-400 text-xs rounded shadow hover:bg-white/90 flex space-x-2 items-center"
      >
        <LocateIcon size={12} />
        <p> Use My Location</p>
      </button>
    </div>
  );
};

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

const icon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

const MapLocationModal = ({
  isOpen,
  onClose,
  onSave,
  center,
  boundary,
}: Props) => {
  const [selected, setSelected] = useState<[number, number] | null>(null);

  const handleMapClick = (lat: number, lng: number) => {
    setSelected([lat, lng]);
  };

  const handleSave = () => {
    if (selected) onSave(selected[0], selected[1]);
    onClose();
  };

  const polygonPoints: LatLngExpression[] = boundary.map(([lat, lng]) => [
    lat,
    lng,
  ]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader className="font-tajawal">
          <DialogTitle>Select a location on the map</DialogTitle>
          <DialogDescription>
            Pin-point the location at which the event will be held.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 relative">
          <MapContainer
            center={center}
            zoom={17}
            style={{ height: "400px", width: "100%" }}
            scrollWheelZoom
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
                    className: '',
                    html,
                    iconAnchor: [14, 28],
                  })
                });
              }}
            />
            <PointInPolygonChecker
              boundary={boundary}
              onMapClick={handleMapClick}
            />
            <LocateButton boundary={boundary} onLocate={handleMapClick} />
            {selected && <Marker position={selected} icon={markerIcon} />}
          </MapContainer>
        </div>
        <DialogFooter className="!justify-between items-end w-full">
          <div className="text-xs text-nowrap font-mono">
            {selected ? (
              <div>
                Selected Coordinates:{" "}
                <code>
                  {selected[0].toFixed(6)}, {selected[1].toFixed(6)}
                </code>
              </div>
            ) : (
              <div>No location selected.</div>
            )}
          </div>
          <div className="w-fit">
            <ButtonComp
              type={"dark"}
              text="Save Location"
              clickEvent={handleSave}
              disabled={!selected}
              beforeIcon={<SaveIcon size={14} />}
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MapLocationModal;
