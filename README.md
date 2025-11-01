# 🔧 MERN Store - Backend API

RESTful API for MERN Store e-commerce platform with JWT authentication, role-based access control, and MongoDB database.

![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Features

- 🔐 JWT authentication and authorization
- 👥 User management (CRUD operations)
- 📦 Product management
- 🛒 Order processing and tracking
- 🔒 Role-based access control (Admin/User)
- 🌐 CORS enabled for frontend integration
- ☁️ MongoDB Atlas cloud database
- 🚀 Deployed on Vercel serverless functions

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **JWT (jsonwebtoken)** - Authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kinshukkush/mern-backend-main.git
cd mern-backend-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Server Configuration
PORT=8080

# JWT Secret (use a strong, random string)
JWT_SECRET=your_secure_jwt_secret_key_here

# Environment
NODE_ENV=development
```

**Important:** Replace the MongoDB URI with your actual connection string from MongoDB Atlas.

### 4. Start the Server

```bash
# Start with Node
node server.js

# Or with nodemon (for development)
nodemon server.js
```

The API will be available at: `http://localhost:8080`

You should see:
```
✅ MongoDB connected successfully!
🚀 Server running at http://localhost:8080
```

## 📁 Project Structure

```
├── controllers/              # Route controllers
│   ├── orderController.js   # Order operations
│   ├── productController.js # Product operations
│   └── userController.js    # User operations
├── middlewares/             # Custom middleware
│   └── auth.js             # Authentication & authorization
├── models/                  # Mongoose schemas
│   ├── orderModel.js       # Order schema
│   ├── productModel.js     # Product schema
│   └── userModel.js        # User schema
├── routes/                  # API routes
│   ├── orderRoute.js       # Order routes
│   ├── productRoute.js     # Product routes
│   └── userRoute.js        # User routes
├── public/                  # Static files
├── server.js               # Main server file
├── vercel.json             # Vercel deployment config
└── .env                    # Environment variables (not in git)
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:8080/api
```

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users/register` | Register new user | No |
| POST | `/users/login` | User login | No |

**Example Request (Login):**
```json
POST /api/users/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### User Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | Admin |
| GET | `/users/:id` | Get user by ID | Yes |
| GET | `/users/:id/profile` | Get user profile | Yes |
| PATCH | `/users/:id/profile` | Update profile | Yes |
| DELETE | `/users/:id` | Delete user | Admin |

### Product Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products/all` | Get all products (public) | No |
| GET | `/products` | Get products (paginated) | Admin |
| GET | `/products/:id` | Get product by ID | No |
| POST | `/products` | Create product | Admin |
| PATCH | `/products/:id` | Update product | Admin |
| DELETE | `/products/:id` | Delete product | Admin |

### Order Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/orders` | Create new order | Yes |
| GET | `/orders` | Get all orders | Admin |
| GET | `/orders/:email` | Get orders by user email | Yes |
| GET | `/orders/:id` | Get order by ID | Yes |
| PATCH | `/orders/:id` | Update order status | Admin |
| DELETE | `/orders/:id` | Delete order | Admin |

## 🔒 Authentication

Protected routes require JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

**Example:**
```javascript
headers: {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  'Content-Type': 'application/json'
}
```

### User Roles

- **User** - Can view products, create orders, manage own profile
- **Admin** - Full access to all resources (users, products, orders)

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `PORT` | Server port | No (default: 8080) |
| `NODE_ENV` | Environment mode | No (default: development) |

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `PORT=8080`
4. Deploy

**Live API:** [https://mern-backend-main-zeta.vercel.app/](https://mern-backend-main-zeta.vercel.app/)

### CORS Configuration

The API allows requests from:
- `http://localhost:5174` (Local development)
- `https://mern-frontent-main.vercel.app` (Production frontend)

Update CORS origins in `server.js` if your frontend URL changes.

## 🔗 Related Repositories

- **Frontend:** [https://github.com/kinshukkush/mern-frontend-main](https://github.com/kinshukkush/mern-frontend-main)
- **Frontend Live:** [https://mern-frontent-main.vercel.app/](https://mern-frontent-main.vercel.app/)

## 📜 Available Scripts

```bash
# Start server
node server.js

# Start with auto-reload (requires nodemon)
nodemon server.js

# Install dependencies
npm install
```

## 🐛 Common Issues

### MongoDB Connection Error
- Check your MongoDB URI is correct
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify network access settings

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8080 | xargs kill -9
```

### CORS Errors
- Verify frontend URL is in CORS origins
- Check `VITE_API_URL` in frontend `.env`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Kinshuk Saxena**
- GitHub: [@kinshukkush](https://github.com/kinshukkush)
- Backend Repository: [mern-backend-main](https://github.com/kinshukkush/mern-backend-main)
- Frontend Repository: [mern-frontend-main](https://github.com/kinshukkush/mern-frontend-main)

## 🙏 Acknowledgments

- MongoDB team for the excellent database
- Express.js for the minimal web framework
- JWT for secure authentication

---

**Made with ❤️ using Node.js and MERN Stack**

