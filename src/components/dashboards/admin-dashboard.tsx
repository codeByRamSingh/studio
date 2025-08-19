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
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Dashboard"
        description="System overview and management tools."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Add new users and manage existing user roles and permissions.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow" />
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/users">
                <PlusCircle className="mr-2" />
                Manage Users
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Analytics</CardTitle>
            <CardDescription>
              View real-time analytics and system health.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for analytics */}
            <p>Analytics content goes here.</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Global Notices</CardTitle>
            <CardDescription>
              Create and publish announcements for all users.
            </CardDescription>
          </CardHeader>
          <CardContent>
             {/* Placeholder for notices */}
             <p>Notice creation form goes here.</p>
          </CardContent>
           <CardFooter>
            <Button className="w-full">
              Create Notice
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
