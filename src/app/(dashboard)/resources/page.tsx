import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { resources } from "@/lib/data";
import { Download, PlusCircle } from "lucide-react";
import { format } from "date-fns";

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Resource Forum"
          description="Share and discover study materials from the community."
        />
        <Button>
          <PlusCircle className="mr-2 size-4" />
          Share Resource
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shared Materials</CardTitle>
          <CardDescription>
            A collection of notes, documents, and links shared by students and
            faculty.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Shared By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.title}</TableCell>
                  <TableCell>{resource.subject}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{resource.type}</Badge>
                  </TableCell>
                  <TableCell>{resource.sharedBy}</TableCell>
                  <TableCell>{format(resource.date, "PP")}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={resource.link}>
                        <Download className="size-4" />
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
