import classes from "./QuestionForm.module.css";
import { Form, useNavigate, useNavigation } from "react-router-dom";

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
