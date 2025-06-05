# 📚 Node.js Assignment – School Management API

## 🚀 Objective
Develop a RESTful API using **Node.js**, **Express.js**, and **MySQL** that allows users to:
- Add a new school to the database.
- List all schools sorted by their proximity to a user-specified location.

## 🏗️ Project Structure

backend/
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── db/
│ └── index.js
├── .env
├── package.json
└── README.md

## 🛠️ Requirements

### ✅ Database Setup

Created a **schoolDB** database and a table named `schools` with the following schema:

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

📡 **API Endpoints**
1. ➕ **Add School**

    Endpoint: /add-school

    Method: POST

    Request Body:
{
  "name": "ABC International School",
  "address": "123 Street, City",
  "latitude": 28.6139,
  "longitude": 77.2090
}

Functionality:

    Validates input for non-empty and correct types.

    Adds the school to the schoolDB schools table.

2. 📍 **List Schools by Proximity**

    Endpoint: /list-school

    Method: GET

    Query Parameters:

        latitude: User's latitude

        longitude: User's longitude

    Functionality:

        Fetches all schools from the database.

        Calculates distance between user and each school using Haversine formula.

        Returns a list sorted by distance (nearest first).

    Example Request:

  GET /listSchools?latitude=28.6139&longitude=77.2090


⚙️ **Setup & Run**

    Clone the repository:

git clone https://github.com/Chandan-Pandit7/School-Management-Backend-API-ASSIGNMENT.git
cd /home/user/NODE-JS_ASSIGNMENT/backend

Install dependencies:

npm install

Configure environment variables:
Create a .env file and add your MySQL credentials:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Password@123
DB_NAME=schoolDB
PORT=8080

Run the server:

    npm start


📦 **Tech Stack**

    Node.js – JavaScript runtime

    Express.js – Web framework

    MySQL – Relational Database

📌 **Notes**

    Make sure your MySQL server is running.

    Use tools like Postman to test the APIs.

    Ensure latitude is between -90 to 90 and longitude between -180 to 180 for valid results.

**👨‍💻 Author**

**Chandan Pandit**
📧 Email: 📧**pandit07chandan@gmail.com**
☎️ Telephone: ☎️**7065958450**





