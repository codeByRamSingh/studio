
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
import { staff, users } from "@/lib/data";
import type { Staff } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function formatCurrency(amount: number) {
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
    return `Rs. ${formattedAmount.replace('₹', '').trim()}`;
}

function DetailItem({ label, value }: { label: string; value: string | undefined | null }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-base font-semibold">{value || "N/A"}</span>
    </div>
  );
}

export default function ViewStaffPage() {
  const params = useParams();
  const router = useRouter();
  const [staffMember, setStaffMember] = useState<Staff | undefined>(undefined);
  const [user, setUser] = useState<{username: string, password: string} | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const staffId = parseInt(params.id as string, 10);

  useEffect(() => {
    const foundStaff = staff.find((s) => s.id === staffId);
    if (foundStaff) {
      setStaffMember(foundStaff);
      const foundUser = users.find(u => u.username === foundStaff.staffId);
      if(foundUser) {
        setUser({username: foundUser.username, password: foundUser.password});
      }
    } else {
      router.push("/dashboard/staff");
    }
    setIsLoading(false);
  }, [staffId, router]);
  

  if (isLoading) {
    return (
      <div className="space-y-8">
        <PageHeader title="Staff Details" description="Viewing a staff member's profile." />
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
  
  if (!staffMember) {
    return <div>Staff member not found.</div>;
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Staff Details" description={`Viewing profile for ${staffMember.staffName}`} />
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>{staffMember.staffName}</CardTitle>
          <CardDescription>Staff ID: {staffMember.staffId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Login Credentials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DetailItem label="Username / Staff ID" value={user?.username} />
                    <DetailItem label="Password" value={user?.password} />
                </div>
            </div>
            <Separator />
            <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Personal & Contact Information</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailItem label="Email ID" value={staffMember.email} />
                    <DetailItem label="Mobile Number" value={staffMember.phone} />
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                     <DetailItem label="Permanent Address" value={staffMember.permanentAddress} />
                     <DetailItem label="Current Address" value={staffMember.currentAddress} />
                </div>
            </div>
            <Separator />
             <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Job Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DetailItem label="Designation" value={staffMember.designation} />
                    <DetailItem label="Date Joined" value={format(staffMember.dateJoined, "PPP")} />
                    <DetailItem label="Salary" value={formatCurrency(staffMember.salary)} />
                </div>
            </div>
            <Separator />
            <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Uploaded Documents</h3>
                 {staffMember.documents && staffMember.documents.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Document Name</TableHead>
                                <TableHead>File Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {staffMember.documents.map((doc, index) => (
                                <TableRow key={index}>
                                    <TableCell>{doc.name}</TableCell>
                                    <TableCell>{doc.file.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-sm text-muted-foreground">No documents have been uploaded for this staff member.</p>
                )}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
