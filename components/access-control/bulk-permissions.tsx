"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Shield, Copy } from "lucide-react"
import type { Role, MenuItem } from "@/types/menu"
import { useToast } from "@/hooks/use-toast"

interface BulkPermissionsProps {
  roles: Role[]
  menuItems: MenuItem[]
  onUpdateRoles: (roles: Role[]) => void
}

export function BulkPermissions({ roles, menuItems, onUpdateRoles }: BulkPermissionsProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectedMenus, setSelectedMenus] = useState<string[]>([])
  const [sourceRole, setSourceRole] = useState<string>("")
  const [targetRoles, setTargetRoles] = useState<string[]>([])
  const { toast } = useToast()

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

  const handleRoleToggle = (roleId: string, checked: boolean) => {
    if (checked) {
      setSelectedRoles([...selectedRoles, roleId])
    } else {
      setSelectedRoles(selectedRoles.filter((id) => id !== roleId))
    }
  }

  const handleMenuToggle = (menuId: string, checked: boolean) => {
    if (checked) {
      setSelectedMenus([...selectedMenus, menuId])
    } else {
      setSelectedMenus(selectedMenus.filter((id) => id !== menuId))
    }
  }

  const handleTargetRoleToggle = (roleId: string, checked: boolean) => {
    if (checked) {
      setTargetRoles([...targetRoles, roleId])
    } else {
      setTargetRoles(targetRoles.filter((id) => id !== roleId))
    }
  }

  const grantBulkAccess = () => {
    const updatedRoles = roles.map((role) => {
      if (selectedRoles.includes(role.id)) {
        const newMenuAccess = [...role.menuAccess]

        selectedMenus.forEach((menuId) => {
          const existingIndex = newMenuAccess.findIndex((access) => access.menuId === menuId)
          if (existingIndex >= 0) {
            newMenuAccess[existingIndex] = {
              ...newMenuAccess[existingIndex],
              canView: true,
            }
          } else {
            newMenuAccess.push({
              menuId,
              canView: true,
              canEdit: false,
              canDelete: false,
              canCreate: false,
            })
          }
        })

        return { ...role, menuAccess: newMenuAccess, updatedAt: new Date().toISOString() }
      }
      return role
    })

    onUpdateRoles(updatedRoles)
    toast({
      title: "Permissions Granted",
      description: `Access granted to ${selectedRoles.length} roles for ${selectedMenus.length} menu items.`,
    })
  }

  const revokeBulkAccess = () => {
    const updatedRoles = roles.map((role) => {
      if (selectedRoles.includes(role.id)) {
        const newMenuAccess = role.menuAccess.filter((access) => !selectedMenus.includes(access.menuId))
        return { ...role, menuAccess: newMenuAccess, updatedAt: new Date().toISOString() }
      }
      return role
    })

    onUpdateRoles(updatedRoles)
    toast({
      title: "Permissions Revoked",
      description: `Access revoked from ${selectedRoles.length} roles for ${selectedMenus.length} menu items.`,
    })
  }

  const copyPermissions = () => {
    const sourceRoleData = roles.find((role) => role.id === sourceRole)
    if (!sourceRoleData) return

    const updatedRoles = roles.map((role) => {
      if (targetRoles.includes(role.id)) {
        return {
          ...role,
          menuAccess: [...sourceRoleData.menuAccess],
          updatedAt: new Date().toISOString(),
        }
      }
      return role
    })

    onUpdateRoles(updatedRoles)
    toast({
      title: "Permissions Copied",
      description: `Permissions copied from ${sourceRoleData.name} to ${targetRoles.length} roles.`,
    })
  }

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
              <Label className="text-sm font-medium mb-2 block">Select Roles</Label>
              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`bulk-role-${role.id}`}
                      checked={selectedRoles.includes(role.id)}
                      onCheckedChange={(checked) => handleRoleToggle(role.id, checked as boolean)}
                    />
                    <Label htmlFor={`bulk-role-${role.id}`} className="text-sm">
                      {role.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Select Menu Items</Label>
              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
                {allMenus.map((menu) => (
                  <div key={menu.MenuId} className="flex items-center space-x-2">
                    <Checkbox
                      id={`bulk-menu-${menu.MenuId}`}
                      checked={selectedMenus.includes(String(menu.MenuId))}
                      onCheckedChange={(checked) => handleMenuToggle(String(menu.MenuId), checked as boolean)}
                    />
                    <Label htmlFor={`bulk-menu-${menu.MenuId}`} className="text-sm">
                      {menu.MenuName}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={grantBulkAccess}
                disabled={selectedRoles.length === 0 || selectedMenus.length === 0}
                className="flex-1"
              >
                Grant Access
              </Button>
              <Button
                variant="destructive"
                onClick={revokeBulkAccess}
                disabled={selectedRoles.length === 0 || selectedMenus.length === 0}
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
              <Label htmlFor="source-role" className="text-sm font-medium mb-2 block">
                Source Role
              </Label>
              <Select value={sourceRole} onValueChange={setSourceRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source role" />
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

            <div>
              <Label className="text-sm font-medium mb-2 block">Target Roles</Label>
              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
                {roles
                  .filter((role) => role.id !== sourceRole)
                  .map((role) => (
                    <div key={role.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`target-role-${role.id}`}
                        checked={targetRoles.includes(role.id)}
                        onCheckedChange={(checked) => handleTargetRoleToggle(role.id, checked as boolean)}
                      />
                      <Label htmlFor={`target-role-${role.id}`} className="text-sm">
                        {role.name}
                      </Label>
                    </div>
                  ))}
              </div>
            </div>

            <Button onClick={copyPermissions} disabled={!sourceRole || targetRoles.length === 0} className="w-full">
              Copy Permissions
            </Button>
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
              onClick={() => {
                setSelectedRoles(roles.map((r) => r.id))
                setSelectedMenus(allMenus.map((m) => String(m.MenuId)))
              }}
            >
              Select All
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedRoles([])
                setSelectedMenus([])
                setTargetRoles([])
                setSourceRole("")
              }}
            >
              Clear Selection
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedRoles(roles.filter((r) => r.isActive).map((r) => r.id))}
            >
              Select Active Roles
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedMenus(allMenus.filter((m) => m.IsActive).map((m) => String(m.MenuId)))}
            >
              Select Visible Menus
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
