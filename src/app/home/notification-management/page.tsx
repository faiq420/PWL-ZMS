"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Eye, Edit, Trash2, ArrowUpDown } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import SectionIntro from "@/components/utils/Headings/SectionIntro";
import ButtonComp from "@/components/utils/Button";
import SearchTag from "@/components/utils/FormElements/SearchTag";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CardIntro from "@/components/utils/Headings/CardIntro";
import useHelper from "@/Helper/helper";
import { usePageData } from "@/hooks/usePageData";

export default function NotificationDirectoryPage() {
  const router = useRouter();
  const helper = useHelper();
  const pageData = usePageData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [notifications, setNotifications] = useState<
    {
      Id: number;
      Title: string;
      RoleLabel: string;
      TypeLabel: string;
      ChannelLabel: string;
    }[]
  >([]);
  /////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = notifications.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(notifications.length / postsPerPage);
  const paginationLabels = Array.from({ length: totalPages }, (_, i) => i + 1);

  /////////////////////////////////////
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    helper.xhr
      .Get(
        "/Notifications/GetAllNotifications",
        helper
          .GetURLParamString({ page: currentPage, pageSize: postsPerPage })
          .toString(),
      )
      .then((res) => {
        console.log(res);
        setNotifications(
          res.notifications.map((notifications: any) => ({
            ...notifications,
          })),
        );
      });
  }, []);

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <SectionIntro
          title={pageData?.MenuName}
          description={pageData?.Description}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <SearchTag
          setter={setSearchTerm}
          value={searchTerm}
          placeHolder="Search notifications..."
        />
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[165px]">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {roles.map((zoo: any, index: number) => (
                <SelectItem key={index} value={zoo.value}>
                  {zoo.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="md:flex gap-3 justify-between items-end mb-2 w-full">
            <CardIntro
              title="Notification Management"
              description="Manage notifications for users by roles."
            />

            <div className="w-fit">
              <ButtonComp
                type={"dark"}
                clickEvent={() => {
                  router.push("/home/notification-management/new");
                }}
                text="Add Notification"
                beforeIcon={<Plus className=" h-4 w-4" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-main-frostyBlue/5">
                  <TableHead>Title</TableHead>
                  <TableHead>Role Group</TableHead>
                  <TableHead>Notification Type</TableHead>
                  <TableHead>Notification Channel</TableHead>
                  <TableHead className="text-center text-main-darkFadedBlue">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="!text-sm">
                {currentPosts.length > 0 ? (
                  currentPosts.map((notifications: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{notifications.Title}</TableCell>
                      <TableCell>{notifications.RoleLabel}</TableCell>
                      <TableCell>{notifications.TypeLabel}</TableCell>
                      <TableCell>{notifications.Channel}</TableCell>
                      <TableCell className="text-right flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            router.push(
                              `/home/notification-management/${notifications.Id}`,
                            );
                          }}
                        >
                          <Eye className="text-black h-4 w-4 cursor-pointer" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-main-gray"
                    >
                      No notifications found.
                    </TableCell>
                  </TableRow>
                )}
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
                      }  text-main-secondaryText cursor-pointer`}
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
    </div>
  );
}
