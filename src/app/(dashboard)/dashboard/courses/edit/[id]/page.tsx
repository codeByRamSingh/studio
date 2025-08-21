
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { courses } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const courseId = parseInt(params.id as string, 10);
  const course = courses.find(c => c.id === courseId);

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [subjects, setSubjects] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (course) {
        setCourseName(course.courseName);
        setCourseCode(course.courseCode);
        setSubjects(course.subjects.join(", "));
        setIsLoading(false);
    } else {
        toast({
            variant: "destructive",
            title: "Course not found",
            description: "The requested course does not exist.",
        });
        router.push("/dashboard/courses");
    }
  }, [course, courseId, router, toast]);

  const handleUpdateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!courseName || !courseCode || !subjects) {
        toast({
            variant: "destructive",
            title: "Failed to Update Course",
            description: "Please fill in all fields.",
        });
        return;
    }

    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex > -1) {
        courses[courseIndex] = {
            ...courses[courseIndex],
            courseName,
            courseCode,
            subjects: subjects.split(",").map(s => s.trim()),
        };

        toast({
            title: "Course Updated Successfully",
            description: `Course "${courseName}" has been updated.`,
        });

        router.push("/dashboard/courses");
    }
  };
  
  if (isLoading) {
    return (
        <div className="space-y-8">
            <PageHeader title="Edit Course" description="Modify the details of an existing course." />
            <div className="flex justify-center">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full mt-4" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
  }

  return (
    <div className="space-y-8">
        <PageHeader title="Edit Course" description="Modify the details of an existing course." />
        <div className="flex justify-center">
            <Card className="w-full max-w-2xl">
                <form onSubmit={handleUpdateCourse}>
                    <CardHeader>
                        <CardTitle>Editing: {course?.courseName}</CardTitle>
                        <CardDescription>
                            Update the details for this course.
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
                            <Textarea id="subjects" value={subjects} onChange={(e) => setSubjects(e.target.value)} required />
                        </div>

                        <Button className="w-full mt-4" type="submit">
                            Update Course
                        </Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    </div>
  );
}
