"use client";

import { useUser } from "@/hooks/use-user";
import { AdminDashboard } from "@/components/dashboards/admin-dashboard";
import { TrustDashboard } from "@/components/dashboards/trust-dashboard";
import { StaffDashboard } from "@/components/dashboards/staff-dashboard";
import { StudentDashboard } from "@/components/dashboards/student-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user } = useUser();

  if (!user) {
    // Or a loading spinner
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-6 w-2/3" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-48 rounded-lg" />
          <Skeleton className="h-48 rounded-lg" />
          <Skeleton className="h-48 rounded-lg" />
        </div>
      </div>
    );
  }

  switch (user.role) {
    case "Admin":
      return <AdminDashboard />;
    case "Trust":
      return <TrustDashboard />;
    case "Staff":
      return <StaffDashboard />;
    case "Student":
      return <StudentDashboard />;
    default:
      return <div>Invalid user role.</div>;
  }
}
