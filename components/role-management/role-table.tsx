"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Shield, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RoleProps } from "@/src/app/home/role-management/main"

interface RoleTableProps {
  roles: RoleProps[]
  onEdit: (role: RoleProps) => void
  onDelete: (roleId: number) => void
}

export function RoleTable({ roles, onEdit, onDelete }: RoleTableProps) {

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role Name</TableHead>
            {/* <TableHead>Description</TableHead> */}
            {/* <TableHead>Level</TableHead> */}
            <TableHead>Status</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Menu Access</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.RoleId}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  {role.RoleName}
                </div>
              </TableCell>
              {/* <TableCell className="max-w-xs">
                <p className="text-sm text-muted-foreground truncate">{role.description}</p>
              </TableCell>
              <TableCell>
                <Badge className={getRoleLevelColor(role.level)}>Level {role.level}</Badge>
              </TableCell> */}
              <TableCell>
                <Badge variant={role.IsActive ? "default" : "secondary"}>{role.IsActive ? "Active" : "Inactive"}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span className="text-sm">{role.Permissions}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  <span className="text-sm">{role.MenuAccess}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(role)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(role.RoleId)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
