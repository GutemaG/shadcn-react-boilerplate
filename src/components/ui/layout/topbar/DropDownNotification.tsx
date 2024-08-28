import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

export function DropdownNotification() {
  const notifications = [
    "Edit your information in a swipe Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    "Edit your information in a swipe Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    "Edit your information in a swipe Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    "Edit your information in a swipe Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    "Edit your information in a swipe Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    "Edit your information in a swipe Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    "Edit your information in a swipe Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    "Edit your information in a swipe Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    "Edit your information in a swipe Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    "Edit your information in a swipe Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    "Edit your information in a swipe Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    "Edit your information in a swipe Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    "Edit your information in a swipe Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    "Edit your information in a swipe Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    "Edit your information in a swipe Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="outline-none hover:rounded-lg"
          size={"sm"}
        >
          <Bell className="h-[1.2rem] w-[1.2rem] scale-100 transition-all" />
          {/* <Bell size={20} /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 z-99999">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-72 rounded-md">
          {notifications.map((notification, index) => (
            <div key={index}>
              <DropdownMenuItem key={notification}>
                {notification}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
