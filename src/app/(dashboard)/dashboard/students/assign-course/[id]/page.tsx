
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
import { Input } from "@/components/ui/input";

export default function AssignCoursePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const studentId = parseInt(params.id as string, 10);
  const [student, setStudent] = useState<Student | undefined>(undefined);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [courseFee, setCourseFee] = useState<number | string>("");
  const [availableSessions, setAvailableSessions] = useState<{ id: number; name: string; }[]>([]);

  useEffect(() => {
    const foundStudent = students.find(s => s.id === studentId);
    if (foundStudent) {
        setStudent(foundStudent);
        setSelectedCourse(foundStudent.course || "");
        setSelectedSession(foundStudent.session || "");
        setCourseFee(foundStudent.courseFee || "");
    } else {
        toast({ variant: "destructive", title: "Student not found" });
        router.push('/dashboard/students');
    }
  }, [studentId, router, toast]);

  useEffect(() => {
    if (selectedCourse) {
        const course = courses.find(c => c.courseName === selectedCourse);
        if (course) {
            setAvailableSessions(course.sessions);
        } else {
            setAvailableSessions([]);
        }
        setSelectedSession(""); // Reset session when course changes
    } else {
        setAvailableSessions([]);
    }
  }, [selectedCourse]);


  const handleAssignCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !selectedSession || !courseFee) {
        toast({ variant: "destructive", title: "Please fill all fields." });
        return;
    }
    
    const studentIndex = students.findIndex(s => s.id === studentId);
    if (studentIndex > -1) {
        students[studentIndex].course = selectedCourse;
        students[studentIndex].session = selectedSession;
        students[studentIndex].courseFee = typeof courseFee === 'string' ? parseFloat(courseFee) : courseFee;
        toast({
            title: "Course Assigned!",
            description: `${student?.studentName} has been enrolled in ${selectedCourse} (${selectedSession}).`,
        });
        router.push("/dashboard/students");
    } else {
         toast({ variant: "destructive", title: "Failed to assign course." });
    }
  };

  return (
    <div className="space-y-8">
        <PageHeader title={`Assign Course - Step 2`} description={`Select a course and session for ${student?.studentName || 'the student'}.`} />
        <div className="flex justify-center">
            <Card className="w-full max-w-2xl">
                <form onSubmit={handleAssignCourse}>
                    <CardHeader>
                        <CardTitle>Select a Course and Session</CardTitle>
                        <CardDescription>
                            Choose the course and session the student will be enrolled in.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                            <div className="grid gap-2">
                                <Label htmlFor="session">Session</Label>
                                <Select value={selectedSession} onValueChange={setSelectedSession} required disabled={!selectedCourse}>
                                    <SelectTrigger><SelectValue placeholder="Select Session" /></SelectTrigger>
                                    <SelectContent>
                                        {availableSessions.map(session => (
                                            <SelectItem key={session.id} value={session.name}>{session.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="courseFee">Course Fee (in Rupees)</Label>
                            <Input id="courseFee" type="number" value={courseFee} onChange={(e) => setCourseFee(e.target.value)} required placeholder="e.g. 15000" />
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
