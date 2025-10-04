export type SubPage = {
  name: string; // unique id
  label: string; // text to show
  to: string; // vue-router path
  icon?: string;
};
export type MenuItem = {
  name: string; // unique id
  label: string; // main item text
  to?: string; // optional direct route
  icon?: string; // tailwind/emoji/class or inline svg name
  subPage?: SubPage[]; // optional submenu
};
