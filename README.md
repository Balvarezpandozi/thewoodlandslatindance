# The Woodlands Latin Dance

This is a small business website for a dance studio.

# 📁 Project Structure

TheWoodlandsLatinDance/\
├── **tests**/ # Root-level test files\
│\
├── .github/ # GitHub workflows and CI/CD configurations\
│ └── the-woodlands-latin-dance.yml\
│\
├── controllers/ # Handles request logic and connects routes, models, and services\
│ ├── **tests**/ # Controller test files\
│ ├── admin.js\
│ ├── events.js\
│ ├── homepage.js\
│ ├── qrCode.js\
│ ├── studentResources.js\
│ └── user.js\
│\
├── models/ # Database models and schema definitions\
│ └── **tests**/ # Model test files\
│\
├── public/ # Static assets served by Express\
│ ├── res/\
│ │ └── images/\
│ ├── scripts/\
│ ├── stylesheets/\
│ │ ├── fontawesome/\
│ │ │ ├── css/\
│ │ │ └── webfonts/\
│ └── sitemap.xml\
│\
├── routes/ # Express route definitions\
│ └── **tests**/ # Route test files\
│\
├── services/ # Business logic, middleware, and data access services\
│ ├── **tests**/\
│ ├── database.js\
│ └── middleware.js\
│\
├── templateEmails/ # Email templates for notifications or campaigns\
│\
├── utils/ # Helper utilities and shared functions\
│ └── **tests**/\
│\
├── views/ # Templating system for web pages (EJS)\
│ ├── admin/\
│ ├── events/\
│ ├── layouts/\
│ ├── main/\
│ ├── newsletter/\
│ ├── partials/\
│ ├── studentResources/\
│ └── user/\
│\
├── .cpanel.yml # Deployment configuration for cPanel\
├── .gitignore # Git ignore rules\
├── app.js # Express app configuration and middleware setup\
├── index.js # Main server entry point\
├── package-lock.json # Dependency lock file\
├── package.json # Project metadata and dependencies\
└── README.md # Project documentation

# 🧠 Architecture Overview

**TheWoodlandsLatinDance** is a modular **Model–View–Controller (MVC)** application built with **Node.js** and **Express**. The project separates responsibilities so the codebase stays maintainable and easy to extend:

- **Models** — define data shapes and handle database interactions.
- **Controllers** — implement request handling and coordinate between models, services, and views.
- **Routes** — map URLs to controller actions (API endpoints and page routes).
- **Views** — server-side templates for rendering HTML (EJS).
- **Services** — reusable business logic and system integrations (database connectors, middleware).
- **Utils** — small helper modules (validation, formatting, error handling, email sending, etc.).
- **Public** — static assets (CSS, JS, images) served directly by the web server.
- **TemplateEmails** — prebuilt templates used for automated emails.
- **Tests** — unit and integration tests placed alongside relevant modules to keep test coverage organized.

This structure supports both **dynamic server-rendered pages** and **API-driven features**, and it keeps concerns separated so new features (or a frontend SPA) can be introduced with minimal coupling.

# 🚀 Getting Started

Follow these steps to set up and run **TheWoodlandsLatinDance** project locally.

### 🧩 Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A database (e.g., MongoDB or PostgreSQL — depending on your setup)
- [Git](https://git-scm.com/) for version control

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/TheWoodlandsLatinDance.git
   ```
2. **Navigate into the project directory**
   ```bash
   cd TheWoodlandsLatinDance
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```

### ⚙️ Environment Setup

Create a .env file in the root directory and define your environment variables.
Below is an example of what your .env might look like:

```
DATABASE_URL=<your_database_connection_string>
GMAIL_USER=<your_email_username>
GMAIL_APP_PASSWORD=<your_email_password>
PHONE_NUMBER=+12812022058
SESSION_SECRET=<random_secret_key>
```

⚠️ Important: Never commit your .env file to GitHub. It contains sensitive information.

### ▶️ Running the Application

To start the app in development mode (with automatic reloads using nodemon if configured):

```bash
npm run dev
```

Once running, open your browser and visit: http://localhost:3001

### 🧪 Running Tests

The project uses **Jest** and **Supertest** for unit and integration testing.  
All tests are located inside `__tests__/` directories across controllers, models, routes, and utils.

To run all tests once with coverage:

```bash
npm test
```

To run tests in watch mode (helpful during development):

```bash
npm run dev-test
```

Test coverage reports will appear in the terminal after execution.

### 🧰 Additional Commands

Below are some useful commands for development, testing, and maintenance:
| Command | Description |
|----------|-------------|
| `npm run dev` | Start the server in development mode with nodemon (auto-restarts on file changes). |
| `npm start` | Start the server in production mode. |
| `npm test` | Run all test cases located in the `__tests__` directory. |

> 💡 **Tip:** Run `npm install` after pulling new changes to ensure all dependencies are up to date.

# ⚙️ Tech Stack

TheWoodlandsLatinDance is powered by a **Node.js + Express** backend designed with scalability, modularity, and security in mind.  
It follows an **MVC (Model–View–Controller)** structure enhanced by service and utility layers for cleaner separation of concerns.

### 🖥️ Backend

- **Node.js** — JavaScript runtime environment powering the server.
- **Express.js** — Web framework for defining routes, middleware, and application logic.
- **EJS + EJS-Mate** — Template engine for rendering dynamic server-side views with layout support.
- **MongoDB + Mongoose** — Database and ORM for modeling and persisting data.
- **Passport.js (Local Strategy)** — User authentication via email and password.
- **Express-Session + MongoStore** — Persistent session management for authenticated users.
- **Method-Override** — Allows form submissions to simulate PUT and DELETE requests.
- **dotenv** — Loads environment variables from a `.env` file for configuration.
- **Custom Error Handler (utils/ErrorHandler)** — Centralized error management using custom `ExpressError` and middleware.

### 💾 Services & Utilities

- **Database Service (`/services/database.js`)** — Handles MongoDB connection logic and session store creation.
- **Routers (`/routes`)** — Organized endpoints for each module (`homepage`, `events`, `studentResources`, `qrCode`, `admin`, `user`).
- **Public Assets (`/public`)** — Contains static assets (images, CSS, JS) served with long-term caching.
- **Template Emails (`/templateEmails`)** — Houses reusable HTML email templates.
- **Views (`/views`)** — EJS templates rendered for frontend pages.

### 🧩 Testing & Development Tools

- **Jest** — Testing framework used for unit and integration tests (see `__tests__/app.test.js`).
- **Nodemon** — Automatically restarts the server during development.
- **ESLint / Prettier** — Enforces consistent code style and formatting.

> 🧠 **Architecture Note:**  
> The app employs a layered structure with distinct responsibilities:
>
> - **Controllers** handle incoming requests and responses.
> - **Models** define data structures and schema logic.
> - **Services** manage database and reusable logic.
> - **Utils** contain helpers and error handling utilities.
> - **Views** serve dynamic EJS-rendered pages.
