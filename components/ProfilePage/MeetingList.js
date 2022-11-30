import React from 'react';
import { ImageProps,Image } from 'next/image';

const MeetingList = () => {
    return (
        <div>
            <div
                    className="tab-pane fade"
                    id="tab-meeting-list"
                    role="tabpanel"
                    aria-labelledby="tab-meeting-list"
                  >
                    <h3 className="mt-0 color-brand-1 mb-50">Saved Jobs</h3>
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="card-grid-2 hover-up">
                          <div className="card-grid-2-image-left">
                            <span className="flash"></span>
                            <div className="image-box">
                              <Image src={brand5} alt="jobBox" />
                            </div>
                            <div className="right-info">
                              <a
                                className="name-job"
                                href="company-details.html"
                              >
                                LinkedIn
                              </a>
                              <span className="location-small">
                                Tokyo, Japan
                              </span>
                            </div>
                          </div>
                          <div className="card-block-info">
                            <h6>
                              <a href="job-details.html">
                                UI / UX Designer fulltime
                              </a>
                            </h6>
                            <div className="mt-5">
                              <span className="card-briefcase">Fulltime</span>
                              <span className="card-time">
                                4<span> minutes ago</span>
                              </span>
                            </div>
                            <p className="font-sm color-text-paragraph mt-15">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Recusandae architecto eveniet,
                              dolor quo repellendus pariatur
                            </p>
                            <div className="mt-30">
                              <a
                                className="btn btn-grey-small mr-5"
                                href="jobs-grid.html"
                              >
                                Adobe XD
                              </a>
                              <a
                                className="btn btn-grey-small mr-5"
                                href="jobs-grid.html"
                              >
                                Figma
                              </a>
                              <a
                                className="btn btn-grey-small mr-5"
                                href="jobs-grid.html"
                              >
                                Photoshop
                              </a>
                            </div>
                            <div className="card-2-bottom mt-30">
                              <div className="row">
                                <div className="col-lg-7 col-7">
                                  <span className="card-text-price">$500</span>
                                  <span className="text-muted">/Hour</span>
                                </div>
                                <div className="col-lg-5 col-5 text-end">
                                  <div
                                    className="btn btn-apply-now"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ModalApplyJobForm"
                                  >
                                    Cancel
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="card-grid-2 hover-up">
                          <div className="card-grid-2-image-left">
                            <span className="flash"></span>
                            <div className="image-box">
                              <Image src={brand5} alt="jobBox" />
                            </div>
                            <div className="right-info">
                              <a
                                className="name-job"
                                href="company-details.html"
                              >
                                LinkedIn
                              </a>
                              <span className="location-small">
                                Tokyo, Japan
                              </span>
                            </div>
                          </div>
                          <div className="card-block-info">
                            <h6>
                              <a href="job-details.html">
                                UI / UX Designer fulltime
                              </a>
                            </h6>
                            <div className="mt-5">
                              <span className="card-briefcase">Fulltime</span>
                              <span className="card-time">
                                4<span> minutes ago</span>
                              </span>
                            </div>
                            <p className="font-sm color-text-paragraph mt-15">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Recusandae architecto eveniet,
                              dolor quo repellendus pariatur
                            </p>
                            <div className="mt-30">
                              <a
                                className="btn btn-grey-small mr-5"
                                href="jobs-grid.html"
                              >
                                Adobe XD
                              </a>
                              <a
                                className="btn btn-grey-small mr-5"
                                href="jobs-grid.html"
                              >
                                Figma
                              </a>
                              <a
                                className="btn btn-grey-small mr-5"
                                href="jobs-grid.html"
                              >
                                Photoshop
                              </a>
                            </div>
                            <div className="card-2-bottom mt-30">
                              <div className="row">
                                <div className="col-lg-7 col-7">
                                  <span className="card-text-price">$500</span>
                                  <span className="text-muted">/Hour</span>
                                </div>
                                <div className="col-lg-5 col-5 text-end">
                                  <div
                                    className="btn btn-apply-now"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ModalApplyJobForm"
                                  >
                                    Cancel
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
        </div>
    );
};

export default MeetingList;