"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MenuItem } from "@/types/menu";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (menu: Partial<MenuItem>) => void;
  menu?: MenuItem | null;
  existingMenus: MenuItem[];
}

const iconOptions = [
  "LayoutDashboard",
  "Trees",
  "PawPrint",
  "Stethoscope",
  "Users",
  "Settings",
  "Calendar",
  "MapPin",
  "Camera",
  "FileText",
  "Shield",
  "Bell",
];

export function MenuModal({
  isOpen,
  onClose,
  onSave,
  menu,
  existingMenus,
}: MenuModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    path: "",
    icon: "LayoutDashboard", // Updated default value to be a non-empty string
    parentId: "none",
    order: 1,
    isActive: true,
    description: "",
  });

  useEffect(() => {
    if (menu) {
      setFormData({
        name: menu.MenuName || "",
        path: menu.Path || "",
        icon: menu.Icon || "LayoutDashboard", // Updated default value to be a non-empty string
        parentId: String(menu.ParentId) || "none",
        order: menu.SortingOrder || 1,
        isActive: menu.IsActive ?? true,
        description: menu.Description || "",
      });
    } else {
      setFormData({
        name: "",
        path: "",
        icon: "LayoutDashboard", // Updated default value to be a non-empty string
        parentId: "none",
        order: existingMenus.length + 1,
        isActive: true,
        description: "",
      });
    }
  }, [menu, existingMenus, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      parentId: formData.parentId === "none" ? "" : formData.parentId,
    };
    // onSave(submitData);
  };

  const getParentMenuOptions = (
    menus: MenuItem[],
    excludeId?: string
  ): MenuItem[] => {
    const flattenMenus = (items: MenuItem[]): MenuItem[] => {
      let result: MenuItem[] = [];
      for (const item of items) {
        if (String(item.MenuId) !== excludeId) {
          result.push(item);
          if (item.children) {
            result = result.concat(flattenMenus(item.children));
          }
        }
      }
      return result;
    };
    return flattenMenus(menus);
  };

  const parentOptions = getParentMenuOptions(existingMenus, String(menu?.MenuId));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {menu ? "Edit Menu Item" : "Create New Menu Item"}
          </DialogTitle>
          <DialogDescription>
            {menu
              ? "Update menu item information and settings."
              : "Add a new menu item to the navigation."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Menu Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="path">Path/Route</Label>
              <Input
                id="path"
                value={formData.path}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, path: e.target.value }))
                }
                placeholder="/home/example"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, icon: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentId">Parent Menu</Label>
              <Select
                value={formData.parentId}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, parentId: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select parent (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Parent (Root Level)</SelectItem>
                  {parentOptions.map((parent) => (
                    <SelectItem key={parent.MenuId} value={String(parent.MenuId)}>
                      {parent.MenuName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="order">Display Order</Label>
            <Input
              id="order"
              type="number"
              min="1"
              value={formData.order}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  order: Number.parseInt(e.target.value) || 1,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={2}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isActive: checked }))
                }
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {menu ? "Update Menu" : "Create Menu"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
