import {
  MessageCircleQuestionIcon,
  ShoppingCart,
  Users,
  Wallet,
  Book,
} from "lucide-react";
export type MenuItem = {
  label: string;
  path: string;
  icon?: any;
};

type Menus = {
  [key: string]: MenuItem[];
};

export const menus: Menus = {
  management: [
    {
      label: "Orders",
      path: "/home/management/orders",
      icon: {
        component: ShoppingCart,
        props: { className: "mr-2 h-4 w-4" },
      },
    },
    {
      label: "Products",
      path: "/home/management/products",
      icon: {
        component: Wallet,
        props: { className: "mr-2 h-4 w-4" },
      },
    },
    {
      label: "Users",
      path: "/home/management/users",
      icon: {
        component: Users,
        props: { className: "mr-2 h-4 w-4" },
      },
    },
    {
      label: "Categories",
      path: "/home/management/categories",
      icon: {
        component: Book,
        props: { className: "mr-2 h-4 w-4" },
      },
    },
    {
      label: "FAQs",
      path: "/home/management/faq",
      icon: {
        component: MessageCircleQuestionIcon,
        props: { className: "mr-2 h-4 w-4" },
      },
    },
  ],
};

//<MessageCircleQuestionIcon className="mr-2 h-4 w-4" />
