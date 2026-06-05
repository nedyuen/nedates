"use server";

import { createClient } from "@/lib/supabase/server";
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
  const supabase = await createClient();
  const { error } = await supabase.from("meetup_requests").insert(input);
  if (error) return { error: error.message };
  return {};
}
