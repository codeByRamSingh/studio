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
import { users } from "@/lib/data";
import { PageHeader } from "@/components/page-header";

export default function AddUserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const roleFromQuery = searchParams.get('role');
    if (roleFromQuery) {
        setRole(roleFromQuery);
    }
  }, [searchParams]);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !role) {
        toast({
            variant: "destructive",
            title: "Failed to Add User",
            description: "Please fill in all fields.",
        });
        return;
    }
    
    // This is a simulation. In a real app, you would send this to your server.
    const newUser = { id: users.length + 1, username, password, role };
    users.push(newUser);
    
    toast({
        title: "User Added Successfully",
        description: `User "${username}" has been created.`,
    });

    router.push("/users");
  };

  return (
    <div className="space-y-8">
        <PageHeader title="Add New User" description="Create a new user account and assign a role." />
        <div className="flex justify-center">
        <Card className="w-full max-w-md">
            <form onSubmit={handleAddUser}>
            <CardHeader>
                <CardTitle className="text-2xl">Create an account for {role}</CardTitle>
                <CardDescription>
                Enter the details below to create a new user account.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="text"
                    placeholder="e.g. john.doe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
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
                <Button className="w-full" type="submit">
                Create Account
                </Button>
            </CardContent>
            </form>
        </Card>
        </div>
    </div>
  );
}
