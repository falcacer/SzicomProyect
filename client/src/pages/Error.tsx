import MainNavigation from "../Components/MainNavigation";
import PageContent from "../Components/PageContent";
import { useRouteError } from "react-router-dom";

type Props = {};

const Error = (props: Props) => {
  const error: any = useRouteError();

  let title = "An Error Ocurred!";
  let message = "Something went wrong";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not Found";
    message = "Could not found resources or page";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default Error;
