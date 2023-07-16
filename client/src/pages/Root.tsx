import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../Components/MainNavigation";

type Props = {};

const RootLayout = (props: Props) => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
