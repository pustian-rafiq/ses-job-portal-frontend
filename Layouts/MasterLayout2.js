import React from "react";

import MasterLayout from "./MasterLayout";

export default function MasterLayout2({ children }) {
  return (
    <>
      <MasterLayout>
        <div className="row">
          <div className="col-md-2 bg-danger vh-100">Left</div>
          <div className="col-md-8">{children}</div>
          <div className="col-md-2 bg-success">Right</div>
        </div>
      </MasterLayout>
    </>
  );
}
