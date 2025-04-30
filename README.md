# 📝 Supabase Notes API

A minimal Supabase backend to create and fetch personal notes.

## 📐 Schema Design
- `id` – `uuid` primary key to uniquely identify notes.
- `user_id` – Links notes to specific users.
- `title` – Required text field to name the note.
- `content` – Optional text for the note body.
- `created_at` – Timestamp, default `now()`.

## ⚙️ Setup & Deploy Steps
1. Create a new Supabase project.
2. Run `schema.sql` to create the `notes` table.
3. Deploy edge functions:
   ```bash
   supabase functions deploy post_notes
   supabase functions deploy get_notes
   ```
4. Set your project’s `SUPABASE_URL` and `SUPABASE_ANON_KEY` in the Edge Function environment.

## ✨ API Endpoints

### POST /notes
- **Why**: We use POST to create new resources.
```bash
curl -X POST https://<your-project>.functions.supabase.co/post_notes   -H "Authorization: Bearer <your-token>"   -H "Content-Type: application/json"   -d '{"title": "Shopping List", "content": "Milk, Bread, Eggs"}'

# Expected response:
# {
#   "id": "...",
#   "user_id": "...",
#   "title": "Shopping List",
#   "content": "Milk, Bread, Eggs",
#   "created_at": "..."
# }
```

### GET /notes
- **Why**: We use GET to fetch the user's notes.
```bash
curl -X GET https://<your-project>.functions.supabase.co/get_notes   -H "Authorization: Bearer <your-token>"

# Expected response:
# [
#   {
#     "id": "...",
#     "title": "Shopping List",
#     "content": "Milk, Bread, Eggs",
#     "created_at": "..."
#   }
# ]
```
