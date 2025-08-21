
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
      href: "/dashboard/students",
    },
    {
      title: "Staff Management",
      description: "Manage staff accounts, roles, and information.",
      icon: Users,
      href: "/dashboard/staff",
    },
    {
        title: "Course Management",
        description: "Manage courses, subjects, and curriculum.",
        icon: BookOpen,
        href: "/dashboard/courses",
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
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        {adminActions.map((action) => (
            <Card key={action.title} className="flex flex-col justify-between text-sm">
                <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-medium">
                            {action.title}
                        </CardTitle>
                        <action.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent className="flex-grow p-4 pt-0">
                    <CardDescription className="text-xs">{action.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
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
