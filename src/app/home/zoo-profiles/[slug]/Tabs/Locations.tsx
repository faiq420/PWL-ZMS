import { DeleteConfirmation } from "@/components/modals/delete-confirmation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ButtonComp from "@/components/utils/Button";
import BodyText from "@/components/utils/Headings/BodyText";
import Paragraph from "@/components/utils/Headings/Paragraph";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const BoundarySelectorModal = dynamic(
  () => import("../../_components/BoundarySelectorModal"),
  { ssr: false }
);

interface Props {
  id: number;
  name: string;
}

type Records = {
  LocationId: number;
  LocationName: string;
  Type: string;
  Status: string;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};

const Locations = ({ id, name }: Props) => {
  const router = useRouter();
  const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
  const [showCoordinatesModal, setShowCoordinatesModal] = useState(false);
  const [tableData, setTableData] = useState<Records[]>([
    {
      LocationId: 1,
      LocationName: "Monkey Sanctuary",
      Type: "Sanctuary",
      Status: "Open",
    },
    {
      LocationId: 2,
      LocationName: "Tiger In The House",
      Type: "Sanctuary",
      Status: "Open",
    },
    {
      LocationId: 3,
      LocationName: "Birds",
      Type: "Sanctuary",
      Status: "Open",
    },
    {
      LocationId: 4,
      LocationName: "Camel Ride",
      Type: "Sanctuary",
      Status: "Open",
    },
    {
      LocationId: 5,
      LocationName: "Reptile House",
      Type: "Sanctuary",
      Status: "Open",
    },
    {
      LocationId: 6,
      LocationName: "Peacock House",
      Type: "Sanctuary",
      Status: "Closed",
    },
    {
      LocationId: 7,
      LocationName: "Fish Aquarium World",
      Type: "Sanctuary",
      Status: "Under-construstion",
    },
    {
      LocationId: 8,
      LocationName: "Rhinoceros House",
      Type: "Sanctuary",
      Status: "Open",
    },
    {
      LocationId: 9,
      LocationName: "Jungle Cafeteria",
      Type: "Dining",
      Status: "Renovating",
    },
    {
      LocationId: 10,
      LocationName: "Masjid Of Zoo",
      Type: "Prayer Area",
      Status: "Open",
    },
    {
      LocationId: 11,
      LocationName: "Clinic",
      Type: "Facility",
      Status: "Open",
    },
  ]);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    type: "",
    index: -1,
    title: "",
    description: "",
  });

  const handleDeleteRecord = (index: number) => {
    setTableData((prev: any[]) =>
      prev.filter((_: any, i: number) => i !== index)
    );
    setDeleteConfirmation({
      isOpen: false,
      type: "",
      index: -1,
      title: "",
      description: "",
    });
  };

  /////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = tableData.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(tableData.length / postsPerPage);
  const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

  /////////////////////////////////////

  const handleDeleteLocation = (index: number) => {
    setTableData((prev: any) =>
      prev.filter((_: any, i: number) => i !== index)
    );
    setDeleteConfirmation({
      isOpen: false,
      type: "",
      index: -1,
      title: "",
      description: "",
    });
  };

  function NavigateToRecord(tab: string, mode: string, locId?: number) {
    router.push(
      `/home/zoo-profiles/${id}?tab=${tab}&mode=${mode}` +
        (locId != undefined ? `&id=${locId}` : "")
    );
  }

  return (
    <>
      <DeleteConfirmation
        isOpen={deleteConfirmation.isOpen}
        onClose={() =>
          setDeleteConfirmation({
            isOpen: false,
            type: "",
            index: -1,
            title: "",
            description: "",
          })
        }
        title={deleteConfirmation.title}
        description={deleteConfirmation.description}
        onConfirm={() => {
          handleDeleteRecord(deleteConfirmation.index);
        }}
      />
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                <Paragraph
                  text={`Location's Directory`}
                  className="font-semibold tracking-normal"
                />
              </CardTitle>
              <CardDescription>
                <BodyText text={`Complete list of locations at ${name}`} />
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="w-fit">
                <ButtonComp
                  text="Zoo Boundary"
                  clickEvent={() => {
                    router.push(`/home/zoo-profiles/${id}/BoundaryDetails`);
                  }}
                  type={"white"}
                  beforeIcon={<Edit size={16} />}
                />
              </div>
              <div className="w-fit">
                <ButtonComp
                  text="Add Location"
                  clickEvent={() => {
                    NavigateToRecord("locations", "create");
                  }}
                  type={"white"}
                  beforeIcon={<Plus size={16} />}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-3">
          <div className="space-y-3">
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Location Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentPosts.map((loc: Records, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{loc.LocationName}</TableCell>
                        <TableCell>{loc.Type}</TableCell>
                        <TableCell>{loc.Status}</TableCell>
                        <TableCell className="flex justify-center items-center space-x-2">
                          <Eye
                            className="text-black h-4 w-4 cursor-pointer"
                            onClick={() => {
                              NavigateToRecord(
                                "locations",
                                "edit",
                                loc.LocationId
                              );
                            }}
                          />

                          <Trash2
                            className="text-red-500 h-4 w-4 cursor-pointer"
                            onClick={() => {
                              setDeleteConfirmation({
                                isOpen: true,
                                type: "location",
                                index,
                                title: "Delete Location",
                                description: `Are you sure you want to delete ${loc.LocationName} from the location directory? This action cannot be undone.`,
                              });
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => {
                        if (currentPage != 1) {
                          setCurrentPage(currentPage - 1);
                        }
                      }}
                      aria-disabled={currentPage == 1}
                      className="text-main-darkFadedBlue cursor-pointer"
                    />
                  </PaginationItem>
                  {paginationLabels.map((label: number) => (
                    <PaginationItem key={label}>
                      <PaginationLink
                        onClick={() => {
                          setCurrentPage(label);
                        }}
                        className={`${
                          currentPage == label && "bg-main-gray"
                        }  text-main-navyBlue cursor-pointer`}
                      >
                        {label}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => {
                        if (currentPage != totalPages) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                      aria-disabled={currentPage == totalPages}
                      className="text-main-darkFadedBlue cursor-pointer"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Locations;
