import { PageHeader } from "@/components/page-header";
import { PublicHeader } from "@/components/public-header";

export default function AboutUsPage() {
  return (
    <div>
      <PublicHeader />
      <main className="p-4 md:p-6 lg:p-8">
        <PageHeader
          title="About Us"
          description="Learn more about the history and mission of Arvind ITI."
        />
        {/* Add about us content here */}
      </main>
    </div>
  );
}
