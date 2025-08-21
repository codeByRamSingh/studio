
import { PageHeader } from "@/components/page-header";
import { PublicHeader } from "@/components/public-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/lib/data";

export default function CoursesPage() {
  return (
    <div>
      <PublicHeader />
      <main className="p-4 md:p-6 lg:p-8">
        <PageHeader
          title="Our Courses"
          description="Explore the skill-based training we offer at Arvind ITI."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{course.courseName}</CardTitle>
                <CardDescription>Code: {course.courseCode}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Subjects Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.subjects.map((subject) => (
                      <Badge key={subject} variant="outline">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Total Sessions: {course.numberOfSessions}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
