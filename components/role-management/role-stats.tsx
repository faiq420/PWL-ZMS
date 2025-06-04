import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Activity, Lock } from "lucide-react"
import type { Role } from "@/types/menu"

interface RoleStatsProps {
  roles: Role[]
}

export function RoleStats({ roles }: RoleStatsProps) {
  const activeRoles = roles.filter((role) => role.isActive)
  const totalPermissions = roles.reduce((acc, role) => acc + role.permissions.length, 0)
  const totalMenuAccess = roles.reduce((acc, role) => acc + role.menuAccess.length, 0)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{roles.length}</div>
          <p className="text-xs text-muted-foreground">System roles defined</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Roles</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeRoles.length}</div>
          <p className="text-xs text-muted-foreground">
            {((activeRoles.length / roles.length) * 100).toFixed(1)}% active
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Permissions</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPermissions}</div>
          <p className="text-xs text-muted-foreground">Total assigned permissions</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Menu Access</CardTitle>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMenuAccess}</div>
          <p className="text-xs text-muted-foreground">Menu access rules</p>
        </CardContent>
      </Card>
    </div>
  )
}
