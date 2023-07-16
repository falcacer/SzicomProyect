import AnswerItem from "./AnswerItem";
import { Answer } from "../../types";
import Card from "../../UI/Card";

const AnswersList = ({ answers }: any) => {
  return (
    <div>
      <ul>
        {answers.map((answer: any) => (
          <li key={answer.id}>
            <AnswerItem answer={answer} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnswersList;
