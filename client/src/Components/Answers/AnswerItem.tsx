import classes from "./AnswerItem.module.css";

const AnswerItem = ({ answer }: any) => {
  return (
    <div className={classes.item}>
      <p className={classes.message}>{answer.content}</p>
      <h5 className={classes.user}>{answer.user}</h5>
      <time className={classes.date}>{answer.created}</time>
    </div>
  );
};

export default AnswerItem;
