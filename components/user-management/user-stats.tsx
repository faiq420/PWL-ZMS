"use client";

import { Users, UserCheck, UserX, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/types/user";
import MetricPresentationCard from "../utils/Cards/MetricPresentationCard";

interface UserStatsProps {
  users: User[];
}

export function UserStats({ users }: UserStatsProps) {
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "active").length;
  const inactiveUsers = users.filter(
    (user) => user.status === "inactive"
  ).length;
  const pendingUsers = users.filter((user) => user.status === "pending").length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <Users className="text-muted-foreground h-4 w-4" />,
      description: "All registered users",
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: <UserCheck className="text-muted-foreground h-4 w-4" />,
      description: "Currently active users",
    },
    {
      title: "Inactive Users",
      value: inactiveUsers,
      icon: <UserX className="text-muted-foreground h-4 w-4" />,
      description: "Inactive or suspended users",
    },
    // {
    //   title: "Pending Users",
    //   value: pendingUsers,
    //   icon: Clock,
    //   description: "Awaiting approval",
    // },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <MetricPresentationCard
          key={stat.title}
          Title={stat.title}
          icon={stat.icon}
          Count={stat.value}
          Description={stat.description}
        />
      ))}
    </div>
  );
}
