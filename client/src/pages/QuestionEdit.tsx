import { useRouteLoaderData } from "react-router-dom";
import Card from "../UI/Card";
import QuestionForm from "../Components/Questions/QuestionForm";

const QuestionEdit = () => {
  const data: any = useRouteLoaderData("questionDetail");
  const question = data[0];

  return (
    <Card>
      <QuestionForm question={question}/>
    </Card>
  );
};

export default QuestionEdit;
