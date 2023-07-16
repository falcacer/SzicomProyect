import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import classes from "./QuestionItem.module.css";
import { getUserFromToken } from "../../util/auth";

function QuestionItem({ question }: any) {
  const token: any = useRouteLoaderData("root");
  let currentUser = true;
  if (token) {
    currentUser = question.user === getUserFromToken(token);
  }
  
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <article className={classes.container}>
      <div className={classes.info}>
        <p>{question.user}</p>
        <time>{question.created}</time>
      </div>
      <div className={classes.content}>
        <h1>{question.title}</h1>
        <p>{question.content}</p>
      </div>
      {token && currentUser && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
}

export default QuestionItem;
