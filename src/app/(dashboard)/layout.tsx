
import { PublicHeader } from "@/components/public-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1 bg-muted/40 p-4 lg:p-6">{children}</main>
    </div>
  );
}
