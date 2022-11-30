import React from "react";
import RelatedJob from "./RelatedJob";

function RelatedJobs({ relJobs }) {
 
  return (
    <div className="sticky-jobs">
      <div className="sidebar-border">
        <h6 className="f-18">Related jobs</h6>
        <div className="sidebar-list-job">
          <ul>
            {relJobs.length > 0 &&
              relJobs.map((job) => <RelatedJob key={job.id} job={job} />)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RelatedJobs;
