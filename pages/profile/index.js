import React, { useEffect, useState } from "react";

import Meta from "../../components/Meta/Meta";
import PrivateLayout from "../../Layouts/PrivateLayout";
import privateApi from "../../services/privateApi";
import ShortBio from "../../components/ProfilePage/ShortBio";
import AddressTab from "../../components/ProfilePage/AddressTab";
import SkillsTab from "../../components/ProfilePage/SkillsTab";
import ExperienceTab from "../../components/ProfilePage/ExperienceTab";
import ProfileTabList from "../../components/ProfilePage/ProfileTabList";
import Certification from "../../components/ProfilePage/Certificate/Certification";
import Documents from "../../components/ProfilePage/Documents/Documents";
import EducationTab from "../../components/ProfilePage/EducationTab";
import ProfileSidebarTablist from "../../components/ProfilePage/ProfileSidebarTablist";
import MainProfile from "../../components/ProfilePage/MainProfile";
import LanguageTab from "../../components/ProfilePage/LanguageTab";
import { Badge, Table } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

import Image from "next/image";
import brand5 from "../../assets/imgs/brands/brand-5.png";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import Link from "next/link";
import moment from "moment";

export default function Profile() {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState([]);
  const [userLanguages, setUserLanguages] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [meetingJobs, setMeetingJobs] = useState([]);
  const [jobsPerPage, setJobsPerPage] = useState(10);

  useEffect(() => {
    getUserData();
    getLanguages();
    getSelectedJobsData();
    getAppliedJobs();
    getMeetingJobs();
  }, []);

  const getUserData = async (e) => {
    const response = await privateApi.get("candidate/profile");
    if (response.status === 200) {
      setUser(response.data.data);
      setLoader(false);
    } else {
      console.log("Server Error");
    }
  };
  const getSelectedJobsData = async (e) => {
    const response = await privateApi.get(
      "candidate/selected-job?start=0&length=15"
    );
    if (response.status === 200) {
      setSelectedJobs(response.data.data);
      setLoader(false);
    } else {
      console.log("Server Error");
    }
  };

  const getLanguages = async () => {
    const response = await privateApi.get(`candidate/languages`);

    if (response.status === 200) {
      setUserLanguages(response.data.data);
    } else {
      toast.warning(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    }
  };

  const getAppliedJobs = async (pageNumber = 1) => {
    const response = await privateApi.get(
      `candidate/applied-job?length=${jobsPerPage}&page=${pageNumber}`
    );
    if (response.status === 200) {
      setAppliedJobs(response.data);
    } else {
      console.log("Server Error");
    }
  };

  const getMeetingJobs = async () => {
    const response = await privateApi.get(`candidate/meetings?length=15`);
    if (response.status === 200) {
      setMeetingJobs(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  const convertDate = (ISO1, ISO2) => {
    var date = moment(ISO1);
    const date2 = moment(ISO2);
    var dateComponent = date.utc().format("YYYY-MM-DD");
    var timeComponent1 = date.utc().format("HH:mm:ss");
    var timeComponent2 = date2.utc().format("HH:mm:ss");
    return `Date: ${dateComponent} Time: ${timeComponent1} - ${timeComponent2}`;
  };

  return (
    <>
      <Meta title="Profile Update | SES Job portal" />

      <section className="section-box mt-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-12">
              <ProfileSidebarTablist />
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12 col-12 mb-50">
              <div className="content-singles">
                <div className="tab-content">
                  <div
                    className="tab-pane fade "
                    id="tab-my-profile"
                    role="tabpanel"
                    aria-labelledby="tab-my-profile"
                  >
                    <div className="box-nav-tabs">
                      <ProfileTabList />
                    </div>
                    <div className="border-bottom pt-5"></div>

                    <div className="tab-content">
                      <ShortBio userInfo={user} setUserInfo={setUser} />
                      <AddressTab
                        allAddress={user?.address}
                        setUserInfo={setUser}
                      />
                      <EducationTab
                        allEducations={user?.educations}
                        setUserInfo={setUser}
                      />
                      <SkillsTab
                        allSkills={user?.skills}
                        setUserInfo={setUser}
                      />
                      <ExperienceTab
                        allExperience={user?.experiences}
                        setUserInfo={setUser}
                      />
                      <Certification />
                      <Documents />
                      <LanguageTab
                        allLanguage={userLanguages}
                        setUserLanguages={setUserLanguages}
                      />
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="tab-my-jobs"
                    role="tabpanel"
                    aria-labelledby="tab-my-jobs"
                  >
                    <h3 className="mt-0 color-brand-1 mb-50">
                      My Selected Jobs
                    </h3>

                    <div className="display-list">
                      {selectedJobs && selectedJobs.length > 0 ? (
                        <Table response striped bordered hover>
                          <thead>
                            <tr>
                              <th>SI</th>
                              <th>Job Title</th>
                              <th>Expected Salary</th>
                              <th>Status</th>
                              <th>Date of Joining</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedJobs?.map((job, i) => {
                              return (
                                <tr key={job.id}>
                                  <td>{++i}</td>
                                  <td>
                                    <Link href={`${job?.id}`}>
                                      <h5>{job?.job_title}</h5>
                                    </Link>

                                    {/* <h6>
                                       横浜（基本週2（水、木）出社、その他リモート想定）
                                     </h6> */}
                                    <p>Applid On: {job?.applied_date}</p>
                                  </td>
                                  <td>{job?.expected_salary}</td>
                                  <td>{job?.status}</td>
                                  <td>
                                    {job?.rejected_status ? (
                                      <Badge bg="danger">Rejected</Badge>
                                    ) : (
                                      <Badge bg="warning">Pending</Badge>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      ) : (
                        <h5 className="text-center">
                          Sorry,There is no selected jobs yet
                        </h5>
                      )}
                    </div>

                    {/* <div className="paginations">
                      <ul className="pager">
                        <li>
                          <a className="pager-prev" href="#"></a>
                        </li>
                        <li>
                          <a className="pager-number" href="#">
                            1
                          </a>
                        </li>
                        <li>
                          <a className="pager-number" href="#">
                            2
                          </a>
                        </li>
                        <li>
                          <a className="pager-number" href="#">
                            3
                          </a>
                        </li>
                        <li>
                          <a className="pager-number" href="#">
                            4
                          </a>
                        </li>
                        <li>
                          <a className="pager-number" href="#">
                            5
                          </a>
                        </li>
                        <li>
                          <a className="pager-number active" href="#">
                            6
                          </a>
                        </li>
                        <li>
                          <a className="pager-number" href="#">
                            7
                          </a>
                        </li>
                        <li>
                          <a className="pager-next" href="#"></a>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="tab-applied-jobs"
                    role="tabpanel"
                    aria-labelledby="tab-applied-jobs"
                  >
                    <h3 className="mt-0 color-brand-1 mb-50">
                      My Applied Jobs
                    </h3>

                    <div className="display-list">
                      {appliedJobs && appliedJobs.data?.length > 0 ? (
                        <Table responsive striped bordered hover>
                          <thead>
                            <tr>
                              <th>Job ID</th>
                              <th>Job Title</th>
                              <th>Expected Salary</th>
                              <th>View Status</th>
                              <th>Recruitment Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {appliedJobs.data?.map((job, i) => (
                              <tr key={i}>
                                <td>{job.id}</td>
                                <td>
                                  <Link href={`job/${job?.id}`}>
                                    <h6 className="link">{job?.job_title}</h6>
                                  </Link>

                                  <p>Applid On: {job.applied_date}</p>
                                </td>
                                <td>{job.expected_salary}</td>
                                <td>
                                  <FaCheck className="text-success" />
                                </td>
                                <td>
                                  {job.status == "Success" ? (
                                    <Badge bg="success">Selected</Badge>
                                  ) : (
                                    <Badge bg="warning">Pending</Badge>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      ) : (
                        <h5 className="text-center">
                          Please apply for jobs first
                        </h5>
                      )}
                    </div>
                    {appliedJobs && appliedJobs.data?.length > jobsPerPage && (
                      <div className="d-flex">
                        <div className="paginations mx-auto">
                          <Pagination
                            activePage={
                              appliedJobs?.meta?.current_page
                                ? appliedJobs?.meta?.current_page
                                : 0
                            }
                            itemsCountPerPage={
                              appliedJobs?.meta?.per_page
                                ? appliedJobs?.meta?.per_page
                                : 0
                            }
                            totalItemsCount={
                              appliedJobs?.meta?.total
                                ? appliedJobs?.meta?.total
                                : 0
                            }
                            onChange={(pageNumber) => {
                              getAppliedJobs(pageNumber);
                            }}
                            pageRangeDisplayed={8}
                            itemclassName="page-item"
                            linkclassName="page-link"
                            firstPageText="First"
                            lastPageText="Last"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="tab-meeting-list"
                    role="tabpanel"
                    aria-labelledby="tab-meeting-list"
                  >
                    <h3 className="mt-0 color-brand-1 mb-50">Meeting lists </h3>
                    <div className="row">
                      {meetingJobs && meetingJobs.length > 0 ? (
                        meetingJobs.map((mt) => (
                          <div
                            key={mt.id}
                            className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
                          >
                            <div className="card-grid-2 hover-up">
                              <div className="card-block-info">
                                <h6>{mt?.title}</h6>

                                <div className="mt-5">
                                  <span className="text-bold">
                                    {convertDate(mt?.start, mt?.end)}
                                  </span>
                                </div>
                                <div className="card-2-bottom mt-30">
                                  <div className="row">
                                    <div className="col-lg-7 col-7">
                                      <a
                                        target="_blank"
                                        href={mt?.join_url}
                                        rel="noreferrer"
                                      >
                                        <div className="btn btn-apply-now">
                                          Join
                                        </div>
                                      </a>
                                    </div>
                                    {mt?.meeting_status && (
                                      <div className="col-lg-5 col-5 text-end">
                                        <span className="badge badge-status">
                                          {mt.meeting_status}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12">
                          <h5 className="text-center">
                            No meeting found, Please check later
                          </h5>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="tab-settings"
                    role="tabpanel"
                    aria-labelledby="tab-settings"
                  >
                    <h3 className="mt-0 color-brand-1 mb-50">
                      Account Settings
                    </h3>
                    <div>
                      <div className="row form-contact">
                        <div className="col-12">
                          <h6 className="color-orange mb-20">
                            Change your password
                          </h6>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="font-sm  mb-10">
                                  New Password
                                </label>
                                <input
                                  className="form-control"
                                  type="password"
                                  value="123456789"
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="font-sm  mb-10">
                                  Re-Password (New) *
                                </label>
                                <input
                                  className="form-control"
                                  type="password"
                                  value="123456789"
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="font-sm  mb-10">
                                  Old Password *
                                </label>
                                <input
                                  className="form-control"
                                  type="password"
                                  value="123456789"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>

                          <div className="box-button mt-15">
                            <button className="btn btn-apply-big font-md font-bold">
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <MainProfile user={user} userLanguages={userLanguages} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Profile.Layout = PrivateLayout;
