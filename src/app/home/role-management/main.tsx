"use client";

import { useEffect, useState } from "react";
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
import useHelper from "@/Helper/helper";

export interface RoleProps {
  RoleId: number;
  RoleName: string;
  Description: string;
  IsActive: boolean;
  MenuAccess: number;
  Permissions: number;
}

export default function RoleManagementPage() {
  const router = useRouter();
  const helper = useHelper();
  const [roles, setRoles] = useState<RoleProps[]>([]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleEditRole = (role: RoleProps) => {
    NavigateToRecord("edit", Number(role.RoleId));
  };

  const handleDeleteRole = (roleId: number) => {
    helper.xhr
      .Post("/Roles/DeleteRole", helper.ConvertToFormData({ RoleId: roleId }))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setRoles(roles.filter((role) => role.RoleId !== Number(roleId)));
      });
  };

  const handleSaveRole = (roleData: Partial<Role>) => {
    // if (selectedRole) {
    //   // Edit existing role
    //   setRoles(
    //     roles.map((role) =>
    //       role.RoleId === Number(selectedRole.id)
    //         ? { ...role, ...roleData, updatedAt: new Date().toISOString() }
    //         : role
    //     )
    //   );
    // } else {
    //   // Create new role
    //   const newRole: RoleProps = {
    //     id: Date.now().toString(),
    //     createdAt: new Date().toISOString(),
    //     updatedAt: new Date().toISOString(),
    //     isActive: true,
    //     permissions: [],
    //     menuAccess: [],
    //     level: roles.length + 1,
    //     ...roleData,
    //   } as Role;
    //   setRoles([...roles, newRole]);
    // }
    // setIsModalOpen(false);
  };

  const filteredRoles = roles.filter((role) => {
    const matchesSearch =
      role.RoleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.Description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && role.IsActive) ||
      (statusFilter === "inactive" && !role.IsActive);
    return matchesSearch && matchesStatus;
  });

  function NavigateToRecord(mode: string, id?: number) {
    router.push(
      `/home/role-management?mode=${mode}` +
        (id != undefined ? `&id=${id}` : "")
    );
  }

  function GetAllRoles() {
    helper.xhr
      .Get("/Roles/GetAllRoles")
      .then((response) => {
        setRoles(
          response.roles.map((role: any) => ({
            RoleId: role.RoleId,
            RoleName: role.RoleName,
            Description: role.Description,
            IsActive: role.IsActive,
            MenuAccess: role.MenuAccess,
            Permissions: role.Permissions,
          }))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    GetAllRoles();
  }, []);

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
            roles={roles}
            onEdit={handleEditRole}
            onDelete={handleDeleteRole}
          />
        </CardContent>
      </Card>
    </div>
  );
}
