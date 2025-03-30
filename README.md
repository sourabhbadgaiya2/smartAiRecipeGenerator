# 🥗 AI Recipe Generator

AI-powered recipe generator & curator web application that suggests recipes based on user-input ingredients. This project follows a **MERN Stack** architecture with **Redis caching** for enhanced performance.

---

## 📂 Project Structure

```
📦 Project Root
├── 📁 client      # Frontend (React + Vite)
│   ├── 📄 README.md # Frontend Documentation
├── 📁 server        # Backend (Node.js + Express + MongoDB)
│   ├── 📄 README.md # Backend Documentation
├── 📄 package.json  # Root package config
├── 📄 .gitignore    # Ignored files
└── 📄 README.md     # You're here!
```

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```sh
# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install
```

### 2️⃣ Set Up Environment Variables

- Configure `.env` file in both **frontend** and **server** directories using `.env.example` as reference.

### 3️⃣ Start Development Servers

```sh
# Start backend server
cd server && npm run dev

# Start frontend server
cd ../frontend && npm run dev
```

The frontend will be running at **`http://localhost:5173`** and backend at **`http://localhost:5000`**.

---

## 📖 Detailed Documentation

For detailed instructions, refer to:

- **Frontend Setup:** [client/README.md](client/README.md)
- **Backend Setup:** [server/README.md](server/README.md)

---

## 🎯 Features

✅ AI-powered recipe generation using **Google Gemini API**  
✅ User authentication (signup/login)  
✅ Save & retrieve recipes  
✅ **Redis caching** for fast responses  
✅ Responsive & polished UI using **TailwindCSS & Ant Design**  
✅ Scalable **MERN architecture**

---

## 🤝 Contributing

Feel free to fork this project and contribute! Create a PR with your improvements. 😊

---

## 📜 License

This project is licensed under the **MIT License**.
