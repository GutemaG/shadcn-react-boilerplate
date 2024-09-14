import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemToggle";
import { Input } from "../../input";
import { DropdownNotification } from "./DropDownNotification";
import { DropDownUser } from "./DropDownUser";
import { Menu, Search, Slack, X } from "lucide-react";
import { Button } from "../../button";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    // <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none shadow-md">
    <header className="sticky top-0 z-40 flex w-full drop-shadow-1 dark:drop-shadow-none border-b-2  bg-background/95  background backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <Button
            variant={"outline"}
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke p-1.5 shadow-sm lg:hidden bg-inherit"
          >
            {!props.sidebarOpen && <Menu />}
            {props.sidebarOpen && <X />}
          </Button>

          <Link
            className="block flex-shrink-0 lg:hidden dark:bg-inherit dark:text-white"
            to="/"
          >
            {/* <img src="logo-icon.svg" alt="Logo" /> */}
            <Button
              variant={"outline"}
              className="border-0 bg-inherit hover:bg-inherit hover:text-inherit"
            >
              <Slack size={32} strokeWidth={2} className="dark:text-white" />
            </Button>
          </Link>
        </div>
        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full text-muted pl-8 hover:bg-accent 
                  md:w-[200px] lg:w-[336px] rounded-[0.5rem] bg-inherit font-normal 
                  dark:text-white text-black 
                  "
                />
              </div>
            </div>
          </form>
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7 ">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            {/* <DarkModeSwitcher /> */}
            <ThemeToggle />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}
          </ul>

          <DropDownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
