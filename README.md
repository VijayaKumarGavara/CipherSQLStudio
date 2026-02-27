# CipherSQLStudio – SQL Learning Platform

##  Overview

CipherSQLStudio is a browser-based SQL learning platform where users can practice SQL queries against pre‑configured assignments with real‑time execution and intelligent hints.

This application focuses on the user experience of attempting SQL assignments, not on creating or modifying databases. All assignments and sample data are pre‑inserted by administrators(me).

For this implementation,instead of mentioned **Employee Database**, I use the **University Database** schema has been used as the sandbox dataset. All assignments are designed around this database structure.

---

##  Core Features Implemented

1. **Assignment Listing Page**

- Displays all available SQL assignments
- Shows question number, title and difficulty level (Easy / Medium / Hard)
- Clickable interface to attempt a question

2. **Assignment Attempt Interface**

Each question page includes:

-  **Question Panel** – title, detailed description and difficulty badge
-  **Sample Data Viewer** – relevant tables with column names & types to help understand schema
-  **SQL Editor** – Monaco Editor integration with syntax highlighting
-  **Results Panel** – user output, expected output (if incorrect) and SQL error messages formatted cleanly
-  **LLM Hint Integration** – “Get Hints” button returns up to three conceptual hints (no solutions)

---

##  Technical Architecture

### Frontend Stack

- React (Vite)
- Vanilla CSS (mobile‑first approach)
- Monaco Editor

### Backend Stack

- Node.js / Express.js
- PostgreSQL (Sandbox execution database)
- MongoDB (Assignment persistence)
- Gemini API (LLM hint generation)

---

##  Database Design

###  PostgreSQL – Sandbox Database

Used for:

- Executing user SQL queries
- Running expected solution queries
- Comparing results

Dataset used: University database schema with tables such as `student`, `instructor`, `department`, `course`, `takes`, `teaches`, `advisor`, `section`, `classroom`, `time_slot`, `prereq`.

###  MongoDB – Persistence Database

Used for:

- Storing assignments, table metadata and expected SQL queries
- Collections: `questions`, `tables`

This separation ensures PostgreSQL remains a pure execution sandbox while MongoDB manages assignment configuration.

---

##  Security & Validation

- Blocks DDL statements (`DROP`, `ALTER`, `TRUNCATE`, etc.)
- Prevents multiple SQL statements
- Strips SQL comments before validation
- Ensures only safe `SELECT` queries are executed

### Controlled Execution Flow

1. User query validated via `queryValidator.js`
2. PostgreSQL executes user and expected queries
3. Results normalized and compared with strict JSON comparison
4. Response returned to frontend for display

---

##  LLM Hint System

- Backend constructs a strict prompt enforcing:
  - No full SQL queries or complete `SELECT` statements
  - Maximum of three short conceptual hints
- Gemini API is called; response parsed into structured hints
- Hints returned to frontend and displayed within the UI

---

##  Data Flow

### Query Execution

1. React `handleRun()` triggers POST `/api/query/execute`
2. Express route receives request and validates query
3. PostgreSQL executes both user and expected queries
4. Results normalized, compared and JSON returned
5. React updates state; `ResultTable` renders output

### Hint Generation

1. User clicks "Get Hints" → POST `/api/hint`
2. Backend builds prompt from question description
3. Gemini API called; hints parsed and returned
4. React updates state; hints displayed to user

---

##  Responsive Design Approach

- Mobile-first CSS layout with breakpoints for small screens, tablets, and desktop
- Editor and results panels stack vertically on small devices
- Scrollable panels and touch-friendly UI elements

---

##  Project Structure

```
CipherSQLStudio/                     # workspace root
├─ CipherSQLStudio Backend/          # server
│  ├─ .gitignore
│  ├─ package.json
│  ├─ README.md
│  └─ src/
│     ├─ app.js                      # Express entrypoint
│     ├─ config/                     # external service configs
│     │   ├─ gemini.js
│     │   ├─ mongo.js
│     │   └─ postgres.js
│     ├─ controllers/                # request handlers
│     │   ├─ hintController.js
│     │   ├─ queryController.js
│     │   └─ questionController.js
│     ├─ models/                     # data schemas
│     │   ├─ questionModel.js
│     │   └─ tableModel.js
│     ├─ routes/                     # Express routes
│     │   ├─ hintRoutes.js
│     │   ├─ queryRoutes.js
│     │   └─ questionRoutes.js
│     ├─ scripts/                    # seed data scripts
│     │   ├─ seed.js
│     │   └─ seedQuestions.js
│     └─ utils/
│         └─ queryValidator.js       # SQL validation logic
└─ CipherSQLStudio Frontend/         # client
   ├─ .gitignore
   ├─ eslint.config.js
   ├─ index.html
   ├─ package.json
   ├─ README.md
   ├─ vite.config.js
   └─ src/
      ├─ App.jsx                    # root React component
      ├─ main.jsx                   # ReactDOM render entrypoint
      ├─ index.css                  # global styles
      ├─ assets/                    # static images/SVGs
      │   ├─ react.svg
      │   └─ sql.svg
      ├─ components/                # reusable UI elements
      │   ├─ Navbar.jsx
      │   ├─ QuestionCard.jsx
      │   ├─ QuestionDetails.jsx
      │   ├─ Questions.jsx
      │   └─ ResultTable.jsx
      ├─ css/                       # component-specific styles
      │   ├─ base.css
      │   ├─ navbar.css
      │   ├─ questioncard.css
      │   ├─ questiondetails.css
      │   ├─ questions.css
      │   ├─ resultTables.css
      │   └─ variables.css
      └─ utils/
          └─ constants.js           # shared constants (API endpoints etc.)
```

---

##  Setup Instructions

Follow these steps to run the application locally:

### 1. Prerequisites

- Node.js (v16+)
- npm
- PostgreSQL instance (filled with University schema dataset)
- MongoDB instance
- Gemini API credentials (set in environment variables)

### 2. Backend

```bash
cd "CipherSQLStudio Backend"
npm install           # or yarn install
# create a .env file with the following variables:
#  PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE
#  MONGO_URI
#  GEMINI_API_KEY

npm run seed          # optional: populate MongoDB with questions
npm start             # starts Express server on configured port
```

### 3. Frontend

```bash
cd "CipherSQLStudio Frontend"
npm install           # or yarn install
npm run dev           # starts Vite development server
# open http://localhost:5173/ in browser
```

### 4. Using the App

1. Open frontend in browser
2. Select a question from the listing page
3. Review sample data, then write a SQL query
4. Click **Run** to execute against PostgreSQL sandbox
5. Use **Get Hint** if you need guidance

---

## Design Decisions

- Separate execution DB (PostgreSQL) from persistence DB (MongoDB)
- Controlled LLM prompting to prevent solution leaks
- Result normalization for reliable comparison
- Modular backend structure (controllers, routes, utils)

---

##  Future Improvements

- User authentication & profiles
- Save user attempts and performance history
- Timed challenges and leaderboards
- Query execution analytics and usage metrics

---

##  Assignment Notes

- Implementation based on University database schema
- Assignments pre‑seeded via backend scripts
- Focused on building a secure SQL practice environment with clear data flow and validation logic

---

_Developed by the Vijaya Kumar Gavara._
