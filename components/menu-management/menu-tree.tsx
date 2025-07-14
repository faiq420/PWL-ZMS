"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/types/menu";
import { Modal } from "./menu-modal";
import { OPTION } from "@/types/utils";

interface MenuTreeProps {
  menuItems: MenuItem[];
  onEdit: (menu: MenuItem) => void;
  onDelete: (menuId: number) => void;
  onToggleVisibility: (menuId: string) => void;
  level?: number;
  isReOrdering: boolean;
  setMenuItems: (menuItem: MenuItem[]) => void;
}

export function MenuTree({
  menuItems,
  onEdit,
  onDelete,
  onToggleVisibility,
  level = 0,
  isReOrdering,
  setMenuItems,
}: MenuTreeProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<OPTION | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  function handleOpenModal(menu: MenuItem) {
    setSelectedMenu({ label: menu.MenuName, value: menu.MenuId });
    setIsModalOpen(true);
  }

  function handleDraggingStart(
    event: React.DragEvent<HTMLDivElement>,
    item: MenuItem
  ) {
    event.dataTransfer.setData("DraggedMenuId", String(item.MenuId));
    setIsDragging(true);
  }

  function handleDrop(
    event: React.DragEvent<HTMLDivElement>,
    dropIndex: number
  ) {
    event.preventDefault();
    const draggedMenuItemId = event.dataTransfer.getData("DraggedMenuId");

    const draggedMenuItemIndex = menuItems.findIndex(
      (item) => item.MenuId === Number(draggedMenuItemId)
    );
    const draggedMenuItem = menuItems[draggedMenuItemIndex];
    const updatedMenuItems = [...menuItems];
    updatedMenuItems.splice(draggedMenuItemIndex, 1);
    updatedMenuItems.splice(dropIndex, 0, draggedMenuItem);

    setMenuItems(updatedMenuItems);
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  return (
    <div className="space-y-1">
      {menuItems.map((item, index) => (
        <div key={item.MenuId} className="space-y-1">
          <div
            draggable={isReOrdering}
            onDragStart={(e) => handleDraggingStart(e, item)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            className={cn(
              "flex items-center gap-2 p-2 rounded-lg border hover:bg-muted/50 transition-colors",
              level > 0 && "ml-6 border-l-2 border-l-muted"
            )}
          >
            <div className="flex items-center gap-1">
              {isReOrdering && (
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
              )}
            </div>

            <div className="flex-1 flex items-center gap-2">
              <span className="font-medium">{item.MenuName}</span>
              {item.Path && (
                <Badge variant="outline" className="text-xs">
                  {item.Path}
                </Badge>
              )}
              <div className="flex gap-1">
                {!item.IsActive && <Badge variant="secondary">Inactive</Badge>}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(item)}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleOpenModal(item)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {item.children &&
            item.children.length > 0 &&
            expandedItems.has(String(item.MenuId)) && (
              <MenuTree
                menuItems={item.children}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleVisibility={onToggleVisibility}
                level={level + 1}
                isReOrdering={isReOrdering}
                setMenuItems={setMenuItems}
              />
            )}
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={onDelete}
        item={selectedMenu !== null ? selectedMenu : { label: "", value: 0 }}
        type="Menu"
      />
    </div>
  );
}
