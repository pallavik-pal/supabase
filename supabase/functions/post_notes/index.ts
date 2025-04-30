import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: "Authorization header is missing" }),
      { status: 401 }
    );
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );

  // ✅ Corrected user extraction
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return new Response(
      JSON.stringify({ error: "Invalid user or authentication failed" }),
      { status: 401 }
    );
  }

  const { title, content } = await req.json();

  if (!title || !content) {
    return new Response(
      JSON.stringify({ error: "Title and content are required" }),
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("notes")
    .insert([{ user_id: user.id, title, content }])
    .select();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify(data[0]), {
    headers: { "Content-Type": "application/json" },
  });
});
