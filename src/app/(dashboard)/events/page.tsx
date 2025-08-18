import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { events } from "@/lib/data";
import { format } from "date-fns";

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Event Calendar"
        description="Stay up-to-date with all the events happening at Arvind ITI."
      />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                // The selected date can be managed with state for interactivity
                // selected={new Date()}
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>A list of all scheduled events.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-6">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-2 text-center font-bold text-primary">
                        <span className="text-sm">
                          {format(event.date, "MMM")}
                        </span>
                        <span className="text-xl">
                          {format(event.date, "dd")}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(event.date, "p")} @ {event.location}
                        </p>
                        <p className="mt-1 text-sm">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
