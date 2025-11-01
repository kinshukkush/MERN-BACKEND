# MERN Store - Backend API

RESTful API for the MERN Store e-commerce platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- 🔐 JWT authentication and authorization
- 👥 User management (CRUD operations)
- 📦 Product management
- 🛒 Order processing and tracking
- 🔒 Role-based access control (Admin/User)
- 🌐 CORS enabled for frontend integration
- ☁️ MongoDB Atlas database
- 🚀 Deployed on Vercel

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (Atlas)
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **cors** - Cross-origin resource sharing

## 📦 Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/mern-backend-main.git
cd mern-backend-main
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=8080
NODE_ENV=development
```

4. Run development server
```bash
npm start
```

The API will be available at `http://localhost:8080`

## 🔌 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/:id/profile` - Get user profile
- `PATCH /api/users/:id/profile` - Update user profile
- `DELETE /api/users/:id` - Delete user (Admin only)

### Products
- `GET /api/products/all` - Get all products (Public)
- `GET /api/products` - Get products with pagination (Admin)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PATCH /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (Admin only)
- `GET /api/orders/:email` - Get orders by user email
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id` - Update order status (Admin only)
- `DELETE /api/orders/:id` - Delete order (Admin only)

## 🔒 Authentication

Protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

### User Roles
- **User** - Can view products, create orders, manage own profile
- **Admin** - Full access to all resources

## 📁 Project Structure

```
├── controllers/           # Route controllers
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
├── middlewares/          # Custom middleware
│   └── auth.js          # Authentication & authorization
├── models/              # Mongoose schemas
│   ├── orderModel.js
│   ├── productModel.js
│   └── userModel.js
├── routes/              # API routes
│   ├── orderRoute.js
│   ├── productRoute.js
│   └── userRoute.js
├── public/              # Static files
├── server.js            # Entry point
└── vercel.json         # Vercel configuration
```

## 🌐 Environment Variables

Required environment variables:

- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT signing
- `PORT` - Server port (default: 8080)
- `NODE_ENV` - Environment (development/production)

## 🚀 Deployment

This project is configured for Vercel deployment:

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `PORT=8080`
4. Deploy automatically on every push to main branch

**Live API**: https://mern-backend-main-zeta.vercel.app/

## 🔧 CORS Configuration

The API allows requests from:
- `http://localhost:5174` (Local development)
- `https://mern-frontent-main.vercel.app` (Production)

Update CORS origins in `server.js` if your frontend URL changes.

## 📄 License

MIT License
