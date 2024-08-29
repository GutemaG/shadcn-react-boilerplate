import {
  BookCheck,
  LayoutDashboard,
  List,
  Lock,
  LogIn,
  LogOut,
  Settings,
  UserPen,
} from "lucide-react";
import { Menu } from "@/model/SideBarMenu";
export const menus: Menu[] = [
  {
    path: "/",
    name: "Dashboard",
    icon: LayoutDashboard,
    // child: [
    //   {
    //     path: "/",
    //     name: "eCommerce",
    //     icon: ShoppingCart,
    //   },
    // ],
  },
  {
    path: "/users",
    name: "Users",
    icon: BookCheck,
    child: [
      {
        path: "list",
        name: "User List",
        icon: List,
      },
      {
        path: "category-2",
        name: "Task Category 2",
        icon: List,
      },
    ],
  },
  {
    name: "Auth",
    path: "auth",
    icon: Lock,
    child: [
      {
        name: "Sign In",
        path: "signin",
        icon: LogIn,
      },
      {
        name: "Sign Up",
        path: "signup",
        icon: LogOut,
      },
    ],
  },
  {
    name: "Settings",
    path: "settings",
    icon: Settings,
  },
  {
    path: "profile",
    name: "Profile",
    icon: UserPen,
  },
];
