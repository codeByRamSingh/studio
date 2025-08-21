
"use client";

import { PageHeader } from "@/components/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";
import { notices } from "@/lib/data";
import { format } from "date-fns";
import { PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NoticesPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = (noticeId: number) => {
    const index = notices.findIndex((n) => n.id === noticeId);
    if (index > -1) {
      notices.splice(index, 1);
      toast({
        title: "Notice Deleted",
        description: "The notice has been successfully deleted.",
      });
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the notice.",
      });
    }
  };

  const filteredNotices = user
    ? notices.filter(
        (notice) =>
          user.role === "Admin" || notice.audience.includes(user.role)
      )
    : [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Notice Board"
          description="All important announcements and updates from Arvind ITI."
        />
        {user?.role === "Admin" && (
          <Button asChild>
            <Link href="/dashboard/notices/add">
              <PlusCircle className="mr-2 size-4" />
              Create Notice
            </Link>
          </Button>
        )}
      </div>
      <div className="mx-auto max-w-4xl">
        <Accordion type="single" collapsible className="w-full">
          {filteredNotices.map((notice) => (
            <AccordionItem value={`item-${notice.id}`} key={notice.id}>
              <AccordionTrigger>
                <div className="flex w-full items-center justify-between pr-4">
                  <span className="text-left font-semibold">
                    {notice.title}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="hidden text-sm text-muted-foreground md:inline">
                      {notice.audience.join(", ")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {format(notice.date, "PPP")}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 text-base">
                <p>{notice.content}</p>
                {user?.role === "Admin" && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 size-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the notice.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(notice.id)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
