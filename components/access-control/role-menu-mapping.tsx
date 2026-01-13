"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { MenuItem } from "@/types/menu";
import { MenuProps, RoleProps } from "@/src/app/home/access-control/page";
import { OPTION } from "@/types/utils";

interface RoleMenuMappingProps {
  roles: RoleProps[];
  menuItems: OPTION[];
  onUpdateAccess: (roleId: number, menuAccess: MenuProps[]) => void;
}

export function RoleMenuMapping({
  roles,
  menuItems,
  onUpdateAccess,
}: RoleMenuMappingProps) {
  const [selectedRole, setSelectedRole] = useState<string>(
    String(roles[0]?.RoleId) || ""
  );

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
  const currentRole = roles.find(
    (role) => role.RoleId === Number(selectedRole)
  );

  const getMenuAccess = (menuId: number): MenuProps => {
    const access = currentRole?.Menus.find(
      (access) => access.MenuId === Number(menuId)
    );
    return (
      access || {
        MenuId: menuId,
        View: false,
        Edit: false,
        Delete: false,
        Create: false,
      }
    );
  };

  const updateMenuAccess = (
    menuId: number,
    value: boolean,
    permission?: keyof MenuProps
  ) => {
    if (!currentRole) return;

    const existingAccess = currentRole.Menus.find(
      (access) => access.MenuId === menuId
    );
    let newMenuAccess: MenuProps[];

    if (existingAccess) {
      newMenuAccess = currentRole.Menus.map((access) =>
        access.MenuId === menuId
          ? permission === null || permission === undefined
            ? {
                ...access,
                View: value,
                Create: value,
                Edit: value,
                Delete: value,
              }
            : { ...access, [permission]: value }
          : access
      );
    } else {
      newMenuAccess = [
        ...currentRole.Menus,
        permission === null || permission === undefined
          ? {
              MenuId: menuId,
              View: value,
              Create: value,
              Edit: value,
              Delete: value,
            }
          : {
              MenuId: menuId,
              View: false,
              Edit: false,
              Delete: false,
              Create: false,
              [permission]: value,
            },
      ];
    }

    onUpdateAccess(Number(selectedRole), newMenuAccess);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Label htmlFor="role-select">Select Role:</Label>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Choose a role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.RoleId} value={String(role.RoleId)}>
                {role.RoleName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentRole && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-poppins font-medium mb-3">
              Permissions for {currentRole.RoleName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {allMenus.map((menu) => {
                const access = getMenuAccess(Number(menu.value));
                return (
                  <div
                    key={menu.label}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex gap-2 items-center">
                      <Checkbox
                        id="select-all"
                        checked={
                          access.View &&
                          access.Create &&
                          access.Delete &&
                          access.Edit
                        }
                        onCheckedChange={(checked) =>
                          updateMenuAccess(
                            Number(menu.value),
                            checked as boolean
                          )
                        }
                      />
                      <h4 className="font-medium text-sm font-poppins">
                        {menu.label}
                      </h4>
                    </div>
                    <div className="space-y-1.5 ml-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${menu.value}-view`}
                          checked={access.View}
                          onCheckedChange={(checked) =>
                            updateMenuAccess(
                              Number(menu.value),
                              checked as boolean,
                              "View"
                            )
                          }
                        />
                        <Label
                          htmlFor={`${menu.value}-view`}
                          className="text-xs font-poppins font-normal"
                        >
                          View
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${menu.value}-edit`}
                          checked={access.Edit}
                          onCheckedChange={(checked) =>
                            updateMenuAccess(
                              Number(menu.value),
                              checked as boolean,
                              "Edit"
                            )
                          }
                        />
                        <Label
                          htmlFor={`${menu.value}-edit`}
                          className="text-xs font-poppins font-normal"
                        >
                          Edit
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${menu.value}-create`}
                          checked={access.Create}
                          onCheckedChange={(checked) =>
                            updateMenuAccess(
                              Number(menu.value),
                              checked as boolean,
                              "Create"
                            )
                          }
                        />
                        <Label
                          htmlFor={`${menu.value}-create`}
                          className="text-xs font-poppins font-normal"
                        >
                          Create
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${menu.value}-delete`}
                          checked={access.Delete}
                          onCheckedChange={(checked) =>
                            updateMenuAccess(
                              Number(menu.value),
                              checked as boolean,
                              "Delete"
                            )
                          }
                        />
                        <Label
                          htmlFor={`${menu.value}-delete`}
                          className="text-xs font-poppins font-normal"
                        >
                          Delete
                        </Label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
