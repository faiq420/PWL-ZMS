"use client";

import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MenuTree } from "@/components/menu-management/menu-tree";
import { MenuModal } from "@/components/menu-management/menu-modal";
import { MenuStats } from "@/components/menu-management/menu-stats";
import { mockMenuItems } from "@/data/menus";
import type { MenuItem } from "@/types/menu";
import SectionIntro from "@/components/utils/Headings/SectionIntro";
import { useRouter } from "next/navigation";

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const router = useRouter();

  const handleCreateMenu = () => {
    NavigateToRecord("create")
    // setSelectedMenu(null);
    // setIsModalOpen(true);
  };

  const handleEditMenu = (menu: MenuItem) => {
    NavigateToRecord("edit", menu.MenuId)
    // setSelectedMenu(menu);
    // setIsModalOpen(true);
  };

  const handleDeleteMenu = (menuId: string) => {
    const deleteMenuAndChildren = (
      items: MenuItem[],
      id: string
    ): MenuItem[] => {
      return items.filter((item) => {
        if (item.MenuId === Number(id)) return false;
        if (item.children) {
          item.children = deleteMenuAndChildren(item.children, id);
        }
        return true;
      });
    };
    setMenuItems(deleteMenuAndChildren(menuItems, menuId));
  };

  const handleSaveMenu = (menuData: Partial<MenuItem>) => {
    if (selectedMenu) {
      // Edit existing menu
      const updateMenu = (items: MenuItem[]): MenuItem[] => {
        return items.map((item) => {
          if (item.MenuId === selectedMenu.MenuId) {
            return {
              ...item,
              ...menuData,
              updatedAt: new Date().toISOString(),
            };
          }
          if (item.children) {
            item.children = updateMenu(item.children);
          }
          return item;
        });
      };
      setMenuItems(updateMenu(menuItems));
    } else {
      // Create new menu
      const newMenu: MenuItem = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        isVisible: true,
        order: menuItems.length + 1,
        ...menuData,
      } as MenuItem;

      if (menuData.ParentId) {
        // Add as child menu
        const addToParent = (items: MenuItem[]): MenuItem[] => {
          return items.map((item) => {
            if (item.MenuId === menuData.ParentId) {
              return {
                ...item,
                children: [...(item.children || []), newMenu],
              };
            }
            if (item.children) {
              item.children = addToParent(item.children);
            }
            return item;
          });
        };
        setMenuItems(addToParent(menuItems));
      } else {
        // Add as root menu
        setMenuItems([...menuItems, newMenu]);
      }
    }
    setIsModalOpen(false);
  };

  const handleToggleVisibility = (menuId: string) => {
    const toggleVisibility = (items: MenuItem[]): MenuItem[] => {
      return items.map((item) => {
        if (item.MenuId === Number(menuId)) {
          return {
            ...item,
            updatedAt: new Date().toISOString(),
          };
        }
        if (item.children) {
          item.children = toggleVisibility(item.children);
        }
        return item;
      });
    };
    setMenuItems(toggleVisibility(menuItems));
  };

  const filteredMenus = menuItems.filter((menu) => {
    const matchesSearch = menu.MenuName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && menu.IsActive) ||
      (statusFilter === "inactive" && !menu.IsActive);
    return matchesSearch && matchesStatus;
  });

  function NavigateToRecord(mode: string, id?: number) {
    router.push(
      `/home/menu-management?mode=${mode}` +
        (id != undefined ? `&id=${id}` : "")
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionIntro
          title="Menu Management"
          description="Manage system navigation menus and hierarchy."
        />
        <Button onClick={handleCreateMenu}>
          <Plus className="mr-2 h-4 w-4" />
          Add Menu Item
        </Button>
      </div>

      <MenuStats menuItems={menuItems} />

      <Card>
        <CardHeader>
          <CardTitle className="font-poppins text-xl">Menu Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="visible">Visible</SelectItem>
                <SelectItem value="hidden">Hidden</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <MenuTree
            menuItems={filteredMenus}
            onEdit={handleEditMenu}
            onDelete={handleDeleteMenu}
            onToggleVisibility={handleToggleVisibility}
          />
        </CardContent>
      </Card>

      <MenuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMenu}
        menu={selectedMenu}
        existingMenus={menuItems}
      />
    </div>
  );
}
