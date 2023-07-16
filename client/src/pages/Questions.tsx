import QuestionsList from "../Components/Questions/QuestionsList";
import { useLoaderData, json } from "react-router-dom";

function Questions() {
  const data: any = useLoaderData();
  // const questions = data.questions;

  if (data.isError) {
    return <p>{data.message}</p>;
  }

  return (
    <>
      <QuestionsList events={data} />
    </>
  );
}

export default Questions;

export async function loader() {
  const response = await fetch("http://localhost:8080/questions");

  if (!response.ok) {
    return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    return response;
  }
}
