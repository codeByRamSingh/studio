"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { handleRefineInterests, FormState } from "./actions";

import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Users, ArrowRight } from "lucide-react";
import { studyGroups } from "@/lib/data";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Refining..." : "Refine My Interests"}
      <Sparkles className="ml-2 size-4" />
    </Button>
  );
}

export default function StudyGroupsPage() {
  const { toast } = useToast();
  const initialState: FormState = { message: "" };
  const [state, formAction] = useFormState(handleRefineInterests, initialState);

  useEffect(() => {
    if (state.message && state.message !== "Success") {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Study Group Matching"
        description="Find the perfect study group by refining your interests with AI."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <form action={formAction}>
            <CardHeader>
              <CardTitle>Tell Us What You're Studying</CardTitle>
              <CardDescription>
                Provide some details and our AI will suggest more specific
                interests to help find the best match for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="interests">Your Interests</Label>
                <Input
                  id="interests"
                  name="interests"
                  placeholder="e.g., C++ programming, circuit design, engine mechanics"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseDescriptions">Course Descriptions (Optional)</Label>
                <Textarea
                  id="courseDescriptions"
                  name="courseDescriptions"
                  placeholder="Paste brief descriptions of your courses here."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords (Optional)</Label>
                <Input
                  id="keywords"
                  name="keywords"
                  placeholder="e.g., thermodynamics, data structures, automotive"
                />
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>

        <div className="space-y-8">
          {state.refinedInterests && (
            <Card className="bg-accent/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="text-primary" />
                  AI-Refined Interests
                </CardTitle>
                <CardDescription>
                  Use these topics to find or create a study group.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">
                  {state.refinedInterests}
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Join an Existing Group</CardTitle>
              <CardDescription>
                Here are some groups you might be interested in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studyGroups.map((group) => (
                <div key={group.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{group.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="size-4" /> {group.members} members
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{group.subject}</p>
                  <p className="mt-2 text-sm">{group.focus}</p>
                  <Button variant="link" className="mt-2 h-auto p-0">
                    Request to Join <ArrowRight className="ml-1 size-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
