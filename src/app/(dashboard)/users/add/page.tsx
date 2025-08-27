

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
import { users, students, staff } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Textarea } from "@/components/ui/textarea";
import type { Student, Staff } from "@/lib/data";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export default function AddUserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
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
  const [documents, setDocuments] = useState<{ name: string; file: File }[]>([]);
  const [documentName, setDocumentName] = useState("");
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  // Staff specific state
  const [staffName, setStaffName] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPhone, setStaffPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState<number | string>("");

  useEffect(() => {
    const roleFromQuery = searchParams.get('role');
    if (roleFromQuery) {
      setRole(roleFromQuery);
    }
  }, [searchParams]);

  const handleUploadDocument = () => {
    if (documentName && documentFile) {
        setDocuments([...documents, { name: documentName, file: documentFile }]);
        toast({ title: "Document Uploaded", description: `"${documentName}" has been attached.` });
        setDocumentName("");
        setDocumentFile(null);
        const fileInput = document.getElementById('documentFile') as HTMLInputElement;
        if(fileInput) fileInput.value = "";
    } else {
        toast({ variant: "destructive", title: "Upload Failed", description: "Please provide both a document name and a file." });
    }
  };

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

        const studentId = `STU${students.length + 1}`;
        const generatedPassword = `${studentName.split(' ')[0].toLowerCase()}123`;

        const newStudent: Student = {
            id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
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
            course: '',
            session: '',
            courseFee: 0,
            feeHistory: [],
            documents,
        };
        students.push(newStudent);
        users.push({ id: users.length + 1, username: studentId, password: generatedPassword, role: "Student" });

        toast({
            title: "Student Details Saved",
            description: `Proceed to assign a course to ${studentName}.`,
        });
        router.push(`/dashboard/students/assign-course/${newStudent.id}`);

    } else if (role === 'Staff') {
        if (!staffName || !permanentAddress || !currentAddress || !staffEmail || !staffPhone || !designation || !salary) {
            toast({ variant: "destructive", title: "Failed to Add Staff", description: "Please fill in all staff details." });
            return;
        }

        const staffId = `STAFF${staff.length + 1}`;
        const generatedPassword = `${staffName.split(' ')[0].toLowerCase()}123`;

        const newStaff: Staff = {
            id: staff.length > 0 ? Math.max(...staff.map(s => s.id)) + 1 : 1,
            staffId,
            staffName,
            permanentAddress,
            currentAddress,
            email: staffEmail,
            phone: staffPhone,
            designation,
            salary: typeof salary === 'string' ? parseFloat(salary) : salary,
            dateJoined: new Date(),
        };
        staff.push(newStaff);
        users.push({ id: users.length + 1, username: staffId, password: generatedPassword, role: "Staff" });

        toast({ title: "Staff Added Successfully", description: `Staff member "${staffName}" has been created.` });
        router.push("/dashboard/staff");
    }
  };

  const renderStudentForm = () => (
    <>
        <CardHeader>
            <CardTitle className="text-2xl">Student Registration - Step 1</CardTitle>
            <CardDescription>Enter the student's personal details to begin enrollment. Course selection is the next step.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <input type="hidden" name="role" value="Student" />
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
                        <div className="flex items-center space-x-2"><RadioGroupItem value="Male" id="male" /><Label htmlFor="male">Male</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="Female" id="female" /><Label htmlFor="female">Female</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="Other" id="other" /><Label htmlFor="other">Other</Label></div>
                    </RadioGroup>
                </div>
                <div className="grid gap-2">
                    <Label>Physically Disabled</Label>
                    <RadioGroup defaultValue={physicallyDisabled} onValueChange={setPhysicallyDisabled} className="flex gap-4">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="Yes" id="pd-yes" /><Label htmlFor="pd-yes">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="No" id="pd-no" /><Label htmlFor="pd-no">No</Label></div>
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

            <Separator />
            
            <div>
                 <h3 className="text-lg font-semibold mb-4 text-primary">Document Upload</h3>
                 <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="grid gap-2 md:col-span-1">
                        <Label htmlFor="documentName">Document Name</Label>
                        <Input id="documentName" value={documentName} onChange={(e) => setDocumentName(e.target.value)} />
                    </div>
                    <div className="grid gap-2 md:col-span-1">
                        <Label htmlFor="documentFile">Attach Document</Label>
                        <Input id="documentFile" type="file" onChange={(e) => setDocumentFile(e.target.files ? e.target.files[0] : null)} />
                    </div>
                    <div className="grid gap-2 md:col-span-1 self-end">
                        <Button type="button" onClick={handleUploadDocument}>Upload</Button>
                    </div>
                 </div>
                 {documents.length > 0 && (
                    <div className="mt-4 space-y-2">
                        <h4 className="font-medium">Attached Documents:</h4>
                        <ul className="list-disc list-inside rounded-md border p-2">
                            {documents.map((doc, index) => (
                                <li key={index}>{doc.name} ({doc.file.name})</li>
                            ))}
                        </ul>
                    </div>
                 )}
            </div>

            <Button className="w-full mt-4" type="submit">Save and Proceed to Course Selection</Button>
            <div className="mt-4 text-sm text-center text-muted-foreground">A unique Student ID and password will be automatically generated.</div>
        </CardContent>
    </>
  );

  const renderStaffForm = () => (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Add New Staff Member</CardTitle>
        <CardDescription>Enter the details below to add a new staff member to the system.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <input type="hidden" name="role" value="Staff" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="staffName">Name</Label>
                <Input id="staffName" value={staffName} onChange={(e) => setStaffName(e.target.value)} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="staffEmail">Email ID</Label>
                <Input id="staffEmail" type="email" value={staffEmail} onChange={(e) => setStaffEmail(e.target.value)} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="staffPhone">Phone Number</Label>
                <Input id="staffPhone" type="tel" value={staffPhone} onChange={(e) => setStaffPhone(e.target.value)} required />
            </div>
        </div>
        <div className="grid gap-2">
            <Label htmlFor="permanentAddress">Permanent Address</Label>
            <Textarea id="permanentAddress" value={permanentAddress} onChange={(e) => setPermanentAddress(e.target.value)} required />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="currentAddress">Current Address</Label>
            <Textarea id="currentAddress" value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} required />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
                <Label htmlFor="designation">Designation / Role</Label>
                <Input id="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="salary">Salary</Label>
                <Input id="salary" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required placeholder="e.g. 50000" />
            </div>
        </div>
        <Button className="w-full mt-4" type="submit">Add Staff Member</Button>
         <div className="mt-4 text-sm text-center text-muted-foreground">A unique Staff ID and password will be automatically generated.</div>
      </CardContent>
    </>
  );
    
  return (
    <div className="space-y-8">
      <PageHeader title={role === 'Staff' ? 'Add Staff' : 'Student Registration'} description={role === 'Staff' ? 'Add a new staff member.' : "Begin the student enrollment process."} />
      <div className="flex justify-center">
        <Card className="w-full max-w-3xl">
          <form onSubmit={handleAddUser}>
            {role === 'Student' && renderStudentForm()}
            {role === 'Staff' && renderStaffForm()}
            {/* Fallback for other roles can be added here if needed */}
          </form>
        </Card>
      </div>
    </div>
  );
}
