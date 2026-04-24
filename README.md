# 🔗 URL Shortener App

A simple and responsive URL shortener web application built with vanilla JavaScript and a serverless API. The app allows users to shorten long URLs, copy them instantly, and persist history across page reloads.

---

## 👨‍💻 Author

**Developed by:** Sarah Malwil  
**Course:** React Intermediate
**Assignment:** Frontend Task
**Date:** April 2026

## 🚀 Live Demo

(https://kode-camp-6-0.vercel.app/)

---

## 🛠️ Built With

- HTML5
- CSS3 (Bootstrap 5)
- Vanilla JavaScript (ES6+)
- Axios
- Serverless Functions (Vercel)
- CleanURI API

---

## ✨ Features

- 🔗 Shorten long URLs instantly
- 📋 Copy shortened links with one click
- 💾 Save history using LocalStorage
- 🔄 Persist data after page refresh
- ⚡ Responsive design (mobile-first)
- 🚫 Form validation with error handling
- 🌐 Serverless API integration (CORS-safe)

---

## 📁 Project Structure

project-root/
│
├── index.html
├── css/
├── js/
│ ├── app.js
│
├── api/
│ └── shorten.js (serverless function for Vercel)
│
└── README.md

---

## ⚙️ How It Works

1. User enters a URL
2. Frontend validates input
3. Request is sent to `/api/shorten`
4. Serverless function forwards request to CleanURI API
5. Shortened URL is returned and displayed
6. Result is stored in LocalStorage for persistence

---

## 🔌 API Used

This project uses the **CleanURI API**:

```

POST https://cleanuri.com/api/v1/shorten

```
