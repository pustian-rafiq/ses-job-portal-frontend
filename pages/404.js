import React from "react";

import MasterLayout from "../Layouts/MasterLayout";

const PageNotFound = () => {
  return (
    <>
      <div className="four_zero_four_bg text-center p-5">
        <h1 className="four_zero_four">404</h1>
        <h5 className="h2">Look like you are lost</h5>
        <p>The page you are looking for not avaible!</p>
      </div>
    </>
  );
};

PageNotFound.Layout = MasterLayout;

export default PageNotFound;
