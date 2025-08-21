
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { notices } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Checkbox } from "@/components/ui/checkbox";

const audienceOptions = ["Student", "Staff"];

export default function AddNoticePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState<string[]>([]);

  const handleAudienceChange = (role: string) => {
    setAudience((prev) =>
      prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    );
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || audience.length === 0) {
      toast({
        variant: "destructive",
        title: "Failed to Create Notice",
        description: "Please fill in all fields and select an audience.",
      });
      return;
    }

    const newNotice = {
      id: notices.length > 0 ? Math.max(...notices.map((n) => n.id)) + 1 : 1,
      title,
      content,
      audience,
      date: new Date(),
    };

    notices.unshift(newNotice);

    toast({
      title: "Notice Created Successfully",
      description: `The notice "${title}" has been published.`,
    });

    router.push("/notices");
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Create New Notice"
        description="Draft and publish a new announcement."
      />
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl">
          <form onSubmit={handleCreateNotice}>
            <CardHeader>
              <CardTitle>New Notice Details</CardTitle>
              <CardDescription>
                Fill in the details below to create a new notice.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Notice Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Notice Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="min-h-[150px]"
                />
              </div>
              <div className="grid gap-2">
                <Label>Target Audience</Label>
                <div className="flex flex-wrap items-center gap-4">
                  {audienceOptions.map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox
                        id={role}
                        checked={audience.includes(role)}
                        onCheckedChange={() => handleAudienceChange(role)}
                      />
                      <Label htmlFor={role} className="font-normal">
                        {role}s
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full mt-4" type="submit">
                Publish Notice
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
