import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-lg w-full space-y-8">
          <div className="space-y-4">
            <p className="text-sm tracking-widest uppercase text-muted-foreground font-medium">
              Nedate
            </p>
            <h1
              className="text-5xl sm:text-6xl leading-tight text-foreground"
              style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
            >
              Hi, I&apos;m Ned.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              I enjoy meeting people — over coffee, a walk, or a quick call.
              If you&apos;d like to connect, send me a request and I&apos;ll get
              back to you.
            </p>
          </div>

          <Link
            href="/request"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full px-8 text-base"
            )}
          >
            Request a meetup →
          </Link>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Based in Hong Kong &middot; Open to coffee chats, walks &amp;
              video calls
            </p>
          </div>
        </div>
      </main>

      <footer className="px-6 py-4 text-center">
        <Link
          href="/admin"
          className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
        >
          Admin
        </Link>
      </footer>
    </div>
  );
}
