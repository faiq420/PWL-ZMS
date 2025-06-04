"use client"

import { Shield, Check, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/types/user"
import { permissions } from "@/data/users"

interface UserPermissionsProps {
  user: User
}

export function UserPermissions({ user }: UserPermissionsProps) {
  const getRolePermissions = (role: string) => {
    switch (role) {
      case "admin":
        return permissions
      case "zoo_incharge":
        return permissions.filter((p) =>
          ["zoo_management", "animal_management", "visitor_services", "reports_access"].includes(p.name),
        )
      case "veterinary_doctor":
        return permissions.filter((p) => ["animal_management", "veterinary_access", "reports_access"].includes(p.name))
      case "citizen":
        return []
      default:
        return []
    }
  }

  const userPermissions = user.permissions || getRolePermissions(user.role)
  const allPermissions = permissions

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>User Permissions</span>
        </CardTitle>
        <CardDescription>Permissions granted to this user based on their role</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {allPermissions.map((permission) => {
            const hasPermission = userPermissions.some((p) => p.id === permission.id)
            return (
              <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{permission.name.replace("_", " ").toUpperCase()}</h4>
                    <Badge variant={hasPermission ? "default" : "secondary"}>{permission.module}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{permission.description}</p>
                </div>
                <div className="ml-4">
                  {hasPermission ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <X className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
