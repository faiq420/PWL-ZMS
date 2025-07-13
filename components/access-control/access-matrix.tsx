"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Role, MenuItem } from "@/types/menu";
import { OPTION } from "@/types/utils";
import { RoleProps } from "@/src/app/home/access-control/page";

interface AccessMatrixProps {
  roles: RoleProps[];
  menuItems: OPTION[];
  onUpdateAccess: (roleId: number, menuAccess: any[]) => void;
}

export function AccessMatrix({
  roles,
  menuItems,
  onUpdateAccess,
}: AccessMatrixProps) {
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());

  const flattenMenus = (items: MenuItem[]): MenuItem[] => {
    let result: MenuItem[] = [];
    for (const item of items) {
      result.push(item);
      if (item.children) {
        result = result.concat(flattenMenus(item.children));
      }
    }
    return result;
  };

  const allMenus = menuItems;

  const hasAccess = (roleId: number, menuId: number) => {
    const role = roles.find((r) => r.RoleId === roleId);
    return (
      role?.Menus.some((access) => access.MenuId === menuId && (access.View || access.Create || access.Delete || access.Edit)) ||
      false
    );
  };

  const toggleAccess = (roleId: number, menuId: number) => {
    const role = roles.find((r) => r.RoleId === roleId);
    if (!role) return;

    const existingAccess = role.Menus.find(
      (access) => access.MenuId === menuId
    );
    let newMenuAccess;

    if (existingAccess) {
      // Toggle existing access
      newMenuAccess = role.Menus.map((access) =>
        access.MenuId === menuId
          ? {
              ...access,
              View: !access.View,
              Create: !access.Create,
              Edit: !access.Edit,
              Delete: !access.Delete,
            }
          : access
      );
    } else {
      // Add new access
      newMenuAccess = [
        ...role.Menus,
        {
          MenuId: menuId,
          View: true,
          Edit: true,
          Delete: true,
          Create: true,
        },
      ];
    }

    onUpdateAccess(roleId, newMenuAccess);
  };

  const toggleBulkAccess = (roleId: number, grant: boolean) => {
    const newMenuAccess = allMenus.map((menu) => ({
      MenuId: menu.value,
      View: grant,
      Edit: grant,
      Delete: grant,
      Create: grant,
    }));
    console.log(newMenuAccess);
    onUpdateAccess(roleId, newMenuAccess);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-48">Menu Item</TableHead>
              {roles.map((role) => (
                <TableHead key={role.RoleId} className="text-center min-w-32">
                  <div className="space-y-1">
                    <div className="font-medium">{role.RoleName}</div>
                    <div className="flex gap-1 justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 text-xs"
                        onClick={() => toggleBulkAccess(role.RoleId, true)}
                      >
                        Grant All
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 text-xs"
                        onClick={() => toggleBulkAccess(role.RoleId, false)}
                      >
                        Revoke All
                      </Button>
                    </div>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {allMenus.map((menu) => (
              <TableRow key={Number(menu.value)}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span>{menu.label}</span>
                  </div>
                </TableCell>
                {roles.map((role) => (
                  <TableCell
                    key={`${role.RoleId}-${menu.value}`}
                    className="text-center"
                  >
                    <Checkbox
                      // checked={hasAccess(role.RoleId, Number(menu.value))}
                      checked={hasAccess(role.RoleId, Number(menu.value))}
                      onCheckedChange={() =>
                        toggleAccess(role.RoleId, Number(menu.value))
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
