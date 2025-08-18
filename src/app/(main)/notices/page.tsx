import { PageHeader } from "@/components/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { notices } from "@/lib/data";
import { format } from "date-fns";

export default function NoticesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Notice Board"
        description="All important announcements and updates from Arvind ITI."
      />
      <div className="mx-auto max-w-4xl">
        <Accordion type="single" collapsible className="w-full">
          {notices.map((notice) => (
            <AccordionItem value={`item-${notice.id}`} key={notice.id}>
              <AccordionTrigger>
                <div className="flex w-full items-center justify-between pr-4">
                  <span className="text-left font-semibold">{notice.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {format(notice.date, "PPP")}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {notice.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
