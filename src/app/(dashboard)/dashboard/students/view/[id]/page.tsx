
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

function formatCurrency(amount: number) {
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
    return `Rs. ${formattedAmount}`;
}

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
  const { toast } = useToast();
  const { user: loggedInUser } = useUser();
  const [student, setStudent] = useState<Student | undefined>(undefined);
  const [user, setUser] = useState<{username: string, password: string} | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
        toast({ variant: "destructive", title: "Passwords do not match." });
        return;
    }

    const userIndex = users.findIndex(u => u.username === user?.username);
    if (userIndex > -1) {
        if (users[userIndex].password !== currentPassword) {
            toast({ variant: "destructive", title: "Incorrect current password." });
            return;
        }
        users[userIndex].password = newPassword;
        toast({ title: "Password updated successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        // Refresh user details to show updated password (for demo)
         const foundUser = users.find(u => u.username === student?.studentId);
         if(foundUser) {
           setUser({username: foundUser.username, password: foundUser.password});
         }
    } else {
        toast({ variant: "destructive", title: "User not found." });
    }
  };

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

  const totalPaid = student.feeHistory.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingDue = student.courseFee - totalPaid;
  const isViewingOwnProfile = loggedInUser?.role === 'Student' && loggedInUser.username === student.studentId;

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
                    <DetailItem label="Course Fee" value={formatCurrency(student.courseFee)} />
                </div>
            </div>
            <Separator />
            <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Fee Ledger</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <DetailItem label="Total Course Fee" value={formatCurrency(student.courseFee)} />
                    <DetailItem label="Total Submitted" value={formatCurrency(totalPaid)} />
                    <div>
                        <span className="text-sm font-medium text-muted-foreground">Remaining Due</span>
                        <Badge variant={remainingDue > 0 ? 'destructive' : 'default'} className="text-base font-semibold ml-2">
                           {formatCurrency(remainingDue)}
                        </Badge>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Amount Submitted</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {student.feeHistory.length > 0 ? student.feeHistory.map((payment, index) => (
                            <TableRow key={index}>
                                <TableCell>{format(payment.date, "PPP")}</TableCell>
                                <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center">No payments made yet.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {isViewingOwnProfile && (
              <>
                <Separator />
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-primary">Change Password</h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4 max-w-sm">
                        <div className="grid gap-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                        </div>
                        <Button type="submit">Update Password</Button>
                    </form>
                </div>
              </>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
