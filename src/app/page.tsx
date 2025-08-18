import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <span className="text-lg font-bold">Arvind ITI</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </header>
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
