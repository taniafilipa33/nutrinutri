# 🥦 NutriNutri

**NutriNutri** is a modern web application for booking and managing appointments with nutritionists. It allows users to seamlessly schedule and manage their sessions through an intuitive interface.

## 📚 Table of Contents

- 🚀 Prerequisites  
- ⚙️ Setup Instructions  
- ▶️ Running the App  
- 🧪 Running Tests  
- 🤝 Contributing  
- 📄 License

## 🚀 Prerequisites

Before setting up the project, ensure the following tools are installed on your system:

- [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
- [Rails](https://guides.rubyonrails.org/getting_started.html)
- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

Optional but recommended:

- [VS Code](https://code.visualstudio.com/) or your preferred code editor  
- A modern browser for testing the UI

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/taniafilipa33/nutrinutri.git
cd nutrinutri
```

### 2. Backend Setup (Rails)

```bash
bundle install
rails db:create
rails db:migrate
rails db:seed
```

### 3. Frontend Setup (React)

```bash
yarn install
yarn start
```

## ▶️ Running the App

After completing the setup:

Start the **Rails server**:  
```bash
rails server
```

Start the **React frontend** (in a separate terminal):  
```bash
yarn start
```

## 🧪 Running Tests

### Backend (RSpec)

To run unit tests for the backend:

```bash
bundle exec rspec
```

Code coverage reports are generated in `coverage/index.html`. Open the file in your browser to view the report.

### Frontend (Cypress)

To run frontend tests:

```bash
npx cypress open
```

This will open the Cypress Test Runner where you can select and run tests.


---

## 🌐 API Usage (Backend as REST API)

The backend can also be used as a standalone REST API. Below are the available endpoints:

### 📋 Nutritionists

- `GET /nutritionists` — List all nutritionists  
- `GET /nutritionists/search` — Search nutritionists by parameters (e.g., name, service, location)

### 📅 Appointments

- `GET /appointments` — List all appointments  
- `POST /appointments` — Create a new appointment  
- `GET /appointments/checkPending` — Check for user's existing pending requests  
- `PATCH /appointments/:id` — Update an appointment (status) 
- `GET /appointments/search` — Search for appointments by query (used to get pending appointments)

> You can test these endpoints using tools like [Postman](https://www.postman.com/) or `curl`.

Make sure to start the Rails server before making requests:

```bash
rails server
```

API responses are in JSON format by default.

