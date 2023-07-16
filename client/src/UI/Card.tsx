import classes from "./Card.module.css";

function Card({ children }: any) {
  return <div className={classes.card}>
    {children}</div>;
}

export default Card;
