import QuestionsNavigation from "../Components/Questions/QuestionsNavigation";
import { Outlet } from "react-router-dom";

type Props = {};

const QuestionsRootLayout = (props: Props) => {
  return (
    <>
      <QuestionsNavigation />
      <Outlet />
    </>
  );
};

export default QuestionsRootLayout;
