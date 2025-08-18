import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PublicHeader } from "@/components/public-header";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">
        <section className="flex h-[calc(100vh-4rem)] w-full items-center justify-center bg-background">
          <div className="container px-4 text-center md:px-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Welcome to Arvind ITI
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Your future starts here.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
