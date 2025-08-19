"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { users } from "@/lib/data";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !role) {
        toast({
            variant: "destructive",
            title: "Registration Failed",
            description: "Please fill in all fields.",
        });
        return;
    }
    
    // This is a simulation. In a real app, you would send this to your server.
    const newUser = { id: users.length + 1, username, password, role };
    users.push(newUser);
    
    console.log("Registered new user:", newUser);
    console.log("Current users:", users);

    toast({
        title: "Registration Successful",
        description: "You can now log in with your new account.",
    });

    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <form onSubmit={handleRegister}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your details below to create your account
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
                <Select value={role} onValueChange={setRole}>
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
          <CardFooter className="flex flex-col text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
