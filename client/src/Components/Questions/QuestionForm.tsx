import classes from "./QuestionForm.module.css";
import {
  Form,
  useNavigate,
  useNavigation,
  redirect,
  json,
} from "react-router-dom";
import { getUserFromToken, getAuthToken } from "../../util/auth";

const QuestionForm = ({ method, question }: any) => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={question.title}
        />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          required
          defaultValue={question.content}
        />
      </p>
      <div className={classes.actions}>
        <button disabled={isSubmitting} type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Save"}
        </button>
      </div>
    </Form>
  );
};

export default QuestionForm;

export async function action({ request, params }: any) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();
  const user = getUserFromToken(token);

  let questionData : any = {
    title: data.get("title"),
    content: data.get("content"),
    user,
  };

  let url = "http://localhost:8080/questions";

  if (method === "PATCH") {
    const questionId = params.questionId;
    questionData.id = questionId
    url = `http://localhost:8080/questions/${questionId}`;
  }


  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(questionData),
  });

  if (!response.ok) {
    throw json({ message: "Something went wrong!." }, { status: 500 });
  }

  return redirect("/questions");
}
