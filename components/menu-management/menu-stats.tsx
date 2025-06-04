import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, Eye, EyeOff, Activity } from "lucide-react"
import type { MenuItem } from "@/types/menu"

interface MenuStatsProps {
  menuItems: MenuItem[]
}

export function MenuStats({ menuItems }: MenuStatsProps) {
  const flattenMenus = (items: MenuItem[]): MenuItem[] => {
    let result: MenuItem[] = []
    for (const item of items) {
      result.push(item)
      if (item.children) {
        result = result.concat(flattenMenus(item.children))
      }
    }
    return result
  }

  const allMenus = flattenMenus(menuItems)
  const visibleMenus = allMenus.filter((menu) => menu.isVisible)
  const activeMenus = allMenus.filter((menu) => menu.isActive)
  const rootMenus = menuItems.length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Menus</CardTitle>
          <Menu className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{allMenus.length}</div>
          <p className="text-xs text-muted-foreground">{rootMenus} root level items</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Visible Menus</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{visibleMenus.length}</div>
          <p className="text-xs text-muted-foreground">
            {((visibleMenus.length / allMenus.length) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Menus</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeMenus.length}</div>
          <p className="text-xs text-muted-foreground">
            {((activeMenus.length / allMenus.length) * 100).toFixed(1)}% active
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hidden Menus</CardTitle>
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{allMenus.length - visibleMenus.length}</div>
          <p className="text-xs text-muted-foreground">Not visible to users</p>
        </CardContent>
      </Card>
    </div>
  )
}
