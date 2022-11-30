import Link from "next/link";
import React from "react";

function RelatedJob({ job }) {
  return (
    <li>
      <div
        className="card-list-4 wow animate__ animate__fadeIn hover-up animated"
        style={{
          visibility: "visible",
          animationName: "fadeIn",
        }}
      >
        <div className="info-text">
          <h5 className="font-md font-bold color-brand-1">
            <Link href={`/job/${job.id}`}>{job?.title}</Link>
          </h5>
          <div className="mt-0">
            <span className="card-briefcase">{job?.category}</span>
            {/* <span className="card-time">
              <span>3</span>
              <span> mins ago</span>
            </span> */}
          </div>
          <div className="mt-5">
            <div className="row">
              <div className="col-6">
                <h6 className="card-price">{job?.unit_price}</h6>
              </div>
              <div className="col-6 text-end">
                <span className="card-briefcase">{job?.work_place}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default RelatedJob;
