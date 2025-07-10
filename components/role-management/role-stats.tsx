import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Activity, Lock } from "lucide-react";
import type { Role } from "@/types/menu";
import MetricPresentationCard from "../utils/Cards/MetricPresentationCard";

interface RoleStatsProps {
  roles: Role[];
}

export function RoleStats({ roles }: RoleStatsProps) {
  const activeRoles = roles.filter((role) => role.isActive);
  const totalPermissions = roles.reduce(
    (acc, role) => acc + role.permissions.length,
    0
  );
  const totalMenuAccess = roles.reduce(
    (acc, role) => acc + role.menuAccess.length,
    0
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          Title: "Total Roles",
          icon: <Shield className="h-4 w-4 text-muted-foreground" />,
          Count: roles.length,
          Description: "System roles defined",
        },
        {
          Title: "Active Roles",
          icon: <Activity className="h-4 w-4 text-muted-foreground" />,
          Count: activeRoles.length,
          Description: `${((activeRoles.length / roles.length) * 100).toFixed(
            1
          )}% active`,
        },
        {
          Title: "Permissions",
          icon: <Users className="h-4 w-4 text-muted-foreground" />,
          Count: totalPermissions,
          Description: "Total assigned permissions",
        },
        {
          Title: "Menu Access",
          icon: <Lock className="h-4 w-4 text-muted-foreground" />,
          Count: totalMenuAccess,
          Description: "Menu access rules",
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
  );
}
