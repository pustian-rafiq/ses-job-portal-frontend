import React, { useState, useRef, useEffect } from "react";
import MasterLayout from "../../Layouts/MasterLayout";
import RelatedJobs from "../../components/Job/RelatedJobs";
import JobTags from "../../components/Job/JobTags";
import SocialShare from "../../components/Common/SocialShare";
import JobModal from "../../components/HomePage/JobSection/JobModal";
import ProcessSection from "../../components/HomePage/ProcessSection";
import Meta from "../../components/Meta/Meta";
import ReactToPdf from "react-to-pdf";
import { getToken } from "../../services/auth/token";
import { useRouter } from "next/router";
import axios from "axios";

function JobDetails({ relJobs }) {
  const ref = useRef();
  const [jobDetails, setJobDetails] = useState("");
  const [relatedJobs, setRelatedJobs] = useState("");

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const router = useRouter();
  const jobId = router.query.id;

  useEffect(() => {
    fetchJobDetails();
    fetchRelatedJobs();
  }, [router.query.id]);

  const fetchJobDetails = async () => {
    await axios
      .get(`/jobs/${jobId}`)
      .then((response) => {
        if (response.status === 200) {
          setJobDetails(response.data);
        } else {
          console.log("Server Error1");
        }
      })
      .catch((error) => {
        console.log("Server Error1", error);
      });
  };

  //Fetch related jobs
  const fetchRelatedJobs = async () => {
    await axios
      .get(`/related-jobs/${jobId}`)
      .then((response) => {
        if (response.status === 200) {
          setRelatedJobs(response.data.jobs);
        } else {
          console.log("Server Error1");
        }
      })
      .catch((error) => {
        console.log("Server Error1", error);
      });
  };

  return (
    <>
      <Meta title={`${jobDetails?.title} | SES Job portal`} />
      <section className="section-box mt-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12">
              <div className="box-border-single">
                <div className="px-3">
                  {jobDetails?.already_applied && getToken() ? (
                    <button className="btn btn-apply-disable disable-apply-now hover-up p-2 mb-2 ml-2">
                      Already Applied
                    </button>
                  ) : (
                    <button
                      onClick={handleShow}
                      className="btn btn-apply-disable btn-apply-now2 hover-up p-2 mb-2 ml-2"
                    >
                      Apply now
                    </button>
                  )}
                  <ReactToPdf
                    targetRef={ref}
                    filename={`${jobDetails?.title}-details.pdf`}
                  >
                    {({ toPdf }) => (
                      <button
                        className="btn btn-apply btn-download-big hover-up p-2 mb-2 ml-2"
                        onClick={toPdf}
                      >
                        Print Job
                      </button>
                    )}
                  </ReactToPdf>
                </div>
                <div ref={ref} className="px-3 pt-0">
                  <div className="row mt-10">
                    <div className="col-lg-8 col-md-12">
                      <h3>{jobDetails?.title}</h3>
                      <div className="mt-0 mb-15">
                        <span className="card-briefcase">
                          {jobDetails?.category}
                        </span>
                        <span className="card-time">3 mins ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 pb-10"></div>

                  <div className="job-overview">
                    <h5 className="border-bottom pb-15 mb-30">Overview</h5>
                    <div className="row">
                      <div className="col-md-6 d-flex">
                        <div className="sidebar-text-info ml-10">
                          <span className="text-description industry-icon mb-10">
                            Occupation
                          </span>
                          <strong className="small-heading">
                            {jobDetails?.occupation}
                          </strong>
                        </div>
                      </div>
                      <div className="col-md-6 d-flex">
                        <div className="sidebar-text-info ml-10">
                          <span className="text-description experience-icon mb-10">
                            Positions
                          </span>
                          <strong className="small-heading">
                            {jobDetails?.number_of_people}
                          </strong>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-25">
                      <div className="col-md-6 d-flex mt-sm-15">
                        <div className="sidebar-text-info ml-10">
                          <span className="text-description salary-icon mb-10">
                            Project Unit Price
                          </span>
                          <strong className="small-heading">
                            {jobDetails?.unit_price}
                          </strong>
                        </div>
                      </div>
                      <div className="col-md-6 d-flex">
                        <div className="sidebar-text-info ml-10">
                          <span className="text-description experience-icon mb-10">
                            Experience
                          </span>
                          <strong className="small-heading">1 - 2 years</strong>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-25">
                      <div className="col-md-6 d-flex mt-sm-15">
                        <div className="sidebar-text-info ml-10">
                          <span className="text-description jobtype-icon mb-10">
                            Activity Frequency
                          </span>
                          <strong className="small-heading">
                            {jobDetails?.activity_frequency}
                          </strong>
                        </div>
                      </div>
                      <div className="col-md-6 d-flex mt-sm-15">
                        <div className="sidebar-text-info ml-10">
                          <span className="text-description mb-10">
                            Working Hours
                          </span>
                          <strong className="small-heading">
                            {jobDetails?.working_hours}
                          </strong>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-25">
                      <div className="col-md-6 d-flex mt-sm-15">
                        <div className="sidebar-text-info ml-10">
                          <span className="text-description jobtype-icon mb-10">
                            Updated
                          </span>
                          <strong className="small-heading">10/07/2022</strong>
                        </div>
                      </div>
                      <div className="col-md-6 d-flex mt-sm-15">
                        <div className="sidebar-text-info ml-10">
                          <span className="text-description mb-10">
                            Location
                          </span>
                          <strong className="small-heading">
                            {jobDetails?.work_place}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-single m-4 ">
                    <h4>Content of work</h4>
                    <p className="contains-new-line text-dark">
                      {jobDetails?.work_content}
                    </p>
                    <h4>Requirements</h4>
                    <p className="contains-new-line text-dark  ">
                      {jobDetails?.required_skill}
                    </p>
                    {jobDetails?.remarks && (
                      <>
                        <h4>Others</h4>
                        <p className="contains-new-line text-dark">
                          {jobDetails?.remarks}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="single-apply-jobs">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      {/* <a className="btn btn-default mr-15" onClick={handleShow}>
                        Apply now
                      </a> */}

                      {jobDetails?.already_applied && getToken() ? (
                        <div className="btn disable-apply-now mr-2" disabled>
                          Already Applied
                        </div>
                      ) : (
                        <a
                          className="btn btn-apply-now mr-15"
                          onClick={handleShow}
                        >
                          Apply now
                        </a>
                      )}

                      <a className="btn btn-save-now" href="#">
                        Save job
                      </a>
                    </div>
                    <div className="col-md-7 text-lg-end social-share">
                      <SocialShare />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 pl-40 pl-lg-15 mt-lg-30">
              {relatedJobs?.length > 0 && (
                <RelatedJobs relJobs={relatedJobs.slice(0, 8)} />
              )}

              {/* {tags && <JobTags tags={tags} />} */}
            </div>
          </div>
        </div>
      </section>
      <ProcessSection onlySteps />

      <JobModal show={show} setShow={setShow} />
    </>
  );
}

JobDetails.Layout = MasterLayout;

export default JobDetails;
