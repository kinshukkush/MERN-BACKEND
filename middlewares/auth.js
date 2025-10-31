import jwt from "jsonwebtoken";

// Use environment variable for JWT secret
const SECRET = process.env.JWT_SECRET || "something";

const authenticate = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      console.log('❌ No authorization header');
      return res.status(401).json({ message: "No token provided" });
    }
    
    token = token.split(" ")[1];
    console.log('🔑 Authenticating token:', token.substring(0, 20) + '...');
    
    const user = jwt.verify(token, SECRET);
    req.role = user.role;
    req.userId = user.id;
    
    console.log('✅ Authenticated user:', { role: user.role, id: user.id });
    next();
  } catch (err) {
    console.error('❌ Authentication failed:', err.message);
    return res.status(401).json({ message: "Access Denied", error: err.message });
  }
};

const authorize = (role) => {
  return (req, res, next) => {
    console.log('🔒 Checking authorization:', { required: role, actual: req.role });
    if (req.role === role) {
      console.log('✅ Authorized');
      next();
    } else {
      console.log('❌ Unauthorized - wrong role');
      return res.status(403).json({ message: "Unauthorized Access", required: role, actual: req.role });
    }
  };
};

export {authenticate,authorize}