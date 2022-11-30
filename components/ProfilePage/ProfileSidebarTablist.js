import React from "react";
import { FaCheck, FaCog, FaListAlt, FaSave, FaUserAlt, FaUserEdit,FaMeetup } from "react-icons/fa";

function ProfileSidebarTablist() {
  return (
    <>
      <div className="box-nav-tabs nav-tavs-profile mb-5 sticky_profile_sidebar">
        <ul className="nav" role="tablist">
          <li>
            <a
              className="btn btn-border mb-20 active"
              href="#tab-main-profile"
              data-bs-toggle="tab"
              role="tab"
              aria-controls="tab-main-profile"
              aria-selected="true"
            >
              <FaUserAlt /> &nbsp; My Profile
            </a>
          </li>
          <li>
            <a
              className="btn btn-border mb-20"
              href="#tab-my-profile"
              data-bs-toggle="tab"
              role="tab"
              aria-controls="tab-my-profile"
              aria-selected="true"
            >
              <FaUserEdit /> &nbsp; Update Profile
            </a>
          </li>
          <li>
            <a
              className="btn btn-border mb-20"
              href="#tab-applied-jobs"
              data-bs-toggle="tab"
              role="tab"
              aria-controls="tab-applied-jobs"
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
              href="#tab-meeting-list"
              data-bs-toggle="tab"
              role="tab"
              aria-controls="tab-meeting-list"
              aria-selected="false"
            >
              <FaMeetup /> &nbsp; Meetings
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
    </>
  );
}

export default ProfileSidebarTablist;
