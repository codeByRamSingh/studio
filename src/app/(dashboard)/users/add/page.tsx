
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function AddUserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  // Generic user state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // Student specific state
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [caste, setCaste] = useState("");
  const [religion, setReligion] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [fee, setFee] = useState("");

  useEffect(() => {
    const roleFromQuery = searchParams.get('role');
    if (roleFromQuery) {
      setRole(roleFromQuery);
    }
  }, [searchParams]);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (role === 'Student') {
        if (!studentName || !fatherName || !motherName || !address || !email || !phone || !caste || !religion || !dob || !gender || !fee) {
            toast({
                variant: "destructive",
                title: "Failed to Add Student",
                description: "Please fill in all student details.",
            });
            return;
        }

        // Generate student ID and password
        const studentId = `STU${students.length + 1}`;
        const generatedPassword = `${studentName.split(' ')[0].toLowerCase()}123`;

        const newStudent: Student = {
            id: students.length + 1,
            studentId,
            studentName,
            fatherName,
            motherName,
            address,
            email,
            phone,
            caste,
            religion,
            dob,
            gender,
            course: '', // Course will be assigned in the next step
            fee: parseFloat(fee),
        };
        students.push(newStudent);

        const newUser = { id: users.length + 1, username: studentId, password: generatedPassword, role: "Student" };
        users.push(newUser);

        toast({
            title: "Student Details Saved",
            description: `Proceed to assign a course to ${studentName}.`,
        });
        
        router.push(`/dashboard/students/assign-course/${newStudent.id}`);

    } else {
        if (!username || !password || !role) {
            toast({
                variant: "destructive",
                title: "Failed to Add User",
                description: "Please fill in all fields.",
            });
            return;
        }
        const newUser = { id: users.length + 1, username, password, role };
        users.push(newUser);
        toast({
            title: "User Added Successfully",
            description: `User "${username}" has been created.`,
        });
        router.push("/users");
    }
  };

  const renderStudentForm = () => (
    <>
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
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender} required>
                    <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
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
                <Label htmlFor="religion">Religion</Label>
                <Input id="religion" value={religion} onChange={(e) => setReligion(e.target.value)} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="fee">Fee</Label>
                <Input id="fee" type="number" value={fee} onChange={(e) => setFee(e.target.value)} required />
            </div>
        </div>
        <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
            A unique Student ID and password will be automatically generated.
        </div>
    </>
  );
    
  const renderGenericUserForm = () => (
    <>
        <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" placeholder="e.g. john.doe" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
    </>
  );

  return (
    <div className="space-y-8">
        <PageHeader title="Add New User - Step 1: Bio" description="Create a new user account and assign a role." />
        <div className="flex justify-center">
            <Card className="w-full max-w-3xl">
                <form onSubmit={handleAddUser}>
                    <CardHeader>
                        <CardTitle className="text-2xl">Create an account for {role || '...'}</CardTitle>
                        <CardDescription>
                            Enter the details below to create a new user account. Course selection is the next step.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="role">Role</Label>
                            <Select value={role} onValueChange={setRole} required disabled>
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">Admin User</SelectItem>
                                    <SelectItem value="Trust">Trust User</SelectItem>
                                    <SelectItem value="Staff">Staff User</SelectItem>
                                    <SelectItem value="Student">Student User</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        {role === 'Student' ? renderStudentForm() : renderGenericUserForm()}

                        <Button className="w-full mt-4" type="submit">
                            Save and Proceed to Course Selection
                        </Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    </div>
  );
}
