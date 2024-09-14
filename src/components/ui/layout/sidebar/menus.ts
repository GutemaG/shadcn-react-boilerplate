import {
  ChartLine,
  Grid2X2,
  LayoutDashboard,
  ListPlus,
  ListTodo,
  PieChart,
  Settings,
  User,
  UserCheck,
  UserPlus,
  Users,
  Workflow,
} from "lucide-react";
import { Menu } from "@/model/SideBarMenu";
export const menus: Menu[] = [
  {
    path: "/",
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/task",
    name: "Task",
    icon: PieChart,
    child: [
      {
        path: "task-request",
        name: "Task Request",
        icon: ListPlus,
      },
      {
        path: "task-list",
        name: "Task List",
        icon: ListTodo,
      },
    ],
  },
  {
    path: "/users",
    name: "Users Management",
    icon: User,
    child: [
      {
        path: "/user-create",
        name: "Create User",
        icon: UserPlus,
      },
      {
        path: "/list",
        name: "User List",
        icon: Users,
      },
      {
        path: "/roles",
        name: "Roles",
        icon: UserCheck,
      },
    ],
  },
  {
    name: "Analytics & Report",
    path: "analytics-report",
    icon: ChartLine,
  },
  {
    name: "Settings",
    path: "settings",
    icon: Settings,
    child: [
      {
        name: "Case",
        path: "case",
        icon: Grid2X2,
      },
      {
        name: "Workflow",
        path: "workflow",
        icon: Workflow,
      },
    ],
  },
];
