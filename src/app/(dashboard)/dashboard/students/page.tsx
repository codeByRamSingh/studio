
"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  } from "@/components/ui/alert-dialog"
import { students } from "@/lib/data";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function StudentManagementPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = (studentId: number) => {
    const index = students.findIndex(s => s.id === studentId);
    if (index > -1) {
        students.splice(index, 1);
        toast({
            title: "Student Deleted",
            description: "The student has been successfully deleted.",
        })
        router.refresh();
    } else {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to delete the student.",
        })
    }
  };


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Student Management"
          description="Manage all students in the system."
        />
        <Button asChild>
          <Link href="/users/add?role=Student">
            <PlusCircle className="mr-2 size-4" />
            Admission
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>A list of all enrolled students.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Course Fee</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    {student.studentId}
                  </TableCell>
                  <TableCell>{student.studentName}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.session}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(student.courseFee)}
                  </TableCell>
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
                          <DropdownMenuItem asChild>
                            <Link href={`#`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`#`}>Edit Student</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`#`}>Submit Fee</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                           <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="text-destructive">
                                    Delete Student
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                       <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            student from the system.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(student.id)}>
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
        </CardContent>
      </Card>
    </div>
  );
}
