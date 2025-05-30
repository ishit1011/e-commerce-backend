
# 🎮 Gaming E-Commerce Backend

This is the **backend** server for the full-stack gaming e-commerce platform. It powers the APIs for customers, admins, and riders, including authentication, order management, and role-based access.

## 🌐 Live Deployment
- **Backend (Render):** [https://e-commerce-backend-w98f.onrender.com](https://e-commerce-backend-w98f.onrender.com)

---

## 🧠 Core Features

### ✅ Authentication
- Google OAuth (Firebase)
- Only allow pre-approved emails to log in

### 🛒 E-Commerce
- CRUD for products
- Create orders with color, size variants

### 🛠 Admin APIs
- View all orders
- Change status (Paid → Shipped)
- Assign riders

### 🚴‍♂️ Rider APIs
- View assigned orders
- Update order status (Shipped → Delivered / Undelivered)

---

## 🔧 Tech Stack
- **Node.js** with **Express.js**
- **MongoDB** (with Mongoose)
- **Firebase Admin SDK** for token verification
- **Deployed on Render**

---

## ⚙️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/gaming-ecommerce-backend.git
   cd gaming-ecommerce-backend
