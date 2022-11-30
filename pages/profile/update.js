import Image from "next/image";
import Link from "next/link";
import React from "react";
import Meta from "../../components/Meta/Meta";
import MasterLayout from "../../Layouts/MasterLayout";
import brand5 from "../../assets/imgs/brands/brand-5.png";
import {
  FaCheck,
  FaCog,
  FaCreativeCommonsSamplingPlus,
  FaHeart,
  FaHeartbeat,
  FaHome,
  FaListAlt,
  FaPenAlt,
  FaSave,
  FaUserAlt,
} from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import privateApi from "../../services/privateApi";
import ShortBio from "../../components/ProfilePage/ShortBio";
import AddressTab from "../../components/ProfilePage/AddressTab";
import SkillsTab from "../../components/ProfilePage/SkillsTab";
import ExperienceTab from "../../components/ProfilePage/ExperienceTab";
import ProfileTabList from "../../components/ProfilePage/ProfileTabList";
import Certification from "../../components/ProfilePage/Certificate/Certification";
import Documents from "../../components/ProfilePage/Documents/Documents";
import EducationTab from "../../components/ProfilePage/EducationTab";
import LanguageTab from "../../components/ProfilePage/LanguageTab";

export default function Profile() {
  // const [loader, setLoader] = useState(true);
  const [user, setUser] = useState([]);


  useEffect(() => {
    getUserData();
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

  return (
    <>
      <Meta title="Profile Update | SES Job portal" />

      <section className="section-box mt-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-12">
              <div className="box-nav-tabs nav-tavs-profile mb-5">
                <ul className="nav" role="tablist">
                  <li>
                    <a
                      className="btn btn-border mb-20 active"
                      href="#tab-my-profile"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="tab-my-profile"
                      aria-selected="true"
                    >
                      <FaUserAlt /> &nbsp; My Profile
                    </a>
                  </li>
                  <li>
                    <a
                      className="btn btn-border mb-20"
                      href="#tab-my-jobs"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="tab-my-jobs"
                      aria-selected="false"
                    >
                      <FaListAlt /> &nbsp; Applied Jobs
                    </a>
                  </li>
                  <li>
                    <a
                      className="btn btn-border mb-20"
                      href="#tab-my-jobs"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="tab-my-jobs"
                      aria-selected="false"
                    >
                      <FaCheck /> &nbsp; Selected Jobs
                    </a>
                  </li>
                  <li>
                    <a
                      className="btn btn-border mb-20"
                      href="#tab-saved-jobs"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="tab-saved-jobs"
                      aria-selected="false"
                    >
                      <FaSave /> &nbsp; Saved Jobs
                    </a>
                  </li>
                  <li>
                    <a
                      className="btn btn-border mb-20"
                      href="#tab-settings"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="tab-settings"
                      aria-selected="false"
                    >
                      <FaCog /> &nbsp; Account Settings
                    </a>
                  </li>
                </ul>
                <div className="border-bottom pt-10 pb-10"></div>
              </div>
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12 col-12 mb-50">
              <div className="content-singles">
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="tab-my-profile"
                    role="tabpanel"
                    aria-labelledby="tab-my-profile"
                  >
                    <div className="box-nav-tabs">
                      <ProfileTabList />
                    </div>
                    <div className="border-bottom pt-5"></div>

                    <div className="tab-content">
                      <ShortBio userInfo={user} />
                      <AddressTab allAddress={user?.address} />
                      <SkillsTab allSkills={user?.skills} />
                      <ExperienceTab allExperience={user?.experiences}/>
                      <Certification/>
                      <Documents />
                      <ExperienceTab allExperience={user?.experiences} />
                      <EducationTab allEducation={user?.educations}/>
                      <LanguageTab allLanguage={user?.languages} />
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
                    <div className="row display-list">
                      <div className="col-xl-12 col-12">
                        <div className="card-grid-2 hover-up">
                          <span className="flash"></span>
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                              <div className="card-grid-2-image-left">
                                <div className="image-box">
                                  <Image src={brand5} alt="jobBox" />
                                </div>
                                <div className="right-info">
                                  <a className="name-job" href="">
                                    Linkedin
                                  </a>
                                  <span className="location-small">
                                    Tokyo, Japan
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                              <div className="pl-15 mb-15 mt-30">
                                <a className="btn btn-grey-small mr-5" href="#">
                                  Adobe XD
                                </a>
                                <a className="btn btn-grey-small mr-5" href="#">
                                  Figma
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-block-info">
                            <h4>
                              <a href="job-details.html">
                                React Native Web Developer
                              </a>
                            </h4>
                            <div className="mt-5">
                              <span className="card-briefcase">Fulltime</span>
                              <span className="card-time">
                                <span>4</span>
                                <span> mins ago</span>
                              </span>
                            </div>
                            <p className="font-sm color-text-paragraph mt-10">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Recusandae architecto eveniet,
                              dolor quo repellendus pariatur
                            </p>
                            <div className="card-2-bottom mt-20">
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
                      <div className="col-xl-12 col-12">
                        <div className="card-grid-2 hover-up">
                          <span className="flash"></span>
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                              <div className="card-grid-2-image-left">
                                <div className="image-box">
                                  <Image src={brand5} alt="jobBox" />
                                </div>
                                <div className="right-info">
                                  <a className="name-job" href="">
                                    Quora JSC
                                  </a>
                                  <span className="location-small">
                                    Tokyo, Japan
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                              <div className="pl-15 mb-15 mt-30">
                                <a className="btn btn-grey-small mr-5" href="#">
                                  Adobe XD
                                </a>
                                <a className="btn btn-grey-small mr-5" href="#">
                                  Figma
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-block-info">
                            <h4>
                              <a href="job-details.html">
                                Senior System Engineer
                              </a>
                            </h4>
                            <div className="mt-5">
                              <span className="card-briefcase">Part time</span>
                              <span className="card-time">
                                <span>5</span>
                                <span> mins ago</span>
                              </span>
                            </div>
                            <p className="font-sm color-text-paragraph mt-10">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Recusandae architecto eveniet,
                              dolor quo repellendus pariatur.
                            </p>
                            <div className="card-2-bottom mt-20">
                              <div className="row">
                                <div className="col-lg-7 col-7">
                                  <span className="card-text-price">$800</span>
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
                      <div className="col-xl-12 col-12">
                        <div className="card-grid-2 hover-up">
                          <span className="flash"></span>
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                              <div className="card-grid-2-image-left">
                                <div className="image-box">
                                  <Image src={brand5} alt="jobBox" />
                                </div>
                                <div className="right-info">
                                  <a className="name-job" href="">
                                    Nintendo
                                  </a>
                                  <span className="location-small">
                                    Tokyo, Japan
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                              <div className="pl-15 mb-15 mt-30">
                                <a className="btn btn-grey-small mr-5" href="#">
                                  Adobe XD
                                </a>
                                <a className="btn btn-grey-small mr-5" href="#">
                                  Figma
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-block-info">
                            <h4>
                              <a href="job-details.html">Products Manager</a>
                            </h4>
                            <div className="mt-5">
                              <span className="card-briefcase">Full time</span>
                              <span className="card-time">
                                <span>6</span>
                                <span> mins ago</span>
                              </span>
                            </div>
                            <p className="font-sm color-text-paragraph mt-10">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Recusandae architecto eveniet,
                              dolor quo repellendus pariatur.
                            </p>
                            <div className="card-2-bottom mt-20">
                              <div className="row">
                                <div className="col-lg-7 col-7">
                                  <span className="card-text-price">$250</span>
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
                      <div className="col-xl-12 col-12">
                        <div className="card-grid-2 hover-up">
                          <span className="flash"></span>
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                              <div className="card-grid-2-image-left">
                                <div className="image-box">
                                  <Image src={brand5} alt="jobBox" />
                                </div>
                                <div className="right-info">
                                  <a className="name-job" href="">
                                    Periscope
                                  </a>
                                  <span className="location-small">
                                    Tokyo, Japan
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                              <div className="pl-15 mb-15 mt-30">
                                <a className="btn btn-grey-small mr-5" href="#">
                                  Adobe XD
                                </a>
                                <a className="btn btn-grey-small mr-5" href="#">
                                  Figma
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-block-info">
                            <h4>
                              <a href="job-details.html">
                                Lead Quality Control QA
                              </a>
                            </h4>
                            <div className="mt-5">
                              <span className="card-briefcase">Full time</span>
                              <span className="card-time">
                                <span>6</span>
                                <span> mins ago</span>
                              </span>
                            </div>
                            <p className="font-sm color-text-paragraph mt-10">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Recusandae architecto eveniet,
                              dolor quo repellendus pariatur.
                            </p>
                            <div className="card-2-bottom mt-20">
                              <div className="row">
                                <div className="col-lg-7 col-7">
                                  <span className="card-text-price">$250</span>
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
                    <div className="paginations">
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
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="tab-saved-jobs"
                    role="tabpanel"
                    aria-labelledby="tab-saved-jobs"
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
                    <div className="paginations">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Profile.Layout = MasterLayout;
