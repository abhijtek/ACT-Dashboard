# ACT Dashboard

ACT Dashboard is a full-stack workspace application with authentication, protected routes, account management, and a responsive dashboard UI. The project is split into a React + Vite frontend and an Express + MongoDB backend.

## Tech Stack

- Frontend: React, Vite, Redux Toolkit, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Cookie Parser
- Authentication: Cookie-based auth with protected frontend routes and backend user validation

## Project Structure

```text
ACT-Dashboard/
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env
└── README.md
```

## Features

- User signup and login
- Cookie-based authentication
- Protected routes for authenticated users
- Account details page
- Dashboard data view
- Light and dark mode toggle
- Responsive UI built with Tailwind CSS
- Client-side form validation before API requests

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/abhijtek/ACT-Dashboard.git
cd ACT-Dashboard
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

Open a new terminal and run:

```bash
cd frontend
npm install
```

## Environment Setup

### Backend `.env`

Create `backend/.env` with values like:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=10d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

MAILTRAP_SMTP_HOST=your_mail_host
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your_mail_user
MAILTRAP_SMTP_PASS=your_mail_password

FORGOT_PASSWORD_REDIRECT_URL=http://localhost:3000/forgot-password
NODE_ENV=development
```

### Frontend `.env`

Create `frontend/.env` with:

```env
VITE_BACKEND_BASE_URL=http://localhost:8000
```

## Running the Project

### Start the backend

From the `backend` folder:

```bash
npm run dev
```

The backend should run on:

```text
http://localhost:8000
```

### Start the frontend

From the `frontend` folder:

```bash
npm run dev
```

The frontend should run on:

```text
http://localhost:5173
```

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

```bash
npm run dev
npm start
```

## Authentication Flow

- User signs up or logs in from the frontend
- Backend validates credentials and sets authentication cookies
- Frontend checks the current user on app load
- Protected routes redirect unauthenticated users to the login page

## Deployment Notes

### Frontend on Vercel

If deploying only the frontend, set:

- Root Directory: `frontend`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

### Backend

The backend is an Express server and should be deployed to a Node-compatible backend host. Make sure all backend environment variables are configured in the deployment platform.

## Important Notes

- Do not commit real `.env` files
- Rotate any secrets that were previously exposed in git history
- Use `.env.example` files if you want to share config structure safely
- In development, auth cookies use `sameSite: "lax"`
- In production, auth cookies use `sameSite: "none"` with `secure: true`

## API Summary

Main auth routes currently used by the frontend:

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/current-user`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/data`

## Author

Abhijeet Singh Rajput  
IIT ISM Dhanbad
