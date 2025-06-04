"use client"

import { useState } from "react"
import { Shield, Users, Menu, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccessMatrix } from "@/components/access-control/access-matrix"
import { RoleMenuMapping } from "@/components/access-control/role-menu-mapping"
import { BulkPermissions } from "@/components/access-control/bulk-permissions"
import { mockRoles, mockMenuItems } from "@/data/menus"
import type { Role, MenuItem } from "@/types/menu"
import { useToast } from "@/hooks/use-toast"

export default function AccessControlPage() {
  const [roles, setRoles] = useState<Role[]>(mockRoles)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems)
  const { toast } = useToast()

  const handleSavePermissions = () => {
    toast({
      title: "Permissions Updated",
      description: "Role-based menu access permissions have been saved successfully.",
    })
  }

  const handleUpdateRoleAccess = (roleId: string, menuAccess: any[]) => {
    setRoles(
      roles.map((role) => (role.id === roleId ? { ...role, menuAccess, updatedAt: new Date().toISOString() } : role)),
    )
  }

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Access Control</h1>
          <p className="text-muted-foreground">Manage role-based menu access and permissions</p>
        </div>
        <Button onClick={handleSavePermissions}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
            <p className="text-xs text-muted-foreground">Active system roles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
            <Menu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{menuItems.length}</div>
            <p className="text-xs text-muted-foreground">Available menu items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permissions</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.reduce((acc, role) => acc + role.menuAccess.length, 0)}</div>
            <p className="text-xs text-muted-foreground">Total access rules</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="matrix" className="space-y-4">
        <TabsList>
          <TabsTrigger value="matrix">Access Matrix</TabsTrigger>
          <TabsTrigger value="mapping">Role Mapping</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="matrix" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>
                View and manage permissions for all roles and menu items in a matrix format
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <AccessMatrix roles={roles} menuItems={menuItems} onUpdateAccess={handleUpdateRoleAccess} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role-Menu Mapping</CardTitle>
              <CardDescription>Configure detailed menu access permissions for each role</CardDescription>
            </CardHeader>
            <CardContent>
              <RoleMenuMapping roles={roles} menuItems={menuItems} onUpdateAccess={handleUpdateRoleAccess} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Permission Operations</CardTitle>
              <CardDescription>Perform bulk operations on role permissions and menu access</CardDescription>
            </CardHeader>
            <CardContent>
              <BulkPermissions roles={roles} menuItems={menuItems} onUpdateRoles={setRoles} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
