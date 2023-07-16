import { NavLink } from "react-router-dom";
import classes from "./QuestionsNavigation.module.css";

function QuestionsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/questions"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Questions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/questions/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New Question
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default QuestionsNavigation;
