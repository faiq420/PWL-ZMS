"use client";

import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { RoleTable } from "@/components/role-management/role-table";
import { RoleModal } from "@/components/role-management/role-modal";
import { RoleStats } from "@/components/role-management/role-stats";
import { mockRoles } from "@/data/menus";
import type { Role } from "@/types/menu";
import Subheading from "@/components/utils/Headings/Subheading";
import ButtonComp from "@/components/utils/Button";
import { useRouter } from "next/navigation";

export default function RoleManagementPage() {
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleCreateRole = () => {
    setSelectedRole(null);
    setIsModalOpen(true);
  };

  const handleEditRole = (role: Role) => {
    NavigateToRecord("edit", Number(role.id));
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  const handleSaveRole = (roleData: Partial<Role>) => {
    if (selectedRole) {
      // Edit existing role
      setRoles(
        roles.map((role) =>
          role.id === selectedRole.id
            ? { ...role, ...roleData, updatedAt: new Date().toISOString() }
            : role
        )
      );
    } else {
      // Create new role
      const newRole: Role = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        permissions: [],
        menuAccess: [],
        level: roles.length + 1,
        ...roleData,
      } as Role;
      setRoles([...roles, newRole]);
    }
    setIsModalOpen(false);
  };

  const filteredRoles = roles.filter((role) => {
    const matchesSearch =
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && role.isActive) ||
      (statusFilter === "inactive" && !role.isActive);
    return matchesSearch && matchesStatus;
  });

  function NavigateToRecord(mode: string, id?: number) {
    router.push(
      `/home/role-management?mode=${mode}` +
        (id != undefined ? `&id=${id}` : "")
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Subheading text={"Role Management"} />
          <div className="flex items-center text-muted-foreground mt-0 font-syne">
            <p>Manage user roles and permissions</p>
          </div>
        </div>
        <div className="flex gap-2">
          <ButtonComp
            text="Create Role"
            type={"dark"}
            clickEvent={() => {
              NavigateToRecord("create");
            }}
            beforeIcon={<Plus className="h-4 w-4" />}
          />
          {/* <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Generate Report
          </Button>
          <Button className="bg-green-700 hover:bg-green-800">
            <Info className="mr-2 h-4 w-4" /> Update Information
          </Button> */}
        </div>
      </div>

      <RoleStats roles={roles} />

      <Card>
        <CardHeader>
          <CardTitle>Roles</CardTitle>
          <CardDescription>
            Manage system roles and their permissions
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search roles..."
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
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <RoleTable
            roles={filteredRoles}
            onEdit={handleEditRole}
            onDelete={handleDeleteRole}
          />
        </CardContent>
      </Card>

      <RoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRole}
        role={selectedRole}
      />
    </div>
  );
}
