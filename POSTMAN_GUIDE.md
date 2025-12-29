# 🧪 Postman API Testing

Quick guide to test all API endpoints.

## 📥 Setup

1. Open **Postman**
2. Click **Import** → Select **`Laravel Blog API.postman_collection.json`** from this folder
3. All endpoints ready to test ✅

---

## 🔑 How to Test

**First Time:**
1. Send `POST /auth/register` request with name, email, password
2. Copy the token from response
3. Postman auto-saves it for future requests

**Test Anything:**
1. Select endpoint
2. Click **Send**
3. See response

---

## 📡 Endpoints Quick List

```
Base URL: http://localhost:8000/api

Register/Login:
  POST   /auth/register
  POST   /auth/login
  POST   /auth/logout
  GET    /auth/user

Posts:
  GET    /posts
  POST   /posts
  GET    /posts/{id}
  PUT    /posts/{id}
  DELETE /posts/{id}

Comments:
  POST   /posts/{id}/comments
  PUT    /comments/{id}
  DELETE /comments/{id}

Tags:
  GET    /tags
  POST   /posts/{id}/tags
```

---

## 🧪 Test Scenarios

### Happy Path (Success)
1. Register → Get token
2. Create post → See it in list
3. Add comment → See it on post
4. Edit post → Changes appear
5. Delete post → Post gone

### Error Cases
- Login with wrong password → 401 error
- Edit someone else's post → 403 forbidden
- Delete without token → 401 unauthorized
- Create post without title → 422 validation error

---

## 💡 Tips

- Each request shows status code + response data
- Red = error, Green = success
- Check "Response" tab to see data returned
- Use "Headers" tab to see Authorization: Bearer {token}
