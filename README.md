# 🏨 Smart Hotel Management System

## 📸 Screenshots

### 1. Admin Dashboard
![Admin Dashboard](https://github.com/user-attachments/assets/73330aa3-2533-431e-9b4f-a9532dad122f)

### 2. Login Page
![Login Page](https://github.com/user-attachments/assets/cbda44fe-9c83-492c-b4d8-ad8e3a839ba3)

### 3. Smart Alerts
![Smart Alerts](https://github.com/user-attachments/assets/fd109f9a-ad0f-4de4-9383-33316ece57ad)

### 4. Forecasting (Room Occupancy & Demand)
![Forecasting](https://github.com/priteshbaraiya/Smart-Inventory-Management-Forecasting-System/blob/main/screenshots/forecasting.png?raw=true)

### 5. Booking & Revenue Report
![Inventory Report](https://github.com/user-attachments/assets/95f0ac8a-a85f-4bd6-ba76-e57330bd1cb2)

> A comprehensive web-based solution for managing hotel rooms, tracking bookings, handling check-ins/check-outs, and forecasting occupancy using Python & Django.

![Smart Hotel](https://img.shields.io/badge/Smart-Hotel-blue)
![License](https://img.shields.io/badge/license-MIT-red)
![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Python](https://img.shields.io/badge/Python-3.12-blue)
![Django](https://img.shields.io/badge/Django-5.0%2B-green)

## 📖 Introduction
The **Smart Hotel Management System** is designed to streamline hotel operations for small to medium-sized properties (single hotel or small chain). Unlike basic booking systems, this project integrates **Data Analytics** and **basic Machine Learning** to forecast room demand/occupancy, helping managers make smarter staffing, pricing, and maintenance decisions.

It includes secure authentication, real-time availability alerts, automated booking insights, and reporting.

## ✨ Key Features
* **📊 Interactive Dashboard** — Real-time overview of Occupancy Rate, Today's Revenue, Upcoming Arrivals/Departures, and Booking Trends (using Chart.js).
* **🔐 Secure Authentication** — User/Staff Registration & Login with **Email OTP Verification**.
* **📉 Demand & Occupancy Forecasting** — Predicts future room demand and occupancy percentage based on historical booking data.
* **🛏️ Smart Room Planning** — Auto-suggests rooms to prepare/clean or rooms with potential overbooking risk.
* **🔔 Smart Alerts** — Instant notifications for Low Availability (< 5 rooms of a type), Fully Booked dates, Overdue Check-outs, or Maintenance Needed.
* **📑 Reports** — Downloadable booking, revenue, and occupancy reports in CSV/PDF format.
* **📱 Responsive Design** — Works smoothly on Desktop, Tablets, and Mobile (Bootstrap 5).

## 🛠️ Tech Stack
* **Backend:** Python, Django Framework
* **Frontend:** HTML5, CSS3, Bootstrap 5, JavaScript (Chart.js)
* **Database:** SQLite (Default) — easy to switch to PostgreSQL
* **Data Analysis:** Pandas (for forecasting logic)

## ⚙️ Installation & Setup Guide

Follow these steps to run the project locally on your machine.

### Prerequisites
* Python (Version 3.10 or higher) installed.
* VS Code or any Code Editor.
* Internet connection (for installing libraries).

### Step 1: Get the Project
**Option A: Using Git (Recommended)**
```bash
git clone https://github.com/priteshbaraiya/Smart-Hotel-Management-System.git
cd Smart-Hotel-Management-System
