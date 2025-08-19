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
  UserPlus,
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
      title: "Register User",
      description: "Add or manage user accounts and roles.",
      icon: UserPlus,
      href: "/users/select-role",
    },
    {
      title: "Submit Fee",
      description: "Record and manage student fee payments.",
      icon: Receipt,
      href: "#",
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
      title: "Add Expense",
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {adminActions.map((action) => (
            <Card key={action.title} className="flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">
                        {action.title}
                    </CardTitle>
                    <action.icon className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                    <Link href={action.href}>
                        Go to {action.title} <ArrowRight className="ml-2 size-4" />
                    </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
