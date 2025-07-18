"use client";

import { useState } from "react";
import { MoreHorizontal, Edit, Trash2, Eye, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "@/types/user";
import Link from "next/link";
import { changeDateFormatWithTime } from "@/Helper/DateFormats";
import { useRouter } from "next/navigation";
import { Modal } from "../menu-management/menu-modal";
import { OPTION } from "@/types/utils";

interface UserTableProps {
  users: User[];
  // onEdit: (user: User) => void
  onDelete: (userId: number) => void;
}

export function UserTable({ users, onDelete }: UserTableProps) {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<OPTION | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "zoo_incharge":
        return "bg-blue-100 text-blue-800";
      case "veterinary_doctor":
        return "bg-green-100 text-green-800";
      case "citizen":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatRole = (role: string) => {
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  function handleOpenModal(user: User) {
    setSelectedUser({
      label: `${user.firstName} ${user.lastName}`,
      value: user.Id,
    });
    setIsModalOpen(true);
    document.body.style.pointerEvents = "auto"; // because when close the modal the screen become unresponsive
  }

  function NavigateToRecord(mode: string, id?: number) {
    router.push(
      `/home/user-management?mode=${mode}` +
        (id != undefined ? `&id=${id}` : "")
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getRoleColor(user.role)} variant={"outline"}>
                    {formatRole(user.role)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(user.status)} variant={"outline"}>
                    {formatRole(user.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {user.phone && (
                      <div className="flex items-center space-x-1 text-sm">
                        <Phone className="h-3 w-3" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1 text-sm">
                      <Mail className="h-3 w-3" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {user.lastLogin ? (
                    <div className="text-sm">
                      {changeDateFormatWithTime(user.lastLogin)}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Never</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          NavigateToRecord(
                            "view",
                            user.Id ? user.Id : undefined
                          )
                        }
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          NavigateToRecord(
                            "edit",
                            user.Id ? parseInt(String(user.Id)) : undefined
                          )
                        }
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          handleOpenModal(user);
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDelete={(id: number) => {
            onDelete(id);
            setIsModalOpen(false);
          }}
          item={selectedUser !== null ? selectedUser : { label: "", value: 0 }}
          type="User"
        />
      </div>
    </>
  );
}
