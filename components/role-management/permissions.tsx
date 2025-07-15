import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { MenuExtendedProps } from "@/src/app/home/role-management/crud";

interface Props {
  allMenus: MenuExtendedProps[];
  onUpdateAccess: (menuAccess: MenuExtendedProps[]) => void;
}

const PermissionsComp = ({ allMenus, onUpdateAccess }: Props) => {
  const updateMenuAccess = (
    menuId: number,
    menuName: string,
    value: boolean,
    permission?: keyof MenuExtendedProps
  ) => {
    const existingAccess = allMenus.find((access) => access.MenuId === menuId);
    let newMenuAccess: MenuExtendedProps[];

    if (existingAccess) {
      newMenuAccess = allMenus.map((access) =>
        access.MenuId === menuId
          ? permission === null || permission === undefined
            ? {
                ...access,
                View: value,
                Create: value,
                Edit: value,
                Delete: value,
              }
            : { ...access, [permission]: value }
          : access
      );
    } else {
      newMenuAccess = [
        ...allMenus,
        permission === null || permission === undefined
          ? {
              MenuId: menuId,
              MenuName: menuName,
              View: value,
              Create: value,
              Edit: value,
              Delete: value,
            }
          : {
              MenuId: menuId,
              MenuName: menuName,
              View: false,
              Edit: false,
              Delete: false,
              Create: false,
              [permission]: value,
            },
      ];
    }

    onUpdateAccess(newMenuAccess);
  };

  return (
    <div className="space-y-2">
      {allMenus.map((menu) => {
        return (
          <div key={menu.MenuId} className="border rounded-lg p-4">
            <div className="flex items-center space-x-5 mb-3">
              <h4 className="font-medium">{menu.MenuName}</h4>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={menu.View && menu.Create && menu.Edit && menu.Delete}
                  onCheckedChange={(checked) =>
                    updateMenuAccess(
                      Number(menu.MenuId),
                      menu.MenuName,
                      checked as boolean
                    )
                  }
                />
                <Label className="text-sm">Select All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${menu.MenuId}-view`}
                  checked={menu.View}
                  onCheckedChange={(checked) =>
                    updateMenuAccess(
                      Number(menu.MenuId),
                      menu.MenuName,
                      checked as boolean,
                      "View"
                    )
                  }
                />
                <Label htmlFor={`${menu.MenuId}-view`} className="text-sm">
                  View
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${menu.MenuId}-edit`}
                  checked={menu.Edit}
                  onCheckedChange={(checked) =>
                    updateMenuAccess(
                      Number(menu.MenuId),
                      menu.MenuName,
                      checked as boolean,
                      "Edit"
                    )
                  }
                />
                <Label htmlFor={`${menu.MenuId}-edit`} className="text-sm">
                  Edit
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${menu.MenuId}-create`}
                  checked={menu.Create}
                  onCheckedChange={(checked) =>
                    updateMenuAccess(
                      Number(menu.MenuId),
                      menu.MenuName,
                      checked as boolean,
                      "Create"
                    )
                  }
                />
                <Label htmlFor={`${menu.MenuId}-create`} className="text-sm">
                  Create
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${menu.MenuId}-delete`}
                  checked={menu.Delete}
                  onCheckedChange={(checked) =>
                    updateMenuAccess(
                      Number(menu.MenuId),
                      menu.MenuName,
                      checked as boolean,
                      "Delete"
                    )
                  }
                />
                <Label htmlFor={`${menu.MenuId}-delete`} className="text-sm">
                  Delete
                </Label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PermissionsComp;
