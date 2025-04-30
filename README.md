# 📝 Supabase Notes API

A minimal Supabase backend to create and fetch personal notes.

## ⚙️ Setup & Deploy Steps

1. Create a new Supabase project in the website https://supabase.com.git
   
2. Add/copy `schema.sql` in SQL editor at left menu in the project dashboard and click run. Notes table will be created.

3.Crete a folder and run in terminal
```bash 
git clone https://github.com/pallavik-pal/supabase-mini.git
cd supabase
```
3.Deploy edge functions:
   ```bash
   supabase functions deploy post_notes
   supabase functions deploy get_notes
   ```
 4.In edge function(left menu) you find the url of post and get after deployment (later used for Curl commands)

 5. Set your project’s `SUPABASE_URL` and `SUPABASE_ANON_KEY` in the .env file inside the supabase folder

    ## 📐 Schema Design
    ## 📌 Columns

| Column      | Purpose                                                                 |
|-------------|-------------------------------------------------------------------------|
| `id`        | A unique identifier for each note                                       |
| `user_id`   | Links the note to the specific user who created it                      |
| `title`     | A short title or heading for the note                                   |
| `content`   | The actual text/content of the note                                     |
| `created_at`| Records the exact time the note was created, useful for time-based sorting |

## 🧾 Data Types Used and Their Purpose

| Data Type                | Purpose                                                                 |
|--------------------------|-------------------------------------------------------------------------|
| `uuid`                   | Ensures uniqueness across records (used for `id` and `user_id`)         |
| `text`                   | Stores flexible-length textual data (used for `title` and `content`)    |
| `timestamp with time zone` | Records exact date and time including time zone (used for `created_at`) |

## 🔐 Primary Key

- `id` is set as the **primary key** to uniquely identify each note.

## 📏 Constraints

- `title` is marked as **NOT NULL** to ensure no note is saved without a title.
- Other constraints (like linking `user_id` to a valid user) can be enforced via foreign keys

## ⚙️ Default Values

| Column      | Default              | Reason                                                                 |
|-------------|----------------------|------------------------------------------------------------------------|
| `id`        | `gen_random_uuid()`  | Automatically generates a unique ID when a new note is created        |
| `created_at`| `now()`              | Captures the exact moment the note is created without manual input    |

## ✨ API Endpoints

### POST /notes
- **Why**: We use POST to create new resources.
```bash
curl -X POST <paste-post_notes_url-from the edge function>    -H "Authorization: Bearer <your-token>"   -H "Content-Type: application/json"   -d '{"title": "Shopping List", "content": "Milk, Bread, Eggs"}'

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
curl -X GET <paste-get_notes-url from the edge function>   -H "Authorization: Bearer <your-token>"

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
# Supabase Manual User Creation 
**Supabase Dashboard → Authentication → Users → Add User**  
Then, fill in:
- **Email**
- **Password**  
Click **"Create"**.

```bash
curl -X POST "https://<project-url>.supabase.co/auth/v1/token?grant_type=password" ^
-H "Content-Type: application/json" ^
-H "apikey: <annon-key>" ^
-d "{\"email\": \"<added-email>\", \"password\": \"<added-password>"}"
```
 🔑 **This returns a Bearer token** – copy it to use in subsequent `POST` and `GET` Curl commands.

# ✅ Functional Example Command of My Project (Run in CMD)
```bash
curl -X POST "https://nnggglnvgjoqpaqqqtpp.supabase.co/functions/v1/post_notes" ^-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IkcrUjIwM2pQTkFzU3RvTHMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL25uZ2dnbG52Z2pvcXBhcXFxdHBwLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI4NTE2YmY0Zi0yMWZmLTQ0YTYtYjE4Mi1mYTVkOTlhNzc3N2IiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ2MDAyMDE4LCJpYXQiOjE3NDU5OTg0MTgsImVtYWlsIjoiY29udmVyc2VhaWxhYnNAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NDU5OTg0MTh9XSwic2Vzc2lvbl9pZCI6ImE0MDA4OGIxLTUwMTItNDk5My1hZjMyLTJjOGMzMzllNDFlNSIsImlzX2Fub255bW91cyI6ZmFsc2V9.9NTmWO_4RnRE2S4bl73eM4YL6G3fE9qD_XB-ImfHmlc" ^-H "Content-Type: application/json" ^-d "{\"title\": \"Internship Application \", \"content\": \"HI I'm pallavi Accept me as an intern :) \"}"

```

```bash
curl -X GET "https://nnggglnvgjoqpaqqqtpp.supabase.co/functions/v1/get_notes" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IkcrUjIwM2pQTkFzU3RvTHMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL25uZ2dnbG52Z2pvcXBhcXFxdHBwLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI4NTE2YmY0Zi0yMWZmLTQ0YTYtYjE4Mi1mYTVkOTlhNzc3N2IiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ2MDAyMDE4LCJpYXQiOjE3NDU5OTg0MTgsImVtYWlsIjoiY29udmVyc2VhaWxhYnNAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NDU5OTg0MTh9XSwic2Vzc2lvbl9pZCI6ImE0MDA4OGIxLTUwMTItNDk5My1hZjMyLTJjOGMzMzllNDFlNSIsImlzX2Fub255bW91cyI6ZmFsc2V9.9NTmWO_4RnRE2S4bl73eM4YL6G3fE9qD_XB-ImfHmlc" -H "Content-Type: application/json"
```
### ✅ Sample Response
```json
[
  {
    "id": "2633f881-bf24-4f66-ac45-ba4085d68515",
    "user_id": "8516bf4f-21ff-44a6-b182-fa5d99a7777b",
    "title": "Internship Application",
    "content": "HI I'm pallavi Accept me as an intern :)",
    "created_at": "2025-04-30T07:37:05.705541+00:00"
  }
]
```
## 🔁 Notes
- Replace `<anon-key>`, `<project-url>`, `<added-email>`, `<added-password>`, and `<your-bearer-token>` with actual values.
- Make sure to update your token regularly (it may expire depending on your settings).

---
