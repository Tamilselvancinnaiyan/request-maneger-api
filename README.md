Here is your **clean and minimal README.md**, exactly matching the structure you provided and formatted properly in Markdown.

You can directly paste this into your **backend README.md**.

---

# **request-maneger-api**

## **Request Management Backend (Node.js + Express + PostgreSQL)**

This backend is part of the **Request Management System** case study.
It implements authentication, authorization, employee → manager workflows, request approvals, actions, and closure logic.

---

## 🚀 **Features**

* User authentication using **JWT**
* Role-based access (**Employee**, **Manager**)
* Employees can **create** requests and assign to another employee
* Assigned employee’s **manager can approve / reject** the request
* Assigned employee can **close** the request *only after approval*
* Centralized error handling with custom error classes
* **Winston**-based logging
* Clean folder structure (controllers, services, models, middleware)
* PostgreSQL database using **Sequelize ORM**

---

## 🛠️ **Tech Stack**

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **Sequelize ORM**
* **JWT Authentication**
* **Winston Logging**

---

## 📦 **Setup Instructions**

### **1. Install Dependencies**

```bash
npm install
```

### **2. Create `.env` file in project root**

Add the shared credentials (DB URL, JWT secret, etc.)


### **3. Start Development Server**

```bash
npm run dev
```

---

