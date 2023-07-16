import { json, redirect } from "react-router-dom";
import QuestionForm from "../Components/Questions/QuestionForm";

const NewQuestion = () => {
  const questionNull = {
    title: "",
    content: "",
  };
  return (
    <div>
      <QuestionForm question={questionNull} />
    </div>
  );
};

export default NewQuestion;

export async function action({ req, params }: any) {
  const data = await req.formData();

  const questionData = {
    title: data.get("title"),
    content: data.get("content"),
  };

  const response = await fetch("http://localhost:8080/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(questionData),
  });

  if (!response.ok) {
    throw json({ message: "Something went wrong!." }, { status: 500 });
  }

  return redirect("/questions");
}
