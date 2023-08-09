import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendCookie } from "../utils/sendCookie.js";

// =============== Register User Controller =================
export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Check: If user is already a registered user
        let user = await User.findOne({email});

        if(user) return res.status(422).json({
            success: false,
            message: "Email is already registered",
        });

        // Password Hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Send Cookie to browser
        sendCookie( user, res, 201, "User Regsitered Successfully");
    } catch (error) {
        res.status(500).json({
            success: false,
            error,
        });
    };
};

// =============== Login User Controller =================
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({email}).select("+password");

        // Check: If user is not a registered user
        if(!user) return res.status(400).json({
            success: false,
            message: "Invalid Email or Password",
        });

        // Check Password of user if exists
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) return res.status(400).json({
            success: false,
            message: "Invalid Email or Password",
        });

        // Send Cookie
        sendCookie(user, res, 200, `Welcome back, ${user.name}`);

    } catch (error) {
        res.status(500).json({
            success: false,
            error,
        });
    };
};

// =============== Logout User Controller =================
export const logout = async (req, res) => {
    try {
      res
        .status(200)
        .cookie("token", "", {
          expires: new Date(Date.now()),
        })
        .json({
          success: true,
          message: "User logout Successfully",
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        error,
      });
    }
  };

// =============== Get User Profile Controller =================
export const profile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    })
};