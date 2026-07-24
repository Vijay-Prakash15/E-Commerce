# 🛍️ VastraKart — Full-Stack MERN E-Commerce Platform

<p align="center">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Razorpay-0C2451?style=for-the-badge&logo=razorpay&logoColor=white" />
</p>

<p align="center">
  <b>VastraKart</b> (Vastra Cart) is a feature-rich, high-performance MERN stack e-commerce application with secure customer shopping flows, product search & reviews, dynamic promotional banners, and a full administrative control panel for managing products, orders, and site layout.
</p>

<p align="center">
  🔗 <a href="https://vastrakart26.vercel.app/"><b>Live Demo</b></a> &nbsp;|&nbsp;
  💻 <a href="https://github.com/Vijay-Prakash15/E-Commerce"><b>Source Code</b></a>
</p>

---

## 📖 Table of Contents

- [🚀 Tech Stack](#-tech-stack)
- [📦 Core Features](#-core-features)
- [📂 Project Structure](#-project-structure)
- [💾 Database Models & Schemas](#-database-models--schemas)
- [🛣️ RESTful API Endpoints](#️-restful-api-endpoints)
  - [1. Authentication API](#1-authentication-api-apiauth)
  - [2. Admin Products API](#2-admin-products-api-apiadminproducts)
  - [3. Admin Orders API](#3-admin-orders-api-apiadminorders)
  - [4. Shop Products API](#4-shop-products-api-apishopproducts)
  - [5. Shop Cart API](#5-shop-cart-api-apishopcart)
  - [6. Shop Address API](#6-shop-address-api-apishopaddress)
  - [7. Shop Orders & Payments API](#7-shop-orders--payments-api-apishoporder)
  - [8. Search API](#8-search-api-apishopsearch)
  - [9. Reviews API](#9-reviews-api-apishopreview)
  - [10. Feature Banners API](#10-feature-banners-api-apicommonfeature)
- [⚙️ Configuration & Environment Variables](#️-configuration--environment-variables)
- [🛠️ Installation & Getting Started](#️-installation--getting-started)
- [🛡️ Security & Route Protection](#️-security--route-protection)
- [🌐 Live Demo & Repository](#-live-demo--repository)
- [📄 License](#-license)

---

## 🚀 Tech Stack

### Frontend (Client)
| Category | Technology |
| :--- | :--- |
| Library | React.js (built on Vite) |
| State Management | Redux Toolkit & React-Redux |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS & Tailwind CSS Animate |
| UI Components | Radix UI (Avatar, Checkbox, Dialog, Dropdown Menu, Label, Select, Separator, Tabs, Toast) |
| Icons | Lucide React |
| HTTP Client | Axios |

### Backend (Server)
| Category | Technology |
| :--- | :--- |
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB via Mongoose ODM |
| Auth | JSON Web Tokens (JWT) + `cookie-parser` (HTTP-only cookies) |
| Hashing | `bcryptjs` (salt factor of 12) |
| File Uploads | Multer (memory storage) + Cloudinary SDK |
| Payments | Razorpay Node SDK (HMAC-SHA256 signature verification) |

---

## 📦 Core Features

### 🔐 1. Authentication & Session Management
- Full registration and login validation with password hashing.
- JWT session tokens stored in secure, `httpOnly` cookies.
- Distinct user/admin roles with a check-auth system that blocks standard users from admin panels and keeps unauthenticated users on auth pages.

### 🛍️ 2. Customer Shopping View
- Dynamic landing page with admin-managed sliding banners.
- Browse products by category and brand.
- Advanced filtering (category/brand) and sorting (Price: Low–High, High–Low, Title: A–Z, Z–A).
- Instant multi-field regex search across title, description, category, and brand.
- Product detail dialog with descriptions, stock status, and community reviews.
- Verified-purchase reviews (1–5 stars + comment) with dynamically calculated average ratings.

### 🛒 3. Cart & Shipping Address CRUD
- Add, update quantity, and remove cart items, with backend stock verification.
- Full address management (street, city, pincode, phone, notes) — add, update, view, delete.

### 💳 4. Checkout & Razorpay Payment Gateway
- Orders initialized on the backend, generating a secure Razorpay order payload.
- Cryptographically secure SHA-256 HMAC signature verification. Once matched, the backend:
  1. Confirms order status → `confirmed`
  2. Updates payment status → `paid`
  3. Decreases product stock by purchased quantities
  4. Clears the checkout cart
- Order history for customers to track current and past orders.

### 👑 5. Administrative Dashboard
- Full product CRUD: add/update items, pricing, sale pricing, Cloudinary image uploads, stock tracking, deletion.
- Order administration: view payment/billing details and update shipping stage (`pending` → `inProcess` → `inShipping` → `delivered` → `rejected`).
- Feature banners: manage homepage promotional carousel.

---

## 📂 Project Structure

```
ecommerce/
├── client/                      # React Frontend Application
│   ├── public/                  # Static assets (logos, icons)
│   ├── src/
│   │   ├── assets/              # Images, SVGs, stylesheets
│   │   ├── components/
│   │   │   ├── admin-view/      # Admin panels (header, layout, order-details, sidebar)
│   │   │   ├── shopping-view/   # Shopping layout (address, cart-items, filter, header, product-tile)
│   │   │   ├── ui/              # Radix UI wrapper components
│   │   │   └── common/          # Auth checkers and layouts
│   │   ├── config/              # Constant forms, lists, category mappings
│   │   ├── lib/                 # Utility helpers (clsx, tailwind-merge, etc.)
│   │   ├── pages/                # Main route pages (Admin Dashboard, Checkout, Profile)
│   │   ├── store/                # Redux slices (auth, products, cart, address, orders, features)
│   │   ├── App.jsx               # Routing configuration & bootstrap
│   │   ├── index.css             # Tailwind global directives
│   │   └── main.jsx              # Entry point
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                      # Express Backend REST API
    ├── controllers/
    │   ├── admin/                # Admin product & order controllers
    │   ├── auth/                 # JWT logins, signups, cookie checkers
    │   ├── common/                # Banner controllers
    │   └── shop/                  # Cart, address, reviews, search, orders
    ├── helpers/
    │   ├── cloudinary.js          # Multer storage + Cloudinary upload utility
    │   └── razorpay.js            # Razorpay SDK initialization
    ├── models/                    # Mongoose schemas (User, Product, Order, Cart, Address, Review, Feature)
    ├── routes/                    # Route routers
    ├── .env
    ├── server.js
    └── package.json
```

---

## 💾 Database Models & Schemas

<details>
<summary><b>1. User Model (<code>User.js</code>)</b></summary>

```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" } // admin | user
}
```
</details>

<details>
<summary><b>2. Product Model (<code>Product.js</code>)</b></summary>

```javascript
{
  image: String,
  title: String,
  description: String,
  category: String,
  brand: String,
  price: Number,
  salePrice: Number,
  totalStock: Number,
  averageReview: Number
}
```
</details>

<details>
<summary><b>3. Cart Model (<code>Cart.js</code>)</b></summary>

```javascript
{
  userId: { type: ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ]
}
```
</details>

<details>
<summary><b>4. Address Model (<code>Address.js</code>)</b></summary>

```javascript
{
  userId: String,
  address: String,
  city: String,
  pincode: String,
  phone: String,
  notes: String
}
```
</details>

<details>
<summary><b>5. Order Model (<code>Order.js</code>)</b></summary>

```javascript
{
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: Number
    }
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String
  },
  orderStatus: { type: String, default: "pending" }, // pending | confirmed | inProcess | inShipping | delivered | rejected
  paymentMethod: { type: String, default: "Razorpay" },
  paymentStatus: { type: String, default: "pending" }, // pending | paid | failed
  isPaid: { type: Boolean, default: false },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now },
  orderUpdateDate: Date
}
```
</details>

<details>
<summary><b>6. Review Model (<code>Review.js</code>)</b></summary>

```javascript
{
  productId: String,
  userId: String,
  userName: String,
  reviewMessage: String,
  reviewValue: Number // 1 to 5 stars
}
```
</details>

<details>
<summary><b>7. Feature Model (<code>Feature.js</code>)</b></summary>

```javascript
{
  image: String
}
```
</details>

---

## 🛣️ RESTful API Endpoints

All endpoints are prefixed with `/api`. Auth requirements are listed per route.

### 1. Authentication API (`/api/auth`)

| Method | Endpoint | Description | Payload / Params | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| POST | `/register` | Sign up a new customer account | `{ name, email, password }` | No |
| POST | `/login` | Log in, generate HttpOnly JWT cookie | `{ email, password }` | No |
| POST | `/logout` | Terminate session, clear auth cookies | None | No |
| GET | `/check-auth` | Check if user is authenticated | None | Yes (JWT Cookie) |

### 2. Admin Products API (`/api/admin/products`)

| Method | Endpoint | Description | Payload / Params | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| POST | `/upload-image` | Upload product image to Cloudinary | Multipart `file` (`my_file`) | Yes (Admin) |
| POST | `/add` | Register new catalog product | `{ image, title, description, category, brand, price, salePrice, totalStock }` | Yes (Admin) |
| PUT | `/edit/:id` | Update a product | Same as above | Yes (Admin) |
| DELETE | `/delete/:id` | Delete a product record | Param: `:id` | Yes (Admin) |
| GET | `/get` | Fetch all products | None | Yes (Admin) |
| GET | `/get/:id` | Retrieve a single product | Param: `:id` | Yes (Admin) |

### 3. Admin Orders API (`/api/admin/orders`)

| Method | Endpoint | Description | Payload / Params | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| GET | `/get` | Fetch all orders | None | Yes (Admin) |
| GET | `/details/:id` | Details of a customer order | Param: `:id` | Yes (Admin) |
| PUT | `/update/:id` | Update shipping/order status | `{ orderStatus }` | Yes (Admin) |

### 4. Shop Products API (`/api/shop/products`)

| Method | Endpoint | Description | Payload / Params | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| GET | `/get` | Fetch products with filters | Query: `category`, `brand`, `sortBy` | Yes |
| GET | `/get/:id` | Fetch a single product | Param: `:id` | Yes |

### 5. Shop Cart API (`/api/shop/cart`)

| Method | Endpoint | Description | Payload / Params | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| POST | `/add` | Add item / increment cart count | `{ userId, productId, quantity }` | Yes |
| GET | `/get/:userId` | Read current cart contents | Param: `:userId` | Yes |
| PUT | `/update-cart` | Adjust cart product quantity | `{ userId, productId, quantity }` | Yes |
| DELETE | `/:userId/:productId` | Remove item from cart | Params: `:userId`, `:productId` | Yes |

### 6. Shop Address API (`/api/shop/address`)

| Method | Endpoint | Description | Payload / Params | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| POST | `/add` | Add a new address | `{ userId, address, city, pincode, phone, notes }` | Yes |
| GET | `/get/:userId` | List saved addresses | Param: `:userId` | Yes |
| PUT | `/update/:userId/:addressId` | Edit address details | `{ address, city, pincode, phone, notes }` | Yes |
| DELETE | `/delete/:userId/:addressId` | Delete a saved address | Params: `:userId`, `:addressId` | Yes |

### 7. Shop Orders & Payments API (`/api/shop/order`)

| Method | Endpoint | Description | Payload / Params | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| POST | `/create` | Generate order, get Razorpay Order ID | `{ userId, cartId, cartItems, addressInfo, totalAmount }` | Yes |
| POST | `/verify-payment` | Verify HMAC signature, update stock, clear cart | `{ razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId }` | Yes |
| GET | `/list/:userId` | List all orders by user | Param: `:userId` | Yes |
| GET | `/details/:id` | Specific order details | Param: `:id` | Yes |

### 8. Search API (`/api/shop/search`)

| Method | Endpoint | Description | Payload / Params | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| GET | `/:keyword` | Match products by title, description, category, or brand | Param: `:keyword` | Yes |

### 9. Reviews API (`/api/shop/review`)

| Method | Endpoint | Description | Payload / Params | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| POST | `/add` | Post a review (verified purchase check) | `{ productId, userId, userName, reviewMessage, reviewValue }` | Yes |
| GET | `/:productId` | Get all reviews for a product | Param: `:productId` | Yes |

### 10. Feature Banners API (`/api/common/feature`)

| Method | Endpoint | Description | Payload / Params | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| POST | `/add` | Save a homepage banner slide | `{ image }` | Yes (Admin) |
| GET | `/get` | Fetch active homepage banners | None | Yes |

---

## ⚙️ Configuration & Environment Variables

Create two `.env` files, one per app:

**`server/.env`**
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_custom_jwt_signing_token
CLIENT_URL=http://localhost:5173

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**`client/.env`**
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key_id
```

---

## 🛠️ Installation & Getting Started

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/Vijay-Prakash15/E-Commerce.git
cd E-Commerce
```

### 2. Set up the server
```bash
cd server
npm install
npm run dev
```
The API runs on `http://localhost:5000` (or the port set in `.env`).

### 3. Set up the client
```bash
cd client
npm install
npm run dev
```
The frontend runs on `http://localhost:5173`. Open it in your browser.

---

## 🛡️ Security & Route Protection

| Layer | Description |
| :--- | :--- |
| **Password Hashing** | Passwords encrypted with `bcryptjs` before insertion; never returned in plain text. |
| **JWT Verification (`authMiddleware`)** | Reads the `token` cookie, decrypts the JWT, returns `401 Unauthorized` if invalid/expired. |
| **Role Authorization (`adminMiddleware`)** | Checks `req.user.role === 'admin'`; returns `403 Forbidden` if the check fails. |
| **CSRF/CORS Guards** | Origin restrictions via the `cors` package to block unauthorized domains. |

---

## 🌐 Live Demo & Repository

- 🔗 **Live App:** [vastrakart26.vercel.app](https://vastrakart26.vercel.app/)
- 💻 **GitHub Repo:** [Vijay-Prakash15/E-Commerce](https://github.com/Vijay-Prakash15/E-Commerce)

---

## 📄 License

This project is open source and available for learning purposes. Feel free to fork, explore, and build upon it.

---

<p align="center">Made with ❤️ by <b>Vijay Prakash</b></p>