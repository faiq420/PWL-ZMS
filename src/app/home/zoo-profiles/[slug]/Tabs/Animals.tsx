"use client";
import { Button } from "@/components/ui/button";
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
import { Edit, Eye, FileText, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MetricsCard from "../../_components/MetricsCard";
import { DeleteConfirmation } from "@/components/modals/delete-confirmation";

interface Props {
  data: { name: string; animals: any };
}

const Animals = ({ data }: Props) => {
  const router = useRouter();
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    type: "",
    index: -1,
    title: "",
    description: "",
  });
  const [categories, setCategories] = useState([
    "Mammals",
    "Birds",
    "Reptiles",
  ]);
  const colors = [
    //   "bg-accentMain-jungleGreen text-black",
    //   "bg-accentMain-sunshineYellow text-black",
    //   "bg-accentMain-softRed text-black",
    // "bg-accentMain-skyBlue text-black",
    "bg-[#EBEFF1] text-black",
    // "bg-accentMain-cream text-black",
  ];
  const [zooData, setZooData] = useState({
    ...data,
  });

  /////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = zooData.animals.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(zooData.animals.length / postsPerPage);
  const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

  /////////////////////////////////////

  const handleDeleteAnimal = (index: number) => {
    setZooData((prev: any) => ({
      ...prev,
      animals: prev.animals.filter((_: any, i: number) => i !== index),
    }));
    setDeleteConfirmation({
      isOpen: false,
      type: "",
      index: -1,
      title: "",
      description: "",
    });
  };

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
          handleDeleteAnimal(deleteConfirmation.index);
        }}
      />
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                <Paragraph
                  text={`Animal Directory`}
                  className="font-semibold tracking-normal"
                />
              </CardTitle>
              <CardDescription>
                <BodyText
                  text={`Complete list of animals at ${zooData.name}`}
                />
              </CardDescription>
            </div>
            <div className="w-fit">
              <ButtonComp
                type={"white"}
                text="Export List"
                beforeIcon={<FileText className="mr-2 h-4 w-4" />}
                clickEvent={() => {}}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-3">
          <div className="space-y-3">
            {/* <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-medium">Total Animals</h3>
              <div className="text-3xl font-bold">
                {zooData.animals.reduce(
                  (sum: number, animal: any) => sum + animal.count,
                  0
                )}
              </div>
            </div>
          </div> */}
            <div className="grid gap-4 md:grid-cols-3">
              {categories.map((cat: string, index: number) => (
                <MetricsCard
                  MetricCount={zooData.animals
                    .filter((a: any) => a.category === cat)
                    .reduce(
                      (sum: number, animal: any) => sum + animal.count,
                      0
                    )}
                  Title={cat}
                  Description={`${
                    zooData.animals.filter((a: any) => a.category === cat)
                      .length
                  }
                      species`}
                  className={`${colors[index % colors.length]}`}
                />
              ))}
            </div>
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Animal Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentPosts.map((animal: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{animal.name}</TableCell>
                        <TableCell>{animal.category}</TableCell>
                        <TableCell>{animal.count}</TableCell>
                        <TableCell className="flex justify-center items-center space-x-2">
                          <Eye
                            className="text-black h-4 w-4 cursor-pointer"
                            onClick={() => {
                              router.push(
                                "/home/animal-directory/bengal-tiger"
                              );
                            }}
                          />

                          <Trash2
                            className="text-red-500 h-4 w-4 cursor-pointer"
                            onClick={() => {
                              setDeleteConfirmation({
                                isOpen: true,
                                type: "animal",
                                index,
                                title: "Delete Animal",
                                description: `Are you sure you want to delete ${animal.name} from the animal directory? This action cannot be undone.`,
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

export default Animals;
