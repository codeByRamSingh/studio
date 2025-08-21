
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import { courses } from '@/lib/data';
import { MoreHorizontal, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";

export default function ManageSessionsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const courseId = parseInt(params.id as string, 10);
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    // Or handle this case more gracefully
    router.push('/dashboard/courses');
    return null;
  }
  
  const handleDeleteSession = (sessionId: number) => {
    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex > -1) {
        const sessionIndex = courses[courseIndex].sessions.findIndex(s => s.id === sessionId);
        if (sessionIndex > -1) {
            courses[courseIndex].sessions.splice(sessionIndex, 1);
            toast({
                title: "Session Deleted",
                description: "The session has been successfully deleted.",
            });
            router.refresh();
        } else {
             toast({
                variant: "destructive",
                title: "Error",
                description: "Session not found.",
            });
        }
    } else {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Course not found.",
        });
    }
  };


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
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {course.sessions.map((session) => (
                            <TableRow key={session.id}>
                                <TableCell className="font-medium">{session.name}</TableCell>
                                <TableCell>{format(session.startDate, 'PPP')}</TableCell>
                                <TableCell>{format(session.endDate, 'PPP')}</TableCell>
                                <TableCell className="text-right">
                                    <AlertDialog>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem className="text-destructive">
                                                        <Trash2 className="mr-2 size-4" />
                                                        Delete Session
                                                    </DropdownMenuItem>
                                                </AlertDialogTrigger>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the session from the course.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeleteSession(session.id)}>
                                                    Continue
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
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
