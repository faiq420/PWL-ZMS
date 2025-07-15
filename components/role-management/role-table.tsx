"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Shield, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RoleProps } from "@/src/app/home/role-management/main";
import { Modal } from "../menu-management/menu-modal";
import { useState } from "react";
import { OPTION } from "@/types/utils";

interface RoleTableProps {
  roles: RoleProps[];
  onEdit: (role: RoleProps) => void;
  onDelete: (roleId: number) => void;
}

export function RoleTable({ roles, onEdit, onDelete }: RoleTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<OPTION | null>(null);

  function handleOpenModal(role: RoleProps) {
    setSelectedRole({ label: role.RoleName, value: role.RoleId });
    setIsModalOpen(true);
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role Name</TableHead>
            {/* <TableHead>Description</TableHead> */}
            {/* <TableHead>Level</TableHead> */}
            <TableHead>Status</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Menu Access</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.RoleId}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  {role.RoleName}
                </div>
              </TableCell>
              {/* <TableCell className="max-w-xs">
                <p className="text-sm text-muted-foreground truncate">{role.description}</p>
              </TableCell>
              <TableCell>
                <Badge className={getRoleLevelColor(role.level)}>Level {role.level}</Badge>
              </TableCell> */}
              <TableCell>
                <Badge variant={"outline"} className="bg-green-100 text-green-800">
                  {role.IsActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span className="text-sm">{role.Permissions}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  <span className="text-sm">{role.MenuAccess}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(role)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenModal(role)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={onDelete}
        item={selectedRole !== null ? selectedRole : { label: "", value: 0 }}
        type="Role"
      />
    </div>
  );
}
