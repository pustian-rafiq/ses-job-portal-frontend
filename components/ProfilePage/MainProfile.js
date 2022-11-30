import moment from "moment";
import Image from "next/image";
import React from "react";
import userImage from "../../assets/imgs/user.webp";
import { useEffect, useState } from "react";

// import moment from "moment";
// import userImage from "../../assets/imgs/user.jpg"
import { FaEnvelope, FaFileDownload, FaMobile } from "react-icons/fa";

import privateApi from "../../services/privateApi";

// import Image from "next/image";

function MainProfile({ user, userLanguages }) {
  const [userCertificates, setUserCertificate] = useState([]);
  const [userDocument, setUserDocument] = useState([]);

  useEffect(() => {
    getUserCertificates();
    getUserDocuments();
  }, []);

  //Fetch user certificates
  const getUserCertificates = async (e) => {
    const response = await privateApi.get("candidate/certifications");
    if (response.status === 200) {
      setUserCertificate(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  //Fetch user documents
  const getUserDocuments = async (e) => {
    const response = await privateApi.get("candidate/documents");
    if (response.status === 200) {
      setUserDocument(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="tab-main-profile"
        role="tabpanel"
        aria-labelledby="tab-main-profile"
      >
        <section className="section-box-2">
          <div className="container">
            <div className="">
              <div className="row mt-10">
                <div className="col-lg-2 col-md-12">
                  <div className="image-compay2">
                    <Image
                      src={user?.photo ? user.photo : userImage}
                      height={200}
                      width={200}
                      className="rounded-circle"
                      alt={user.first_name}
                    />
                  </div>
                </div>
                <div className="col-lg-10 col-md-12">
                  <h3 className="mt-3">
                    {user?.first_name} {user?.last_name}
                  </h3>
                  <p className="mt-0 font-md color-text-paragraph-2 mb-5">
                    {user?.current_position != "null" && user?.current_position}
                  </p>
                  <b>
                    {" "}
                    {user.email && (
                      <>
                        <FaEnvelope /> {user.email}
                      </>
                    )}
                  </b>
                  <b className="ml-20">
                    {user.phone && (
                      <>
                        <FaMobile /> {user.phone}
                      </>
                    )}
                  </b>
                </div>
              </div>
            </div>

            <div className="border-bottom pt-10 pb-10"></div>

            <div className="py-3">
              <h4 className="py-2">| About</h4>
              <p>{user.about != "null" && user.about}</p>
            </div>

            <div className="row mt-3">
              <div className="col-md-9">
                {/* Experience */}
                <div>
                  <h4 className="pb-2">| Work Experiences</h4>
                  <div className="row">
                    {user?.experiences?.map((exp, i) => (
                      <div key={i} className="col-xl-12 col-12 my-4">
                        <div className="">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                              <div className="right-info">
                                <h5 className="">{exp.job_title}</h5>
                              </div>
                            </div>
                            <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                              <b>
                                {moment(exp.start_date).format("LL")} -{" "}
                                {moment(exp.end_date).format("LL")}
                              </b>
                            </div>
                          </div>
                          <div className="card-block-info">
                            <p>
                              Designation: {exp.designation} (
                              {exp.employee_type})
                            </p>
                            <p>Company Name: {exp.company_name}</p>
                            <p>Company Address: {exp.company_address}</p>
                            <p>
                              Total Experience:{" "}
                              <strong>{exp.total_experience}</strong> years
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <hr></hr>

                {/* Education */}
                <div className="mt-4">
                  <h4 className="pb-2">| Educations</h4>
                  <div className="row">
                    {user?.educations?.map((education, i) => (
                      <div key={i} className="col-xl-12 col-12 my-4">
                        <div className="">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                              <div className="right-info">
                                <h5 className="">{education.degree}</h5>
                              </div>
                            </div>
                            <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                              <b>
                                {education.start_year} -{" "}
                                {education.passing_year}
                              </b>
                            </div>
                          </div>
                          <div className="card-block-info">
                            <p>institute Name: {education.institute_name}</p>
                            <p>
                              Result: <strong>{education.result}</strong>
                            </p>
                            <p>Description: {education.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <hr></hr>

                {/* Cirtification */}
                <div className="mt-4">
                  <h4 className="pb-2">| Cirtifications</h4>
                  <div className="">
                    {userCertificates?.map((certificate, i) => (
                      <div className="" key={i}>
                        <div className="my-4">
                          <div className="card-grid-2-image-left">
                            <div className="card-block-info">
                              <h6>Name: {certificate.name}</h6>
                              <p>
                                Organization Name:{" "}
                                {certificate.organization_name}
                              </p>
                              <p>Issue Date: {certificate.issue_date}</p>
                              <p>Description: {certificate.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <hr></hr>

                {/* Documents */}
                <div className="mt-4">
                  <h4 className="pb-2">| Documents</h4>
                  <div className="row">
                    {userDocument?.map((document, i) => {
                      const fileArray = (document?.file).split(".");
                      const fileExtension = fileArray[fileArray.length - 1];
                      return (
                        <div className="col-md-6 my-4" key={i}>
                          <div className="card-grid-2">
                            <a
                              href={document.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                            >
                              <div className="row p-3">
                                <div className="col-5 document-type ">
                                  <p>{fileExtension}</p>
                                </div>
                                <div className="col-7 d-flex my-auto">
                                  <h6>{document?.document_type}</h6>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <hr></hr>

                {/* Address */}
                <div className="mt-4">
                  <h4 className="pb-2">| Address</h4>
                  <div className="row">
                    {user?.address?.map((single_address, i) => (
                      <div key={i} className="col-xl-6 col-md-6 col-sm-12 my-4">
                        <div className="">
                          <h5 className="">{single_address.address_type}</h5>
                          <div className="card-block-info">
                            <h6>Country: {single_address.country}</h6>
                            <p>State: {single_address.state}</p>
                            <p>City: {single_address.city}</p>
                            <p>City: {single_address.zip}</p>
                            <p>Address: {single_address.address}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                {/* Skills */}
                <div>
                  <h4 className="pb-2">| Skills</h4>
                  <div className="row">
                    {user?.skills?.map((skill, i) => (
                      <div key={i} className="col-xl-12 col-12 my-4">
                        <div className="">
                          <h5 className="">{skill.candidate_skill}</h5>
                          <div className="card-block-info">
                            <p>Level: {skill.skill_level}</p>
                            <p>Description: {skill.skill_description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <hr></hr>

                {/* Languages */}
                <div>
                  <h4 className="pb-2">| Languages</h4>
                  <div className="row">
                    {userLanguages?.map((language, i) => (
                      <div key={i} className="col-xl-12 col-12 my-4">
                        <div className="">
                          <h5 className="">{language.language}</h5>
                          <div className="card-block-info">
                            <p>
                              Level: <strong>{language.level}</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default MainProfile;
