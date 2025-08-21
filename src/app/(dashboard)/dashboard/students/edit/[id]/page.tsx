
"use client";

import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { users, students } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Textarea } from "@/components/ui/textarea";
import type { Student } from "@/lib/data";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditStudentPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const studentId = parseInt(params.id as string, 10);
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Student specific state
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [caste, setCaste] = useState("");
  const [religion, setReligion] = useState("");
  const [gender, setGender] = useState("");
  const [physicallyDisabled, setPhysicallyDisabled] = useState("No");

  useEffect(() => {
    const student = students.find(s => s.id === studentId);
    if (student) {
        setStudentName(student.studentName);
        setFatherName(student.fatherName);
        setMotherName(student.motherName);
        setAddress(student.address);
        setEmail(student.email);
        setPhone(student.phone);
        setCaste(student.caste);
        setReligion(student.religion);
        setGender(student.gender);
        setPhysicallyDisabled(student.physicallyDisabled ? "Yes" : "No");
        setIsLoading(false);
    } else {
        toast({ variant: "destructive", title: "Student not found" });
        router.push("/dashboard/students");
    }
  }, [studentId, router, toast]);

  const handleUpdateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentName || !fatherName || !motherName || !address || !email || !phone || !caste || !religion || !gender || !physicallyDisabled) {
        toast({
            variant: "destructive",
            title: "Failed to Update Student",
            description: "Please fill in all student details.",
        });
        return;
    }

    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex > -1) {
        const originalStudent = students[studentIndex];
        
        students[studentIndex] = {
            ...originalStudent,
            studentName,
            fatherName,
            motherName,
            address,
            email,
            phone,
            caste,
            religion,
            gender,
            physicallyDisabled: physicallyDisabled === "Yes",
        };

        toast({
            title: "Student Details Updated",
            description: `Details for ${studentName} have been saved.`,
        });
        
        router.push(`/dashboard/students`);
    } else {
        toast({ variant: "destructive", title: "Student not found during update." });
    }
  };
  
  if (isLoading) {
    return (
        <div className="space-y-8">
            <PageHeader title="Edit Student" description="Loading student details..."/>
             <div className="flex justify-center">
                <Card className="w-full max-w-3xl">
                    <CardHeader>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                           <Skeleton className="h-10 w-full" />
                           <Skeleton className="h-10 w-full" />
                           <Skeleton className="h-10 w-full" />
                           <Skeleton className="h-10 w-full" />
                        </div>
                         <Skeleton className="h-20 w-full" />
                         <Skeleton className="h-10 w-full mt-4" />
                    </CardContent>
                </Card>
             </div>
        </div>
    )
  }

  return (
    <div className="space-y-8">
        <PageHeader title="Edit Student Information" description={`You are editing the profile for ${studentName}.`} />
        <div className="flex justify-center">
            <Card className="w-full max-w-3xl">
                <form onSubmit={handleUpdateStudent}>
                    <CardHeader>
                        <CardTitle className="text-2xl">Update Personal Details</CardTitle>
                        <CardDescription>
                           Modify the information below. Course and session details are managed separately.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="studentName">Student Name</Label>
                                <Input id="studentName" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="fatherName">Father's Name</Label>
                                <Input id="fatherName" value={fatherName} onChange={(e) => setFatherName(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="motherName">Mother's Name</Label>
                                <Input id="motherName" value={motherName} onChange={(e) => setMotherName(e.target.value)} required />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="phone">Mobile Number</Label>
                                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email ID</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="caste">Caste</Label>
                                <Input id="caste" value={caste} onChange={(e) => setCaste(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Gender</Label>
                                <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Male" id="male" />
                                        <Label htmlFor="male">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Female" id="female" />
                                        <Label htmlFor="female">Female</Label>
                                    </div>
                                     <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Other" id="other" />
                                        <Label htmlFor="other">Other</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="grid gap-2">
                                <Label>Physically Disabled</Label>
                                <RadioGroup value={physicallyDisabled} onValueChange={setPhysicallyDisabled} className="flex gap-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Yes" id="pd-yes" />
                                        <Label htmlFor="pd-yes">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="No" id="pd-no" />
                                        <Label htmlFor="pd-no">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="grid gap-2">
                                 <Label htmlFor="religion">Religion</Label>
                                <Select value={religion} onValueChange={setReligion} required>
                                    <SelectTrigger><SelectValue placeholder="Select Religion" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Hindu">Hindu</SelectItem>
                                        <SelectItem value="Muslim">Muslim</SelectItem>
                                        <SelectItem value="Christian">Christian</SelectItem>
                                        <SelectItem value="Sikh">Sikh</SelectItem>
                                        <SelectItem value="Buddhist">Buddhist</SelectItem>
                                        <SelectItem value="Jain">Jain</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </div>

                        <Button className="w-full mt-4" type="submit">
                            Save Changes
                        </Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    </div>
  );
}

