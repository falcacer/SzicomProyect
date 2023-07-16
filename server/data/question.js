import { v4 as uuidv4 } from "uuid";
import { pool } from "./util.js";
import { NotFoundError } from "../util/errors.js";
import { userIdtoName } from "./user.js";

export async function getAll() {
  const [questions] = await pool.query("SELECT * FROM QUESTIONS");
  return questions;
}

export async function get(question) {
  const [questions] = await pool.query("SELECT * FROM QUESTIONS WHERE id=?;", [
    question,
  ]);
  return questions[0];
}

export async function add(id_user, title, content) {
  let id = uuidv4();
  const registered = await get(id);
  if (registered) {
    throw new NotFoundError("Something went wrong! Try again.");
  }

  pool.query(
    "INSERT INTO QUESTIONS (id, user, title, content) VALUES (?, ?, ?, ?);",
    [id, id_user, title, content]
  );
  return;
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

// export async function getAnswers(id_question) {
//   const [answers] = await pool.query(
//     "SELECT * FROM Answers WHERE id=?",
//     [id_question]
//   );
//   return answers;
// }

// export async function getUser(id) {
//   const [user] = await pool.query("SELECT * FROM USERS WHERE id=?", [id]);
//   return user[0];
// }

// export async function getAnswer(id) {
//   const [answers] = await pool.query("SELECT * FROM ANSWERS WHERE id=?", [id]);
//   return answers[0];
// }

// export async function getUserAnswers(id) {
//   const [answers] = await pool.query("SELECT * FROM ANSWERS WHERE user=?", [
//     id,
//   ]);
//   return answers[0];
// }

// export async function getUserQuestions(id) {
//   const [questions] = await pool.query("SELECT * FROM QUESTIONS WHERE user=?", [
//     id,
//   ]);
//   return questions;
// }

// export async function registerUser(name, password) {
//   let id = uuidv4();
//   const registered = await getUser(id);
//   if (registered) {
//     console.log("User already registred");
//     return;
//   }
//   pool.query("INSERT INTO USERS (id, username, pass) VALUES (?, ?, ?);", [
//     id,
//     name,
//     password,
//   ]);
// }

export async function addAnswer(id_question, id_user, content) {
  let id = uuidv4();
  const registered = await getAnswer(id);
  if (registered) {
    console.log("Something went wrong!");
    return;
  }
  pool.query(
    "INSERT INTO ANSWERS (id, question, user, content) VALUES (?, ?, ?, ?);",
    [id, id_question, id_user, content]
  );
}

export async function getQuestionAnswers(id_question) {
  const [answers] = await pool.query("SELECT * FROM ANSWERS WHERE question=?", [
    id_question,
  ]);
  return answers;
}
