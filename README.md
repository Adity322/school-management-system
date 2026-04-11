# school-management-system
# 🎓 School Management System

A full-stack **MERN (MongoDB, Express, React, Node.js)** application that allows admins to manage students and assign tasks efficiently.

---

## 🚀 Features

### 👨‍💼 Admin Authentication

* Register and Login functionality
* Secure authentication using JWT
* Each admin has isolated data (no data leakage)

### 👨‍🎓 Student Management

* Add new students
* View all students
* Edit student details
* Delete students

### 📌 Task Management

* Assign tasks to students
* View all assigned tasks
* Mark tasks as completed
* Tasks are linked to specific students

### 🔐 Admin Isolation (Advanced Feature)

* Each admin can only see:

  * Their own students
  * Their own tasks
* Ensures multi-user data security (like real SaaS apps)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Bcrypt (password hashing)

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 📂 Folder Structure

```
school-management-system/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── api.js
│   │   └── App.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/school-management-system.git
cd school-management-system
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=10000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🌐 Environment Variables

### Backend (.env)

* `PORT`
* `MONGO_URI`
* `JWT_SECRET`

### Frontend

* Update `BASE_URL` in `api.js`:

```js
const BASE_URL = "https://your-backend-url.onrender.com";
```

---

## 🚀 Deployment

### Frontend (Vercel)

* Connect GitHub repo
* Select `frontend` folder
* Deploy

### Backend (Render)

* Create Web Service
* Root directory: `backend`
* Add environment variables
* Deploy

---

## ⚠️ Common Issues (Solved)

* ❌ CORS errors → Fixed by enabling CORS in backend
* ❌ Mixed content (HTTP/HTTPS) → Use HTTPS backend URL
* ❌ JWT errors → Ensure token is sent in headers
* ❌ Data sharing between admins → Fixed using `adminId`

---

## 📸 Screenshots

* Login Page
* Register Page
* Dashboard
* Task Management

*(Add screenshots here for better presentation)*

---

## 👨‍💻 Author

**Aditya Kumar Singh**

* GitHub: https://github.com/Adity322
* LinkedIn: www.linkedin.com/in/aditya-singh-a2400b33b

---

## ⭐ Future Improvements

* Google OAuth Login
* Role-based access (Teacher/Student)
* Analytics Dashboard
* Notifications system
* Mobile responsive UI improvements

---

## 💡 Conclusion

This project demonstrates:

* Full-stack development skills
* Authentication & authorization
* REST API design
* Real-world multi-user system design

---
