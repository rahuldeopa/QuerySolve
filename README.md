

# Features
### User side
- ask the question
- give the answer
- upvote and downvote
- their profile Analysis

## Technologies
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-blue)
![React](https://img.shields.io/badge/-React-61DAFB)
![JavaScript](https://img.shields.io/badge/-JavaScript-yellow)
![Node.js](https://img.shields.io/badge/-Node.js-339933)


## How To Run?

### 1. Environment Setup

**Frontend (Root directory)**
Create a `.env` file in the root of the project:
```env
VITE_BACKEND_URL=http://localhost:5000
```

**Backend (`/backend` directory)**
Create a `.env` file in the `backend` folder:
```env
DATABASE_URL="your_postgresql_database_url"
PORT=5000
JWT_SECRET="YourSecretKey"
```

### 2. Start the Frontend

From the root directory of the project:
```sh
npm i
npm start
```

### 3. Start the Backend

Open a new terminal and navigate to the backend directory:
```sh
cd backend
npm i
npm start
```


