import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import token, { getToken } from "../../../services/auth/token";
import JobModal from "./JobModal";

function JobCard({ jobs, setJobs, categoryId }) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [isAppliedId, setIsAppliedId] = useState(null);


  // console.log("jobs",jobs)
  
  const handleShow = (jobId) => {
    if (getToken()) {
      setShow(true);
      setJobId(jobId);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <>
      {jobs?.slice(0, 8)?.map((job, index) => {
        return (
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 job-card"
            key={index}
          >
            <div className="card-grid-2 card-mh hover-up neomp">
              <div className="card-grid-2-image-left">
                <span className="flash"></span>
                <div className="right-info">
                  <span className="location-small">{job?.work_place}</span>
                </div>
              </div>
              <div className="card-block-info   ">
                <div className="card-content">
                  <h6>
                    <Link href={`job/${job?.id}`}>{job?.title}</Link>
                    {/* <a href="job-details.html">{job?.title?.substring(0, 10)}</a> */}
                  </h6>
                  <div className="mt-5">
                    <span className="card-briefcase">{job?.category}</span>
                    <span className="card-time">
                      4<span> minutes ago</span>
                    </span>
                  </div>
                  <p className="font-sm color-text-paragraph mt-15 job-content">
                    {job?.work_content?.substring(0, 50)}
                  </p>
                </div>
              </div>
              <div className="card-2-bottom1 pl-2 ">
                <div className="row">
                  <div className="col-lg-6 col-6 unit-price">
                    <span className="fs-6 fw-bold">{job?.unit_price}</span>
                    {/* <span className="text-muted">/Hour</span> */}
                  </div>
                  <div className="col-lg-6 col-6 text-end applied-btn">
                    {job?.already_applied && getToken() ? (
                      <div className="btn disable-apply-now">
                        Already Applied
                      </div>
                    ) : (
                      <div
                        className="btn btn-apply-now"
                        onClick={() =>
                          handleShow(job?.id, job?.already_applied)
                        }
                      >
                        Apply Now
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <JobModal
        show={show}
        setShow={setShow}
        jobId={jobId}
        setJobs={setJobs}
        categoryId={categoryId}
        setIsAppliedId={setIsAppliedId}
      />
    </>
  );
}

export default JobCard;
