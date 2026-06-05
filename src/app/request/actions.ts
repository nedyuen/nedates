"use server";

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/config";
import type { Database } from "@/lib/database.types";
import type { ActivityType } from "@/lib/supabase";

export type SubmitRequestInput = {
  id: string;
  name: string;
  email: string;
  activity: ActivityType;
  message: string;
  location: string;
  start_time: string;
  end_time: string;
};

export async function submitRequest(
  input: SubmitRequestInput
): Promise<{ error?: string }> {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { error } = await supabase.from("meetup_requests").insert(input);
  if (error) return { error: error.message };
  return {};
}
