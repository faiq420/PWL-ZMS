import { DeleteConfirmation } from "@/components/modals/delete-confirmation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import BodyText from "@/components/utils/Headings/BodyText";
import Paragraph from "@/components/utils/Headings/Paragraph";
import { changeDateFormatWithTime } from "@/Helper/DateFormats";
import { Calendar, Clock, Edit, Eye, Hourglass, Trash2, Watch } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  data: { name: string; shows: any };
}

const Shows = ({ data }: Props) => {
  const router = useRouter();
  const [zooData, setZooData] = useState({
    ...data,
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    type: "",
    index: -1,
    title: "",
    description: "",
  });

  const handleDeleteShow = (index: number) => {
    setZooData((prev: any) => ({
      ...prev,
      shows: prev.shows.filter((_: any, i: number) => i !== index),
    }));
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
  const currentPosts = zooData.shows.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(zooData.shows.length / postsPerPage);
  const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

  /////////////////////////////////////

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
          handleDeleteShow(deleteConfirmation.index);
        }}
      />
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                <Paragraph
                  text={`Daily Shows`}
                  className="font-semibold tracking-normal"
                />
              </CardTitle>
              <CardDescription>
                <BodyText
                  text={`Schedule of shows and demonstrations at ${zooData.name}`}
                />
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border mt-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Show Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPosts.map((show: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{show.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {changeDateFormatWithTime(show.date)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Hourglass className="h-3 w-3 mr-1" />
                        <span></span> {show.duration}
                      </div>
                    </TableCell>
                    <TableCell>{show.location}</TableCell>
                    <TableCell className="flex justify-center items-center space-x-2">
                      <Edit
                        className="text-black h-4 w-4 cursor-pointer"
                        onClick={() => {
                          router.push("/home/visit-planning?tab=event&mode=edit&id=3");
                        }}
                      />

                      <Trash2
                        className="text-red-500 h-4 w-4 cursor-pointer"
                        onClick={() => {
                          setDeleteConfirmation({
                            isOpen: true,
                            type: "show",
                            index,
                            title: "Delete show",
                            description: `Are you sure you want to delete ${show.name} from the animal directory? This action cannot be undone.`,
                          });
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
        </CardContent>
      </Card>
    </>
  );
};

export default Shows;
