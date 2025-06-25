# Lostify App

Lostify is a full-stack web application that allows users to report **lost or found items**, **view all listed items**, **track recovered items**, and **get detailed information** on individual reports. The app is built using React, Firebase, Node.js, and MongoDB.

---

## 🔗 Live URL

https://lostify-app.example.com

---

## 🎯 Purpose

Lostify simplifies the process of recovering lost items by offering a centralized platform where people can:
- Submit details about items they’ve lost or found.
- View others' submissions.
- Contact the original owners.
- Mark items as recovered.

---

## 🧩 Key Features

- ✅ **Submit Lost/Found Items** with title, image, description, date, and contact info.
- 📄 **View Item Details** via “View” button.
- 📋 **Browse All Lost & Found Items**
- 🟢 **Recovered Items List**
- 🔐 **User Authentication via Firebase**
- 📅 **React Date Picker** for intuitive date input
- 🌐 **REST API Backend** (Node.js + Express + MongoDB)
- 🔄 **Auto Update UI** on submission and recovery

---

## 🛠️ Technologies & NPM Packages Used

### 🔧 Frontend (React)
- `react`
- `react-router-dom`
- `tailwindcss`
- `sweetalert2`
- `react-datepicker`
- `dayjs`
- `axios`
- `firebase`

### ⚙️ Backend (Node.js + Express)
- `express`
- `cors`
- `dotenv`
- `mongodb`
- `jsonwebtoken`
- `cookie-parser`

### ☁️ Firebase
- Authentication (email/password or Google)
- (Optionally) Hosting

---

## 📁 Project Structure

```bash
lostify-app/
├── client/           # React frontend
│   ├── src/
│   ├── public/
│   └── ...
├── server/           # Node.js backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── index.js
└── README.md
