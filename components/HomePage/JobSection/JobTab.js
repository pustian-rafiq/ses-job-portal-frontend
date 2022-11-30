import React from "react";
import JobCard from "./JobCard";

function JobTab({ id, active, jobs,setJobs,categoryId}) {
  return (
    <>
      <div
        className={`tab-pane fade show ${active ? "active" : ""}`}
        id={id}
        role="tabpanel"
        aria-labelledby={id}
      >
        <div className="row">

            <JobCard jobs={jobs} setJobs={setJobs} categoryId={categoryId} />
        </div>
      </div>
    </>
  );
}

export default JobTab;
