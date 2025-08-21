
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { students, courses } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import type { Student } from "@/lib/data";

export default function AssignCoursePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const studentId = parseInt(params.id as string, 10);
  const [student, setStudent] = useState<Student | undefined>(undefined);
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    const foundStudent = students.find(s => s.id === studentId);
    if (foundStudent) {
        setStudent(foundStudent);
        setSelectedCourse(foundStudent.course || "");
    } else {
        toast({ variant: "destructive", title: "Student not found" });
        router.push('/dashboard/students');
    }
  }, [studentId, router, toast]);

  const handleAssignCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) {
        toast({ variant: "destructive", title: "Please select a course." });
        return;
    }
    
    const studentIndex = students.findIndex(s => s.id === studentId);
    if (studentIndex > -1) {
        students[studentIndex].course = selectedCourse;
        toast({
            title: "Course Assigned!",
            description: `${student?.studentName} has been enrolled in ${selectedCourse}.`,
        });
        router.push("/dashboard/students");
    } else {
         toast({ variant: "destructive", title: "Failed to assign course." });
    }
  };

  return (
    <div className="space-y-8">
        <PageHeader title={`Assign Course - Step 2`} description={`Select a course for ${student?.studentName || 'the student'}.`} />
        <div className="flex justify-center">
            <Card className="w-full max-w-2xl">
                <form onSubmit={handleAssignCourse}>
                    <CardHeader>
                        <CardTitle>Select a Course</CardTitle>
                        <CardDescription>
                            Choose the course the student will be enrolled in.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="course">Course</Label>
                             <Select value={selectedCourse} onValueChange={setSelectedCourse} required>
                                <SelectTrigger><SelectValue placeholder="Select Course" /></SelectTrigger>
                                <SelectContent>
                                    {courses.map(course => (
                                        <SelectItem key={course.id} value={course.courseName}>{course.courseName}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="w-full mt-4" type="submit">
                           Finish Admission
                        </Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    </div>
  );
}
