export type Menu = {
  name: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path: string;
  permissions?: string[];
  child?: Menu[];
};
