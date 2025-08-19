import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TrustDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Trust Dashboard"
        description="High-level reports and analytics for the governing trust."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Financial Reports</CardTitle>
            <CardDescription>
              View key financial statements and summaries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Financial charts and data will be displayed here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Institute Analytics</CardTitle>
            <CardDescription>
              Key performance indicators for the institute.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>High-level institute KPIs will be shown here.</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
            <CardDescription>
              Monitor regulatory and compliance status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Compliance checklists and reports will be here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
