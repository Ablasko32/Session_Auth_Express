import db from "../config/db.js";
import bcrypt from "bcrypt";
import { ApiError } from "../middleware/errorMiddleware.js";

// AUTH CONTROLLERS FOR SIGNUP,LOGIN,LOGOUT AND CHECK USER

// CREATE USER
export const createUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password)
      throw new ApiError("Username and password are required", 400);

    // CHECK TO SEE IF USER EXITS
    const userExits = await db.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);
    if (userExits.rows.length > 0) {
      throw new ApiError("User already exists", 409);
    }

    // IF USER DOESNT EXIST INSERT USER
    // FIRST HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 12);

    const insertUser = await db.query(
      "INSERT INTO users(username,password) VALUES($1,$2) RETURNING (username,created_at) ",
      [username, hashedPassword]
    );
    // console.log(insertUser);

    return res.status(201).json({ message: "User has been created" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// LOGIN
export const loginUser = async (req, res, next) => {
  // DECONSTRUCT NAME AND PASSWORD FROM req.body
  const { username, password } = req.body;
  try {
    if (!username || !password)
      throw new ApiError("Username and password are required", 400);

    // TRY TO FIND USER BASED ON USERNAME
    const findUser = await db.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);
    const user = findUser.rows[0];
    // console.log(user);

    // IF USER DOESNT EXIST THROW 401 ERROR AND SEND ERROR MSG
    if (!user) throw new ApiError("User not found", 404);

    // IF USER DOES EXIST CHECK PASSWORD, IF PASSOWRD DOESNT MATCH SEND 401 AND ERR MSG
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ApiError("Wrong credentials provided", 401);

    // IF USER EXISTS VIA USERNAME AND PASSWORD MATCHES THEN LOGIN USER TO SESSION
    req.session.user = user.id;
    // console.log(req.session.user);

    return res.status(200).json({ session: req.sessionID, userId: user.id });
  } catch (err) {
    next(err);
  }
};

// LOGOUT
export const logoutUser = (req, res) => {
  // DESTROYING OD SESSION
  req.session.destroy((err) => {
    if (err) throw new ApiError("Failed to log out", 500);
  });

  // CLEAR COOKIE ON CLIENT SIDE
  res.clearCookie("connect.sid");

  return res.status(200).json({ message: "Logged out successfully" });
};

// CHECK USER SESSION
export const checkUser = (req, res) => {
  // RETURNS USER as user.id OR null IF NO SESSION
  const user = req.session.user || null;
  return res.status(200).json({ user: user });
};
