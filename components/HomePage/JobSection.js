import React, { useState,useEffect, useContext } from "react";

import JobTab from "./JobSection/JobTab";
import { appContext } from "../../pages/_app";
import publicApi from "../../services/publicApi";
import axios from "axios";

function JobSection() {

  const [jobs, setJobs] = useState([]);

  //Catch category data
  const { categories } = useContext(appContext);


  //Active or inactive tab state
  const [isActive, setIsActive] = useState(0);
  const [categoryId, setCategoryId] = useState(null);
  
  const categoryJobHandler = (id, index) => {
    setCategoryId(id)
    if (isActive === index) {
      setIsActive(0);
    } else {
      setIsActive(index);
    }

    // const response = publicApi.get(`/category/${id}`);
    //   if (response.status === 200) {
    //     setJobs(response.data.jobs);
    //   }else {
    //     console.log("Server Error1");
    //   }

     axios.get(`/category/${id}`)
        .then((response) => {
          if (response.status === 200) {
            setJobs(response.data.jobs);
          }else {
            console.log("Server Error1");
          }
        }).catch((error) => {
          console.log("Server Error1",error);
        })
      
  };
  
  if (jobs.length === 0) {
   
    // const response = publicApi.get(`/category/${categories[0]?.id}`);
    // if (response.status === 200) {
    //   setCategoryId(categories[0]?.id)
    //   setJobs(response.data.jobs);
    // }else {
    //   console.log("Server Error");
    // }

    axios.get(`/category/${categories[0]?.id}`)
    .then((response) => {
      if (response.status === 200) {
        setCategoryId(categories[0]?.id)
        setJobs(response.data.jobs);
      }else {
        console.log("Server Error1");
      }
    }).catch((error) => {
      console.log("Server Error1",error);
    })
  

  }
  return (
    <>
      <section className="section-box mt-50">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
              Jobs of the day
            </h2>
            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
              Search and connect with the right candidates faster.{" "}
            </p>
            <div className="list-tabs mt-40 centered">
              <ul className="nav nav-tabs" role="tablist">
                {categories.map(function (category, index) {
                  return (
                    <li key={index}>
                      <a
                        style={
                          isActive === index
                            ? { background: "#326C8F", color: "#ffffff" }
                            : { background: "" }
                        }
                        className="active"
                        id={`nav-tab-job-${index + 1}`}
                        onClick={() => categoryJobHandler(category.id, index)}
                        href={`#tab-job-${index + 1}`}
                        data-bs-toggle="tab"
                        role="tab"
                        aria-controls={`tab-job-${index + 1}`}
                      >
                        {category.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="mt-70">
            <div className="tab-content" id="myTabContent-1">
              <JobTab id={`tab-job-1`} jobs={jobs} categoryId={categoryId} setJobs={setJobs} active={true} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default JobSection;
