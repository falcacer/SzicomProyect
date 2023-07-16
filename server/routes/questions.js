import express from "express";
import { get, getAll, set as setQuestion } from "../data/question.js";
import { set as setAnswer, get as getAnswers } from "../data/answer.js";

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

router.post("/", async (req, res, next) => {
  const data = req.body;
  console.log(data)

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
    await add(data.id_user, data.title, data.content);
    res.status(201).json({ message: "Question saved.", question: data });
  } catch (error) {
    next(error);
  }
});

// router.patch("/:id", async (req, res, next) => {
//   const data = req.body;

//   let errors = {};

//   if (!isValidText(data.title)) {
//     errors.title = "Invalid Title.";
//   }

//   if (!isValidText(data.content)) {
//     errors.content = "Invalid Content.";
//   }

//   if (Object.keys(errors).length > 0) {
//     return res.status(422).json({
//       message: "Updating the question failed due to validation errors.",
//       errors,
//     });
//   }

//   try {
//     await (req.params.id, data);
//     res.json({ message: "Event updated.", event: data });
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete('/:id', async (req, res, next) => {
//   try {
//     await remove(req.params.id);
//     res.json({ message: 'Question deleted.' });
//   } catch (error) {
//     next(error);
//   }
// });
