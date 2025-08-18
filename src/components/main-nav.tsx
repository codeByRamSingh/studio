"use client";

import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Home,
  LayoutGrid,
  BookOpen,
  Users,
  FileText,
  Calendar,
  Share2
} from "lucide-react";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
  },
  {
    href: "/study-groups",
    label: "Study Groups",
    icon: Users,
  },
  {
    href: "/resources",
    label: "Resources",
    icon: Share2,
  },
   {
    href: "/events",
    label: "Events",
    icon: Calendar,
  },
  {
    href: "/notices",
    label: "Notices",
    icon: FileText,
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
