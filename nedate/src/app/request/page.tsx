"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient, type ActivityType } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Fields = {
  name: string;
  email: string;
  activity: string;
  message: string;
  location: string;
  startTime: string;
  endTime: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const selectClass =
  "h-10 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Name is required.";
  if (!f.email.trim()) {
    e.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    e.email = "Enter a valid email address.";
  }
  if (!f.activity) e.activity = "Please pick an activity.";
  if (!f.location.trim()) e.location = "Where you'd like to meet is required.";
  if (!f.startTime) e.startTime = "Start time is required.";
  if (!f.endTime) {
    e.endTime = "End time is required.";
  } else if (f.startTime && f.endTime <= f.startTime) {
    e.endTime = "End time must be after start time.";
  }
  return e;
}

export default function RequestPage() {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    activity: "",
    message: "",
    location: "",
    startTime: "",
    endTime: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [refId, setRefId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  function update(field: keyof Fields) {
    return (
      evt: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setFields((prev) => ({ ...prev, [field]: evt.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setServerError(null);

    // Generate UUID client-side so we don't need SELECT permission after insert
    const id = crypto.randomUUID();
    const supabase = createClient();
    const { error } = await supabase.from("meetup_requests").insert({
      id,
      name: fields.name.trim(),
      email: fields.email.trim().toLowerCase(),
      activity: fields.activity as ActivityType,
      message: fields.message.trim(),
      location: fields.location.trim(),
      start_time: new Date(fields.startTime).toISOString(),
      end_time: new Date(fields.endTime).toISOString(),
    });

    setLoading(false);

    if (error) {
      setServerError("Something went wrong. Please try again.");
      return;
    }

    setRefId(id);
  }

  // ── Confirmation ──────────────────────────────────────────────────────────
  if (refId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-sm w-full space-y-5 text-center">
          <div
            className="text-5xl leading-none"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            ✓
          </div>
          <h1
            className="text-3xl text-foreground"
            style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
          >
            Request sent.
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            I&apos;ll read this and get back to you within a few days.
          </p>
          <p className="text-xs tracking-widest font-mono text-muted-foreground/60 uppercase">
            ref #{refId.slice(0, 8)}
          </p>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full"
            )}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-5">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </Link>
      </header>

      <main className="flex-1 flex items-start justify-center px-6 py-8 sm:py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1
              className="text-3xl sm:text-4xl text-foreground"
              style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
            >
              Let&apos;s meet.
            </h1>
            <p className="text-muted-foreground">
              Tell me a bit about yourself and what you have in mind.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name">
                What&apos;s your name?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={fields.name}
                onChange={update("name")}
                placeholder="Your name"
                className={cn("h-10", errors.name && "border-destructive")}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email">
                Your email? <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={fields.email}
                onChange={update("email")}
                placeholder="you@example.com"
                className={cn("h-10", errors.email && "border-destructive")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Activity */}
            <div className="space-y-1.5">
              <Label htmlFor="activity">
                What&apos;s the activity?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <select
                id="activity"
                value={fields.activity}
                onChange={update("activity")}
                className={cn(
                  selectClass,
                  errors.activity && "border-destructive"
                )}
              >
                <option value="">Select one…</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="drink">Drink</option>
                <option value="walk">Walk</option>
                <option value="chat">Chat</option>
                <option value="day-trip">Day trip</option>
                <option value="other">Other activity</option>
                <option value="bucket-list">Ned&apos;s bucket list item</option>
              </select>
              {errors.activity && (
                <p className="text-xs text-destructive">{errors.activity}</p>
              )}
            </div>

            {/* Pitch */}
            <div className="space-y-1.5">
              <Label htmlFor="message">Pitch the activity to me.</Label>
              <Textarea
                id="message"
                value={fields.message}
                onChange={update("message")}
                placeholder="Sell me on it — why is this a good time?"
                className="min-h-28 resize-none"
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <Label htmlFor="location">
                Where? <span className="text-destructive">*</span>
              </Label>
              <Input
                id="location"
                value={fields.location}
                onChange={update("location")}
                placeholder="e.g. Central, Sai Ying Pun, TBC…"
                className={cn("h-10", errors.location && "border-destructive")}
              />
              {errors.location && (
                <p className="text-xs text-destructive">{errors.location}</p>
              )}
            </div>

            {/* When */}
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium leading-none">
                When? <span className="text-destructive">*</span>
              </legend>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="startTime"
                    className="text-xs text-muted-foreground"
                  >
                    Start
                  </Label>
                  <Input
                    id="startTime"
                    type="datetime-local"
                    value={fields.startTime}
                    onChange={update("startTime")}
                    className={cn(
                      "h-10 text-sm",
                      errors.startTime && "border-destructive"
                    )}
                  />
                  {errors.startTime && (
                    <p className="text-xs text-destructive">
                      {errors.startTime}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="endTime"
                    className="text-xs text-muted-foreground"
                  >
                    End
                  </Label>
                  <Input
                    id="endTime"
                    type="datetime-local"
                    value={fields.endTime}
                    onChange={update("endTime")}
                    className={cn(
                      "h-10 text-sm",
                      errors.endTime && "border-destructive"
                    )}
                  />
                  {errors.endTime && (
                    <p className="text-xs text-destructive">{errors.endTime}</p>
                  )}
                </div>
              </div>
            </fieldset>

            {serverError && (
              <p className="text-sm text-destructive text-center">
                {serverError}
              </p>
            )}

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full rounded-full text-base disabled:opacity-60"
                )}
              >
                {loading ? "Sending…" : "Send request"}
              </button>
              <p className="text-xs text-center text-muted-foreground">
                I read every request and reply within a few days.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
