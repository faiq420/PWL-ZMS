"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ButtonComp from "@/components/utils/Button";
import InputTag from "@/components/utils/FormElements/InputTag";
import NumberInputTag from "@/components/utils/FormElements/NumberInputTag";
import TextArea from "@/components/utils/FormElements/TextArea";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import { ArrowLeft, Save, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import CenterLocationPickerModal from "../../_components/CenterLocationPickerModal";
import BoundarySelectorModal from "../../_components/BoundarySelectorModal";

interface LatLng {
  latitude: number;
  longitude: number;
}

const ZooDetails = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;
  const [obj, setObj] = useState({
    Name: "",
    Latitude: 0,
    Longitude: 0,
    Address: "",
    ZipCode: "",
  });
  const [coordinatePolygon, setCoordinatePolygon] = useState<LatLng[]>([]);
  const [showMapCenterPickerModal, setShowMapCenterPickerModal] =
    useState(false);
  const [showMapBoundaryPickerModal, setShowMapBoundaryPickerModal] =
    useState(false);
  const capitalize = (value: string, space = " ") => {
    const words = String(value).split(space);
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  function GetHeading() {
    return `${capitalize(String("Details"), "-")} for ${obj.Name}`;
  }

  function handleChange(n: string, v: string | boolean | number) {
    setObj({ ...obj, [n]: v });
  }

  const HandleSubmit = () => {};

  return (
    <>
      {showMapCenterPickerModal && (
        <CenterLocationPickerModal
          isOpen={showMapCenterPickerModal}
          center={[obj.Latitude, obj.Longitude]}
          onSave={(lat: number, long: number) => {
            setObj({ ...obj, Latitude: lat, Longitude: long });
          }}
          onClose={() => {
            setShowMapCenterPickerModal(false);
          }}
        />
      )}
      {showMapBoundaryPickerModal && (
        <BoundarySelectorModal
          initialCoordinates={coordinatePolygon}
          center={{ latitude: obj.Latitude, longitude: obj.Longitude }}
          onSave={(coords) => {
            setCoordinatePolygon(coords);
            setShowMapBoundaryPickerModal(false);
          }}
          onClose={() => {
            setShowMapBoundaryPickerModal(false);
          }}
        />
      )}
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h4 className="text-3xl font-bold tracking-tight">
                <Subheading text={GetHeading()} />
              </h4>
            </div>
          </div>
        </div>
        <Card>
          <CardHeader></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-end space-x-1 w-full md:w-2/3">
                <InputTag
                  disabled
                  label="Coordinates"
                  name=""
                  value={
                    obj.Latitude == 0 ? "" : obj.Latitude + ", " + obj.Longitude
                  }
                  setter={(n, v) => {}}
                />
                <div className="w-fit">
                  <ButtonComp
                    text="Pick Center"
                    type={"white"}
                    clickEvent={() => {
                      setShowMapCenterPickerModal(true);
                    }}
                  />
                </div>
                <div className="w-fit">
                  <ButtonComp
                    text="Select Boundary"
                    disabled={obj.Latitude == 0}
                    type={"white"}
                    clickEvent={() => {
                      setShowMapBoundaryPickerModal(true);
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3">
                <div className="col-span-1 md:col-span-2">
                  <TextArea
                    name="Address"
                    setter={handleChange}
                    value={obj.Address}
                    label="Address"
                    placeHolder="ABC Rd."
                  />
                </div>
                <NumberInputTag
                  name="ZipCode"
                  setter={handleChange}
                  value={obj.ZipCode}
                  label="Zip Code"
                  placeHolder="xxxxx"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-end">
              <div className="w-full md:w-fit flex space-x-2">
                <ButtonComp
                  text={"Cancel"}
                  type={"white"}
                  clickEvent={() => router.back()}
                  beforeIcon={<X className="h-4 w-4" />}
                />
                <ButtonComp
                  text={"Submit"}
                  clickEvent={HandleSubmit}
                  beforeIcon={<Save className="h-4 w-4" />}
                />
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ZooDetails;
