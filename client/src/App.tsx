import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Questions, { loader as eventLoader } from "./pages/Questions";
import Account, { action as authAction } from "./pages/Account";
import QuestionDetails, {
  loader as questionDetailLoader,
  action as deleteQuestionAction,
} from "./pages/QuestionDetails";
import NewQuestion, { action as newQuestionAction } from "./pages/NewQuestion";
import QuestionEdit from "./pages/QuestionEdit";
import RootLayout from "./pages/Root";
import QuestionsRootLayout from "./pages/QuestionsRoot";
import Error from "./pages/Error";
import Home from "./pages/Home";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader, tokenLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <Home /> },
      {
        path: "questions",
        element: <QuestionsRootLayout />,
        children: [
          {
            index: true,
            element: <Questions />,
            loader: eventLoader,
          },
          {
            path: ":questionId",
            id: "questionDetail",
            loader: questionDetailLoader,
            children: [
              {
                index: true,
                element: <QuestionDetails />,
                action: deleteQuestionAction,
              },
              {
                path: "edit",
                element: <QuestionEdit />,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewQuestion />,
            action: newQuestionAction,
            loader: checkAuthLoader,
          },
        ],
      },
      { path: "auth", element: <Account />, action: authAction },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
