
"use client";

import { useParams } from 'next/navigation';
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { courses } from '@/lib/data';

export default function ManageSessionsPage() {
  const params = useParams();
  const courseId = parseInt(params.id as string, 10);
  const course = courses.find(c => c.id === courseId);

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Manage Sessions for ${course?.courseName || 'Course'}`}
        description="Here you can add, remove, and update sessions for this course."
      />
      <Card>
        <CardHeader>
          <CardTitle>Session Management</CardTitle>
          <CardDescription>
            This feature is coming soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>The interface for managing course sessions will be available here in a future update.</p>
        </CardContent>
      </Card>
    </div>
  );
}
