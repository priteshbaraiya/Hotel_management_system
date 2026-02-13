# 🏨 Smart Hotel Management System

## 📸 Screenshots

### 1. Home Page
![Home Page](https://github.com/priteshbaraiya/Hotel_management_system/blob/main/screenshot/homepage.png?raw=true)

### 2. Room Page
![Room Page](https://github.com/priteshbaraiya/Hotel_management_system/blob/main/screenshot/rooms%20.png?raw=true)

### 3. Service Page
![Service Page](https://github.com/priteshbaraiya/Hotel_management_system/blob/main/screenshot/Service.png?raw=true)

### 4. Gallry Page
![Gallry Page](https://github.com/priteshbaraiya/Hotel_management_system/blob/main/screenshot/gallry.png?raw=true)

### 5. Offer Page
![Offer Page](https://github.com/priteshbaraiya/Hotel_management_system/blob/main/screenshot/offers.png?raw=true)

### 6. Booking Page
![Booking Page](https://github.com/priteshbaraiya/Hotel_management_system/blob/main/screenshot/booking.png?raw=true)

### 7. Admin Dashboard
![Admin Dashboard](https://github.com/priteshbaraiya/Hotel_management_system/blob/main/screenshot/admindashboard.png?raw=true)

### 8. Guest Dashboard
![Guest Dashboard](https://github.com/priteshbaraiya/Hotel_management_system/blob/main/screenshot/guestdashboard.png?raw=true)

### 9. Staff Dashboard
![Staff Dashboard](https://github.com/priteshbaraiya/Hotel_management_system/blob/main/screenshot/staffdashboard.png?raw=true)


> A comprehensive web-based solution for managing hotel rooms, tracking bookings, handling check-ins/check-outs, and forecasting occupancy using Python & Django.

![Smart Hotel](https://img.shields.io/badge/Smart-Hotel-blue)
![License](https://img.shields.io/badge/license-MIT-red)
![Project Status](https://img.shields.io/badge/Status-In%20Progress-success)
![Angular](https://img.shields.io/badge/Angular-17%2B-red)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-green)
![MongoDB](https://img.shields.io/badge/MongoDB-7%2B-brightgreen)
![Express](https://img.shields.io/badge/Express-4%2B-lightgrey)

## 📖 Introduction
The **Smart Hotel Management System** is designed to streamline hotel operations for small to medium-sized properties (single hotel or small chain). Unlike basic booking systems, this project integrates **Data Analytics** and **basic Machine Learning** to forecast room demand/occupancy, helping managers make smarter staffing, pricing, and maintenance decisions.

It includes secure authentication, real-time availability alerts, automated booking insights, and reporting.

## ✨ Key Features

- 📊 Real-time Dashboard (Occupancy %, Revenue, Arrivals/Departures, Trends)
- 🔐 JWT Authentication + Role-based access (Admin / Staff / Guest)
- 🛏️ Room Booking, Check-in/Check-out, Availability Calendar
- 📉 Basic Occupancy Forecasting (past data se next 7 days ka prediction)
- 🔔 Smart Alerts (low rooms, fully booked, overdue checkout)
- 📑 CSV/PDF Reports (bookings, revenue, occupancy)
- 📱 Responsive UI (Angular Material ya Bootstrap)

## 🛠️ Tech Stack

- **Frontend**: Angular 18 (Standalone Components), RxJS, Chart.js, Angular Material / PrimeNG
- **Backend**: Node.js, Express.js, JWT, bcrypt
- **Database**: MongoDB + Mongoose
- **Others**: Multer (images), Nodemailer (OTP/email), cors

## Project Folder Structure

## ⚙️ Installation & Run Karne Ka Tarika

### Prerequisites
- Node.js 18+ & npm
- MongoDB (local ya Atlas)
- Angular CLI: `npm install -g @angular/cli`

### Step 1: Project Clone Karo
```bash
git clone https://github.com/priteshbaraiya/smart-hotel-management-system.git
cd smart-hotel-management-system

cd backend
npm install

Step 2: Backend Setup

# .env file banao
echo "PORT=5000
MONGO_URI=mongodb://localhost:27017/smart-hotel
JWT_SECRET=your_jwt_secret_123
" > .env

npm start
# ya npm run dev (nodemon ke saath)

Step 3: Frontend Setup

cd ../frontend
npm install

# environment.ts mein backend URL daal do
# apiUrl: 'http://localhost:5000/api'

ng serve --open
This will install the necessary dependencies and start the development server. You can then view the application in your browser at `http://localhost:4200/`.

