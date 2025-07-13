"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import type { MenuItem, MenuAccess } from "@/types/menu"
import { MenuProps, RoleProps } from "@/src/app/home/access-control/page"
import { OPTION } from "@/types/utils"

interface RoleMenuMappingProps {
  roles: RoleProps[]
  menuItems: OPTION[]
  onUpdateAccess: (roleId: number, menuAccess: MenuProps[]) => void
}

export function RoleMenuMapping({ roles, menuItems, onUpdateAccess }: RoleMenuMappingProps) {
  const [selectedRole, setSelectedRole] = useState<string>(String(roles[0]?.RoleId) || "")

  const flattenMenus = (items: MenuItem[]): MenuItem[] => {
    let result: MenuItem[] = []
    for (const item of items) {
      result.push(item)
      if (item.children) {
        result = result.concat(flattenMenus(item.children))
      }
    }
    return result
  }

  const allMenus = menuItems
  const currentRole = roles.find((role) => role.RoleId === Number(selectedRole))

  const getMenuAccess = (menuId: number): MenuProps => {
    const access = currentRole?.Menus.find((access) => access.MenuId === Number(menuId));
    return access || { MenuId: menuId, View: false, Edit: false, Delete: false, Create: false }
  }

  const updateMenuAccess = (menuId: number, permission: keyof MenuProps, value: boolean) => {
    if (!currentRole) return

    const existingAccess = currentRole.Menus.find((access) => access.MenuId === menuId)
    let newMenuAccess: MenuProps[]

    if (existingAccess) {
      newMenuAccess = currentRole.Menus.map((access) =>
        access.MenuId === menuId ? { ...access, [permission]: value } : access,
      )
    } else {
      newMenuAccess = [
        ...currentRole.Menus,
        { MenuId: menuId, View: false, Edit: false, Delete: false, Create: false, [permission]: value },
      ]
    }

    onUpdateAccess(Number(selectedRole), newMenuAccess)
  }

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
            <CardTitle className="flex items-center gap-2">
              Permissions for {currentRole.RoleName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allMenus.map((menu) => {
                const access = getMenuAccess(Number(menu.value))
                return (
                  <div key={menu.label} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{menu.label}</h4>
                        {/* {menu.Path && (
                          <Badge variant="outline" className="text-xs">
                            {menu.Path}
                          </Badge>
                        )} */}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${menu.value}-view`}
                          checked={access.View}
                          onCheckedChange={(checked) => updateMenuAccess(Number(menu.value), "View", checked as boolean)}
                        />
                        <Label htmlFor={`${menu.value}-view`} className="text-sm">
                          View
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${menu.value}-edit`}
                          checked={access.Edit}
                          onCheckedChange={(checked) => updateMenuAccess(Number(menu.value), "Edit", checked as boolean)}
                        />
                        <Label htmlFor={`${menu.value}-edit`} className="text-sm">
                          Edit
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${menu.value}-create`}
                          checked={access.Create}
                          onCheckedChange={(checked) => updateMenuAccess(Number(menu.value), "Create", checked as boolean)}
                        />
                        <Label htmlFor={`${menu.value}-create`} className="text-sm">
                          Create
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${menu.value}-delete`}
                          checked={access.Delete}
                          onCheckedChange={(checked) => updateMenuAccess(Number(menu.value), "Delete", checked as boolean)}
                        />
                        <Label htmlFor={`${menu.value}-delete`} className="text-sm">
                          Delete
                        </Label>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
