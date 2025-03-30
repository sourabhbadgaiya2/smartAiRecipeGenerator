# 🔒 Authentication API Documentation

## 📝 Register User

Creates a new user account in the system.

### 📌 Endpoint

```
POST /api/auth/register
```

### 📥 Request Body

| Field    | Type   | Required | Validation Rules                                       |
| -------- | ------ | -------- | ------------------------------------------------------ |
| 🆔 name     | string | ✅ Yes      | Must not be empty                                      |
| 📧 email    | string | ✅ Yes      | Valid email format, 4-32 characters                    |
| 🔑 password | string | ✅ Yes      | Minimum 6 characters, must contain at least one number |

### 📤 Example Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### ✅ Success Response

**Status Code:** 201 Created

```json
{
  "success": true,
  "message": "User created Successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "_id": "user_id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### ⚠️ Error Responses

#### ❌ Validation Error

**Status Code:** 400 Bad Request

```json
{
  "error": "Password must contain at least 6 characters"
}
```

#### ❌ Email Already Exists

**Status Code:** 400 Bad Request

```json
{
  "message": "Email already exists"
}
```

### 📊 Status Codes

| Status Code | Description                              |
| ----------- | ---------------------------------------- |
| 🟢 201      | User successfully created                |
| 🔴 400      | Invalid request body or validation error |
| 🔥 500      | Server error                             |

## 🔑 Login User

Authenticates a user and returns a JWT token.

### 📌 Endpoint

```
POST /api/auth/login
```

### 📥 Request Body

| Field    | Type   | Required | Validation Rules                                       |
| -------- | ------ | -------- | ------------------------------------------------------ |
| 📧 email    | string | ✅ Yes      | Valid email format, 4-32 characters                    |
| 🔑 password | string | ✅ Yes      | Minimum 6 characters, must contain at least one number |

### 📤 Example Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### ✅ Success Response

**Status Code:** 200 OK

```json
{
  "success": true,
  "message": "User logged in Successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "_id": "user_id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### ⚠️ Error Responses

#### ❌ Invalid Credentials

**Status Code:** 400 Bad Request

```json
{
  "message": "Invalid email or password"
}
```

#### ❌ Validation Error

**Status Code:** 400 Bad Request

```json
{
  "error": "Email is required"
}
```

## 🚪 Logout User

Invalidates the user's JWT token and logs them out.

### 📌 Endpoint

```
GET /api/auth/logout
```

### 📥 Headers

```
Authorization: Bearer <token>
```

or

```
Cookie: token=<token>
```

### ✅ Success Response

**Status Code:** 200 OK

```json
{
  "message": "Logged out successfully"
}
```

### ⚠️ Error Responses

#### ❌ No Token

**Status Code:** 400 Bad Request

```json
{
  "message": "No token provided"
}
```

#### ❌ Invalid Token

**Status Code:** 400 Bad Request

```json
{
  "message": "Invalid token"
}
```

### 📊 Status Codes

| Status Code | Description                             |
| ----------- | --------------------------------------- |
| 🟢 200      | Success                                 |
| 🔴 400      | Invalid request or token                |
| 🔒 401      | Unauthorized - Token missing or invalid |
| 🔥 500      | Server error                            |

---

### 🚀 To start using the application, run the development server:

```sh
npm install
nodemon run server
```

🎯 **Enjoy building w