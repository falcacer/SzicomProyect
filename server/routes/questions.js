import express from "express";
import {
  get,
  getAll,
  set as setQuestion,
  add,
  replace,
  erase,
} from "../data/question.js";
import { set as setAnswer, get as getAnswers } from "../data/answer.js";
import { isValidText } from "../util/validation.js";
import { checkAuthMiddleware } from "../util/auth.js";

export const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await getAll();
    let questions = [];
    await Promise.all(
      data.map(async (elem) => {
        questions.push(await setQuestion(elem));
      })
    );
    res.json(questions);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const question = await get(req.params.id);
    const answers = await getAnswers(question);
    let data = [];
    answers.map(async (answer) => {
      data.push(await setAnswer(answer));
    });
    res.json([await setQuestion(question), data]);
  } catch (error) {
    next(error);
  }
});

router.use(checkAuthMiddleware);

router.post("/", async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = "invalid Title";
  }
  if (!isValidText(data.content)) { 
    errors.content = "invalid Content";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the question failed due to validation errors.",
      errors,
    });
  }

  try {
    const createdQuestion = await add(data.user, data.title, data.content);
    res
      .status(201)
      .json({ message: "Question saved.", question: createdQuestion });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = "Invalid Title.";
  }

  if (!isValidText(data.content)) {
    errors.content = "Invalid Content.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the question failed due to validation errors.",
      errors,
    });
  }

  try {
    const updatedQuestion = await replace(data);
    res.json({ message: "Event updated.", event: data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const removedQuestion = await erase(id);
    res.json({ message: "Question deleted." });
  } catch (error) {
    next(error);
  }
});
