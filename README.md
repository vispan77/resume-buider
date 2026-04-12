# 🤖 AI Resume Builder

An intelligent web application that helps users create professional, structured resumes. Users can input their details, edit sections, and generate a clean resume layout instantly.

---

## 🚨 Update (Resubmission Note)

This project has been **updated and resubmitted** after fixing a validation issue:

* ❌ Previously: Users could save changes without filling input fields
* ✅ Now: Proper validation is implemented
* ⚠️ Users will see error messages if required fields are empty
* 🔒 Prevents saving incomplete data

---

## 🚀 Live Demo

👉 https://resumebuider.vercel.app/

---

## 📌 Features

* 🧑‍💼 Add personal information
* 🎓 Add education details
* 💼 Add work experience
* 🛠️ Add skills
* ✏️ Edit and update resume anytime
* 📄 Structured resume preview
* ⚠️ Form validation with error messages
* 📱 Responsive design

---

## 🛠️ Tech Stack

**Frontend:**

* React.js
* HTML5
* CSS3
* JavaScript

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/vispan77/resume-buider
cd ai-resume-builder
```

### 2️⃣ Install dependencies

**Frontend**

```bash
cd frontend
npm install
npm start
```

**Backend**

```bash
cd backend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the backend folder and add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## 🧠 How It Works

1. User enters personal and professional details
2. Data is managed through form inputs
3. Validation checks ensure required fields are filled
4. Resume is generated in a structured format
5. Users can edit and update anytime

---

## 🔧 Validation Logic (Key Fix)

* Required fields are validated before saving
* Error messages are displayed for empty inputs
* Form submission is blocked if validation fails
* Ensures clean and complete resume data

---

## 🚧 Challenges Faced

* Implementing proper form validation
* Managing dynamic form data
* Syncing frontend state with backend
* Preventing incomplete submissions

---

## ✨ Future Improvements

* 🤖 AI-based content suggestions
* 📄 Download resume as PDF
* 🔐 User authentication (Login/Signup)
* ☁️ Cloud storage for resumes
* 🎨 Multiple resume templates



## 👨‍💻 Author

**Vishal Pandey**

* GitHub: https://github.com/vispan77
* LinkedIn: https://www.linkedin.com/in/vipan76/

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
