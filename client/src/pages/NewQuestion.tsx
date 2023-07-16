import QuestionForm from "../Components/Questions/QuestionForm";

const NewQuestion = () => {
  const questionNull = {
    title: "",
    content: "",
  };
  return (
    <div>
      <QuestionForm method={"post"} question={questionNull} />
    </div>
  );
};

export default NewQuestion;
