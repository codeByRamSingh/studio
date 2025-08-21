
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { students, users } from "@/lib/data";
import type { Student } from "@/lib/data";
import { Separator } from "@/components/ui/separator";

function DetailItem({ label, value }: { label: string; value: string | undefined | null }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-base font-semibold">{value || "N/A"}</span>
    </div>
  );
}

export default function ViewStudentPage() {
  const params = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<Student | undefined>(undefined);
  const [user, setUser] = useState<{username: string, password: string} | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  
  const studentId = parseInt(params.id as string, 10);

  useEffect(() => {
    const foundStudent = students.find((s) => s.id === studentId);
    if (foundStudent) {
      setStudent(foundStudent);
      const foundUser = users.find(u => u.username === foundStudent.studentId);
      if(foundUser) {
        setUser({username: foundUser.username, password: foundUser.password});
      }
    } else {
      router.push("/dashboard/students");
    }
    setIsLoading(false);
  }, [studentId, router]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <PageHeader title="Student Details" description="Viewing a student's profile." />
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!student) {
    return <div>Student not found.</div>;
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Student Details" description={`Viewing profile for ${student.studentName}`} />
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>{student.studentName}</CardTitle>
          <CardDescription>Student ID: {student.studentId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Login Credentials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DetailItem label="Username / Student ID" value={user?.username} />
                    <DetailItem label="Password" value={user?.password} />
                </div>
            </div>
            <Separator />
            <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DetailItem label="Father's Name" value={student.fatherName} />
                    <DetailItem label="Mother's Name" value={student.motherName} />
                    <DetailItem label="Gender" value={student.gender} />
                    <DetailItem label="Caste" value={student.caste} />
                    <DetailItem label="Religion" value={student.religion} />
                    <DetailItem label="Physically Disabled" value={student.physicallyDisabled ? 'Yes' : 'No'} />
                </div>
                <div className="mt-4">
                     <DetailItem label="Address" value={student.address} />
                </div>
            </div>
            <Separator />
             <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DetailItem label="Email ID" value={student.email} />
                    <DetailItem label="Mobile Number" value={student.phone} />
                </div>
            </div>
            <Separator />
             <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DetailItem label="Course" value={student.course} />
                    <DetailItem label="Session" value={student.session} />
                    <DetailItem label="Course Fee" value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(student.courseFee)} />
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
