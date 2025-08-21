
"use client";

import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { courses } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function AddSessionPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const courseId = parseInt(params.id as string, 10);
  const course = courses.find(c => c.id === courseId);

  const [sessionName, setSessionName] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sessionName || !startDate || !endDate) {
        toast({
            variant: "destructive",
            title: "Failed to Add Session",
            description: "Please fill in all fields.",
        });
        return;
    }

    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex === -1) {
        toast({ variant: "destructive", title: "Course not found" });
        return;
    }

    const newSession = {
        id: (courses[courseIndex].sessions?.length || 0) + 1,
        name: sessionName,
        startDate,
        endDate,
    };

    if (!courses[courseIndex].sessions) {
        courses[courseIndex].sessions = [];
    }
    
    courses[courseIndex].sessions.push(newSession);

    toast({
        title: "Session Added Successfully",
        description: `Session "${sessionName}" has been added to ${course?.courseName}.`,
    });

    router.push(`/dashboard/courses/sessions/${courseId}`);
  };

  return (
    <div className="space-y-8">
        <PageHeader title={`Add New Session for ${course?.courseName}`} description="Create a new session with its details." />
        <div className="flex justify-center">
            <Card className="w-full max-w-2xl">
                <form onSubmit={handleAddSession}>
                    <CardHeader>
                        <CardTitle>Create a new session</CardTitle>
                        <CardDescription>
                            Enter the details below to create a new session.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="sessionName">Session Name</Label>
                            <Input id="sessionName" value={sessionName} onChange={(e) => setSessionName(e.target.value)} required />
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !startDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={startDate}
                                            onSelect={setStartDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="endDate">End Date</Label>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !endDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={endDate}
                                            onSelect={setEndDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <Button className="w-full mt-4" type="submit">
                            Create Session
                        </Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    </div>
  );
}
