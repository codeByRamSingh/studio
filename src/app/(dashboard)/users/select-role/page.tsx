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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/page-header";

export default function SelectRolePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [role, setRole] = useState("");

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      toast({
        variant: "destructive",
        title: "Role not selected",
        description: "Please select a role to continue.",
      });
      return;
    }
    router.push(`/users/add?role=${role}`);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Register New User"
        description="First, select the role for the new user."
      />
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <form onSubmit={handleProceed}>
            <CardHeader>
              <CardTitle>Select a Role</CardTitle>
              <CardDescription>
                Choose the type of user you want to create.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="role">User Role</Label>
                <Select value={role} onValueChange={setRole} required>
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
                Proceed
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
