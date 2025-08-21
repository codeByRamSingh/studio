import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GraduationCap,
  Users,
  Receipt,
  Megaphone,
  FileText,
  DollarSign,
  Archive,
  BookOpen,
  FlaskConical,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const adminActions = [
    {
      title: "Student Management",
      description: "Manage student admissions, profiles, and records.",
      icon: GraduationCap,
      href: "/users/select-role?role=Student",
    },
    {
      title: "Staff Management",
      description: "Manage staff accounts, roles, and information.",
      icon: Users,
      href: "/users/select-role?role=Staff",
    },
      
  
    {
      title: "Issue Notice",
      description: "Create and publish announcements for all users.",
      icon: Megaphone,
      href: "/notices",
    },
    {
      title: "Launch Exam",
      description: "Schedule and manage examinations for courses.",
      icon: FileText,
      href: "#",
    },
    {
      title: "Manage Expense",
      description: "Track and manage institutional expenses.",
      icon: DollarSign,
      href: "#",
    },
    {
      title: "Manage Assets",
      description: "Keep track of all physical assets of the institute.",
      icon: Archive,
      href: "#",
    },
    {
      title: "Manage Library",
      description: "Manage book inventory and library memberships.",
      icon: BookOpen,
      href: "#",
    },
    {
      title: "Manage Lab",
      description: "Oversee laboratory equipment and resources.",
      icon: FlaskConical,
      href: "#",
    },
  ];

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Dashboard"
        description="System overview and management tools."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {adminActions.map((action) => (
            <Card key={action.title} className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-medium">
                            {action.title}
                        </CardTitle>
                        <action.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardDescription className="text-xs">{action.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                    <Button asChild className="w-full" size="sm">
                    <Link href={action.href}>
                        {action.title} <ArrowRight className="ml-2 size-4" />
                    </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
