"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Shield, Copy } from "lucide-react";
import type { MenuItem } from "@/types/menu";
import { MenuProps, RoleProps } from "@/src/app/home/access-control/page";
import { OPTION } from "@/types/utils";
import { useToast } from "../ui/use-toast";
import useHelper from "@/Helper/helper";
import ButtonComp from "../utils/Button";

interface BulkPermissionsProps {
  roles: RoleProps[];
  menuItems: OPTION[];
  onUpdateRoles: (roles: RoleProps[]) => void;
  onCopyRoles: (roleId: number, menuAccess: MenuProps[]) => void;
}

export function BulkPermissions({
  roles,
  menuItems,
  onUpdateRoles,
  onCopyRoles,
}: BulkPermissionsProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);
  const [sourceRole, setSourceRole] = useState<string>("");
  const [targetRoles, setTargetRoles] = useState<number[]>([]);
  const { toast } = useToast();
  const helper = useHelper();
  const [isCruding, setIsCruding] = useState<boolean>(false);

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

  const handleRoleToggle = (roleId: string, checked: boolean) => {
    if (checked) {
      setSelectedRoles([...selectedRoles, roleId]);
    } else {
      setSelectedRoles(selectedRoles.filter((id) => id !== roleId));
    }
  };

  const handleMenuToggle = (menuId: string, checked: boolean) => {
    if (checked) {
      setSelectedMenus([...selectedMenus, menuId]);
    } else {
      setSelectedMenus(selectedMenus.filter((id) => id !== menuId));
    }
  };

  const handleTargetRoleToggle = (roleId: number, checked: boolean) => {
    if (checked) {
      setTargetRoles([...targetRoles, roleId]);
    } else {
      setTargetRoles(targetRoles.filter((id) => id !== roleId));
    }
  };

  // const grantBulkAccess = () => {
  //   const updatedRoles = roles.map((role) => {
  //     if (selectedRoles.includes(String(role.RoleId))) {
  //       const newMenuAccess = [...role.Menus]

  //       selectedMenus.forEach((menuId) => {
  //         const existingIndex = newMenuAccess.findIndex((access) => access.MenuId === menuId)
  //         if (existingIndex >= 0) {
  //           newMenuAccess[existingIndex] = {
  //             ...newMenuAccess[existingIndex],
  //             canView: true,
  //           }
  //         } else {
  //           newMenuAccess.push({
  //             menuId,
  //             canView: true,
  //             canEdit: false,
  //             canDelete: false,
  //             canCreate: false,
  //           })
  //         }
  //       })

  //       return { ...role, menuAccess: newMenuAccess, updatedAt: new Date().toISOString() }
  //     }
  //     return role
  //   })

  //   onUpdateRoles(updatedRoles)
  //   toast({
  //     title: "Permissions Granted",
  //     description: `Access granted to ${selectedRoles.length} roles for ${selectedMenus.length} menu items.`,
  //   })
  // }

  // const revokeBulkAccess = () => {
  //   const updatedRoles = roles.map((role) => {
  //     if (selectedRoles.includes(role.id)) {
  //       const newMenuAccess = role.menuAccess.filter((access) => !selectedMenus.includes(access.menuId))
  //       return { ...role, menuAccess: newMenuAccess, updatedAt: new Date().toISOString() }
  //     }
  //     return role
  //   })

  //   onUpdateRoles(updatedRoles)
  //   toast({
  //     title: "Permissions Revoked",
  //     description: `Access revoked from ${selectedRoles.length} roles for ${selectedMenus.length} menu items.`,
  //   })
  // }

  function GetMenusOfRole(roleId: number): MenuProps[] | [] {
    const role = roles.find((item) => item.RoleId === roleId);
    return role?.Menus ? role.Menus : [];
  }

  const copyPermissions = () => {
    setIsCruding(true);
    Promise.allSettled(
      targetRoles.map((role) => {
        return helper.xhr.Post(
          "/Mapping/CopyPermissions",
          helper.ConvertToFormData({
            SRoleId: Number(sourceRole),
            DRoleId: role,
          })
        );
      })
    )
      .then((response) => {
        console.log(response);
        toast({
          title: "Permissions Updated Successfully",
          description:
            "Role-based menu access permissions have been saved successfully.",
          variant: "success"
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Permissions Not Updated Successfully",
          description: error.message,
          variant: "danger"
        });
      })
      .finally(() => {
        targetRoles.map((role) => {
          onCopyRoles(role, GetMenusOfRole(Number(sourceRole)));
        });
        setIsCruding(false);
      });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Bulk Grant/Revoke Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Select Roles
              </Label>
              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
                {roles.map((role) => (
                  <div
                    key={role.RoleId}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`bulk-role-${role.RoleId}`}
                      checked={selectedRoles.includes(String(role.RoleId))}
                      // onCheckedChange={(checked) => handleRoleToggle(role.id, checked as boolean)}
                    />
                    <Label
                      htmlFor={`bulk-role-${role.RoleId}`}
                      className="text-sm"
                    >
                      {role.RoleName}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">
                Select Menu Items
              </Label>
              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
                {allMenus.map((menu) => (
                  <div key={menu.label} className="flex items-center space-x-2">
                    <Checkbox
                      id={`bulk-menu-${menu.value}`}
                      checked={selectedMenus.includes(String(menu.value))}
                      onCheckedChange={(checked) =>
                        handleMenuToggle(String(menu.value), checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`bulk-menu-${menu.value}`}
                      className="text-sm"
                    >
                      {menu.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                // onClick={grantBulkAccess}
                disabled={
                  selectedRoles.length === 0 || selectedMenus.length === 0
                }
                className="flex-1"
              >
                Grant Access
              </Button>
              <Button
                variant="destructive"
                // onClick={revokeBulkAccess}
                disabled={
                  selectedRoles.length === 0 || selectedMenus.length === 0
                }
                className="flex-1"
              >
                Revoke Access
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Copy className="h-5 w-5" />
              Copy Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label
                htmlFor="source-role"
                className="text-sm font-medium mb-2 block"
              >
                Source Role
              </Label>
              <Select value={sourceRole} onValueChange={setSourceRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source role" />
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

            <div>
              <Label className="text-sm font-medium mb-2 block">
                Target Roles
              </Label>
              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
                {roles
                  .filter((role) => role.RoleId !== Number(sourceRole) && role.RoleName !== "Administrator")
                  .map((role) => (
                    <div
                      key={role.RoleId}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`target-role-${role.RoleId}`}
                        checked={targetRoles.includes(role.RoleId)}
                        onCheckedChange={(checked) =>
                          handleTargetRoleToggle(
                            role.RoleId,
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={`target-role-${role.RoleId}`}
                        className="text-sm"
                      >
                        {role.RoleName}
                      </Label>
                    </div>
                  ))}
              </div>
            </div>

            <ButtonComp
              clickEvent={copyPermissions}
              isCruding={isCruding}
              text="Copy Permissions"
              type={"dark_custom"}
              disabled={targetRoles.length <= 0}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-4">
            <Button
              variant="outline"
              // onClick={() => {
              //   setSelectedRoles(roles.map((r) => r.id))
              //   setSelectedMenus(allMenus.map((m) => String(m.MenuId)))
              // }}
            >
              Select All
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedRoles([]);
                setSelectedMenus([]);
                setTargetRoles([]);
                setSourceRole("");
              }}
            >
              Clear Selection
            </Button>
            <Button
              variant="outline"
              // onClick={() => setSelectedRoles(roles.filter((r) => r.isActive).map((r) => r.id))}
            >
              Select Active Roles
            </Button>
            <Button
              variant="outline"
              // onClick={() => setSelectedMenus(allMenus.filter((m) => m.IsActive).map((m) => String(m.MenuId)))}
            >
              Select Visible Menus
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
