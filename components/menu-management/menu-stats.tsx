import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Menu, Eye, EyeOff, Activity } from "lucide-react";
import type { MenuItem } from "@/types/menu";
import MetricPresentationCard from "../utils/Cards/MetricPresentationCard";

interface MenuStatsProps {
  menuItems: MenuItem[];
}

export function MenuStats({ menuItems }: MenuStatsProps) {
  const flattenMenus = (items: MenuItem[]): MenuItem[] => {
    let result: MenuItem[] = [];
    for (const item of items) {
      result.push(item);
      if (item.children) {
        result = result.concat(flattenMenus(item.children));
      }
    }
    return result;
  };

  const allMenus = flattenMenus(menuItems);
  const visibleMenus = allMenus.filter((menu) => menu.isVisible);
  const activeMenus = allMenus.filter((menu) => menu.isActive);
  const rootMenus = menuItems.length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[
        {
          Title: "Total Menus",
          icon: <Menu className="h-4 w-4 text-muted-foreground" />,
          Count: allMenus.length,
          Description: "System menus defined",
        },
        {
          Title: "Visible Menus",
          icon: <Eye className="h-4 w-4 text-muted-foreground" />,
          Count: visibleMenus.length,
          Description: `${(
            (visibleMenus.length / allMenus.length) *
            100
          ).toFixed(1)}% of
            total`,
        },
        {
          Title: "Active Menus",
          icon: <Activity className="h-4 w-4 text-muted-foreground" />,
          Count: activeMenus.length,
          Description: `${(
            (activeMenus.length / allMenus.length) *
            100
          ).toFixed(1)}% active`,
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
