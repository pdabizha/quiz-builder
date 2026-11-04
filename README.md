# Quiz Builder

A full-stack application for creating, viewing, and managing quizzes with different question types.

## Tech Stack

**Frontend**

* Next.js
* React
* TypeScript
* Tailwind CSS
* React Hook Form
* Zod

**Backend**

* NestJS
* TypeScript
* Sequelize
* PostgreSQL
* class-validator

## Features

* Create quizzes with a title and multiple questions.
* Support three question types:

  * **Boolean** — True / False questions.
  * **Input** — questions with a text-based expected answer.
  * **Checkbox** — multiple-choice questions with one or more correct answers.
* View all quizzes and their question counts.
* View quiz details and correct answers.
* Delete quizzes.

## Project Structure

```text
quiz-builder/
├── backend/
├── frontend/
├── .gitignore
├── package.json
└── README.md
```

## Prerequisites

Make sure you have installed:

* Node.js 22 or later
* npm
* PostgreSQL

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/pdabizha/quiz-builder.git
cd quiz-builder
```

### 2. Install dependencies

Install root dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
cd ..
```

Install frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

### 3. Configure environment variables

Create a `.env` file in the `backend` directory using the example:

```bash
cp backend/.env.example backend/.env
```

Configure your PostgreSQL credentials:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=quiz_builder

FRONTEND_URL=http://localhost:3001
```

Create the frontend environment file:

```bash
cp frontend/.env.example frontend/.env.local
```

Set the backend API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Create the database

Create a PostgreSQL database:

```sql
CREATE DATABASE quiz_builder;
```

Make sure PostgreSQL is running and the credentials in `backend/.env` are correct.

### 5. Run database migrations

From the project root:

```bash
npm run migrate --prefix backend
```

### 6. Start the application

Run both applications from the project root:

```bash
npm run dev
```

The applications will be available at:

* Frontend: http://localhost:3001
* Backend API: http://localhost:3000

You can also start each application separately:

**Backend:**

```bash
cd backend
npm run start:dev
```

**Frontend:**

```bash
cd frontend
npm run dev -- -p 3001
```

## API

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| POST   | `/quizzes`     | Create a quiz    |
| GET    | `/quizzes`     | Get all quizzes  |
| GET    | `/quizzes/:id` | Get quiz details |
| DELETE | `/quizzes/:id` | Delete a quiz    |

### Create a sample quiz

You can create a sample quiz using the following request:

```bash
curl -X POST http://localhost:3000/quizzes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "JavaScript Basics",
    "questions": [
      {
        "text": "Is JavaScript a programming language?",
        "type": "BOOLEAN",
        "options": [
          { "text": "True", "isCorrect": true },
          { "text": "False", "isCorrect": false }
        ]
      },
      {
        "text": "What keyword declares a constant in JavaScript?",
        "type": "INPUT",
        "expectedAnswer": "const",
        "options": []
      },
      {
        "text": "Which of the following are JavaScript data types?",
        "type": "CHECKBOX",
        "options": [
          { "text": "String", "isCorrect": true },
          { "text": "Boolean", "isCorrect": true },
          { "text": "HTML", "isCorrect": false }
        ]
      }
    ]
  }'
```

The API assigns question and option order based on their position in the request.

### Get all quizzes

```bash
curl http://localhost:3000/quizzes
```

### Get a quiz by ID

```bash
curl http://localhost:3000/quizzes/YOUR_QUIZ_ID
```

### Delete a quiz

```bash
curl -X DELETE http://localhost:3000/quizzes/YOUR_QUIZ_ID
```

## Scripts

Run the following commands from the project root:

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start frontend and backend |
| `npm run build` | Build frontend and backend |

Backend and frontend also provide their own scripts in their respective `package.json` files.
