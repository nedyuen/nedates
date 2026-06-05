import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

export type { Database } from "./database.types";
export type { Tables, TablesInsert, TablesUpdate } from "./database.types";

// Row types
export type MeetupRequest =
  Database["public"]["Tables"]["meetup_requests"]["Row"];
export type MeetupRequestInsert =
  Database["public"]["Tables"]["meetup_requests"]["Insert"];
export type MeetupRequestUpdate =
  Database["public"]["Tables"]["meetup_requests"]["Update"];

export type Venue = Database["public"]["Tables"]["venues"]["Row"];
export type VenueInsert = Database["public"]["Tables"]["venues"]["Insert"];

export type TrustedEmail =
  Database["public"]["Tables"]["trusted_emails"]["Row"];
export type TrustedEmailInsert =
  Database["public"]["Tables"]["trusted_emails"]["Insert"];

export type RequestComment =
  Database["public"]["Tables"]["request_comments"]["Row"];
export type RequestCommentInsert =
  Database["public"]["Tables"]["request_comments"]["Insert"];

// Narrowed literals (DB stores as text, TS enforces shape)
export type ActivityType =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "drink"
  | "walk"
  | "chat"
  | "day-trip"
  | "other"
  | "bucket-list";

export type RequestStatus = "pending" | "accepted" | "declined" | "archived";

// Typed browser client for use in Client Components
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
