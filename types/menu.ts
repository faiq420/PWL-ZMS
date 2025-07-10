// export interface MenuItem {
//   id: string
//   name: string
//   path: string
//   icon?: string
//   parentId?: string
//   order: number
//   isActive: boolean
//   isVisible: boolean
//   description?: string
//   children?: MenuItem[]
//   permissions?: MenuPermission[]
//   createdAt: string
//   updatedAt: string
// }

export interface MenuItem {
  MenuId: number;
  MenuName: string;
  Path: string;
  IsParent: boolean;
  ParentId?: number | null;
  SortingOrder: number;
  IsActive: boolean;
  Icon?: string;
  Description?: string;
  CreatedAt: string;
  UpdatedAt?: string;
  children?: MenuItem[];
}

export interface MenuPermission {
  roleId: string
  canView: boolean
  canEdit: boolean
  canDelete: boolean
  canCreate: boolean
}

export interface Role {
  id: string
  name: string
  description: string
  level: number
  isActive: boolean
  permissions: string[]
  menuAccess: MenuAccess[]
  createdAt: string
  updatedAt: string
}

export interface MenuAccess {
  menuId: string
  canView: boolean
  canEdit: boolean
  canDelete: boolean
  canCreate: boolean
}

export interface Permission {
  id: string
  name: string
  description: string
  module: string
  action: string
}

export type MenuType = "page" | "section" | "external" | "divider"
