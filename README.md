# 🍬 Sweet Shop Management System

This project is an implementation of the Sweet Management System Kata using Test-Driven Development (TDD). It was developed as part of the Incyubyte TDD Assessment to demonstrate incremental feature development guided by tests.

 <br />

## 🚀 Features

### ✅ Owner Panel

- Add, update, and manage sweet inventory
- View available stock and quantities
- Real-time quantity updates after purchase

### 🛍️ Customer Panel

- Browse available sweets
- Purchase interface with validation
- Displays out-of-stock alerts

### 📊 Inventory Management

- Auto-update quantity after transactions
- Prevent purchase if requested quantity exceeds stock
- Add new stock which is merged with existing quantity

### 🔍 Sort & Filter

- Sort sweets by name, quantity, or price
- Filter sweets using keyword-based search

 <br />

## 🧪 Testing

- Unit tested core modules and routes
- Specific files can be tested individually for fast development iterations
- Example:

  ```bash
  npm test test/sweet.test.js
  npm test test/userAuth.test.js
  npm test test/ownerAuth.test.js
  ```

  <br />

## 🛠️ Technologies Used

🔹 Frontend

- ReactJS
- Tailwind CSS – for responsive and modern UI design

🔹 Backend

- Node.js – runtime environment
- Express.js – web framework for building RESTful APIs

🔹 Database

- MongoDB – NoSQL database
- Mongoose – ODM for MongoDB in Node.js

🔹 Testing

- Jest – JavaScript testing framework
- Supertest – HTTP assertions for API testing

🔹 Tools & Utilities

- Postman – API testing and development
- Git & GitHub – version control and collaboration

 <br />

## ✅ Features & Test Coverage Overview

| **Test Description**                         | **Route / Action**                   | **Expected Output / Status**        |
| -------------------------------------------- | ------------------------------------ | ----------------------------------- |
| Owner Signup success                         | `POST /owner/signup`                 | `200 OK` – Data saved to DB         |
| Owner already exists                         | `POST /owner/signup`                 | `409 Conflict`                      |
| Owner Signin success                         | `POST /owner/signin`                 | `200 OK` – Logged in successfully   |
| Owner not registered                         | `POST /owner/signin`                 | `401 Unauthorized`                  |
| Owner wrong password                         | `POST /owner/signin`                 | `401 Unauthorized`                  |
| User Signup success                          | `POST /user/signup`                  | `200 OK` – Data saved to DB         |
| User already exists                          | `POST /user/signup`                  | `409 Conflict`                      |
| User Signin success                          | `POST /user/signin`                  | `200 OK` – Logged in successfully   |
| User not found                               | `POST /user/signin`                  | `404 Not Found`                     |
| User wrong password                          | `POST /user/signin`                  | `401 Unauthorized`                  |
| Add new sweet                                | `POST /owner/sweet/add`              | `200 OK` – Sweet added              |
| Add existing sweet                           | `POST /owner/sweet/add`              | `409 Conflict`                      |
| Get all sweets                               | `GET /sweet/all`                     | `200 OK` – Array of sweets returned |
| Get sweet by ID                              | `GET /sweet/:id`                     | `200 OK` – Specific sweet returned  |
| Update sweet details                         | `PUT /owner/sweet/:id/update`        | `200 OK` – Sweet updated            |
| Update non-existent sweet                    | `PUT /owner/sweet/:id/update`        | `500 Server Error`                  |
| Delete sweet                                 | `DELETE /sweet/:id`                  | `200 OK` – Sweet deleted            |
| Delete non-existent sweet                    | `DELETE /sweet/:id`                  | `500 Server Error`                  |
| Filter and sort sweets                       | `POST /sweet/sort-filter`            | `200 OK` – Filtered sweets returned |
| Inventory stock update                       | `POST /owner/sweet/inventory/update` | `200 OK` – Quantities updated       |
| Purchase sweet with valid quantity           | `POST /user/sweet/:id/buy`           | `200 OK` – Purchase success         |
| Purchase sweet with quantity exceeding stock | `POST /user/sweet/:id/buy`           | `500 Server Error` – Out of stock   |

 <br />

## 🧪 Test Results

![Test Results](./test-result.png)

 <br />

## 📫 API Routes

### 👨‍🍳 Owner Routes (/owner)

| Method | Endpoint                        | Description            |
| ------ | ------------------------------- | ---------------------- |
| POST   | `/owner/signup`                 | Register a new owner   |
| POST   | `/owner/signin`                 | Owner login            |
| POST   | `/owner/sweet/add`              | Add a new sweet        |
| PUT    | `/owner/sweet/:sweetId/update`  | Update sweet details   |
| POST   | `/owner/sweet/inventory/update` | Update sweet inventory |

### 🍬 Sweet Routes (/sweet)

| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| GET    | `/sweet/all`         | Fetch all available sweets    |
| GET    | `/sweet/:sweetId`    | Get a specific sweet by ID    |
| DELETE | `/sweet/:sweetId`    | Delete a specific sweet by ID |
| POST   | `/sweet/sort-filter` | Filter and sort sweets        |

### 👤 User Routes (/user)

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| POST   | `/user/signup`             | Register a new user |
| POST   | `/user/signin`             | User login          |
| POST   | `/user/sweet/:sweetId/buy` | Purchase a sweet    |

 <br />

## ⚙️ Installation & Setup

Follow the steps below to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/vdjamod/Sweet_Shop_Management_System.git
cd Sweet_Shop_Management_System
```

### 2. Frontend Setup

Follow the steps below to run the frontend locally:

```bash
# Navigate to the frontend folder
cd Frontend

# Install dependencies
npm install

# To run frontend
npm run dev
```

### 3. Backend Setup

Follow the steps below to run the backend locally:

```bash
# Navigate to the backend folder
cd Backend

# Install dependencies
npm install

# To run backend
node app.js
```

 <br />

## 📁 Folder Structure

### Backend

```
 Backend/
├── controller/
│   ├── index.js
│   ├── owner.controller.js
│   ├── sweet.controller.js
│   └── user.controller.js
│
├── Models/
│   ├── index.js
│   ├── owner.js
│   ├── sweet.js
│   └── user.js
│
├── routes/
│   ├── index.js
│   ├── owner.route.js
│   ├── sweet.route.js
│   └── user.route.js
│
├── test/
│   ├── ownerAuth.test.js
│   ├── sweet.test.js
│   └── userAuth.test.js
│
├── utils/
│   ├── index.js
│   └── response.js
│
├── app.js
```

### Frontend

```
Frontend/
├── src/
│   ├── constants/
│   │   └── constant.js
│   │
│   ├── component/
│   │   ├── owner/
│   │   │   ├── OwnerSignin.jsx
│   │   │   ├── OwnerAddInventory.jsx
│   │   │   ├── OwnerAddSweet.jsx
│   │   │   ├── OwnerHome.jsx
│   │   │   ├── OwnerSignup.jsx
│   │   │   └── OwnerUpdateSweet.jsx
│   │   │
│   │   └── user/
│   │       ├── UserHome.jsx
│   │       ├── UserSignin.jsx
│   │       ├── UserSignup.jsx
│   │       └── UserSweetBuy.jsx
│   │
│   ├── App.jsx
│   ├── Home.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html

```

<br />

## 📚 References

- 📄 [Sweet Shop Management System PDF](https://drive.google.com/file/d/1Ut7A8QRK96-mWFcIlK1eQ1eOoM9qlAta/view?usp=sharing)
- 🧪 [Jest Documentation](https://jestjs.io/docs/getting-started)
- ⚛️ [React Documentation](https://reactjs.org/docs/getting-started.html)
- 🍃 [MongoDB Documentation](https://www.mongodb.com/docs/)
