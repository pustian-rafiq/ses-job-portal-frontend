import React from "react";
import {
  FaAngleDown,
  FaArrowDown,
  FaCreativeCommonsSamplingPlus,
  FaEllipsisV,
  FaFile,
  FaFileAlt,
  FaHome,
  FaPenAlt,
  FaStarAndCrescent,
  FaUserAlt,
  FaUserGraduate,
  FaLanguage,
} from "react-icons/fa";

function ProfileTabList() {
  return (
    <>
      <ul className="nav" role="tablist">
        <li>
          <a
            className="btn btn-border mr-15 mb-5 active"
            href="#tab-short-bio"
            data-bs-toggle="tab"
            role="tab"
            aria-controls="tab-short-bio"
            aria-selected="true"
          >
            <FaUserAlt /> Short Bio
          </a>
        </li>
        <li>
          <a
            className="btn btn-border mr-15 mb-5"
            href="#tab-experience"
            data-bs-toggle="tab"
            role="tab"
            aria-controls="tab-experience"
            aria-selected="false"
          >
            <FaCreativeCommonsSamplingPlus />
            &nbsp; Experience
          </a>
        </li>
        <li>
          <a
            className="btn btn-border mr-15 mb-5"
            href="#tab-skills"
            data-bs-toggle="tab"
            role="tab"
            aria-controls="tab-skills"
            aria-selected="false"
          >
            <FaPenAlt />
            &nbsp; Skills
          </a>
        </li>
        <li>
          <a
            className="btn btn-border mr-15 mb-5"
            href="#tab-education"
            data-bs-toggle="tab"
            role="tab"
            aria-controls="tab-education"
            aria-selected="false"
          >
            <FaUserGraduate />
            &nbsp; Education
          </a>
        </li>

        <li>
          <a
            className="btn btn-border mr-15 mb-5"
            href="#tab-language"
            data-bs-toggle="tab"
            role="tab"
            aria-controls="tab-language"
            aria-selected="false"
          >
            <FaLanguage />
            &nbsp; Language
          </a>
        </li>

        

        <li>
          <a
            className="btn btn-border mr-15 mb-5"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            View More <FaAngleDown />
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <a
                className="btn btn-border recruitment-icon mb-5 w-100 collupsed_tab"
                href="#tab-cirtification"
                data-bs-toggle="tab"
                role="tab"
                aria-controls="tab-cirtification"
                aria-selected="false"
              >
                <FaFileAlt />
                &nbsp; Cirtification
              </a>
            </li>
            <li>
              <a
                className="btn btn-border recruitment-icon mb-5 w-100 collupsed_tab"
                href="#tab-address"
                data-bs-toggle="tab"
                role="tab"
                aria-controls="tab-address"
                aria-selected="false"
              >
                <FaHome />
                &nbsp; Address
              </a>
            </li>
            <li>
              <a
                className="btn btn-border recruitment-icon w-100 collupsed_tab"
                href="#tab-documents"
                data-bs-toggle="tab"
                role="tab"
                aria-controls="tab-documents"
                aria-selected="false"
              >
                <FaFile />
                &nbsp;Documents
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
}

export default ProfileTabList;
