const jwt = require("jsonwebtoken");
const response = require("../utils/responceHandler");
const bcrypt = require("bcryptjs");
const BaraiUser = require("../models/User");
const { generateToken } = require("../utils/generateToken");

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req?.body;

    const doesUserExist = await BaraiUser.findOne({ email });
    if (doesUserExist) {
      return response(res, 401, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new BaraiUser({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const accessToken = generateToken(newUser);
    res.cookie("member_token", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return response(res, 200, "You signed up successfully", newUser);
  } catch (error) {
    console.error("Somthing wrong", error.message);
    return response(res, 401, "Failed in signing up");
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req?.body;

    const isUser = await BaraiUser.findOne({ email });
    if (!isUser) {
      return response(res, 401, "User does not exists");
    }

    const matchPassword = await bcrypt.compare(password, isUser?.password);
    if (!matchPassword) {
      return response(res, 401, "Incorrect password");
    }

    const accessToken = generateToken(isUser);
    res.cookie("member_token", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return response(res, 200, "You signed in successfully", isUser);
  } catch (error) {
    console.error("Something went wrong while signing in", error.message);
  }
};

const signOut = async (req, res) => {
  try {
    res.cookie("member_token", "", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(0),
    });

    return response(res, 200, "You signed out successfull");
  } catch (error) {
    return response(res, 500, "Something went wrong", error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await BaraiUser.find();

    if (users) return response(res, 200, "Got users successfully");
  } catch (error) {
    res.json({ message: "could not get users" });
  }
};

module.exports = { signUp, signIn, signOut, getAllUsers };
