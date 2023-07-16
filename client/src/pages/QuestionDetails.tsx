import AnswersList from "../Components/Answers/AnswersList";
import QuestionItem from "../Components/Questions/QuestionItem";
import { json, redirect, useRouteLoaderData } from "react-router-dom";
import { Answer } from "../types";
import Card from "../UI/Card";
import { getAuthToken } from "../util/auth";

const QuestionDetails = () => {
  const data: any = useRouteLoaderData("questionDetail");
  const question = data[0];
  const answers: [Answer] = data[1];

  return (
    <div>
      <Card>
        <QuestionItem question={question} />
        <AnswersList answers={answers} />
      </Card>
    </div>
  );
};

export default QuestionDetails;

export async function loader({ req, params }: any) {
  const id = params.questionId;

  const response = await fetch(`http://localhost:8080/questions/${id}`);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch answers for selected question." },
      { status: 500 }
    );
  } else {
    return response;
  }
}

export async function action({ req, params }: any) {
  const questionId = params.questionId;
  const token = getAuthToken();

  const response = await fetch(
    `http://localhost:8080/questions/${questionId}`,
    { method: req.method,
    headers: {
      'Authorization': 'Bearer ' + token
    } }
  );

  if (!response.ok) {
    throw json({ message: "Could not delete question." }, { status: 500 });
  }
  return redirect("/questions");
}
