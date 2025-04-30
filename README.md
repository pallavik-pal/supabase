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

### 📌 Columns & Purpose

- `id`: A unique identifier for each note.
- `user_id`: Links the note to the user who created it.
- `title`: A short title or heading for the note.
- `content`: The main text or body of the note.
- `created_at`: Records when the note was created.

### 🧾 Data Types

- `uuid`: Used for `id` and `user_id` to ensure each record is uniquely identifiable.
- `text`: Used for `title` and `content` to store flexible-length textual information.
- `timestamp with time zone`: Used for `created_at` to accurately record date and time with zone info.

### 🔐 Constraints & Defaults

- `id` is the **primary key** and uses `gen_random_uuid()` to auto-generate unique values.
- `title` is marked **NOT NULL** to ensure no note is created without a title.
- `created_at` defaults to `now()` to automatically capture the timestamp when a note is created.


## ✨ API Endpoints

### POST /notes
- **Why**: We use POST to create new resources.
```bash
curl -X POST <paste-post_notes_url-from the edge function>    -H "Authorization: Bearer <your-token>"   -H "Content-Type: application/json"   -d '{"title": "Shopping List", "content": "Milk, Bread, Eggs"}'
```

### GET /notes
- **Why**: We use GET to fetch the user's notes.
```bash
curl -X GET <paste-get_notes-url from the edge function>   -H "Authorization: Bearer <your-token>"
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
curl -X POST "https://nnggglnvgjoqpaqqqtpp.supabase.co/functions/v1/post_notes" ^-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IkcrUjIwM2pQTkFzU3RvTHMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL25uZ2dnbG52Z2pvcXBhcXFxdHBwLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI4NTE2YmY0Zi0yMWZmLTQ0YTYtYjE4Mi1mYTVkOTlhNzc3N2IiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ2MDE0NDg4LCJpYXQiOjE3NDYwMTA4ODgsImVtYWlsIjoiY29udmVyc2VhaWxhYnNAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NDYwMTA4ODh9XSwic2Vzc2lvbl9pZCI6IjlmMmU2Mjc2LTQ2ZmMtNDQwZC1iYmIzLTNlM2ZjYjVjNDEzZiIsImlzX2Fub255bW91cyI6ZmFsc2V9.U91OS-h_y74qcuIIwhPSihCaCcqCEJhpxpeMg1XuUBM" ^-H "Content-Type: application/json" ^-d "{\"title\": \"Internship Application \", \"content\": \"HI I'm pallavi Accept me as an intern :) \"}"

```

```bash
curl -X GET "https://nnggglnvgjoqpaqqqtpp.supabase.co/functions/v1/get_notes" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IkcrUjIwM2pQTkFzU3RvTHMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL25uZ2dnbG52Z2pvcXBhcXFxdHBwLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI4NTE2YmY0Zi0yMWZmLTQ0YTYtYjE4Mi1mYTVkOTlhNzc3N2IiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ2MDE0NDg4LCJpYXQiOjE3NDYwMTA4ODgsImVtYWlsIjoiY29udmVyc2VhaWxhYnNAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NDYwMTA4ODh9XSwic2Vzc2lvbl9pZCI6IjlmMmU2Mjc2LTQ2ZmMtNDQwZC1iYmIzLTNlM2ZjYjVjNDEzZiIsImlzX2Fub255bW91cyI6ZmFsc2V9.U91OS-h_y74qcuIIwhPSihCaCcqCEJhpxpeMg1XuUBM" -H "Content-Type: application/json"
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
