import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css"

type Props = {};

const MainNavigation = (props: Props) => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/questions"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Questions
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
