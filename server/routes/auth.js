import express from "express";
import { add, get } from "../data/user.js";
import { createJSONToken, isValidPassword } from "../util/auth.js";
import { isValidText } from "../util/validation.js";

export const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const user = req.body;
  let errors = {};
  try {
    const existingUser = await get(user.username);
    if (existingUser) {
      errors.username = "User exists already.";
    }
  } catch (error) {}

  if (!isValidText(user.password, 6)) {
    errors.password = "Invalid password. Must be at least 6 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "User signup failed due to validation errors.",
      errors,
    });
  }

  try {
    const createdUser = await add(user);
    const authToken = createJSONToken(createdUser.username);
    res
      .status(201)
      .json({ message: "User created.", user: createdUser, token: authToken });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let user;
  try {
    user = await get(username);
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }

  const pwIsValid = await isValidPassword(password, user.pass);
  if (!pwIsValid) {
    return res.status(422).json({
      message: "Invalid credentials.",
      errors: { credentials: "Invalid email or password entered." },
    });
  }

  const token = createJSONToken(username);

  res.json({ token });
});
