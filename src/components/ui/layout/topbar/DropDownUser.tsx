import { LogOut, Plus, Settings, User, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import { NavLink } from "react-router-dom";

export function DropDownUser() {
  const loggedInUser = {
    name: "Birhanu Gudisa",
    image: "../",
    email: "test@gamil.com",
    username: "birhanu",
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-center gap-2 text-end">
          <div className="flex flex-col cursor-pointer text-sm text-end">
            <span className="font-black">{loggedInUser.name}</span>
            <span className="font-thin text-end">{loggedInUser.username}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full h-max"
          >
            <Avatar>
              <AvatarImage src="vite.svg" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-99999">
        <DropdownMenuGroup>
          <NavLink to="/profile">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </NavLink>

          <NavLink to="/settings">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </NavLink>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Team</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
