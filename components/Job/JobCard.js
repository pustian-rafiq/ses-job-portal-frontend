import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useContext } from "react";
import { getToken } from "../../services/auth/token";
import JobModal from "../HomePage/JobSection/JobModal";

function JobCard({ job }) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [isAppliedId, setIsAppliedId] = useState(null);

  const handleShow = (jobId, isApplied) => {
    if (getToken()) {
      setShow(true);
      setJobId(jobId);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <>
      <div className="card-grid-3 hover-up mb-2">
        <span className="flash"></span>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="right-info pl-15 mb-15 mt-30">
              <span className="location-small">{job?.work_place}</span>
            </div>
          </div>
          <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
            <div className="pl-15 mb-15 mt-30">
              {job?.category && (
                <a
                  className="btn btn-grey-small mr-5 job-type-btn"
                  href="job/fulltime"
                >
                  {job?.category}
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="card-block-info">
          <h4>
            <Link href={`job/${job?.id}`}>{job?.title}</Link>
          </h4>
          {job.work_content && (
            <p className="font-sm color-text-paragraph mt-10 contains-new-line">
              {`${job?.work_content?.substring(0, 100)}`}
            </p>
          )}
          <div className="card-2-bottom mt-20">
            <div className="row">
              <div className="col-lg-7 col-7">
                {job.unit_price && (
                  <span className="card-text-price">{job?.unit_price}</span>
                )}
              </div>
              <div className="col-lg-5 col-5 text-end">
                {job?.already_applied && getToken() ? (
                  <div className="btn disable-apply-now" disabled>
                    Already Applied
                  </div>
                ) : isAppliedId ? (
                  <div className="btn disable-apply-now" disabled>
                    Already Applied
                  </div>
                ) : (
                  <div
                    className="btn btn-apply-now"
                    onClick={() => handleShow(job?.id, job?.already_applied)}
                  >
                    Apply Now
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <JobModal
        show={show}
        setShow={setShow}
        jobId={jobId}
        setIsAppliedId={setIsAppliedId}
      />
    </>
  );
}

export default JobCard;
