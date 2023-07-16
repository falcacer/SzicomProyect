import { v4 as uuidv4 } from "uuid";
import { pool } from "./util.js";
import { NotFoundError } from "../util/errors.js";
import { userIdtoName } from "./user.js";

export async function getAll() {
  const [answers] = await pool.query("SELECT * FROM ANSWERS");
  return answers;
}

export async function get(question) {
  const [answers] = await pool.query(
    "SELECT * FROM ANSWERS WHERE question=?;",
    [question.id]
  );
  return answers;
}

export async function set(answer) {
  const date = new Date(answer.created).toLocaleDateString();
  return {
    id: answer.id,
    question: answer.question,
    user: await userIdtoName(answer.user),
    content: answer.content,
    created: date,
  };
}

