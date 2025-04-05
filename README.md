# PogoDo: Full-Stack Task Management App

## 🚀 Overview

**PogoDo** is a full-stack task management application developed as part of a group project for COSC 310 at UBC Okanagan. It combines a **React + Vite + Tailwind CSS** frontend, a **Spring Boot** backend, and a **MySQL** database, showcasing a modern and scalable web development stack.

---

## 🤝 Acknowledgments

Huge thanks to the **COSC 310 Team Ogo** collaborators:
- [branden6](https://github.com/branden6)
- [catrobert](https://github.com/catrobert)
- [priyanshupc04](https://github.com/priyanshupc04)
- [WillClarksonn](https://github.com/WillClarksonn)

> This version of the project is maintained by [DragonShadow343](https://github.com/DragonShadow343), with personalized documentation and continued improvements.

---

## 🔧 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Spring Boot, Spring Data JPA, Express.js (routing)
- **Database:** MySQL (hosted on Aiven)
- **Testing:** Jest (JavaScript), Babel
- **Real-Time Features:** WebSocket, SockJS, STOMP

---

## ✨ Features

### ✅ Frontend
- Secure login and signup with hashed passwords
- Password validation (8-character unique check)
- Admin/User dashboards for task management
- Task attributes: title, description, deadline, priority, assignee, and status
- Real-time chat for teams and admins
- Notification center for task updates
- "Forget Password" recovery feature
- Filterable search bar (date, user, priority, status)
- Daily task overview page
- Redesigned task board with creative UI

### ✅ Backend
- RESTful API with Spring Boot
- Business logic layer handles task workflows and permissions
- Chat feature implemented with WebSocket, SockJS, and STOMP
- Task controller and account interface logic
- CORS implementation for frontend/backend security

### ✅ Database
- MySQL with Spring Data JPA
- Efficient relational entity management
- Deployed on Aiven Cloud

---

## 📌 My Personal Contributions

As part of the development team, I was primarily responsible for:

- 🔐 Frontend login and signup logic using React + form validation  
- 🔁 Role-based route protection using `requireAuth`  
- 📨 Notification system for assigned/completed tasks  
- 🧪 Writing and running Jest tests for frontend components  
- 🧠 UX design refinements across the task dashboard  
- 🛠️ Bug fixing and debugging backend connection with cURL  
- 📂 Git repository management and local-to-remote migration  

---

## 🐳 Dockerized Setup

To run the entire application (frontend + backend + MySQL) with Docker:

### 📁 Step 1: Create a `.env` file in the project root

```env
# Backend Environment Variables
SPRING_DATASOURCE_URL=jdbc:mysql://your-mysql-host:port/db_name
SPRING_DATASOURCE_USERNAME=your_db_username
SPRING_DATASOURCE_PASSWORD=your_db_password

# Frontend Environment Variable
VITE_BACKEND_URL=http://localhost:3500
```
> ⚠️ This .env file is excluded from version control via .gitignore.

### 🚀 Step 2: Start the app

```
docker-compose up --build
```

This will:
- Build the backend and frontend Docker containers
- Connect to your MySQL database
- Start the app at:
  - Frontend: http://localhost:5173
  - Backend API: http://localhost:3500

---

## 🛠 Known Bugs & Fixes

### Notifications
- Bug: Notifications sent to all users assigned, even duplicates
- Fix: Replace arrays with Sets to prevent repeated alerts

### Search Bar
- Bug: No UI feedback when no tasks are found
- Fix: Display “No matching tasks found” message

---

## 🧭 Future Enhancements

- Task tagging & multi-assignee support
- Admin-based project linking
- User commenting on tasks
- More granular permissions and analytics

---

## 🧑‍💻 Manual Development Setup (Optional)

For local development without Docker:

### 🖥 Frontend
```
cd FrontEnd
npm install
npm run dev
```
### 🔧 Backend
```
cd BackEnd/pogodo
mvn spring-boot:run
```
Make sure your MySQL database is running and accessible.

---

## 🗃️ Database Setup (Optional for Local MySQL)

1. Create a MySQL database locally or use Aiven Cloud.
2. Run the SQL script located at /database/setup.sql:
```
mysql -u root -p < database/setup.sql
```
This will create all tables and insert sample data.

---
## 📄 License

This project is licensed under the MIT License.