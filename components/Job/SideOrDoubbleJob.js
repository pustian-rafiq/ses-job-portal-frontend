import React from "react";
import { Card, Badge } from "react-bootstrap";
import { JobData } from "../../utils/JobJsonData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLocationDot,
  faYenSign,
} from "@fortawesome/free-solid-svg-icons";
import style from "../Banner/Banner.module.css";

const SideOrDoubbleJob = () => {
  const jobData = JobData.map((data, index) => {
    return (
      <div className="col-md-3 col-sm-6 mb-3 mr-2" key={index}>
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
            <Badge bg="warning" text="dark">
              {data.status}
            </Badge>{" "}
            <Badge bg="light" text="dark">
              {data.remark}
            </Badge>{" "}
            <p>
              {" "}
              <FontAwesomeIcon icon={faYenSign} className={style.icon} />{" "}
              {data.salary}
            </p>
            <p>
              {" "}
              <FontAwesomeIcon icon={faUser} className={style.icon} />{" "}
              {data.media}
            </p>
            <p>
              {" "}
              <FontAwesomeIcon
                icon={faLocationDot}
                className={style.icon}
              />{" "}
              {data.area}
            </p>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="container">
        <div className="row">{jobData}</div>
      </div>
    </>
  );
};

export default SideOrDoubbleJob;
