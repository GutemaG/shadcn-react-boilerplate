import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { OpenCloseMenuIcon } from "./MenuIcons";
import { menus } from "./menus";
import { Slack, X } from "lucide-react";
import { Button } from "../../button";
import { Menu } from "@/model/SideBarMenu";
import { Input } from "../../input";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const [filteredMenus, setFilteredMenus] = useState<Menu[]>(menus);

  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLDivElement | null>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const filterMenu = (search: string) => {
    const filteredMenus = menus.filter((menu) => {
      if (menu.child && menu.child.length > 0) {
        const child = menu.child.filter(
          (child) =>
            child.name.toLowerCase().includes(search.toLowerCase()) ||
            menu.name.toLowerCase().includes(search.toLowerCase())
        );
        return child.length > 0;
      } else {
        return menu.name.toLowerCase().includes(search.toLowerCase());
      }
    });
    setFilteredMenus(filteredMenus);
  };

  // class="fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300
  // data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out inset-y-0 left-0 h-full
  //  w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm pr-0"
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 shadow-sm border-r-2 transition ease-in-out flex h-screen w-72.5 flex-col overflow-y-hidden  duration-300 lg:static lg:translate-x-0 bg-background text-white ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          {/* <img src="logo.svg" alt="Logo" /> */}
          {/* <img src="logo-icon.svg" alt="Logo" /> */}
          <Button
            variant={"outline"}
            className="py-6 px-2 border-0 bg-inherit hover:bg-inherit hover:text-inherit"
          >
            <Slack
              size={32}
              className="text-primary text-start"
              strokeWidth={2}
            />
            <span className="ml-2 uppercase text-2xl text-primary">Logo</span>
          </Button>
        </NavLink>
        <Button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          variant={"outline"}
          size={"icon"}
          className=" lg:hidden hover:border-1 border-0 hover:font-bold rounded-full bg-secondary text-secondary-foreground hover:text-primary-foreground hover:bg-primary hover:ring-2 hover:ring-white "
        >
          <X size={20} />
        </Button>
      </div>
      <div className="px-2">
        <Input
          placeholder="filter menu ..."
          className="mb-4 bg-inherit outline-none text-muted-foreground border-inherit"
          onChange={(e) => filterMenu(e.target.value)}
        />
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-2 py-2 px-4 lg:mt-2 lg:px-4">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {filteredMenus.map((menu) => {
                if (menu.child && menu.child.length > 0) {
                  return (
                    <SidebarLinkGroup
                      key={menu.name}
                      activeCondition={
                        pathname === menu.path ||
                        pathname.includes(menu.name.toLowerCase())
                      }
                    >
                      {(handleClick, open) => (
                        <React.Fragment>
                          <NavLink
                            to="#"
                            className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-30 ease-in-out hover:bg-secondary hover:text-secondary-foreground  dark:hover:bg-meta-4 text-muted-foreground ${
                              (pathname === menu.path ||
                                pathname.includes(menu.name.toLowerCase())) &&
                              " dark:bg-meta-4 bg-secondary text-secondary-foreground "
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              if (sidebarExpanded) handleClick();
                              else setSidebarExpanded(true);
                            }}
                          >
                            {menu.icon && <menu.icon className="mr-2" />}{" "}
                            {menu.name}
                            <OpenCloseMenuIcon isOpen={open} />
                          </NavLink>
                          {/* <!-- Dropdown Menu Start --> */}
                          <div
                            className={`translate transform overflow-hidden ${
                              !open && "hidden"
                            }`}
                          >
                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                              {menu.child &&
                                menu.child.map((child: Menu) => (
                                  <li key={child.name}>
                                    <NavLink
                                      // to={`${menu.path}${child.path}`}
                                      to={`${menu.path.replace(
                                        /\/$/,
                                        ""
                                      )}/${child.path.replace(/^\//, "")}`}
                                      className={({ isActive }) =>
                                        "group relative flex items-center gap-2.5 rounded-md font-medium text-muted-foreground  duration-300 ease-in-out  hover:bg-secondary hover:text-secondary-foreground p-2 hover:p-2" +
                                        (isActive &&
                                          " bg-primary text-primary-foreground hover:bg-primary/85 hover:text-primary-foreground/85")
                                      }
                                    >
                                      {child.icon && (
                                        <child.icon className="mr-2" />
                                      )}{" "}
                                      {child.name}
                                    </NavLink>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </React.Fragment>
                      )}
                    </SidebarLinkGroup>
                  );
                } else {
                  return (
                    <li key={menu.name}>
                      <NavLink
                        to={menu.path}
                        className={({ isActive }) =>
                          "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-muted-foreground duration-300 ease-in-out hover:bg-secondary hover:text-secondary-foreground dark:hover:bg-meta-4 " +
                          (isActive &&
                            "bg-primary dark:bg-meta-4 text-primary-foreground hover:bg-primary/85 hover:text-primary-foreground/85")
                        }
                      >
                        {menu.icon && <menu.icon className="mr-2" />}
                        {menu.name}
                      </NavLink>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
