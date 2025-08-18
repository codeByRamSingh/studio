"use client";

import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  CalendarDays,
  Megaphone,
  Users,
  BookOpen,
} from "lucide-react";

const links = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/events",
    label: "Events",
    icon: CalendarDays,
  },
  {
    href: "/notices",
    label: "Notices",
    icon: Megaphone,
  },
  {
    href: "/study-groups",
    label: "Study Groups",
    icon: Users,
  },
  {
    href: "/resources",
    label: "Resources",
    icon: BookOpen,
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
            isActive={pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))}
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
