"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Filter, ArrowUpDown, Save, X } from "lucide-react";
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
import { MenuStats } from "@/components/menu-management/menu-stats";
import { mockMenuItems } from "@/data/menus";
import type { MenuItem } from "@/types/menu";
import SectionIntro from "@/components/utils/Headings/SectionIntro";
import { useRouter } from "next/navigation";
import useHelper from "@/Helper/helper";
import ButtonComp from "@/components/utils/Button";
import { useToast } from "@/components/ui/use-toast";

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isReordering, setIsReordering] = useState<boolean>(false);
  const [isCruding, setIsCruding] = useState<boolean>(false);
  const router = useRouter();
  const helper = useHelper();
  const pageData = helper.GetPageData();
  const { toast } = useToast();

  const handleCreateMenu = () => {
    NavigateToRecord("create");
  };

  const handleEditMenu = (menu: MenuItem) => {
    NavigateToRecord("edit", menu.MenuId);
  };

  const handleDeleteMenu = (menuId: number) => {
    helper.xhr
      .Post("/Menu/DeleteMenu", helper.ConvertToFormData({ MenuId: menuId }))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setMenuItems(menuItems.filter((item) => item.MenuId !== menuId));
      });
  };

  // const handleSaveMenu = (menuData: Partial<MenuItem>) => {
  //   if (selectedMenu) {
  //     // Edit existing menu
  //     const updateMenu = (items: MenuItem[]): MenuItem[] => {
  //       return items.map((item) => {
  //         if (item.MenuId === selectedMenu.MenuId) {
  //           return {
  //             ...item,
  //             ...menuData,
  //             updatedAt: new Date().toISOString(),
  //           };
  //         }
  //         if (item.children) {
  //           item.children = updateMenu(item.children);
  //         }
  //         return item;
  //       });
  //     };
  //     setMenuItems(updateMenu(menuItems));
  //   } else {
  //     // Create new menu
  //     const newMenu: MenuItem = {
  //       id: Date.now().toString(),
  //       createdAt: new Date().toISOString(),
  //       updatedAt: new Date().toISOString(),
  //       isActive: true,
  //       isVisible: true,
  //       order: menuItems.length + 1,
  //       ...menuData,
  //     } as MenuItem;

  //     if (menuData.ParentId) {
  //       // Add as child menu
  //       const addToParent = (items: MenuItem[]): MenuItem[] => {
  //         return items.map((item) => {
  //           if (item.MenuId === menuData.ParentId) {
  //             return {
  //               ...item,
  //               children: [...(item.children || []), newMenu],
  //             };
  //           }
  //           if (item.children) {
  //             item.children = addToParent(item.children);
  //           }
  //           return item;
  //         });
  //       };
  //       setMenuItems(addToParent(menuItems));
  //     } else {
  //       // Add as root menu
  //       setMenuItems([...menuItems, newMenu]);
  //     }
  //   }
  // };

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
    const matchesSearch = menu.MenuName.toLowerCase().includes(
      searchTerm.toLowerCase()
    );
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

  function GetAllMenus() {
    helper.xhr
      .Get("/Menu/GetMenus")
      .then((response) => {
        setMenuItems(
          response.menus.map((menu: any) => ({
            MenuId: menu.MenuId,
            MenuName: menu.MenuName,
            Path: menu.Path,
            Description: menu.Description,
            IsActive: menu.IsActive,
            IsParent: menu.IsParent,
            ParentId: menu.ParentId,
            Icon: menu.Icon,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    GetAllMenus();
  }, []);

  function handleSaveReOrdering() {
    setIsCruding(true);
    helper.xhr
      .Post(
        "/Menu/MenuReordering",
        helper.ConvertToFormData({
          Menus: menuItems.map((menu, index) => ({
            MenuId: menu.MenuId,
            SortingOrder: index,
          })),
        })
      )
      .then((response) => {
        console.log(response);
        toast({
          title: "Reordering Successful",
          description: "Menu Reordered Successfully",
          variant: "success",
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsReordering(false);
        setIsCruding(false);
      });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionIntro
          title={pageData?.MenuName}
          description={pageData?.Description}
        />
        <Button onClick={handleCreateMenu}>
          <Plus className="mr-2 h-4 w-4" />
          Add Menu Item
        </Button>
      </div>

      <MenuStats menuItems={menuItems} />

      <Card>
        <CardHeader className="flex-row items-center justify-between ">
          <CardTitle className="font-poppins text-xl">Menu Structure</CardTitle>
          <div className="flex space-x-2">
            {isReordering && (
              <ButtonComp
                text={"Cancel"}
                clickEvent={() => setIsReordering(false)}
                beforeIcon={<X className="h-4 w-4" />}
                type={"white"}
              />
            )}
            <ButtonComp
              text={!isReordering ? "Re-Order" : "Save"}
              clickEvent={() => {
                !isReordering ? setIsReordering(true) : handleSaveReOrdering();
              }}
              beforeIcon={
                !isReordering ? (
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                ) : (
                  <Save className="h-4 w-4" />
                )
              }
              type={!isReordering ? "white" : "default"}
              isCruding={isCruding}
            />
          </div>
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
              </SelectContent>
            </Select>
          </div>

          <MenuTree
            menuItems={filteredMenus}
            onEdit={handleEditMenu}
            onDelete={handleDeleteMenu}
            onToggleVisibility={handleToggleVisibility}
            isReOrdering={isReordering}
            setMenuItems={setMenuItems}
          />
        </CardContent>
      </Card>
    </div>
  );
}
