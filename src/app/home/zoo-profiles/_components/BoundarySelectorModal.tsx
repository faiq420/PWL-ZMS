import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  GeoJSON,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import "leaflet-draw";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Patch default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface LatLng {
  latitude: number;
  longitude: number;
}

interface BoundarySelectorModalProps {
  initialCoordinates?: LatLng[];
  center: LatLng;
  onSave: (coordinates: LatLng[]) => void;
  onClose: () => void;
}

const DrawControl: React.FC<{
  polygon: LatLng[];
  setPolygon: React.Dispatch<React.SetStateAction<LatLng[]>>;
  featureGroupRef: React.RefObject<L.FeatureGroup | null>;
}> = ({ polygon, setPolygon, featureGroupRef }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !featureGroupRef.current) return;
    const drawnItems = featureGroupRef.current;

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        edit: false,
        remove: false,
      },
      draw: {
        polygon: {
          shapeOptions: {
            color: "#FF5733",
            weight: 4,
            opacity: 0.8,
            fillOpacity: 0.2,
          },
          allowIntersection: false,
          showArea: true,
        },
        circle: false,
        rectangle: false,
        polyline: false,
        marker: false,
        circlemarker: false,
      },
    });

    map.addControl(drawControl);
    const polygonOptions = {
      shapeOptions: {
        color: "#FF5733",
        weight: 4,
        opacity: 0.8,
        fillOpacity: 0.2,
      },
      allowIntersection: false,
      showArea: true,
    };
    const drawer = new L.Draw.Polygon(map as any, polygonOptions);
    drawer.enable();

    map.on((L as any).Draw.Event.CREATED, (e: any) => {
      if (drawnItems.getLayers().length > 0) {
        alert("Only one polygon allowed. Reselect to draw again.");
        return;
      }
      const layer = e.layer;
      drawnItems.addLayer(layer);
      const latLngs = layer.getLatLngs()[0].map((latlng: L.LatLng) => ({
        latitude: latlng.lat,
        longitude: latlng.lng,
      }));
      setPolygon(latLngs);
    });

    return () => {
      map.off((L as any).Draw.Event.CREATED);
      map.removeControl(drawControl);
    };
  }, [map]);

  return null;
};

const BoundarySelectorModal: React.FC<BoundarySelectorModalProps> = ({
  initialCoordinates,
  center,
  onSave,
  onClose,
}) => {
  const [polygon, setPolygon] = useState<LatLng[]>(initialCoordinates || []);
  const featureGroupRef = useRef<L.FeatureGroup | null>(null);
  console.log(initialCoordinates  );
  const handleReselect = () => {
    const group = featureGroupRef.current;
    if (group) group.clearLayers();
    setPolygon([]);
  };

  const handleExportCSV = () => {
    if (polygon.length === 0) return;
    const csv = `latitude,longitude\n${polygon
      .map((p) => `${p.latitude},${p.longitude}`)
      .join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "boundary.csv";
    link.click();
  };

  const centerPosition = [center.latitude, center.longitude];

  const geoJsonData =
    polygon.length > 0
      ? {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [[...polygon.map((p) => [p.longitude, p.latitude])]],
          },
          properties: {},
        }
      : null;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="w-full max-w-5xl h-[90vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="font-tajawal p-4">
          <DialogTitle>Select Boundary</DialogTitle>
          <DialogDescription>
            Pin-point the boundary polygon of the zoo.
          </DialogDescription>
        </DialogHeader>

        <div className="relative h-full flex-1">
          <MapContainer
            center={centerPosition as [number, number]}
            zoom={16}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <FeatureGroup ref={featureGroupRef as any}>
              {geoJsonData && <GeoJSON data={geoJsonData as any} />}
            </FeatureGroup>
            <DrawControl
              polygon={polygon}
              setPolygon={setPolygon}
              featureGroupRef={featureGroupRef}
            />
          </MapContainer>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t">
          <Button variant="outline" onClick={handleExportCSV}>
            Export as CSV
          </Button>
          <Button variant="outline" onClick={handleReselect}>
            Reselect
          </Button>
          <Button variant="destructive" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => onSave(polygon)}
            disabled={polygon.length === 0}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BoundarySelectorModal;
