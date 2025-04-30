//GET is used to retrieve existing resources (notes), 
// the URL path '/notes' logically represents the action of retrieving a list of notes, 
// and parameters (authorization) are read from request headers.

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_ANON_KEY"),
    { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
  );

  const { data: user } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.user.id)
    .order("created_at", { ascending: false });

  if (error) return new Response(JSON.stringify({ error }), { status: 400 });

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});