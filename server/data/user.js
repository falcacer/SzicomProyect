import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { NotFoundError } from "../util/errors.js";
import { pool } from "./util.js";

export async function getAll() {
  const [users] = await pool.query("SELECT * FROM USERS");
  return users;
}

export async function get(username) {
  const users = await getAll();
  if (!users || users.length === 0) {
    throw new NotFoundError("Could not find any users.");
  }

  const user = users.find((user) => user.username === username);

  if (!user) {
    throw new NotFoundError(`Could not find user for username ${username}`);
  }

  return user;
}

export async function add(user) {
  const id = uuidv4();
  const username = user.username;
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPw = await bcrypt.hash(user.password, salt);
  pool.query("INSERT INTO USERS (id, username, pass) VALUES (?, ?, ?);", [
    id,
    username,
    hashedPw,
  ]);
  return { id, username };
}

export async function erase(user) {
  return pool.query("DELETE FROM USERS WHERE id=?", [user.id]);
}

export async function userIdtoName(userId) {
  const [username] = await pool.query("SELECT username FROM USERS WHERE id=?", [
    userId,
  ]);
  return username[0].username;
}