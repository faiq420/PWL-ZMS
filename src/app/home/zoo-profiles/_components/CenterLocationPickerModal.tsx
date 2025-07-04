"use client";

import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L, { Icon } from "leaflet";
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
  center?: [number, number]; // Optional center pin
}

const markerIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const centerMarkerIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // different icon for static center
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const MapClickHandler = ({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const LocateButton = ({
  onLocate,
}: {
  onLocate: (lat: number, lng: number) => void;
}) => {
  const map = useMap();

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const lat = coords.latitude;
        const lng = coords.longitude;
        map.setView([lat, lng], 17);
        onLocate(lat, lng);
      },
      () => alert("Unable to retrieve your location")
    );
  };

  return (
    <div className="leaflet-top leaflet-right z-[9999]">
      <button
        onClick={handleLocate}
        className="m-2 px-3 py-1 bg-white text-sky-400 text-xs rounded shadow flex items-center space-x-2"
      >
        <LocateIcon size={12} />
        <span>Use My Location</span>
      </button>
    </div>
  );
};

const CenterLocationPickerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  center = [0, 0],
}) => {
  const [selected, setSelected] = useState<[number, number] | null>(null);

  const handleSave = () => {
    if (selected) onSave(selected[0], selected[1]);
    onClose();
  };

  const initialCenter: [number, number] =
    center[0] != 0 ? center : [31.5566, 74.3262];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select a location on the map</DialogTitle>
          <DialogDescription>
            Click anywhere on the map to drop a pin.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 relative">
          <MapContainer
            center={initialCenter}
            zoom={17}
            style={{ height: "400px", width: "100%" }}
            scrollWheelZoom
          >
            <TileLayer
              attribution="Tiles © Esri — Source: USGS, Esri, TANA, DeLorme, NAVTEQ"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            />
            <MapClickHandler
              onMapClick={(lat, lng) => setSelected([lat, lng])}
            />
            <LocateButton onLocate={(lat, lng) => setSelected([lat, lng])} />

            {/* Selected marker (user) */}
            {selected && <Marker position={selected} icon={markerIcon} />}

            {/* Center marker (passed as prop) */}
            {center && <Marker position={center} icon={centerMarkerIcon} />}
          </MapContainer>
        </div>
        <DialogFooter className="!justify-between items-end w-full">
          <div className="text-xs font-mono">
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
              type="dark"
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

export default CenterLocationPickerModal;
