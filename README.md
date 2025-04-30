# 📝 Supabase Notes API

A minimal Supabase backend to create and fetch personal notes.

## 📐 Schema Design
-`columns`- `id` to create a specific id for each note , `user_id` to link notes to a specific user , `title` to create a title for each note, `content` to write content of the note , `created_at` to know the time note is created later helps to sort notes based on time .

-`types`-`uuid`-universal unique identifier to make each note unique ,`text` text data type is used, `timestamp with time zone`- to store time and date along with zone info

-`primary key`-for uniqueness in id 

-`constraint`- like a rule that it should not be null title should never be empty 

-`default`-`gen_random_uuid()`- generates a random id no need to specify ,`default now` -to collect data of that particular moment 


## ⚙️ Setup & Deploy Steps
1. Create a new Supabase project in the website https://supabase.com
2. Add/copy `schema.sql` in SQL editor at left menu in the project dashboard ans click run.Notes table will be created.
3.Deploy edge functions:
   ```bash
   supabase functions deploy post_notes
   supabase functions deploy get_notes
   ```
4.In edge function(left menu) you find the url of post and get after deployment 
5. Set your project’s `SUPABASE_URL` and `SUPABASE_ANON_KEY` in the .env file inside the supabase folder

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
