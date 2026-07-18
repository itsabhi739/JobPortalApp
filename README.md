# 🚀 JobPortalApp

A full-stack **MERN Job Portal** that connects job seekers with recruiters. Recruiters can manage their companies and post job opportunities, while job seekers can discover, search, and apply for jobs.

## 📸 Demo

> Demo and live deployment coming soon.

<!-- Add screenshots here -->

<!-- ![JobPortal Demo](./screenshots/demo.png) -->

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/itsabhi739/JobPortalApp.git
cd JobPortalApp
```

### Backend

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file and add the required environment variables:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:
install nodemon and change the package.json in script add start as nodemon server.js
```bash
npm start
```

### Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The application will typically be available at:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:4000
```

## ✨ Features

* 🔐 JWT-based User Authentication
* ✉️ Email & OTP Verification
* 👥 Role-based Authorization
* 🧑‍💼 Recruiter Dashboard
* 🏢 Company Management
* 💼 Job Creation & Management
* 🔗 Automatic Recruiter-Company Association
* 🔍 Job Search & Filtering
* 📍 Location-based Job Search
* 🚦 Job Status Management
* 📋 Job Application Management
* 🔒 Protected Routes & APIs
* 📱 Modern & Responsive UI

## 🧰 Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## 👥 User Roles

### 🧑‍💼 Recruiter

Recruiters can manage their company, create job postings, manage active or closed jobs, and track applications.

### 👨‍🎓 Job Seeker

Job seekers can browse available jobs, search and filter opportunities, explore companies, and apply for suitable positions.

## 🔄 How It Works

```text
Recruiter
   │
   ├── Register / Login
   ├── Register Company
   ├── Create Jobs
   └── Manage Applications

Job Seeker
   │
   ├── Register / Login
   ├── Browse Jobs
   ├── Search & Filter
   └── Apply for Jobs
```

## 🗺️ Future Improvements

* [ ] Resume Upload
* [ ] Application Status Tracking
* [ ] Candidate Shortlisting
* [ ] Top Applicant Recommendations
* [ ] Recruiter Analytics
* [ ] Email Notifications
* [ ] Admin Dashboard


## 👨‍💻 Author

**Abhijeet Tiwari**

GitHub: `itsabhi739`

## 📄 License

This project is intended for learning and development purposes.

---

<div align="center">

### ⭐ If you like this project, consider giving it a star!

**Built with the MERN Stack**

</div>
