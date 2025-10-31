import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import {ObjectId} from "mongoose"
import jwt from "jsonwebtoken";

// Use environment variable for JWT secret
const SECRET = process.env.JWT_SECRET || "something";

const profile = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findOne({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }
    const result = await userModel.findByIdAndUpdate(id, body);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findOne({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt for:', email);
    
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      console.log('User found:', email);
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (isMatch) {
        const userObj = {
          id: existingUser._id,
          firstName: existingUser.firstName,
          email: existingUser.email,
          role: existingUser.role,
        };
        const token = jwt.sign(userObj, SECRET, { expiresIn: "1h" });
        console.log('Login successful for:', email);
        res.status(200).json({ ...userObj, token });
      } else {
        console.log('Invalid password for:', email);
        res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      console.log('User not found:', email);
      res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    console.log('Registration attempt for:', email);
    
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: "User already exists" });
    }
    
    const hashedpwd = await bcrypt.hash(password, 10);
    const user = {
      firstName,
      lastName,
      email,
      password: hashedpwd,
      role: "user" // Default role
    };
    const result = await userModel.create(user);
    console.log('User registered successfully:', email);
    res.status(201).json({ message: "User registered successfully", user: { id: result._id, email: result.email } });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

const addUser = async (req, res) => {
  try {
    const body = req.body;
    const hashedpwd = await bcrypt.hash(body.password, 10);
    body.password = hashedpwd;
    const result = await userModel.create(body);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.params.id
    // console.log(id)
    // const { firstName, lastName, email, password } = req.body;
    const body = req.body;
    if (body.password) {
      const hashedpwd = await bcrypt.hash(body.password, 10);
      body.password = hashedpwd;
    }
    const result = await userModel.findByIdAndUpdate(id, body);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const showUsers = async (req, res) => {
  try {
    const { page = 1, limit = 3, search = "" } = req.query;
    const skip = (page - 1) * limit;
    const count = await userModel.countDocuments({
      firstName: { $regex: search, $options: "i" },
    });
    const total = Math.ceil(count / limit);
    const users = await userModel
      .find({ firstName: { $regex: search, $options: "i" } })
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });
    res.status(200).json({ users, total });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export {
  register,
  login,
  showUsers,
  deleteUser,
  updateUser,
  profile,
  updateProfile,
  getUser,
  addUser,
};
