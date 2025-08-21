
"use client";

import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notices } from "@/lib/data";
import { ArrowRight, Megaphone } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "../ui/button";

export function StaffDashboard() {
  const staffNotices = notices.filter(notice => notice.audience.includes("Staff"));

  return (
    <div className="space-y-8">
      <PageHeader
        title="Staff Dashboard"
        description="Tools for managing daily operations."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Student Attendance</CardTitle>
            <CardDescription>
              Manage and track student attendance for your classes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Attendance tracking interface will be here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Course Management</CardTitle>
             <CardDescription>
              Update course materials, schedules, and assignments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Course management tools will be here.</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>View Timetable</CardTitle>
             <CardDescription>
              Access your personal teaching schedule.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Timetable will be displayed here.</p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="size-5 text-primary" />
              Recent Notices for Staff
            </CardTitle>
            <CardDescription>
              Stay updated with the latest announcements relevant to you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {staffNotices.slice(0, 4).map((notice) => (
                <div key={notice.id}>
                  <h3 className="font-semibold">{notice.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    Posted on {format(notice.date, "PPP")}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
           <CardFooter>
            <Button asChild variant="link" className="p-0">
              <Link href="/notices">
                View all notices <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
