import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-1">
          <h1
            className="text-3xl text-foreground"
            style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
          >
            Welcome back.
          </h1>
          <p className="text-sm text-muted-foreground">
            This page is just for Ned.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ned@example.com"
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="h-10"
            />
          </div>

          <button
            type="submit"
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full rounded-full text-base mt-2"
            )}
          >
            Sign in
          </button>
        </form>

        <Link
          href="/"
          className="block text-center text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
