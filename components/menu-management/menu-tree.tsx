"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Edit, Trash2, Eye, EyeOff, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { MenuItem } from "@/types/menu"

interface MenuTreeProps {
  menuItems: MenuItem[]
  onEdit: (menu: MenuItem) => void
  onDelete: (menuId: string) => void
  onToggleVisibility: (menuId: string) => void
  level?: number
}

export function MenuTree({ menuItems, onEdit, onDelete, onToggleVisibility, level = 0 }: MenuTreeProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <div className="space-y-1">
      {menuItems.map((item) => (
        <div key={item.id} className="space-y-1">
          <div
            className={cn(
              "flex items-center gap-2 p-2 rounded-lg border hover:bg-muted/50 transition-colors",
              level > 0 && "ml-6 border-l-2 border-l-muted",
            )}
          >
            <div className="flex items-center gap-1">
              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
              {item.children && item.children.length > 0 && (
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleExpanded(item.id)}>
                  {expandedItems.has(item.id) ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </Button>
              )}
            </div>

            <div className="flex-1 flex items-center gap-2">
              <span className="font-medium">{item.name}</span>
              {item.path && (
                <Badge variant="outline" className="text-xs">
                  {item.path}
                </Badge>
              )}
              <div className="flex gap-1">
                {!item.isActive && <Badge variant="secondary">Inactive</Badge>}
                {!item.isVisible && <Badge variant="destructive">Hidden</Badge>}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => onToggleVisibility(item.id)} className="h-8 w-8 p-0">
                {item.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onEdit(item)} className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(item.id)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {item.children && item.children.length > 0 && expandedItems.has(item.id) && (
            <MenuTree
              menuItems={item.children}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleVisibility={onToggleVisibility}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  )
}
