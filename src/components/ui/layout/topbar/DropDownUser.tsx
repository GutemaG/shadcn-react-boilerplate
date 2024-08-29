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
import { useAuth } from "@/hooks/useAuth";

export function DropDownUser() {
  const { logout, user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-center gap-2 text-end">
          <div className="flex flex-col cursor-pointer text-sm text-end">
            <span className="font-black">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="font-thin text-end">{user?.username}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full h-max"
          >
            <Avatar>
              <AvatarImage src={user?.image} alt="@shadcn" />
              <AvatarFallback>{user?.firstName[0]}</AvatarFallback>
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
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
