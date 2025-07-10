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
import SectionIntro from "@/components/utils/Headings/SectionIntro";
import SearchTag from "@/components/utils/FormElements/SearchTag";

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
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SectionIntro
          title="Role Management"
          description="Manage user roles."
        />
        <div className="flex gap-2">
          <ButtonComp
            text="Create Role"
            type={"dark"}
            clickEvent={() => {
              NavigateToRecord("create");
            }}
            beforeIcon={<Plus className="h-4 w-4" />}
          />
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
          <div className="flex items-center space-x-2 mt-4 mb-2">
            <SearchTag
              setter={setSearchTerm}
              value={searchTerm}
              placeHolder="Search roles..."
            />  
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
