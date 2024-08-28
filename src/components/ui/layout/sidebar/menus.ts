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
    path: "/tasks",
    name: "Tasks",
    icon: BookCheck,
    child: [
      {
        path: "category-1",
        name: "Task Category 1",
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
