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
import CardIntro from "@/components/utils/Headings/CardIntro";
import Paragraph from "@/components/utils/Headings/Paragraph";
import { Edit, EditIcon, Eye, Pen, Plus, Trash2 } from "lucide-react";
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
  tickets: Records[];
}

type Records = {
  TicketId: number;
  TicketName: string;
};

const Tickets = ({ id, name, tickets }: Props) => {
  const router = useRouter();
  const [tableData, setTableData] = useState<Records[]>(tickets);
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
              <CardIntro
                title="Ticket's Directory"
                description={`Complete list of tickets at ${name}`}
              />
            </div>
            <div className="flex space-x-2">
              <div className="w-fit">
                <ButtonComp
                  text="Add Ticket"
                  clickEvent={() => {
                    NavigateToRecord("tickets", "create");
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
                      <TableHead>Ticket Name</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentPosts.map((loc: Records, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{loc.TicketName}</TableCell>
                        <TableCell className="flex justify-center items-center space-x-2">
                          <EditIcon
                            className="text-black h-4 w-4 cursor-pointer"
                            onClick={() => {
                              NavigateToRecord("tickets", "edit", loc.TicketId);
                            }}
                          />

                          {/* <Trash2
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
                          /> */}
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

export default Tickets;
