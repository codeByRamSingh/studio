
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const [gender, setGender] = useState("");
  const [physicallyDisabled, setPhysicallyDisabled] = useState("No");


  useEffect(() => {
    const roleFromQuery = searchParams.get('role');
    if (roleFromQuery) {
      setRole(roleFromQuery);
    }
  }, [searchParams]);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (role === 'Student') {
        if (!studentName || !fatherName || !motherName || !address || !email || !phone || !caste || !religion || !gender || !physicallyDisabled) {
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
            gender,
            physicallyDisabled: physicallyDisabled === "Yes",
            course: '', // Course will be assigned in the next step
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
                <RadioGroup defaultValue={gender} onValueChange={setGender} className="flex gap-4">
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
                <RadioGroup defaultValue={physicallyDisabled} onValueChange={setPhysicallyDisabled} className="flex gap-4">
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

        <div className="mt-4 text-sm text-muted-foreground">
            A unique Student ID and password will be automatically generated. Course selection is the next step.
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
        <PageHeader title="Student Registration" description="Enter the student's personal details to begin enrollment." />
        <div className="flex justify-center">
            <Card className="w-full max-w-3xl">
                <form onSubmit={handleAddUser}>
                    <CardHeader>
                        <CardTitle className="text-2xl">Create an account for a Student</CardTitle>
                        <CardDescription>
                           Enter the details below. Course selection is the next step.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <input type="hidden" name="role" value="Student" />
                        
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
