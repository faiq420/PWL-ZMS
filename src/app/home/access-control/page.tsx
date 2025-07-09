"use client";

import { useState } from "react";
import { Shield, Users, Menu, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccessMatrix } from "@/components/access-control/access-matrix";
import { RoleMenuMapping } from "@/components/access-control/role-menu-mapping";
import { BulkPermissions } from "@/components/access-control/bulk-permissions";
import { mockRoles, mockMenuItems } from "@/data/menus";
import type { Role, MenuItem } from "@/types/menu";
import { useToast } from "@/hooks/use-toast";
import SectionIntro from "@/components/utils/Headings/SectionIntro";
import MetricPresentationCard from "@/components/utils/Cards/MetricPresentationCard";

export default function AccessControlPage() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const { toast } = useToast();

  const handleSavePermissions = () => {
    toast({
      title: "Permissions Updated",
      description:
        "Role-based menu access permissions have been saved successfully.",
    });
  };

  const handleUpdateRoleAccess = (roleId: string, menuAccess: any[]) => {
    setRoles(
      roles.map((role) =>
        role.id === roleId
          ? { ...role, menuAccess, updatedAt: new Date().toISOString() }
          : role
      )
    );
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <SectionIntro
          title="Access Control"
          description="Manage role-based menu access and permissions."
        />
        <Button onClick={handleSavePermissions}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            Title: "Total Roles",
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
            Count: roles.length,
            Description: "Active system roles",
          },
          {
            Title: "Menu Items",
            icon: <Menu className="h-4 w-4 text-muted-foreground" />,
            Count: menuItems.length,
            Description: "Available menu items",
          },
          {
            Title: "Permissions",
            icon: <Shield className="h-4 w-4 text-muted-foreground" />,
            Count: roles.reduce((acc, role) => acc + role.menuAccess.length, 0),
            Description: "Total access rules",
          },
        ].map((card) => (
          <MetricPresentationCard
            key={card.Title}
            Title={card.Title}
            icon={card.icon}
            Count={card.Count}
            Description={card.Description}
          />
        ))}
      </div>

      <Tabs defaultValue="matrix" className="space-y-4 w-full flex flex-col">
        <TabsList className="w-full flex-1">
          <TabsTrigger className="flex-1" value="matrix">Access Matrix</TabsTrigger>
          <TabsTrigger className="flex-1" value="mapping">Role Mapping</TabsTrigger>
          <TabsTrigger className="flex-1" value="bulk">Bulk Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="matrix" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>
                View and manage permissions for all roles and menu items in a
                matrix format
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <AccessMatrix
                roles={roles}
                menuItems={menuItems}
                onUpdateAccess={handleUpdateRoleAccess}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role-Menu Mapping</CardTitle>
              <CardDescription>
                Configure detailed menu access permissions for each role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoleMenuMapping
                roles={roles}
                menuItems={menuItems}
                onUpdateAccess={handleUpdateRoleAccess}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Permission Operations</CardTitle>
              <CardDescription>
                Perform bulk operations on role permissions and menu access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BulkPermissions
                roles={roles}
                menuItems={menuItems}
                onUpdateRoles={setRoles}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
