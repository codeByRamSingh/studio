"use client";

import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Home,
  Book,
  Image,
  Info
} from "lucide-react";

const links = [
  {
    href: "/dashboard",
    label: "Home",
    icon: Home,
  },
  {
    href: "/courses",
    label: "Courses",
    icon: Book,
  },
  {
    href: "/gallery",
    label: "Gallery",
    icon: Image,
  },
  {
    href: "/about",
    label: "About US",
    icon: Info,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            // A simple way to check for active link.
            // For the dashboard, we want an exact match. For others, we check if the path starts with the href.
            isActive={pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href))}
          >
            <a href={link.href}>
              <link.icon />
              <span>{link.label}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
