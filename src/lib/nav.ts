export type NavItem = {
  key: "listings" | "neighborhoods" | "story" | "contact";
  href: string;
};

export const PRIMARY_NAV: ReadonlyArray<NavItem> = [
  { key: "listings", href: "/listings" },
  { key: "neighborhoods", href: "/neighborhoods" },
  { key: "story", href: "/story" },
  { key: "contact", href: "/contact" },
];
