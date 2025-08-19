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
import { events, notices } from "@/lib/data";
import { ArrowRight, Calendar, Megaphone } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export function StudentDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Student Dashboard"
        description="Here's a quick overview of what's happening at Arvind ITI."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5 text-primary" />
              Upcoming Events
            </CardTitle>
            <CardDescription>
              Don't miss out on these upcoming campus events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-2 text-center font-bold">
                    <span className="text-sm text-primary">
                      {format(event.date, "MMM")}
                    </span>
                    <span className="text-xl">{format(event.date, "dd")}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="link" className="p-0">
              <Link href="/events">
                View all events <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="size-5 text-primary" />
              Recent Notices
            </CardTitle>
            <CardDescription>
              Stay updated with the latest announcements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notices.slice(0, 4).map((notice) => (
                <div key={notice.id}>
                  <h3 className="font-semibold">{notice.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    Posted on {format(notice.date, "PPP")}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="link" className="p-0">
              <Link href="/notices">
                View all notices <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Find a Study Group</CardTitle>
            <CardDescription>
              Connect with peers and ace your courses together. Use AI to find the perfect match.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow" />
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/study-groups">Start Matching</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col lg:col-span-2">
          <CardHeader>
            <CardTitle>Resource Sharing Forum</CardTitle>
            <CardDescription>
              Share and discover study materials, notes, and helpful links from the community.
            </CardDescription>
          </CardHeader>
           <CardContent className="flex-grow" />
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/resources">Explore Resources</Link>
            </Button>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}
