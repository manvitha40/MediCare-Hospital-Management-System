# MediCare HMS — Hospital Management System

MediCare HMS is a modern, full-stack Hospital Management System designed to automate clinical operations. The system features a unified database shared by four distinct portals: **Admin**, **Doctor**, **Receptionist**, and **Patient**.

## Features & Workflows
- **Public Landing Page**: Responsive medical landing page highlighting specialties, clinic statistics, and expert cards.
- **Secure Authentication**: Role-based access control (RBAC) enforced via JSON Web Tokens (JWT).
- **Admin Portal**: Statistics, growth charts, medical specialty departments registry, inventory logs, ward settings, and doctor/patient management.
- **Doctor Portal**: Personal consult schedule, patient details, diagnostic prescription generator, lab report tracking, and profile shifts configurator.
- **Receptionist Portal**: Front desk check-ins, patient registration forms, doctor appointment scheduler, ward room allocators, and billing invoice compilers.
- **Patient Portal**: Comprehensive health portal with step-by-step Book Appointment wizard, clinical prescription log, downloaded lab files, and billing payment desk.

---

## Technical Stack
- **Frontend**: React (Vite), React Router DOM (v6), Recharts (data visualizations), Lucide Icons.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Zero-Setup Database Fallback**: Built-in file-based JSON database fallback (`server/data/*.json`) to allow full operation and data persistence even if MongoDB is not running locally.

---

## Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Seeding & Database Initialization
From the root directory, run the seed script to populate mock JSON files and MongoDB collections:
```bash
cd server
node utils/seed.js
```

### 3. Running the Server
Start the Express API server (defaulting to Port `5005`):
```bash
cd server
npm start
```
*Note: If MongoDB is not running locally on port 27017, the server will log a warning and automatically fall back to the JSON file-based database. All operations (write/read/delete) will be fully functional and persistent!*

### 4. Running the React Client
Start the Vite development server (Port `3000`):
```bash
cd client
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Demo Credentials
To simplify testing, the login panel contains quick-fill buttons for the following profiles:

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@medicare.com` | `admin123` |
| **Doctor** | `john@medicare.com` | `doctor123` |
| **Receptionist** | `receptionist@medicare.com` | `reception123` |
| **Patient** | `rahul@gmail.com` | `patient123` |

---

## Folder Structure
```
MediCare HMS/
├── client/
│   ├── src/
│   │   ├── components/      # Reusable modals, tables, badges, toasts
│   │   ├── context/         # AuthContext session manager
│   │   ├── layouts/         # DashboardLayout (RBAC frames)
│   │   ├── pages/           # Public, Admin, Doctor, Receptionist, Patient portals
│   │   └── services/        # Fetch API wrapper
│   └── vite.config.js       # Vite configuration with backend proxy
└── server/
    ├── config/              # Database connection configuration
    ├── controllers/         # Unified REST controllers
    ├── middleware/          # JWT auth & authorization middleware
    ├── models/              # Mongoose schemas
    ├── routes/              # Express API endpoints router
    └── utils/               # Seeding script and Mock Database fallback driver
```

---

## Clinical Flow Demonstration Walkthrough
To test the complete clinical flow from check-in to checkout:
1. **Patient Registration**: Open the landing page, register a new patient or log in as `rahul@gmail.com`.
2. **Schedule Appointment**: Go to the **Book Appointment** wizard, pick a specialty clinic, select a doctor, select date/time, add symptoms, and confirm.
3. **Doctor Review & Diagnose**: Log in as `john@medicare.com`, open **Appointments**, click **Confirm**, then click **Consult & Prescribe**. Choose the prescribed medicines from the inventory, log instructions, and click **Submit**.
4. **Billing & Discharge**: Log in as `receptionist@medicare.com`. Open **Billing**, and you will see the compiled invoice (Doctor Fee + Medicine Costs + Tax). If payment is collected, click **Collect Payment** to settle.
5. **View Records**: Log back in as the patient. Go to **Medical Records** to view your prescription and download the payment receipt!
