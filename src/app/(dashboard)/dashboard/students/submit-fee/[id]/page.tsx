
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
import { students } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import type { Student } from "@/lib/data";

function DetailItem({ label, value }: { label: string; value: string | undefined | null }) {
    return (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-base font-semibold">{value || "N/A"}</span>
      </div>
    );
  }

export default function SubmitFeePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const studentId = parseInt(params.id as string, 10);
  const [student, setStudent] = useState<Student | undefined>(undefined);
  const [feeAmount, setFeeAmount] = useState<number | string>("");

  useEffect(() => {
    const foundStudent = students.find(s => s.id === studentId);
    if (foundStudent) {
        setStudent(foundStudent);
    } else {
        toast({ variant: "destructive", title: "Student not found" });
        router.push('/dashboard/students');
    }
  }, [studentId, router, toast]);

  const totalPaid = student?.feeHistory.reduce((acc, curr) => acc + curr.amount, 0) || 0;
  const remainingDue = (student?.courseFee || 0) - totalPaid;

  const handleSubmitFee = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = typeof feeAmount === 'string' ? parseFloat(feeAmount) : feeAmount;

    if (!amount || amount <= 0) {
        toast({ variant: "destructive", title: "Invalid amount", description: "Please enter a valid fee amount." });
        return;
    }

    if (amount > remainingDue) {
        toast({ variant: "destructive", title: "Amount exceeds due", description: `You can only pay up to the remaining amount of ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(remainingDue)}.` });
        return;
    }
    
    const studentIndex = students.findIndex(s => s.id === studentId);
    if (studentIndex > -1) {
        students[studentIndex].feeHistory.push({ amount, date: new Date() });
        toast({
            title: "Fee Submitted Successfully!",
            description: `${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)} has been submitted for ${student?.studentName}.`,
        });
        router.push("/dashboard/students");
    } else {
         toast({ variant: "destructive", title: "Failed to submit fee." });
    }
  };

  if (!student) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
        <PageHeader title={`Submit Fee`} description={`Process a fee payment for ${student.studentName}.`} />
        <div className="flex justify-center">
            <Card className="w-full max-w-2xl">
                <form onSubmit={handleSubmitFee}>
                    <CardHeader>
                        <CardTitle>Fee Payment</CardTitle>
                        <CardDescription>
                            Enter the amount to be paid.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-lg border bg-muted/50">
                            <DetailItem label="Student ID" value={student.studentId} />
                            <DetailItem label="Student Name" value={student.studentName} />
                            <DetailItem label="Course" value={`${student.course} (${student.session})`} />
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-lg border">
                            <DetailItem label="Total Course Fee" value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(student.courseFee)} />
                             <DetailItem label="Total Paid" value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalPaid)} />
                            <DetailItem label="Remaining Due" value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(remainingDue)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="feeAmount">Amount to Submit (in Rupees)</Label>
                            <Input id="feeAmount" type="number" value={feeAmount} onChange={(e) => setFeeAmount(e.target.value)} required placeholder="e.g. 5000" max={remainingDue} />
                        </div>
                        <Button className="w-full mt-4" type="submit" disabled={remainingDue <= 0}>
                           {remainingDue <= 0 ? 'All Dues Cleared' : 'Save Payment'}
                        </Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    </div>
  );
}
