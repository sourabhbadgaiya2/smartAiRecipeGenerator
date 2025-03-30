# 🍽️ AI Recipe Generator - Authentication & Recipe API Documentation

## 🔐 Authentication API

### 🚀 Register User

Creates a new user account in the system.

📌 **Endpoint:**

```http
POST /api/auth/register
```

📥 **Request Body:**

| Field       | Type   | Required | Validation Rules                                       |
| ----------- | ------ | -------- | ------------------------------------------------------ |
| 🏷️ name     | string | ✅ Yes   | Must not be empty                                      |
| 📧 email    | string | ✅ Yes   | Valid email format, 4-32 characters                    |
| 🔑 password | string | ✅ Yes   | Minimum 6 characters, must contain at least one number |

📌 **Example Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

✅ **Success Response:**

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

❌ **Error Responses:**

- **400 Bad Request:**
  ```json
  { "message": "Email already exists" }
  ```
- **400 Bad Request:**
  ```json
  { "error": "Password must contain at least 6 characters" }
  ```

---

### 🔑 Login User

Authenticates a user and returns a JWT token.

📌 **Endpoint:**

```http
POST /api/auth/login
```

📥 **Request Body:**

| Field       | Type   | Required | Validation Rules                                       |
| ----------- | ------ | -------- | ------------------------------------------------------ |
| 📧 email    | string | ✅ Yes   | Valid email format, 4-32 characters                    |
| 🔑 password | string | ✅ Yes   | Minimum 6 characters, must contain at least one number |

📌 **Example Request:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

✅ **Success Response:**

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

❌ **Error Responses:**

- **400 Bad Request:**
  ```json
  { "message": "Invalid email or password" }
  ```

---

### 🚪 Logout User

Invalidates the user's JWT token and logs them out.

📌 **Endpoint:**

```http
GET /api/auth/logout
```

📥 **Headers:**

```
Authorization: Bearer <token>
```

✅ **Success Response:**

```json
{ "message": "Logged out successfully" }
```

❌ **Error Responses:**

- **400 Bad Request:**
  ```json
  { "message": "No token provided" }
  ```
---

### 👥 User Management

#### 🔍 Get Current User

```http
GET /api/users/current-user
```

**🔐 Authentication:** Bearer Token required

✅ **Success Response:**

```json
{
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "profilePicture": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "✅ User fetched successfully"
}
```

❌ **Error Response:**

```json
{
  "message": "🚫 Unauthorized: No token provided"
}
```

#### 🔄 Update User

```http
PUT /api/users/update-user
```

**🔐 Authentication:** Bearer Token required

📥 **Request Body:**

| 🏷️ Field        | 🗃️ Type  | ✅ Required | 📝 Description               |
| -------------- | ------ | -------- | ------------------------------ |
| 👤 name        | string | ❌ No    | Updated user name              |
| 📧 email       | string | ❌ No    | Updated email address          |
| 🖼️ profilePicture | string | ❌ No    | URL of the new profile picture |

📌 **Example Request:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "profilePicture": "https://example.com/profile.jpg"
}
```

✅ **Success Response:**

**🟢 Status Code:** 200 OK

```json
{
  "message": "User updated successfully",
  "user": {
    "_id": "user_id",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "profilePicture": "https://example.com/profile.jpg",
    "updatedAt": "timestamp"
  }
}
```

❌ **Error Responses:**

**🔴 Status Code:** 400 Bad Request

```json
{
  "message": "Invalid request body"
}
```

**🔴 Status Code:** 404 Not Found

```json
{
  "message": "User not found"
}
```

## 📊 Status Codes

| 🔢 Status Code | 📌 Description                        |
| ----------- | --------------------------------------- |
| 🟢 200       | Success                                 |
| 🟡 201       | Resource created                        |
| 🔴 400       | Bad request or validation error         |
| 🔴 401       | Unauthorized - Token missing or invalid |
| 🔴 404       | Resource not found                      |
| 🔴 500       | Server error                            |



#### 🔄 Update User

```http
PUT /api/users/update-user
```

**🔐 Authentication:** Bearer Token required

📥 **Request Body:**

| 🏷️ Field        | 🗃️ Type  | ✅ Required | 📝 Description               |
| -------------- | ------ | -------- | ------------------------------ |
| 👤 name        | string | ❌ No    | Updated user name              |
| 📧 email       | string | ❌ No    | Updated email address          |
| 🖼️ profilePicture | string | ❌ No    | URL of the new profile picture |

📌 **Example Request:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "profilePicture": "https://example.com/profile.jpg"
}
```

✅ **Success Response:**

**🟢 Status Code:** 200 OK

```json
{
  "message": "User updated successfully",
  "user": {
    "_id": "user_id",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "profilePicture": "https://example.com/profile.jpg",
    "updatedAt": "timestamp"
  }
}
```

❌ **Error Responses:**

**🔴 Status Code:** 400 Bad Request

```json
{
  "message": "Invalid request body"
}
```

**🔴 Status Code:** 404 Not Found

```json
{
  "message": "User not found"
}
```

## 📊 Status Codes

| 🔢 Status Code | 📌 Description                        |
| ----------- | --------------------------------------- |
| 🟢 200       | Success                                 |
| 🟡 201       | Resource created                        |
| 🔴 400       | Bad request or validation error         |
| 🔴 401       | Unauthorized - Token missing or invalid |
| 🔴 404       | Resource not found                      |
| 🔴 500       | Server error                            |





---

## 🍔 Recipe API

### 📝 Generate Recipe

Generates a new recipe based on given ingredients.

📌 **Endpoint:**

```http
POST /api/recipe/generate
```

📥 **Request Body:**

| Field          | Type     | Required | Description                            |
| -------------- | -------- | -------- | -------------------------------------- |
| 🥗 ingredients | string[] | ✅ Yes   | List of ingredients                    |
| 🍽️ preferences | string[] | ❌ No    | Dietary preferences (e.g., vegetarian) |
| 🌎 cuisine     | string   | ❌ No    | Preferred cuisine type                 |

📌 **Example Request:**

```json
{
  "ingredients": ["chicken", "rice", "tomatoes"],
  "preferences": ["low-carb"],
  "cuisine": "italian"
}
```

✅ **Success Response:**

```json
{
  "title": "Italian Chicken and Rice",
  "ingredients": ["2 chicken breasts", "1 cup rice", "2 tomatoes"],
  "instructions": [
    "Step 1: Prepare the ingredients",
    "Step 2: Cook the chicken",
    "Step 3: Combine with rice"
  ]
}
```

❌ **Error Responses:**

- **400 Bad Request:**
  ```json
  { "message": "Ingredients are required." }
  ```

---

### 💾 Save Recipe

Saves a generated recipe for later use.

📌 **Endpoint:**

```http
POST /api/recipe/save
```

📥 **Request Body:**

| Field           | Type     | Required | Description         |
| --------------- | -------- | -------- | ------------------- |
| 📌 title        | string   | ✅ Yes   | Recipe title        |
| 🥗 ingredients  | string[] | ✅ Yes   | List of ingredients |
| 📝 instructions | string[] | ✅ Yes   | Cooking steps       |

✅ **Success Response:**

```json
{
  "message": "Recipe saved successfully!"
}
```

❌ **Error Responses:**

- **400 Bad Request:**
  ```json
  { "message": "Recipe already saved." }
  ```

---

### 🗑️ Delete Recipe

Deletes a saved recipe.

📌 **Endpoint:**

```http
DELETE /api/recipe/saved/:id
```

📥 **Parameters:**

- `id`: Recipe ID to delete

✅ **Success Response:**

```json
{
  "message": "Recipe deleted successfully"
}
```

❌ **Error Responses:**

- **404 Not Found:**
  ```json
  { "message": "Recipe not found" }
  ```

---

## 📊 Status Codes

| Code   | Meaning                        |
| ------ | ------------------------------ |
| 🟢 200 | Success                        |
| 🟡 201 | Resource Created               |
| 🔴 400 | Bad Request / Validation Error |
| 🔴 401 | Unauthorized - Token Missing   |
| 🔴 404 | Resource Not Found             |
| 🔴 500 | Internal Server Error          |

🎯 **To Start Using the API:**

```sh
npm install
nodemon run server
```





















