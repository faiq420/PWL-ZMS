import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ButtonComp from "@/components/utils/Button";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import InputTag from "@/components/utils/FormElements/InputTag";
import TextArea from "@/components/utils/FormElements/TextArea";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import {
  ArrowLeft,
  MapPin,
  PlusCircle,
  Save,
  SaveIcon,
  Trash2,
  Trash2Icon,
  Upload,
  X,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import MapLocationModal from "../../../visit-planning/components/MapLocationPickerModal";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import useHelper from "@/Helper/helper";
import { servicesStatus } from "@/data";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  mode?: string;
  id?: string;
  tab?: string;
}

type ticketDetail = {
  TicketId: number;
  TicketDetailId: number;
  Category: string;
  Subcategory: string;
  Type: string;
  Description: string;
  Fee: number;
};

const Tickets = ({ mode = "create", id = "0", tab }: Props) => {
  const helper = useHelper();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const [isCruding, setIsCruding] = useState(false);
  const [obj, setObj] = useState({
    TicketId: 0,
    TicketName: "",
    IsActive: true,
  });
  const [ticketDetails, setTicketDetails] = useState<ticketDetail[]>([]);
  const ticketDetailObj = {
    TicketId: 0,
    TicketDetailId: 0,
    Category: "",
    Subcategory: "",
    Type: "",
    Description: "",
    Fee: 0,
  };
  const capitalize = (value: string, space = " ") => {
    const words = String(value).split(space);
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  function GetHeading() {
    return `${capitalize(mode)} - ${capitalize(String(tab), "-")} ${
      id != "0" ? `for ${obj.TicketName}` : ""
    }`;
  }

  function handleChange(n: string, v: string | boolean | number) {
    setObj({ ...obj, [n]: v });
  }

  const verify = () => {
    const toastObj = { title: "Validation Error", description: "" };
    if (obj.TicketName == "") {
      toastObj.description = "Ticket Name is required.";
      // } else if (obj.BuildingTypeId == 0) {
      //   toastObj.description = "Building Type is required.";
    }
    if (toastObj.description !== "") {
      toast(toastObj);
      return false;
    }
    return true;
  };

  function HandleSubmit() {
    if (verify()) {
      setIsCruding(true);
      const createObj = {
        ...obj,
      };
      const editObj = {
        ...obj,
      };
      helper.xhr
        .Post(
          `/Location/${obj.TicketId !== 0 ? "UpdateLocation" : "AddLocation"}`,
          helper.ConvertToFormData(obj.TicketId == 0 ? createObj : editObj)
        )
        .then(async (response) => {
          toast({
            title: `Location ${
              obj.TicketId !== 0 ? "updated" : "created"
            } successfully`,
            variant: "success",
          });
          setIsCruding(false);
          setTimeout(() => {
            router.back();
          }, 3000);
        })
        .catch((error) => {
          toast({
            title: `Location not ${obj.TicketId !== 0 ? "updated" : "created"}`,
            description: error.message,
            variant: "danger",
          });
          setIsCruding(false);
        });
    }
  }

  useEffect(() => {
    if (id != "0") {
      helper.xhr
        .Get(
          "/Location/GetLocationById",
          helper.GetURLParamString({ ticketId: Number(id) }).toString()
        )
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [id]);

  const handleDetailsChange = (index: number, field: string, value: string) => {
    const updatedDetails = [...ticketDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value,
    };
    setTicketDetails(updatedDetails);
  };

  return (
    <>
      {" "}
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
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3">
              <InputTag
                value={obj.TicketName}
                name="TicketName"
                placeHolder="Parking"
                setter={(n, v) => {
                  setObj({ ...obj, [n]: v });
                }}
                label="Title"
              />
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between mb-2">
            <Paragraph text="Ticket Details" />
            <div className="w-fit">
              <ButtonComp
                type={"white"}
                text="Add Detail"
                clickEvent={() => {
                  setTicketDetails([...ticketDetails, ticketDetailObj]);
                }}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="">
              <Table className="border text-xs mt-2">
                <TableHeader>
                  <TableHead>Category</TableHead>
                  <TableHead>Subcategory</TableHead>
                  <TableHead>Visitor / Vehicle Type</TableHead>
                  <TableHead>Age / Description</TableHead>
                  <TableHead>Fee (PKR)</TableHead>
                  <TableHead>Action</TableHead>
                </TableHeader>
                <TableBody>
                  {ticketDetails.length > 0 ? (
                    ticketDetails.map((detail, detailIndex) => (
                      <TableRow key={detailIndex}>
                        <TableCell className="px-2 py-1">
                          <InputTag
                            value={detail.Category}
                            name="Category"
                            placeHolder="Safari"
                            setter={(n, v) => {
                              handleDetailsChange(detailIndex, n, v);
                            }}
                          />
                        </TableCell>
                        <TableCell className="px-2 py-1">
                          <InputTag
                            value={detail.Subcategory}
                            name="Subcategory"
                            placeHolder="Day/Night Safari"
                            setter={(n, v) => {
                              handleDetailsChange(detailIndex, n, v);
                            }}
                          />
                        </TableCell>
                        <TableCell className="px-2 py-1">
                          <InputTag
                            value={detail.Type}
                            name="Type"
                            placeHolder="Child/Adult"
                            setter={(n, v) => {
                              handleDetailsChange(detailIndex, n, v);
                            }}
                          />
                        </TableCell>
                        <TableCell className="px-2 py-1">
                          <InputTag
                            value={detail.Description}
                            name="Description"
                            placeHolder="Age 3-12 years"
                            setter={(n, v) => {
                              handleDetailsChange(detailIndex, n, v);
                            }}
                          />
                        </TableCell>
                        <TableCell className="px-2 py-1">
                          <InputTag
                            value={detail.Fee}
                            name="Fee"
                            type="number"
                            placeHolder="150"
                            setter={(n, v) => {
                              handleDetailsChange(detailIndex, n, v);
                            }}
                          />
                        </TableCell>
                        <TableCell
                          className="px-2 py-1 !text-center"
                        //   style={{ textAlign: "-webkit-center" }}
                        >
                          <Trash2Icon
                            className="text-red-500 text-sm cursor-pointer"
                            size={14}
                            onClick={() => {
                              setTicketDetails((prev) =>
                                prev.filter((_, i) => i !== detailIndex)
                              );
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableCell className="bg-gray-100" colSpan={6}>
                      <p className="!text-sm italic">No details found.</p>
                    </TableCell>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <div className="w-full flex justify-end">
          <div className="w-full md:w-fit flex space-x-2">
            <ButtonComp
              text={"Cancel"}
              type={"white"}
              clickEvent={() => router.back()}
              beforeIcon={<X className="h-4 w-4" />}
            />
            <ButtonComp
              text={mode == "edit" ? "Save" : "Create"}
              clickEvent={HandleSubmit}
              isCruding={isCruding}
              beforeIcon={<Save className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tickets;
