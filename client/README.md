# AI Recipe Generator - Frontend

![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-4.4.5-purple?style=for-the-badge&logo=vite)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-blue?style=for-the-badge&logo=tailwind-css)
![Ant Design](https://img.shields.io/badge/AntDesign-5.2.2-blue?style=for-the-badge&logo=antdesign)

## 📌 Overview

This is the frontend of an **AI-powered Recipe Generator & Curator Web Application** built using **React (Vite)**. Users can input ingredients, get AI-generated recipes, save their favorites, and manage their profiles.

## 🚀 Tech Stack

- **React (Vite)** - Fast frontend development
- **Tailwind CSS + Ant Design** - Modern and responsive UI
- **Redux Toolkit** - State management
- **Axios** - API handling
- **React Router** - Routing management

## 🗂️ Folder Structure

```
frontend/
│── public/                  # Static assets
│── src/
│   ├── api-services/        # API calls (auth, recipes, user)
│   │   ├── auth-service.js
│   │   ├── recipe-service.js
│   │   ├── user-service.js
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── SearchRecipes.jsx
│   │   ├── Spinner.jsx
│   ├── config/              # Config files (Axios instance)
│   │   ├── axiosInstance.js
│   ├── pages/               # All pages
│   │   ├── auth/            # Authentication pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   ├── private/         # Protected pages
│   │   │   ├── recipe/
│   │   │   │   ├── GenerateRecipe.jsx
│   │   │   │   ├── RecipeCard.jsx
│   │   │   ├── user/
│   │   │   │   ├── ProfileInformation.jsx
│   │   │   ├── Home.jsx
│   │   ├── public/          # Publicly accessible pages
│   │   │   ├── About.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Landing.jsx
│   │   │   ├── Product.jsx
│   ├── routes/              # App routes configuration
│   │   ├── AppRoutes.jsx
│   ├── store/               # Redux state management
│   │   ├── features/
│   │   │   ├── alertSlice.js
│   │   │   ├── recipeSlice.js
│   │   │   ├── userSlice.js
│   │   ├── store.js
│   ├── theme/               # Theme provider for styling
│   │   ├── ThemeProvider.jsx
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│── .env.example             # Environment variables template
│── .gitignore               # Files to ignore in Git
│── eslint.config.js         # Linting configuration
│── index.html               # Main HTML file
│── package.json             # Dependencies and scripts
│── vite.config.js           # Vite configuration
```

## 📌 Features

✅ AI-powered recipe generation using Google Gemini API  
✅ Secure authentication (Signup/Login)  
✅ Save and retrieve favorite recipes  
✅ Responsive UI with Tailwind CSS and Ant Design  
✅ Global state management using Redux Toolkit  
✅ Optimized API handling with Axios and caching  
✅ Protected routes for authenticated users

---

## 🔄 State Management (Redux)

The application uses Redux Toolkit for managing global states. It contains the following slices:

- **alertSlice.js** → Handles UI alerts
- **recipeSlice.js** → Manages recipes data
- **userSlice.js** → Stores user authentication details

## 📌 API Services

All API calls are centralized in `src/api-services/`:

- **auth-service.js** → Authentication APIs
- **recipe-service.js** → Recipe-related APIs
- **user-service.js** → User profile APIs

## 🔗 Routing Structure

Routes are managed in `AppRoutes.jsx`, using `ProtectedRoute.jsx` for private routes.

## ℹ️ Usage

To start using the application, run the development server:

```sh
npm install
npm run dev
```
