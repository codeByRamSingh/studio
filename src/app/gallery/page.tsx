import { PageHeader } from "@/components/page-header";
import { PublicHeader } from "@/components/public-header";

export default function GalleryPage() {
  return (
    <div>
      <PublicHeader />
      <main className="p-4 md:p-6 lg:p-8">
        <PageHeader
          title="Gallery"
          description="A glimpse into life at Arvind ITI."
        />
        {/* Add gallery content here */}
      </main>
    </div>
  );
}
