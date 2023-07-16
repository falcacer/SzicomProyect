import { Link } from "react-router-dom";
import classes from "./QuestionsList.module.css";

const QuestionsList = ({ events }: any) => {

  return (
    <div className={classes.events}>
      <h1>All Questions</h1>
      <ul className={classes.list}>
        {events.map((event: any) => (
          <li key={event.id} className={classes.item}>
            <Link to={event.id}>
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <p>{event.content}</p>
                <h4>{event.user}</h4>
                <time>{event.created}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
