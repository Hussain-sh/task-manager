# Task Manager

A full-stack Task Management application built with TypeScript, Next.js, Node.js, Express, PostgreSQL and Prisma ORM.

## Tech Stack

**Frontend**

- Next.js 16 (App Router)
- TypeScript
- Material UI
- TanStack Query (server state management and data fetching)
- React Toastify

**Backend**

- Node.js + Express
- TypeScript
- Prisma ORM 7
- PostgreSQL
- Zod (validation)

## Project Structure

```
task-manager/
├── backend/       # Express REST API
└── frontend/      # Next.js application
```

## Prerequisites

- Node.js 18+
- PostgreSQL installed and running

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd task-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/task_manager"
FRONTEND_URL="http://localhost:3000"
PORT=8000
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate deploy
```

Seed the database with sample data:

```bash
npx prisma db seed
```

Start the backend server:

```bash
npm run dev
```

Backend runs on `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` folder:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## API Endpoints

| Method | Endpoint       | Description                                    |
| ------ | -------------- | ---------------------------------------------- |
| GET    | /api/tasks     | Get all tasks (supports filtering and sorting) |
| GET    | /api/tasks/:id | Get a single task                              |
| POST   | /api/tasks     | Create a new task                              |
| PUT    | /api/tasks/:id | Update a task                                  |
| DELETE | /api/tasks/:id | Delete a task                                  |

### Query Parameters for GET /api/tasks

| Param    | Values                  |
| -------- | ----------------------- |
| status   | TODO, IN_PROGRESS, DONE |
| priority | LOW, MEDIUM, HIGH       |
| sortBy   | createdAt, dueDate      |
| order    | asc, desc               |

## Screenshots

### Task List

![Task List](screenshots/task-list.png)

### Create Task

![Create Task](screenshots/create-task.png)

### Task Detail

![Task Detail](screenshots/task-detail.png)

### Edit Task

![Edit Task](screenshots/edit-task.png)

### Delete Confirmation

![Delete Confirmation](screenshots/delete-confirmation.png)

## Assumptions & Design Decisions

- **Prisma 7** was used which requires a `prisma.config.ts` file and `@prisma/adapter-pg` instead of the traditional `DATABASE_URL` in `schema.prisma`
- **TanStack Query** is used for all data fetching — it handles caching, loading states, and automatic refetching after mutations (create, update, delete) via `invalidateQueries`
- **Status is disabled on create** — new tasks always start as `TODO`
- **Confirmation dialog** is shown before deleting a task to prevent accidental deletion
- **Server-side filtering and sorting** is handled via query params rather than client-side for scalability
- **Next.js App Router** was used instead of CRA as it is the current standard for React applications
