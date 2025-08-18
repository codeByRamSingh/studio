import { PageHeader } from "@/components/page-header";
import { PublicHeader } from "@/components/public-header";

export default function CoursesPage() {
  return (
    <div>
      <PublicHeader />
      <main className="p-4 md:p-6 lg:p-8">
        <PageHeader
          title="Courses"
          description="Explore the courses we offer at Arvind ITI."
        />
        {/* Add courses content here */}
      </main>
    </div>
  );
}
