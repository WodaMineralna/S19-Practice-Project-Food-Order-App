# 🍽️ Food Order App

A React-based food ordering web application built on my own as a part of a course challenge. Users can browse available meals, manage their cart, and place an order with form-based user data. Backend communication is handled via RESTful API calls.

## 🚀 Features

- 🧾 **Meals List** – Fetched dynamically from the backend (`GET /meals`)
- 🛒 **Cart Functionality** – Add/remove meals, view total, open/close cart in modal
- 📋 **Checkout Form** – Enter user info (name, email, address) in a modal form
- 🔁 **Data Submission** – Send cart + user data to the backend (`POST /orders`)
- 🔄 **Loading & Error Handling** – Visual feedback for API requests

## 🛠️ Tech Stack

- React + Hooks
- Context API for state management
- CSS Modules for styling
- Fetch API for backend communication
- Basic input validation

## 📁 Project Structure (simplified)




## 📦 Getting Started

1. Install dependencies  
   `npm install`

2. Run the app  
   `npm start`

3. Backend is expected to expose the following endpoints:
   - `GET /meals` – returns available meals
   - `POST /orders` – accepts user + cart data

---

This project was built on my own, as part of the React course challenge: *"Dive in and learn React.js from scratch!"*
