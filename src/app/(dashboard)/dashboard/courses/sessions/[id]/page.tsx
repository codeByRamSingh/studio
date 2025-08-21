
"use client";

import { useParams, useRouter } from 'next/navigation';
import { PageHeader } from "@/components/page-header";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { courses } from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function ManageSessionsPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = parseInt(params.id as string, 10);
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    // Or handle this case more gracefully
    router.push('/dashboard/courses');
    return null;
  }

  return (
    <div className="space-y-8">
        <div className="flex items-center justify-between">
            <PageHeader
                title={`Manage Sessions for ${course?.courseName || 'Course'}`}
                description="Here you can add, remove, and update sessions for this course."
            />
            <Button asChild>
                <Link href={`/dashboard/courses/sessions/add/${courseId}`}>
                    <PlusCircle className="mr-2 size-4" />
                    Add Session
                </Link>
            </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Existing Sessions</CardTitle>
          <CardDescription>
            A list of all scheduled sessions for this course.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {course.sessions && course.sessions.length > 0 ? (
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Session Name</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {course.sessions.map((session) => (
                            <TableRow key={session.id}>
                                <TableCell className="font-medium">{session.name}</TableCell>
                                <TableCell>{format(session.startDate, 'PPP')}</TableCell>
                                <TableCell>{format(session.endDate, 'PPP')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>No sessions have been added for this course yet.</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
