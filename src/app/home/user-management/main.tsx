"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserTable } from "@/components/user-management/user-table";
import { UserModal } from "@/components/user-management/user-modal";
import { UserStats } from "@/components/user-management/user-stats";
import { mockUsers } from "@/data/users";
import type { User } from "@/types/user";
import useHelper from "@/Helper/helper";
import { useRouter } from "next/navigation";
import ButtonComp from "@/components/utils/Button";
import SectionIntro from "@/components/utils/Headings/SectionIntro";

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");
  const router = useRouter();

  const handleCreateUser = () => {
    NavigateToRecord("create");
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.Id !== Number(userId)));
  };

  function NavigateToRecord(mode: string, id?: number) {
    router.push(
      `/home/user-management?mode=${mode}` +
        (id != undefined ? `&id=${id}` : "")
    );
  }

  const handleSaveUser = (userData: Partial<User>) => {
    if (selectedUser) {
      // Edit existing user
      setUsers(
        users.map((user) =>
          user.Id === selectedUser.Id
            ? { ...user, ...userData, updatedAt: new Date().toISOString() }
            : user
        )
      );
    } else {
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "active",
        ...userData,
      } as User;
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesRole = activeTab === "all" || user.role === activeTab;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const roleLabels: Record<string, string> = {
    all: "All Users",
    admin: "Administrators",
    zoo_incharge: "Zoo Incharge",
    veterinary_doctor: "Veterinary Doctors",
    citizen: "Citizens",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionIntro
          title="User Management"
          description="Manage users, roles, and permissions across the system."
        />
        <div className="fit">
          <ButtonComp
            clickEvent={handleCreateUser}
            text="Add User"
            beforeIcon={<Plus className="mr-2 h-4 w-4" />}
            type={"dark"}
          />
        </div>
        {/* <Plus className="mr-2 h-4 w-4" />
          Add User
        </ButtonComp> */}
      </div>

      <UserStats users={users} />

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage all users in the system with role-based access control
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                {/* <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem> */}
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Users</TabsTrigger>
              {[...new Set(users.flatMap((user) => user.role))].map(
                (role, index) => (
                  <TabsTrigger key={index} value={role}>
                    {roleLabels[role] || role}
                  </TabsTrigger>
                )
              )}
              {/* <TabsTrigger value="admin">Admins</TabsTrigger>
              <TabsTrigger value="zoo_incharge">Zoo Incharge</TabsTrigger>
              <TabsTrigger value="veterinary_doctor">Veterinarians</TabsTrigger>
              <TabsTrigger value="citizen">Citizens</TabsTrigger> */}
            </TabsList>

            {["all", ...new Set(users.flatMap((user) => user.role))].map(
              (role) => (
                <TabsContent key={role} value={role} className="mt-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold ">
                      {roleLabels[role] || role}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {filteredUsers.length} user
                      {filteredUsers.length !== 1 ? "s" : ""} found
                    </p>
                  </div>
                  <UserTable
                    users={filteredUsers}
                    // onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                  />
                </TabsContent>
              )
            )}
          </Tabs>
        </CardContent>
      </Card>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        user={selectedUser}
      />
    </div>
  );
}
