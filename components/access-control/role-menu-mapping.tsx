"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import type { Role, MenuItem, MenuAccess } from "@/types/menu"

interface RoleMenuMappingProps {
  roles: Role[]
  menuItems: MenuItem[]
  onUpdateAccess: (roleId: string, menuAccess: MenuAccess[]) => void
}

export function RoleMenuMapping({ roles, menuItems, onUpdateAccess }: RoleMenuMappingProps) {
  const [selectedRole, setSelectedRole] = useState<string>(roles[0]?.id || "")

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

  const allMenus = flattenMenus(menuItems)
  const currentRole = roles.find((role) => role.id === selectedRole)

  const getMenuAccess = (menuId: string): MenuAccess => {
    const access = currentRole?.menuAccess.find((access) => access.menuId === menuId)
    return access || { menuId, canView: false, canEdit: false, canDelete: false, canCreate: false }
  }

  const updateMenuAccess = (menuId: string, permission: keyof MenuAccess, value: boolean) => {
    if (!currentRole) return

    const existingAccess = currentRole.menuAccess.find((access) => access.menuId === menuId)
    let newMenuAccess: MenuAccess[]

    if (existingAccess) {
      newMenuAccess = currentRole.menuAccess.map((access) =>
        access.menuId === menuId ? { ...access, [permission]: value } : access,
      )
    } else {
      newMenuAccess = [
        ...currentRole.menuAccess,
        { menuId, canView: false, canEdit: false, canDelete: false, canCreate: false, [permission]: value },
      ]
    }

    onUpdateAccess(selectedRole, newMenuAccess)
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
              <SelectItem key={role.id} value={role.id}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentRole && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Permissions for {currentRole.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allMenus.map((menu) => {
                const access = getMenuAccess(String(menu.MenuId))
                return (
                  <div key={menu.MenuId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{menu.MenuName}</h4>
                        {menu.Path && (
                          <Badge variant="outline" className="text-xs">
                            {menu.Path}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${menu.MenuId}-view`}
                          checked={access.canView}
                          onCheckedChange={(checked) => updateMenuAccess(String(menu.MenuId), "canView", checked as boolean)}
                        />
                        <Label htmlFor={`${menu.MenuId}-view`} className="text-sm">
                          View
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${menu.MenuId}-edit`}
                          checked={access.canEdit}
                          onCheckedChange={(checked) => updateMenuAccess(String(menu.MenuId), "canEdit", checked as boolean)}
                        />
                        <Label htmlFor={`${menu.MenuId}-edit`} className="text-sm">
                          Edit
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${menu.MenuId}-create`}
                          checked={access.canCreate}
                          onCheckedChange={(checked) => updateMenuAccess(String(menu.MenuId), "canCreate", checked as boolean)}
                        />
                        <Label htmlFor={`${menu.MenuId}-create`} className="text-sm">
                          Create
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${menu.MenuId}-delete`}
                          checked={access.canDelete}
                          onCheckedChange={(checked) => updateMenuAccess(String(menu.MenuId), "canDelete", checked as boolean)}
                        />
                        <Label htmlFor={`${menu.MenuId}-delete`} className="text-sm">
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
