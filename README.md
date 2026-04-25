# 🌐 InternArea – Internship Management Platform

> A full-stack web application designed to streamline internship discovery, applications, and tracking with an integrated admin verification system.

---

## 📌 Overview

InternArea is a modern internship platform where students can explore opportunities, apply seamlessly, and track their application status in real-time. It also provides an admin panel to manage users, verify submissions, and maintain platform integrity.

This project focuses on solving real-world problems like application tracking, verification workflows, and user management — making it more than just a listing website.

---

## ✨ Features

### 👨‍🎓 User Features
- 🔐 Secure authentication (JWT-based login/signup)
- 📄 Browse internships and programs
- 📝 Apply with required details
- 📤 Upload documents (resume/receipt)
- 📊 Track application status (Pending / Approved / Rejected)
- 👤 Editable user profile dashboard

### 🛠️ Admin Features
- 🧾 Manage all applications
- ✅ Approve or reject submissions
- 👥 Manage users
- 📊 Monitor platform activity

### 🎨 UI/UX
- 🌙 Dark/Light mode
- ⚡ Smooth animations (Framer Motion)
- 📱 Fully responsive
- 🔔 Toast notifications

---

## 🧱 Tech Stack

| Layer        | Technology |
|-------------|-----------|
| Frontend     | React.js, Tailwind CSS |
| Backend      | Node.js, Express.js |
| Database     | MongoDB / MySQL |
| Auth         | JWT |
| Deployment   | Vercel, Render |

---

## 📂 Project Structure

    InternArea/
    │
    ├── client/
    │   ├── components/
    │   ├── pages/
    │   ├── hooks/
    │   └── utils/
    │
    ├── server/
    │   ├── controllers/
    │   ├── routes/
    │   ├── models/
    │   ├── middleware/
    │   └── config/
    │
    ├── .env
    ├── package.json
    └── README.md

---

## ⚙️ Setup Instructions

### 1. Clone Repo
```bash
git clone https://github.com/your-username/internarea.git
cd internarea
```

### 2. Install Dependencies

Frontend:
```bash
cd client
npm install
```

Backend:
```bash
cd server
npm install
```

---

### 3. Environment Variables

Create `.env` inside `server/`

```env
PORT=5000
MONGO_URI=your_database_url
JWT_SECRET=your_secret_key
RAZORPAY_KEY=your_key
```

---

### 4. Run Project

Backend:
```bash
cd server
npm run dev
```

Frontend:
```bash
cd client
npm start
```

---

## 🔌 API (Sample)

| Method | Endpoint                | Description         |
|--------|------------------------|---------------------|
| GET    | /api/internships        | Get all internships |
| POST   | /api/apply              | Apply               |
| GET    | /api/user/profile       | Get profile         |
| PUT    | /api/user/profile       | Update profile      |
| POST   | /api/upload             | Upload documents    |
| GET    | /api/application/status | Track status        |

---

## 🚀 Future Improvements

- Email notifications  
- AI-based recommendations  
- Admin analytics dashboard  
- Mobile app  
- Resume scoring system  

---

## 👨‍💻 Author

Aakash  
Full-Stack Developer  

---

## 📜 License

MIT License  

---

## ⭐ Contributing

Feel free to fork and submit pull requests.

---

## 💬 Final Note

Built to simplify internship access and management for students while ensuring a structured and verified workflow.
