import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Define the shape of your menu item
interface MenuItem {
  MenuName: string;
  Description: string;
  href: string;
  iconName: string;
  MenuId: number;
  ParentId: number | null;
  SortingOrder: string;
  permissions: {
    edit: boolean;
    create: boolean;
    view: boolean;
    delete: boolean;
  };
}

// Default empty menu item
const defaultMenuItem: MenuItem = {
  MenuName: "",
  Description: "",
  href: "",
  iconName: "",
  MenuId: 0,
  ParentId: null,
  SortingOrder: "",
  permissions: {
    edit: false,
    create: false,
    view: false,
    delete: false,
  },
};

export const usePageData = (): MenuItem => {
  const pathname = usePathname();
  const [menuItem, setMenuItem] = useState<MenuItem>(defaultMenuItem);

  useEffect(() => {
    if (!pathname) return;

    const pathInitial = "/" + pathname.split("/").slice(1, 3).join("/");

    if (typeof window !== "undefined") {
      const menuItems = JSON.parse(localStorage.getItem("menu_items") || "[]");
      const foundItem = menuItems.find(
        (item: any) => item.href === pathInitial,
      );
      setMenuItem(foundItem || defaultMenuItem);
    }
  }, [pathname]);

  return menuItem;
};
