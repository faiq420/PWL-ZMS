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

interface AccessMatrixProps {
  roles: Role[];
  menuItems: MenuItem[];
  onUpdateAccess: (roleId: string, menuAccess: any[]) => void;
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

  const allMenus = flattenMenus(menuItems);

  const hasAccess = (roleId: string, menuId: string) => {
    const role = roles.find((r) => r.id === roleId);
    return (
      role?.menuAccess.some(
        (access) => access.menuId === menuId && access.canView
      ) || false
    );
  };

  const toggleAccess = (roleId: string, menuId: string) => {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return;

    const existingAccess = role.menuAccess.find(
      (access) => access.menuId === menuId
    );
    let newMenuAccess;

    if (existingAccess) {
      // Toggle existing access
      newMenuAccess = role.menuAccess.map((access) =>
        access.menuId === menuId
          ? { ...access, canView: !access.canView }
          : access
      );
    } else {
      // Add new access
      newMenuAccess = [
        ...role.menuAccess,
        {
          menuId,
          canView: true,
          canEdit: false,
          canDelete: false,
          canCreate: false,
        },
      ];
    }

    onUpdateAccess(roleId, newMenuAccess);
  };

  const toggleBulkAccess = (roleId: string, grant: boolean) => {
    const newMenuAccess = allMenus.map((menu) => ({
      menuId: menu.MenuId,
      canView: grant,
      canEdit: false,
      canDelete: false,
      canCreate: false,
    }));
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
                <TableHead key={role.id} className="text-center min-w-32">
                  <div className="space-y-1">
                    <div className="font-medium">{role.name}</div>
                    <div className="flex gap-1 justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 text-xs"
                        onClick={() => toggleBulkAccess(role.id, true)}
                      >
                        Grant All
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 text-xs"
                        onClick={() => toggleBulkAccess(role.id, false)}
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
              <TableRow key={menu.MenuId}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span>{menu.MenuName}</span>
                    {/* {menu.path && (
                      <Badge variant="outline" className="text-xs">
                        {menu.path}
                      </Badge>
                    )} */}
                  </div>
                </TableCell>
                {roles.map((role) => (
                  <TableCell
                    key={`${role.id}-${menu.MenuId}`}
                    className="text-center"
                  >
                    <Checkbox
                      checked={hasAccess(role.id, String(menu.MenuId))}
                      onCheckedChange={() => toggleAccess(role.id, String(menu.MenuId))}
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
