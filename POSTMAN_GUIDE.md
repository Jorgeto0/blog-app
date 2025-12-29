# 🚀 Postman API Testing Guide

This guide explains how to use the **Laravel Blog API.postman_collection.json** to test all API endpoints.

---

## 📥 Importing the Collection

### Step 1: Open Postman
- Download Postman from https://www.postman.com/downloads/ (if not installed)
- Open Postman application

### Step 2: Import Collection
1. Click **Import** button (top-left of Postman interface)
2. Select **Choose Files**
3. Navigate to project root: `blog-app/`
4. Select file: **Laravel Blog API.postman_collection.json**
5. Click **Import**

✅ All endpoints are now available in your Postman workspace!

---

## 🔑 Authentication Setup

### Using JWT Token

The Postman collection includes **automatic token handling**:

1. **First, Register or Login**
   - Send `POST /auth/register` or `POST /auth/login` request
   - Copy the `token` from the response

2. **Token Auto-Management**
   - The collection stores the token in an environment variable
   - All subsequent requests automatically include: `Authorization: Bearer {token}`
   - No manual header entry needed!

### Manual Method (if auto-management doesn't work)

1. Get token from `/auth/login` response
2. Go to request that needs authentication
3. Click **Headers** tab
4. Add header:
   ```
   Key: Authorization
   Value: Bearer <your-token-here>
   ```

---

## 📋 API Endpoints Overview

### Base URL
```
http://localhost:8000/api
```

---

## 🔐 Authentication Endpoints

### 1️⃣ Register New User
**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "image": null  // Optional: multipart file
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "image": null
  }
}
```

**Error Cases:**
- `422` - Validation error (missing fields, email already exists)
- `400` - Invalid request format

---

### 2️⃣ Login
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "image": null
  }
}
```

**Error Cases:**
- `401` - Invalid credentials (email or password incorrect)
- `422` - Missing required fields

---

### 3️⃣ Get Current User
**Endpoint:** `GET /auth/user`

**Headers Required:** `Authorization: Bearer {token}`

**Success Response (200):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "image": null,
  "created_at": "2025-12-30T10:30:00Z",
  "updated_at": "2025-12-30T10:30:00Z"
}
```

**Error Cases:**
- `401` - No token provided or token expired

---

### 4️⃣ Logout
**Endpoint:** `POST /auth/logout`

**Headers Required:** `Authorization: Bearer {token}`

**Success Response (200):**
```json
{
  "message": "Logout successful"
}
```

---

## 📝 Posts Endpoints

### 1️⃣ Get All Posts
**Endpoint:** `GET /posts`

**Query Parameters (Optional):**
- `page` - Pagination page number (default: 1)
- `per_page` - Items per page (default: 15)

**Success Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "title": "My First Blog Post",
      "body": "This is the content of my post...",
      "user_id": 1,
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "image": null
      },
      "tags": [
        {
          "id": 1,
          "name": "Laravel"
        }
      ],
      "comments": [
        {
          "id": 1,
          "content": "Great post!",
          "user": {
            "id": 2,
            "name": "Jane Smith",
            "image": null
          },
          "created_at": "2025-12-30T11:00:00Z"
        }
      ],
      "created_at": "2025-12-30T10:30:00Z",
      "expires_at": "2025-12-31T10:30:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 15,
    "total": 5
  }
}
```

---

### 2️⃣ Create Post
**Endpoint:** `POST /posts`

**Headers Required:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "title": "My Amazing Blog Post",
  "body": "This is the detailed content of my post...",
  "tags": ["Laravel", "PHP", "Web Development"]
}
```

**Rules:**
- `title` - Required, max 255 characters
- `body` - Required
- `tags` - Required, minimum 1 tag, array of tag names

**Success Response (201):**
```json
{
  "id": 5,
  "title": "My Amazing Blog Post",
  "body": "This is the detailed content of my post...",
  "user_id": 1,
  "created_at": "2025-12-30T12:00:00Z",
  "expires_at": "2025-12-31T12:00:00Z",
  "tags": [
    {
      "id": 1,
      "name": "Laravel"
    }
  ]
}
```

**Error Cases:**
- `401` - Not authenticated
- `422` - Validation error (missing fields, no tags)

---

### 3️⃣ Get Single Post
**Endpoint:** `GET /posts/{id}`

**URL Parameter:**
- `id` - Post ID (e.g., `/posts/1`)

**Success Response (200):**
```json
{
  "id": 1,
  "title": "My First Blog Post",
  "body": "Content here...",
  "user": { ... },
  "tags": [ ... ],
  "comments": [ ... ],
  "created_at": "2025-12-30T10:30:00Z",
  "expires_at": "2025-12-31T10:30:00Z"
}
```

**Error Cases:**
- `404` - Post not found

---

### 4️⃣ Update Post
**Endpoint:** `PUT /posts/{id}`

**Headers Required:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "title": "Updated Post Title",
  "body": "Updated content...",
  "tags": ["React", "JavaScript"]
}
```

**Success Response (200):**
```json
{
  "id": 1,
  "title": "Updated Post Title",
  "body": "Updated content...",
  "tags": [ ... ]
}
```

**Error Cases:**
- `401` - Not authenticated
- `403` - Not the post owner
- `404` - Post not found
- `422` - Validation error

---

### 5️⃣ Delete Post
**Endpoint:** `DELETE /posts/{id}`

**Headers Required:** `Authorization: Bearer {token}`

**Success Response (200):**
```json
{
  "message": "Post deleted successfully"
}
```

**Error Cases:**
- `401` - Not authenticated
- `403` - Not the post owner
- `404` - Post not found

---

## 💬 Comments Endpoints

### 1️⃣ Add Comment to Post
**Endpoint:** `POST /posts/{post_id}/comments`

**Headers Required:** `Authorization: Bearer {token}`

**URL Parameter:**
- `post_id` - Post ID to comment on

**Request Body:**
```json
{
  "content": "Great post! Very helpful information."
}
```

**Success Response (201):**
```json
{
  "id": 5,
  "post_id": 1,
  "user_id": 2,
  "content": "Great post! Very helpful information.",
  "user": {
    "id": 2,
    "name": "Jane Smith",
    "image": null
  },
  "created_at": "2025-12-30T13:00:00Z"
}
```

**Error Cases:**
- `401` - Not authenticated
- `404` - Post not found
- `422` - Empty content

---

### 2️⃣ Update Comment
**Endpoint:** `PUT /comments/{id}`

**Headers Required:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "content": "Updated comment text..."
}
```

**Success Response (200):**
```json
{
  "id": 5,
  "content": "Updated comment text...",
  "created_at": "2025-12-30T13:00:00Z",
  "updated_at": "2025-12-30T14:00:00Z"
}
```

**Error Cases:**
- `401` - Not authenticated
- `403` - Not the comment owner
- `404` - Comment not found

---

### 3️⃣ Delete Comment
**Endpoint:** `DELETE /comments/{id}`

**Headers Required:** `Authorization: Bearer {token}`

**Success Response (200):**
```json
{
  "message": "Comment deleted successfully"
}
```

**Error Cases:**
- `401` - Not authenticated
- `403` - Not the comment owner
- `404` - Comment not found

---

## 🏷️ Tags Endpoints

### 1️⃣ Get All Tags
**Endpoint:** `GET /tags`

**Success Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Laravel",
      "created_at": "2025-12-29T09:00:00Z"
    },
    {
      "id": 2,
      "name": "React",
      "created_at": "2025-12-29T10:00:00Z"
    }
  ]
}
```

---

### 2️⃣ Update Post Tags
**Endpoint:** `POST /posts/{post_id}/tags`

**Headers Required:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "tags": ["NewTag1", "NewTag2"]
}
```

**Success Response (200):**
```json
{
  "message": "Tags updated successfully",
  "tags": [
    {
      "id": 5,
      "name": "NewTag1"
    },
    {
      "id": 6,
      "name": "NewTag2"
    }
  ]
}
```

---

## 🧪 Testing Scenarios

### ✅ Happy Path - Complete User Journey

**Step 1: Register**
- Endpoint: `POST /auth/register`
- Fill in name, email, password, password_confirmation
- Save the returned token

**Step 2: Create Post**
- Endpoint: `POST /posts`
- Use saved token in Authorization header
- Create post with title, body, and at least one tag
- Save post ID

**Step 3: Add Comment**
- Endpoint: `POST /posts/{post_id}/comments`
- Replace {post_id} with saved post ID
- Add comment content
- Verify comment appears in post

**Step 4: Update Post**
- Endpoint: `PUT /posts/{post_id}`
- Update title, body, or tags
- Verify changes returned

**Step 5: Delete Comment**
- Endpoint: `DELETE /comments/{comment_id}`
- Get comment ID from earlier response
- Verify deletion

**Step 6: Delete Post**
- Endpoint: `DELETE /posts/{post_id}`
- Verify deletion successful

---

### ❌ Error Cases - Unhappy Path

**Test 1: Login with Wrong Password**
- Endpoint: `POST /auth/login`
- Use valid email, wrong password
- Expected: `401 Unauthorized`

**Test 2: Unauthorized Post Edit**
- Endpoint: `PUT /posts/{id}`
- Use different user's token (from another user's login)
- Try to edit a post created by first user
- Expected: `403 Forbidden`

**Test 3: Missing Required Fields**
- Endpoint: `POST /posts`
- Send request with missing "tags" field
- Expected: `422 Validation Error`

**Test 4: Access Expired/Non-existent Post**
- Endpoint: `GET /posts/99999`
- Expected: `404 Not Found`

**Test 5: Create Post Without Authentication**
- Endpoint: `POST /posts`
- Don't include Authorization header
- Expected: `401 Unauthorized`

---

## 📊 Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| `200` | Success | Login successful, post retrieved |
| `201` | Created | New post/comment created |
| `400` | Bad Request | Malformed JSON |
| `401` | Unauthorized | Missing or invalid token |
| `403` | Forbidden | Not post owner, can't delete |
| `404` | Not Found | Post/comment doesn't exist |
| `422` | Validation Error | Missing required fields |
| `500` | Server Error | Internal server error |

---

## 💡 Pro Tips

1. **Save Token After Login**
   - Copy token from login response
   - Postman auto-saves in environment variables
   - Reuse for all authenticated requests

2. **Use Postman Environment**
   - Store `base_url` as variable
   - Store `token` as variable
   - Use `{{base_url}}` in request URLs
   - Use `{{token}}` in headers

3. **Test in Order**
   - Register → Login → Create Post → Add Comment → Update → Delete
   - This ensures data relationships work correctly

4. **Check Response Headers**
   - JWT token included in response headers
   - CORS headers show allowed origins
   - Content-Type shows response format

5. **Use Postman Collections**
   - Run entire collection as test suite
   - Verify all endpoints work together
   - Great for regression testing

---

## 🔗 Related Files

- Main README: [README.md](README.md)
- Backend Code: [backend/routes/api.php](backend/routes/api.php)
- Frontend Code: [frontend/src/api/](frontend/src/api/)

---

## ❓ Troubleshooting

### "Token Invalid" Error
- **Problem**: Using expired or incorrect token
- **Solution**: Login again, copy new token from response

### "CORS Error"
- **Problem**: Frontend can't call backend
- **Solution**: Ensure backend is running on `http://localhost:8000`

### "Post Not Found"
- **Problem**: Post ID doesn't exist
- **Solution**: Create post first, use returned ID

### "Port Already in Use"
- **Problem**: Port 8000 or 3000 taken
- **Solution**: Check [README.md](README.md#port-already-in-use) for port change instructions

---

## 📞 Questions?

Refer to the main [README.md](README.md) for project setup, architecture, and additional information.

Happy Testing! 🎉
