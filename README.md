# 🍽️ Food Order App

⭐ A React-based food ordering web application built on my own as a part of a course challenge. Users can browse available meals, manage their cart, and place an order with form-based user data. Backend communication is handled via RESTful API calls. ⭐

## 🚀 Features

- 🧾 **Meals List** – Fetched dynamically from the backend (`GET /meals`)
- 🛒 **Cart Functionality** – Add/remove meals, view total, open/close cart in modal
- 📋 **Checkout Form** – Enter user info (name, email, address) in a modal form
- 🔁 **Data Submission** – Send cart + user data to the backend (`POST /orders`)
- 🔄 **Loading & Error Handling** – Visual feedback for API requests

## 🛠️ Tech Stack

- **Frontend:** React, Hooks, Context API, CSS Modules
- **Backend:** Node.js, Express
- **Tooling:** Vite, Fetch API

## 📁 Project Structure (simplified)
```
root/
├── backend/
│ ├── data/
│ └── app.js
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── Modal/
│ │ ├── ErrorMessage.jsx
│ │ ├── Header.jsx
│ │ ├── Meal.jsx
│ │ └── Meals.jsx
│ ├── store/
│ ├── util/
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── index.html
├── package.json
├── vite.config.js
```
## 📦 Getting Started

### 🛠️ Backend

1. Navigate to the backend folder  
   `cd backend/`
2. Install dependencies  
   `npm install`
3. Run the backend  
   `node app.js`

### ⚛️ Frontend

1. Install dependencies  
   `npm install`
2. Run the app  
   `npm run dev`

---

   Backend is exposing the following endpoints:
   - `GET /meals` – returns available meals
   - `POST /orders` – accepts user + cart data

---


⭐⭐This project was built on my own, as part of the React course challenge: *"Dive in and learn React.js from scratch!"*⭐⭐
