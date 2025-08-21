
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
  } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";
import { courses } from "@/lib/data";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Course Management"
          description="Manage all courses in the system."
        />
        <Button asChild>
          <Link href="#">
            <PlusCircle className="mr-2 size-4" />
            Add Course
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>
            A list of all available courses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead className="text-center">Sessions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.courseCode}</TableCell>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                        {course.subjects.map(subject => (
                            <Badge key={subject} variant="secondary" className="whitespace-nowrap">
                                {subject}
                            </Badge>
                        ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{course.numberOfSessions}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit Course</DropdownMenuItem>
                            <DropdownMenuItem>Manage Sessions</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
