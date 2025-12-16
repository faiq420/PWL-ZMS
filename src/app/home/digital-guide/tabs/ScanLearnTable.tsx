"use client";

import { DeleteConfirmationDialog } from "@/components/digital-guide/delete-confirmation";
import { ExhibitModal } from "@/components/digital-guide/exhibit-modal";
import { QrCodeModal } from "@/components/digital-guide/qr-code-modal";
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
import { useToast } from "@/components/ui/use-toast";
import ButtonComp from "@/components/utils/Button";
import SearchTag from "@/components/utils/FormElements/SearchTag";
import CardIntro from "@/components/utils/Headings/CardIntro";
import { Edit, Plus, QrCode, Trash2 } from "lucide-react";
import React, { useState } from "react";

const ScanLearnTable = () => {
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<
    "qrcode" | "audio" | "animal" | "schedule"
  >("qrcode");
  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false);
  const [qrCrudModalOpen, setQrCrudModalOpen] = useState({
    Id: 0,
    open: false,
    index: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [qrCodes, setQrCodes] = useState([
    {
      id: "QR001",
      name: "African Elephant Exhibit",
      location: "African Savanna Zone",
      type: "Animal Exhibit",
      status: "active",
      scans: 342,
      lastScan: "2023-05-15T14:30:00Z",
      content: {
        title: "African Elephant",
        scientificName: "Loxodonta africana",
        description:
          "The African elephant is the largest living terrestrial animal. Males stand 3.2–4.0 m tall at the shoulder and weigh 4,700–6,048 kg, while females stand 2.2–2.6 m tall and weigh 2,160–3,232 kg.",
        funFacts: [
          "Elephants can live up to 70 years in the wild",
          "They consume up to 150 kg of food per day",
          "Their trunks contain over 40,000 muscles",
        ],
        conservationStatus: "Vulnerable",
        images: ["/placeholder.svg?height=400&width=600"],
      },
    },
    {
      id: "QR002",
      name: "Penguin Feeding Station",
      location: "Polar Zone",
      type: "Feeding Area",
      status: "active",
      scans: 287,
      lastScan: "2023-05-16T11:15:00Z",
      content: {
        title: "Penguin Feeding",
        description:
          "Watch our expert keepers feed our colony of Emperor and Gentoo penguins. Learn about their diet, feeding habits, and conservation efforts.",
        schedule: "Daily at 11:00 AM and 3:00 PM",
        funFacts: [
          "Penguins can consume up to 2 kg of fish per day",
          "They can dive to depths of over 500 meters",
          "Emperor penguins can hold their breath for up to 20 minutes",
        ],
        images: ["/placeholder.svg?height=400&width=600"],
      },
    },
    {
      id: "QR003",
      name: "Rainforest Information Kiosk",
      location: "Tropical House",
      type: "Information Point",
      status: "active",
      scans: 156,
      lastScan: "2023-05-14T09:45:00Z",
      content: {
        title: "Tropical Rainforest",
        description:
          "Explore the wonders of the tropical rainforest ecosystem. Home to over 50% of the world's plant and animal species, rainforests are vital to our planet's health.",
        funFacts: [
          "Rainforests cover less than 2% of Earth's surface",
          "A single hectare may contain over 750 types of trees",
          "25% of modern medicines originate from rainforest plants",
        ],
        images: ["/placeholder.svg?height=400&width=600"],
      },
    },
    {
      id: "QR004",
      name: "Tiger Conservation Display",
      location: "Asian Forest Zone",
      type: "Educational Display",
      status: "inactive",
      scans: 98,
      lastScan: "2023-05-10T15:20:00Z",
      content: {
        title: "Tiger Conservation",
        description:
          "Learn about our efforts to protect wild tiger populations and their habitats. Tigers face numerous threats including poaching and habitat loss.",
        conservationStatus: "Endangered",
        funFacts: [
          "Wild tiger populations have declined by 95% in the last century",
          "There are fewer than 4,000 wild tigers remaining worldwide",
          "Tigers can consume up to 40 kg of meat in a single meal",
        ],
        images: ["/placeholder.svg?height=400&width=600"],
      },
    },
  ]);

  const openDeleteDialog = (type: any, item: any) => {
    setDeleteType(type);
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const filteredUsers = qrCodes.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.type.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const handleDeleteQRCode = () => {
    if (selectedItem) {
      setQrCodes(qrCodes.filter((qr) => qr.id !== selectedItem.id));
      setDeleteModalOpen(false);
      toast({
        title: "QR Code Deleted",
        description: `QR code for "${selectedItem.name}" has been deleted.`,
        variant: "destructive",
      });
    }
  };

  /////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredUsers.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredUsers.length / postsPerPage);
  const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

  /////////////////////////////////////

  return (
    <>
      {qrCodeModalOpen && (
        <QrCodeModal
          isOpen={qrCodeModalOpen}
          onClose={() => setQrCodeModalOpen(false)}
          qrCode={selectedItem}
        />
      )}
      <ExhibitModal
        isOpen={qrCrudModalOpen.open}
        onClose={() => setQrCrudModalOpen({ Id: 0, index: 0, open: false })}
        onSave={(exhibit, index) => {
          // Handle save logic here
        }}
        viewMode={false}
        index={qrCrudModalOpen.index}
        id={qrCrudModalOpen.Id}
      />
      <DeleteConfirmationDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          handleDeleteQRCode();
        }}
        type={deleteType}
        item={selectedItem}
      />
      <Card className="space-y-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardIntro
              title="QR Code Management"
              description="Create and manage QR codes for exhibits and information points."
            />
            <div className="w-fit">
              <ButtonComp
                type={"dark"}
                text="Add QR Code"
                beforeIcon={<Plus className="w-4 h-4" />}
                clickEvent={() =>
                  setQrCrudModalOpen({
                    Id: 0,
                    index: qrCodes.length,
                    open: true,
                  })
                }
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <SearchTag
            value={searchQuery}
            setter={setSearchQuery}
            placeHolder="Search tags..."
          />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>QR ID</TableHead>
                  <TableHead>Station Name</TableHead>
                  <TableHead>Station Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Scans</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPosts.map((post, index) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.id}</TableCell>
                    <TableCell>{post.name}</TableCell>
                    <TableCell>{post.location}</TableCell>
                    <TableCell>{post.type}</TableCell>
                    <TableCell>{post.scans.toLocaleString()}</TableCell>
                    <TableCell>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                          post.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {post.status === "active" ? "Active" : "Inactive"}
                      </div>
                    </TableCell>
                    <TableCell className="flex justify-center items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedItem(post);
                          setQrCodeModalOpen(true);
                        }}
                      >
                        <QrCode className="h-4 w-4 mr-2" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setQrCrudModalOpen({
                            Id: Number(post.id),
                            open: true,
                            index,
                          });
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog("qrcode", post)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

export default ScanLearnTable;
