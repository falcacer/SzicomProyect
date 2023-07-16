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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Account />, action: authAction },
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
              { path: "edit", element: <QuestionEdit /> },
            ],
          },
          { path: "new", element: <NewQuestion />, action: newQuestionAction },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
