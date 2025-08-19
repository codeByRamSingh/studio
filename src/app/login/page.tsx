"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { users } from "@/lib/data";
import Link from "next/link";
import { PublicHeader } from "@/components/public-header";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // In a real app, you'd set a session/token here
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid username or password.",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex flex-1 items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <form onSubmit={handleLogin}>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your username and password to login
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="e.g. rama"
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
              <Button className="w-full" type="submit">
                Login
              </Button>
            </CardContent>
          </form>
        </Card>
      </main>
    </div>
  );
}
