
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, BookOpen, Image, Info, Home } from "lucide-react";
import { ArvindConnectLogo } from "./icons";
import { cn } from "@/lib/utils";

const mainNavLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/gallery", label: "Gallery", icon: Image },
  { href: "/about", label: "About Us", icon: Info },
];

export function PublicHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <Link href="/" className="flex items-center gap-2 font-bold">
        <ArvindConnectLogo className="h-6 w-6 text-primary" />
        <span className="text-lg">Arvind ITI</span>
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        {mainNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "transition-colors hover:text-primary",
              pathname === link.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="hidden items-center gap-2 md:flex">
        <Button variant="outline" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Register</Link>
        </Button>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 p-4">
            <Link href="/" className="flex items-center gap-2 font-bold">
               <ArvindConnectLogo className="h-6 w-6 text-primary" />
               <span>Arvind ITI</span>
            </Link>
            <div className="grid gap-2">
                {mainNavLinks.map((link) => (
                    <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "flex items-center gap-2 rounded-md p-2 text-base font-medium",
                        pathname === link.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                    >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                    </Link>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
                 <Button variant="outline" asChild>
                    <Link href="/login">Login</Link>
                 </Button>
                 <Button asChild>
                    <Link href="/register">Register</Link>
                 </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
