# SHOPNEST - Full-Stack MERN E-Commerce Platform

SHOPNEST is a modern, responsive, full-stack e-commerce web application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It provides a complete online shopping experience for customers alongside a feature-rich admin dashboard for inventory management, order processing, and product catalog administration.

---

## 🌟 Key Features

### 🛍️ Storefront (Customer Experience)

- **Responsive Navigation**: Sticky header with interactive navigation, live search toggle, cart badge, and a profile dropdown.
- **Smart Profile Dropdown**: Includes a **400ms hover buffer** to prevent accidental closure and features visual **account role badges** (`Admin`, `Customer`, or `Guest User`).
- **Hero Banner**: Highlighting top arrivals with direct interactive call-to-action buttons (`SHOP NOW`) leading to the collection catalog.
- **Dynamic Catalog & Filtering**: Browse products by category (`Men`, `Women`, `Kids`), sub-category (`Topwear`, `Bottomwear`, `Winterwear`), and price sorting.
- **Product Details & Gallery**: Multi-image gallery previews, size selector (`S`, `M`, `L`, `XL`, `XXL`), description, and single-click cart additions.
- **Cart & Checkout**: Persistent cart state connected to backend user accounts, quantity updates, cost breakdown, and delivery calculation.
- **Order Tracking & Cancellation**: Customers can track their placed orders and cancel non-shipped items (`Order Placed` status) directly from their account dashboard.
- **Functional Footer**: Fully routed links for quick navigation (`Home`, `About Us`, `Delivery & Orders`, `Privacy Policy & Contact`).

### 🛡️ Admin Portal (Store Management)

- **Secure Authentication**: Dedicated admin login system with JWT verification.
- **Product Management**:
  - Multi-image uploads (up to 4 images per item) powered by **Multer** and **Cloudinary**.
  - Detailed product creation including Title, Description, Price, Category, Sub-Category, Size options, and Bestseller flag.
  - Image preview thumbnails before submitting.
- **Inventory List**: Interactive table listing all active products with single-click delete capability.
- **Order Management**: Oversee all customer orders with real-time status updates (`Order Placed`, `Packing`, `Shipped`, `Out for Delivery`, `Delivered`, `Cancelled`).

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 18 (Vite)
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Styling**: Custom CSS (`src/index.css`) with Google Fonts (_Outfit_ and _Prata_)
- **Icons & UI**: Native CSS badges, SVG icons, and smooth transitions

### Backend

- **Runtime**: Node.js & Express.js
- **Database**: MongoDB with Mongoose ORM
- **File & Image Uploads**: Multer & Cloudinary API
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt password hashing
- **Payments**: Integrated hooks for Stripe & Razorpay

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@shopnest.com
ADMIN_PASSWORD=your_admin_password
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Frontend (`frontend/.env`)

```env
VITE_BACKEND_URL=http://localhost:5000
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites

Ensure you have **Node.js** (v16 or higher) and **MongoDB** (local or MongoDB Atlas) installed.

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run server
```

The server will start running on `http://localhost:5000`.

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The application will be accessible at `http://localhost:5173`.

---

## 🔧 Recent Bug Fixes & Refinements

1. **Admin Image Upload Fix (`AdminAdd.jsx`)**: Updated file change handlers to parse `e.target.files` directly, resolving binary `File` object transmission to Multer and Cloudinary instead of empty `FileList` fallbacks.
2. **Vite Fast Refresh Optimization**: Split Context definition (`ShopContext.js`) from Context Provider (`ShopContextProvider.jsx`) to eliminate HMR warnings and avoid unnecessary full-page reloads.
3. **Profile Hover Buffer & Role Badges (`Navbar.jsx`)**: Integrated a `400ms` mouseout buffer using `setTimeout` to prevent immediate dropdown closing and added distinct status badges (`Logged in: Admin`, `Logged in: Customer`, `Guest User`).
4. **Order Cancellation System (`orderController.js` & `Orders.jsx`)**: Implemented `/api/order/cancel` endpoint using soft status updates (`status: "Cancelled"`) with MongoDB `ObjectId` string-safe checks.
5. **Interactive Navigation Fixes**: Connected the Hero banner `SHOP NOW` button to `/collection` and mapped Footer links to active React Router views.

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
