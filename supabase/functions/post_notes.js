// Why: POST is used to create new notes; '/notes' matches REST conventions; data is read from the request body.

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_ANON_KEY"),
    { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
  );

  const { data: user } = await supabase.auth.getUser();
  const { title, content } = await req.json();

  const { data, error } = await supabase
    .from("notes")
    .insert([{ user_id: user.user.id, title, content }])
    .select();

  if (error) return new Response(JSON.stringify({ error }), { status: 400 });

  return new Response(JSON.stringify(data[0]), {
    headers: { "Content-Type": "application/json" },
  });
});