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

## 📦 Dependencies

### Client

```json
{
  "@heroicons/react": "^2.2.0",
  "@tailwindcss/vite": "^4.1.7",
  "daisyui": "^5.0.35",
  "dayjs": "^1.11.13",
  "firebase": "^11.8.0",
  "lottie-react": "^2.4.1",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-icons": "^5.5.0",
  "react-router": "^7.6.0",
  "react-toastify": "^11.0.5",
  "react-tooltip": "^5.28.1",
  "sweetalert2": "^11.21.2",
  "tailwindcss": "^4.1.7"
}

##🧪 Local Development Setup

To run this project locally on your machine, follow the steps below.

###Prerequisites

- Node.js installed
- MongoDB URI (local or from MongoDB Atlas)
- Firebase project (for Auth + Hosting)
- Git installed

### Clone the Repositories

```
git clone https://github.com/Md-Istiake-Islam/A-Gardening-Community-Resource-Hub.git
git clone https://github.com/your-username/garden-community-server.git
```
### Backend Setup

```
cd garden-community-server
npm install
```
### Create a .env file in the root of the server directory and add:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```
### Start the server:

```
node index.js
```

### Frontend Setup

```
cd ../garden-community-client
npm install
```
### Make sure Firebase configuration is correctly set inside your firebase.config.js file, or via environment variables.

### Start the development server:

```
npm run dev
```
