# Event Planner Web Application

A full-stack **Event Planner Web Application** designed to help users organize and manage events from a single platform. The application provides dedicated modules for managing events, guests, tasks, budgets, invitations, and user profiles.

The frontend is built with **React and Vite** and communicates with a backend API for authentication and persistent data management.

## ✨ Features

### 🔐 Authentication & User Management

* User registration and login
* JWT-based authentication
* Protected application routes
* User profile management
* Update profile information
* Passwords handled using secure hashing on the backend

### 📅 Event Management

* Create new events
* View event details
* Update existing events
* Delete events
* Manage event date, time, venue, type, theme, and guest count
* Assign guests to events
* Generate invitation codes for selected guests
* View invitations associated with an event

### 👥 Guest Management

* Add guests
* View all guests
* View individual guest details
* Update guest information
* Delete guests
* Store guest name, email, phone number, and status

### ✅ Task Management

* Create event-related tasks
* Set task deadlines
* Track task descriptions and status
* Search tasks
* Sort tasks
* Update tasks
* Delete tasks

### 💰 Budget Management

* Create budget categories
* Track allocated budget
* Track spending
* Calculate remaining budget
* View individual budget records
* Update budget information
* Delete budget records

### 🔎 Search & Sorting

The application provides search and sorting functionality for managing large collections of events and tasks.

Users can search event information using fields such as:

* Event name
* Date
* Time
* Venue

Tasks can be searched using:

* Task name
* Deadline
* Description
* Status

Events and tasks can also be sorted according to their respective ordering options.

### 📤 Event Invitations

When guests are assigned to an event, the backend generates unique invitation codes using `nanoid`. These invitations are associated with both the event and guest.

## 🛠️ Tech Stack

### Frontend

* **React 19**
* **Vite**
* **React Router**
* **Tailwind CSS**
* **Bootstrap**
* **shadcn/ui**
* **React Hook Form**
* **Zod**
* **Axios**
* **Lucide React**
* **Recharts**
* **Sonner**
* **Embla Carousel**
* **EmailJS**

The current `package.json` confirms React 19, Vite, React Router, Tailwind CSS, Axios, React Hook Form, Zod, Recharts, and the other UI libraries used by the project.

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT**
* **bcryptjs**
* **CORS**
* **Nanoid**

### Deployment

* **Vercel**

The frontend repository includes a Vercel rewrite configuration for SPA routing.

## 📂 Project Structure

```text
event-Frontend/
│
├── public/
│
├── src/
│   ├── app/
│   │
│   ├── assets/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── icons/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── features/
│   │   ├── budget/
│   │   ├── dashboard/
│   │   ├── events/
│   │   ├── guests/
│   │   ├── share/
│   │   ├── tasks/
│   │   └── venue/
│   │
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── contact.jsx
│   │   ├── home.jsx
│   │   ├── login.jsx
│   │   ├── notfound.jsx
│   │   └── register.jsx
│   │
│   ├── router/
│   ├── index.css
│   ├── main.jsx
│   └── test.jsx
│
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
├── vite.config.js
└── README.md
```

The repository currently follows this feature-based structure under `src/features`, with separate areas for budget, dashboard, events, guests, sharing, tasks, and venue functionality.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/naveen20003/event-Frontend.git
cd event-Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will start the development server and provide the local URL in the terminal.

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

## 🔑 Environment Variables

Create a `.env` file in the project root and configure the API URL and any other environment-specific values required by the application.

Example:

```env
VITE_API_URL=your_backend_api_url
```

> Do not commit your `.env` file or expose private credentials in the repository.

## 🔄 Application Flow

```text
User
  │
  ▼
React Frontend
  │
  ├── Authentication
  │
  ├── Dashboard
  │
  ├── Events
  │     ├── Create
  │     ├── Update
  │     ├── Delete
  │     └── Invitations
  │
  ├── Guests
  │
  ├── Tasks
  │
  ├── Budget
  │
  └── Profile
        │
        ▼
    Backend REST API
        │
        ▼
      MongoDB
```

## 📡 API Functionality

The application communicates with backend endpoints for:

| Resource       | Operations                   |
| -------------- | ---------------------------- |
| Authentication | Register, Login              |
| Profile        | Get, Update                  |
| Events         | Create, Read, Update, Delete |
| Invitations    | Generate, Retrieve           |
| Guests         | Create, Read, Update, Delete |
| Tasks          | Create, Read, Update, Delete |
| Budget         | Create, Read, Update, Delete |

The backend implementation uses authenticated requests and associates event, guest, task, and budget records with the logged-in user's ID.

## 🧩 Architecture

The frontend uses a **feature-based architecture** rather than putting all application pages and components into a single directory.

This makes it easier to maintain individual areas of the application:

```text
features/
├── events/
├── guests/
├── tasks/
├── budget/
├── dashboard/
├── share/
└── venue/
```

Reusable UI and layout components are maintained separately under `components/`, while routing, hooks, and utility logic have their own directories.

## 🎯 Project Objectives

The main objective of this project is to provide a centralized platform where users can manage the different aspects of planning an event.

Instead of managing event information, guests, tasks, and budgets separately, the application brings these workflows together into one application.

## 🚀 Future Improvements

Potential improvements include:

* Real-time notifications
* Email invitation delivery
* Guest RSVP tracking
* Calendar integration
* Event reminders
* Venue management improvements
* Expense analytics
* Advanced dashboard analytics
* File and image uploads
* Social/event sharing
* Role-based access control

## 👨‍💻 Author

**Naveen Saini**

**BCA Graduate — IPS Business School**

Full-Stack Web Developer focused on building modern web applications using the **MERN stack**.

## 📄 License

This project is available for educational and portfolio purposes.
