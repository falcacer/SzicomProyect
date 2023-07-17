import { v4 as uuidv4 } from "uuid";
import { pool } from "./util.js";
import { NotFoundError } from "../util/errors.js";
import { userIdtoName, get as getUser } from "./user.js";

export async function getAll() {
  const [questions] = await pool.query("SELECT * FROM QUESTIONS");
  return questions;
}

export async function getQuestionbyDate() {
  const [res] = await pool.query(
    "SELECT * from QUESTIONS ORDER BY created DESC;"
  );
  return res;
}
export async function get(question) {
  const [questions] = await pool.query("SELECT * FROM QUESTIONS WHERE id=?;", [
    question,
  ]);
  return questions[0];
}

export async function add(user, title, content) {
  let id = uuidv4();
  const userId = (await getUser(user)).id;
  const registered = await get(id);
  if (registered) {
    throw new NotFoundError("Something went wrong! Try again.");
  }

  pool.query(
    "INSERT INTO QUESTIONS (id, user, title, content) VALUES (?, ?, ?, ?);",
    [id, userId, title, content]
  );
  return { id, user, title, content };
}

export async function replace(data) {
  const id = data.id;
  const title = data.title;
  const content = data.content;
  const registered = await get(id);
  if (!registered) {
    throw new NotFoundError("Something went wrong! Try again.");
  }
  const updatedQuestion = await pool.query(
    "UPDATE QUESTIONS SET title = ?, content = ? WHERE id=?;",
    [title, content, id]
  );
  return { id, title, content };
}

export async function erase(id) {
  const registered = await get(id);
  if (!registered) {
    throw new NotFoundError("Something went wrong! Try again.");
  }
  const deletedQuestion = pool.query("DELETE FROM QUESTIONS WHERE id=?", [id]);
  return registered;
}

export async function set(question) {
  const date = new Date(question.created).toLocaleDateString();
  return {
    id: question.id,
    user: await userIdtoName(question.user),
    title: question.title,
    content: question.content,
    created: date,
  };
}

export function updateDate(question) {
  const date = question.created;
  const newDate = new Date(date)
  const oneDay = 60 * 60 * 24 * 1000
  newDate.setTime(newDate.getTime() + oneDay)
  return {
    id: question.id,
    user: question.user,
    title: question.title,
    content: question.content,
    created: newDate,
  };
}

export async function updateDateDB(question) {
  const id = question.id
  const res = await pool.query('update QUESTIONS SET created = date_add(created, INTERVAL 1 day) WHERE id=?;', [id])
  return id
}