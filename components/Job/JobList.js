import { useRouter } from "next/router";
import React from "react";

import SortingBox from "../Common/SortingBox";
import JobCard from "./JobCard";

function JobList({ jobs,searchContent, search, totalJobs,totalSearchJobs, offset, jobsPerPage }) {
  
  const router = useRouter()


  return (
    <>
      <div className="content-page">
        <div className="box-filters-job">
          <div className="row">
            <div className="col-xl-6 col-lg-5">
              <span className="text-small text-showing">
                Showing
                <strong className="mx-1">
                  {
                  search && searchContent?.jobs?.length > 0 ? 
                  `${offset + 1} - ${offset + searchContent?.jobs?.length}`
                  : search && searchContent?.jobs?.length == 0 ?
                  "0 - 0"
                  : `${offset + 1} - ${offset + jobs?.jobs?.length}`
                  // (offset + 1) - (offset + jobs?.jobs?.length)
                  }
                  {/* {offset + 1}-{offset + jobs?.jobs?.length} */}
                </strong>
                of <strong>{search ? totalSearchJobs : totalJobs} </strong>
                jobs
              </span>
            </div>
            {/* <div className="col-xl-6 col-lg-7 text-lg-end mt-sm-15">
              <div className="display-flex2">
                 <SortingBox /> 
              </div>
            </div> */}
          </div>
        </div>
        <div className="row display-list">
          <div className="col-xl-12 col-12">
            {
              search && searchContent?.jobs?.length < 1 ?
                  <h3 className="text-center text-danger pt-5">No jobs were found. Please try another one.</h3>  
              : search && searchContent?.jobs?.length > 0 ?
                searchContent?.jobs?.map((job) => (
                <JobCard key={job.id} job={job} />
              )) 
              : 
              jobs?.jobs?.map((job) => (
                <JobCard key={job.id} job={job} />
              )) 
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default JobList;
