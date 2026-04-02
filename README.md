# Lead Web Backend API

This is the backend API for the Lead Web Task Management application. It is built with Node.js, Express, and uses Sequelize ORM to interact with a MySQL database.

## Prerequisites

- Node.js (v18 or higher recommended)
- MySQL Server

## Getting Started

### 1. Database Setup
Create a MySQL database named `lead_web` (or whatever you have defined in your `.env` file).

### 2. Environment Variables
Ensure you have a `.env` file in the root directory of this project with the following (or similar) configuration:

```env
PORT=5001

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=lead_web

JWT_SECRET=your_super_secret_jwt_key
```

### 3. Install Dependencies
Install all required Node modules:
```bash
npm install
```

### 4. Running the Server

**Development Mode (auto-restarts on code changes):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

*Note: The server will automatically sync and create the required database tables via Sequelize upon starting up.*

## Authentication
This API uses JWT (JSON Web Tokens) for authentication. When authenticating endpoints via the frontend, tokens are passed as `Bearer <token>` in the Authorization header.

## API Endpoints

- `GET /` - Health check (Test Route)
- `POST /api/auth/register` - Create a new user
- `POST /api/auth/login` - Login to get JWT
- `GET /api/tasks` - Fetch all tasks for the logged in user (supports pagination)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task
