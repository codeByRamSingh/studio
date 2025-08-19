"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  Share2,
  Calendar,
  FileText,
  UserPlus,
  BookOpen,
} from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";

const baseLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
  },
  {
    href: "/study-groups",
    label: "Study Groups",
    icon: Users,
    roles: ["Student", "Staff", "Admin"],
  },
  {
    href: "/resources",
    label: "Resources",
    icon: Share2,
    roles: ["Student", "Staff", "Admin"],
  },
   {
    href: "/events",
    label: "Events",
    icon: Calendar,
    roles: ["Student", "Staff", "Admin"],
  },
  {
    href: "/notices",
    label: "Notices",
    icon: FileText,
    roles: ["Student", "Staff", "Admin", "Trust"],
  },
  {
    href: "/courses",
    label: "Courses",
    icon: BookOpen,
    roles: ["Student", "Staff", "Admin", "Trust"],
  },
];

const adminLinks = [
    {
        href: "/users",
        label: "Users",
        icon: UserPlus,
        roles: ["Admin"]
    }
]

const allLinks = [...baseLinks, ...adminLinks];

const NavLink = ({ href, icon: Icon, label, pathname }: { href: string, icon: React.ElementType, label: string, pathname: string }) => (
    <Link href={href} className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        pathname === href && "bg-muted text-primary"
    )}>
        <Icon className="h-4 w-4" />
        {label}
    </Link>
);


export function MainNav() {
  const pathname = usePathname();
  const { user } = useUser();

  const filteredLinks = allLinks.filter(link => 
    !link.roles || (user && link.roles.includes(user.role))
  );

  if (!user) {
    return null;
  }

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {filteredLinks.map((link) => (
        <NavLink 
            key={link.href}
            href={link.href} 
            icon={link.icon} 
            label={link.label}
            pathname={pathname}
        />
      ))}
    </nav>
  );
}
