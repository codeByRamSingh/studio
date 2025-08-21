
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { courses } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Textarea } from "@/components/ui/textarea";

export default function AddCoursePage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [subjects, setSubjects] = useState("");
  const [numberOfSessions, setNumberOfSessions] = useState("");

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!courseName || !courseCode || !subjects || !numberOfSessions) {
        toast({
            variant: "destructive",
            title: "Failed to Add Course",
            description: "Please fill in all fields.",
        });
        return;
    }

    const newCourse = {
        id: courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1,
        courseName,
        courseCode,
        subjects: subjects.split(",").map(s => s.trim()),
        numberOfSessions: parseInt(numberOfSessions),
    };

    courses.push(newCourse);

    toast({
        title: "Course Added Successfully",
        description: `Course "${courseName}" has been created.`,
    });

    router.push("/dashboard/courses");
  };

  return (
    <div className="space-y-8">
        <PageHeader title="Add New Course" description="Create a new course and add its details." />
        <div className="flex justify-center">
            <Card className="w-full max-w-2xl">
                <form onSubmit={handleAddCourse}>
                    <CardHeader>
                        <CardTitle>Create a new course</CardTitle>
                        <CardDescription>
                            Enter the details below to create a new course.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="courseName">Course Name</Label>
                                <Input id="courseName" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="courseCode">Course Code</Label>
                                <Input id="courseCode" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="subjects">Subjects (comma-separated)</Label>
                            <Textarea id="subjects" value={subjects} onChange={(e) => setSubjects(e.target.value)} required placeholder="e.g. Basic Electrical Engineering, Wiring Practices" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="numberOfSessions">Number of Sessions</Label>
                            <Input id="numberOfSessions" type="number" value={numberOfSessions} onChange={(e) => setNumberOfSessions(e.target.value)} required />
                        </div>

                        <Button className="w-full mt-4" type="submit">
                            Create Course
                        </Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    </div>
  );
}
